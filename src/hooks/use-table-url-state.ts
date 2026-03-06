'use client'

import { useCallback, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type {
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
} from '@tanstack/react-table'

export type UseTableUrlStateParams = {
  pagination?: {
    pageKey?: string
    pageSizeKey?: string
    defaultPage?: number
    defaultPageSize?: number
  }
  globalFilter?: {
    enabled?: boolean
    key?: string
    trim?: boolean
  }
  columnFilters?: Array<{
    columnId: string
    searchKey: string
    type?: 'string' | 'array'
  }>
}

export function useTableUrlState(params: UseTableUrlStateParams = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageKey = params.pagination?.pageKey ?? 'page'
  const pageSizeKey = params.pagination?.pageSizeKey ?? 'pageSize'
  const defaultPage = params.pagination?.defaultPage ?? 1
  const defaultPageSize = params.pagination?.defaultPageSize ?? 10
  const globalFilterKey = params.globalFilter?.key ?? 'filter'

  // Função central de navegação - Sem travas complexas
  const updateUrl = useCallback((updates: Record<string, string | string[] | undefined>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        params.delete(key)
      } else if (Array.isArray(value)) {
        params.delete(key)
        value.forEach(v => params.append(key, v))
      } else {
        params.set(key, value)
      }
    })

    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false })
  }, [pathname, router, searchParams])

  // Estado de Paginação derivado da URL
  const pagination: PaginationState = useMemo(() => {
    const page = searchParams.get(pageKey)
    const pageSize = searchParams.get(pageSizeKey)
    return {
      pageIndex: page ? Math.max(0, parseInt(page, 10) - 1) : defaultPage - 1,
      pageSize: pageSize ? parseInt(pageSize, 10) : defaultPageSize,
    }
  }, [searchParams, pageKey, pageSizeKey, defaultPage, defaultPageSize])

  const onPaginationChange: OnChangeFn<PaginationState> = useCallback((updater) => {
    const next = typeof updater === 'function' ? updater(pagination) : updater
    updateUrl({
      [pageKey]: (next.pageIndex + 1) === defaultPage ? undefined : String(next.pageIndex + 1),
      [pageSizeKey]: next.pageSize === defaultPageSize ? undefined : String(next.pageSize),
    })
  }, [pagination, updateUrl, pageKey, pageSizeKey, defaultPage, defaultPageSize])

  // Filtros de Coluna derivados da URL
  const columnFilters: ColumnFiltersState = useMemo(() => {
    const collected: ColumnFiltersState = []
    if (!params.columnFilters) return collected
    for (const cfg of params.columnFilters) {
      const values = cfg.type === 'array' ? searchParams.getAll(cfg.searchKey) : searchParams.get(cfg.searchKey)
      if (values && (Array.isArray(values) ? values.length > 0 : values !== '')) {
        collected.push({ id: cfg.columnId, value: values })
      }
    }
    return collected
  }, [params.columnFilters, searchParams])

  const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback((updater) => {
    const next = typeof updater === 'function' ? updater(columnFilters) : updater
    const updates: Record<string, string | string[] | undefined> = { [pageKey]: undefined }
    
    params.columnFilters?.forEach(cfg => {
      const found = next.find(f => f.id === cfg.columnId)
      updates[cfg.searchKey] = found?.value as any
    })
    updateUrl(updates)
  }, [columnFilters, params.columnFilters, updateUrl, pageKey])

  const globalFilter = searchParams.get(globalFilterKey) ?? ''
  const onGlobalFilterChange: OnChangeFn<string> = useCallback((updater) => {
    const next = typeof updater === 'function' ? updater(globalFilter) : updater
    updateUrl({ [pageKey]: undefined, [globalFilterKey]: next || undefined })
  }, [globalFilter, updateUrl, globalFilterKey, pageKey])

  const ensurePageInRange = useCallback((pageCount: number) => {
    if (pageCount > 0 && (pagination.pageIndex + 1) > pageCount) {
      updateUrl({ [pageKey]: String(pageCount) })
    }
  }, [pagination.pageIndex, updateUrl, pageKey])

  return {
    pagination,
    onPaginationChange,
    columnFilters,
    onColumnFiltersChange,
    globalFilter,
    onGlobalFilterChange,
    ensurePageInRange,
  }
}
