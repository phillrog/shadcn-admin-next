import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('sat_token')?.value
  const { pathname } = request.nextUrl

  const isAuthRoute = 
    pathname.startsWith('/sign-in') || 
    pathname.startsWith('/sign-up') || 
    pathname.startsWith('/forgot-password') || 
    pathname.startsWith('/otp')

  // Se NÃO tem token e NÃO está em uma rota de auth, redireciona para sign-in
  if (!token && !isAuthRoute) {
    const url = new URL('/sign-in', request.url)
    if (pathname !== '/') {
        url.searchParams.set('redirect', pathname)
    }
    return NextResponse.redirect(url)
  }

  // Se TEM token e está em uma rota de auth, redireciona para o dashboard
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
