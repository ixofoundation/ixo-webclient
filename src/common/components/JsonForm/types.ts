export interface FormControl {
  id: string
  title: string
  description: string
  required: boolean
  inline?: boolean
  type: string
  label: string
  control: string
  placeholder?: string
  itemIds?: string[]
  itemLabels?: string[]
  itemImages?: string[]
  minItems?: number
  maxItems?: number
}
