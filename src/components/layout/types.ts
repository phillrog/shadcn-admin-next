export type User = {
  name: string
  email: string
  avatar: string
}

export type NavLink = {
  title: string
  url: string
  href?: string
  icon?: React.ComponentType
  badge?: string
}

export type NavCollapsible = {
  title: string
  url?: string // Tornando opcional
  icon?: React.ComponentType
  badge?: string
  items: NavLink[]
}

export type NavItem = NavLink | NavCollapsible

export type NavGroup = {
  title: string
  items: NavItem[]
}

export type SidebarData = {
  user: User
  teams: {
    name: string
    logo: React.ComponentType
    plan: string
  }[]
  navGroups: NavGroup[]
}
