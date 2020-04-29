export interface Schema {
  ['@context']: string
  ['@type']: string
  ddoTags: SchemaCategory[]
  view: SchemaCategory
  dateCreated: SchemaDate
}

export interface SchemaCategory {
  ['@type']: string
  name: string
  tags: SchemaCategoryTag[]
  selectedTags?: string[]
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
