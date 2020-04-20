export interface SchemaType {
  ['@context']: string
  ['@type']: string
  categories: Category[]
}

interface Category {
  ['@type']: string
  name: string
  tags: Tag[]
  selectedTags?: string[]
}

interface Tag {
  ['@type']: string
  name: string
  icon: string
  color?: string
}
