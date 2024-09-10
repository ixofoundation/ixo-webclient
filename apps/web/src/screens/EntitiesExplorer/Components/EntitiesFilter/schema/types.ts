export interface Schema {
  ['@context']: string
  ['@type']: string
  ddoTags: SchemaCategory[]
  view: SchemaCategory
  sector: SchemaCategory
  dateCreated: SchemaDate
}

export interface SchemaCategory {
  ['@type']: string
  name: string
  multiSelect: boolean
  tags: SchemaCategoryTag[]
  selectedTags?: string[]
  hidden: boolean
}

export interface SchemaCategoryTag {
  ['@type']: string
  name: string
  icon: string
  color?: string
}

export interface SchemaDate {
  ['@type']: string
  name: string
}
