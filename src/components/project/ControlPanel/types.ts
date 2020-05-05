export interface SchemaShield {
  ['@type']: string
  field: string
}

export interface SchemaActionTrigger {
  ['@type']: string
  title: string
  icon: string
  iconColor: string
  intent: string
}

export interface Schema {
  ['@context']: string
  ['@type']: string
  performance: SchemaShield[]
  actions: SchemaActionTrigger
}
