export interface Schema {
  ['@context']: string
  ['@type']: string
  header: SchemaHeader
}

export interface SchemaHeader {
  ['@type']: string
  color: string
  image: string
  title: string
  subTitle: string
  indicators: SchemaIndicator[]
}

export interface SchemaIndicator {
  ['@type']: string
  indicatorLabel: string
  indicatorSource: string
}
