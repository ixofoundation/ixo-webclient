import questions from './question_types.json'
import { Attestation } from './types'
import { v4 as uuidv4 } from 'uuid'

export const createAttestation = (type: string): Attestation => {
  const questionDetails = questions.questions.find(
    item => item.control === type,
  )

  return {
    id: uuidv4(),
    required: false,
    description: '',
    label: '',
    type: type,
    ...questionDetails,
  }
}
