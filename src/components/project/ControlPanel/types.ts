export enum AppWidgetType {
  RiotChat = 'RiotChat',
}

export enum ConnectionWidgetType {
  QRCodeConnection = 'QRCodeConnection',
  ShareConnection = 'ShareConnection',
  ForumConnection = 'ForumConnection',
}
// we can add enums for the other widget types if/when the section will contain more than 1 type

export interface SchemaShield {
  ['@type']: string
  field: string
}

export interface SchemaAction {
  ['@type']: string
  title: string
  icon: string
  iconColor: string
  intent: string
}

export interface SchemaApp {
  ['@type']: string
  title: string
  description: string
}

export interface SchemaConnection {
  ['@type']: string
  title: string
  description: string
}

export interface PerformanceWidgets {
  title: string
  shields: SchemaShield[]
}

export interface ActionWidgets {
  title: string
  actions: SchemaAction[]
}

export interface ConnectionWidgets {
  title: string
  connections: SchemaConnection[]
}

export interface AppWidgets {
  title: string
  apps: SchemaApp[]
}

export interface Schema {
  ['@context']: string
  ['@type']: string
  performanceWidgets: PerformanceWidgets
  actionWidgets: SchemaAction[]
  appWidgets: SchemaApp[]
  connectionWidgets: ConnectionWidgets
}
