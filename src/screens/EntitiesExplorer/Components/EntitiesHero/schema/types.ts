export interface SchemaBase {
  ['@context']: string
  ['@type']: string
  color: string
  image: string
  title: string
  subTitle: string
  indicators: SchemaIndicator[]
}

export interface Schema extends SchemaBase {
  overrides: SchemaOverride[]
}

export interface SchemaOverride extends SchemaBase {
  id: string
  ddoSector: string
  ddoTag: string
}

export interface SchemaIndicator {
  ['@type']: string
  indicatorLabel: string
  indicatorSource: string
}
