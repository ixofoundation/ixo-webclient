export enum AppType {
  RiotChat = 'RiotChat',
}

export enum ConnectionType {
  Mobile = 'Mobile',
  Share = 'Share',
  Forum = 'Forum',
}
// we can add enums for the other widget types if/when the section will contain more than 1 type

export interface Params {
  name: string
  value: string
}

export interface ShieldSettings {
  ['@type']: string
  field: string
}

export interface ActionSettings {
  ['@type']: string
  title: string
  icon: string
  iconColor: string
  intent: string
}

export interface AppSettings {
  ['@type']: string
  title: string
  description: string
  backgroundColor: string
}

export interface ConnectionSettings {
  ['@type']: string
  title: string
  description: string
  params: Params[]
}

export interface PerformanceSection {
  title: string
  shields: ShieldSettings[]
}

export interface ActionsSection {
  title: string
  actions: ActionSettings[]
}

export interface ConnectionsSection {
  title: string
  connections: ConnectionSettings[]
}

export interface AppsSection {
  title: string
  apps: AppSettings[]
}

export interface Schema {
  ['@context']: string
  ['@type']: string
  performanceSection: PerformanceSection
  actionsSection: ActionsSection
  appsSection: AppsSection
  connectionsSection: ConnectionsSection
}
