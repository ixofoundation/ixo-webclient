import { ixo } from '@ixo/impactxclient-sdk'
import { useTheme } from 'styled-components'

export function useClaimSetting() {
  const theme: any = useTheme()

  return {
    [ixo.claims.v1beta1.EvaluationStatus.PENDING]: {
      text: 'Pending',
      color: theme.ixoOrange,
    },
    [ixo.claims.v1beta1.EvaluationStatus.REJECTED]: {
      text: 'Rejected',
      color: theme.ixoRed,
    },
    [ixo.claims.v1beta1.EvaluationStatus.APPROVED]: {
      text: 'Approved',
      color: theme.ixoGreen,
    },
    [ixo.claims.v1beta1.EvaluationStatus.DISPUTED]: {
      text: 'Disputed',
      color: theme.ixoYellow,
    },
    [4]: {
      text: 'Saved',
      color: theme.ixoNewBlue,
    },
  }
}
