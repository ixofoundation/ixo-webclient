export type FormData = {
  [id: string]: string
}

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
  values?: any[]
  itemValues?: any[]
  itemLabels?: string[]
  itemImages?: string[]
  minItems?: number
  maxItems?: number
  initialValue?: string
}
