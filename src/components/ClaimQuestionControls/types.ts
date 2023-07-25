export interface TClaimQuestionControlProps {
  id: string
  value: string | number
  placeholder: string
  onChange: (value: string | number) => void

  scale?: number //  rating
}
