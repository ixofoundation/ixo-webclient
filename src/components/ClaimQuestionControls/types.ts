export interface TClaimQuestionControlProps {
  id: string
  value: string | number | boolean
  placeholder: string
  onChange: (value: string | number | boolean) => void

  scale?: number //  rating
  itemValues?: string[] // checkboxes
  minItems?: number // checkboxes
  maxItems?: number // checkboxes
}
