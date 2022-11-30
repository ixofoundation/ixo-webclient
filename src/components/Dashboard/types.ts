export interface Path {
  url: string
  icon: string
  sdg: string // Used for breadcrumb
  tooltip: string // Used for sidebar
  strict?: boolean
  disable?: boolean
}

export interface HeaderTab {
  iconClass: string
  linkClass: string
  path: string
  title: string
}
