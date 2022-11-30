export enum ActionType {
  Join = 'Join',
  Help = 'Help',
  OracleService = 'OracleService',
  Rate = 'Rate',
  Fuel = 'Fuel',
}

export enum AppType {
  RiotChat = 'RiotChat',
}

export enum ConnectionType {
  Mobile = 'Mobile',
  Share = 'Share',
  Forum = 'Forum',
  External = 'External',
}

// we can add enums for the other widget types if/when the section will contain more than 1 type

export interface Parameter {
  name: string
  value: string
}

export interface Permission {
  credential: string
  role: string
}

export interface Control {
  ['@type']: string
  ['@id']: string
  title: string
  tooltip: string
  icon: string
  iconColor: string
  endpoint: string
  accessToken: string
  data: string
  permissions: Permission[]
  parameters: Parameter[]
}

export interface Widget {
  ['@type']: string
  title: string
  controls: Control[]
}

export interface Schema {
  ['@context']: string
  ['@type']: string
  dashboard: Widget
  actions: Widget
  apps: Widget
  connections: Widget
}
