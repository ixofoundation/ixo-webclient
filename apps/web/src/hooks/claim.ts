import { useTheme } from 'styled-components'

export function useClaimSetting() {
  const theme: any = useTheme()

  return {
    saved: {
      text: 'Saved',
      color: theme.ixoNewBlue,
    },
    pending: {
      text: 'Pending',
      color: theme.ixoOrange,
    },
    rejected: {
      text: 'Rejected',
      color: theme.ixoRed,
    },
    approved: {
      text: 'Approved',
      color: theme.ixoGreen,
    },
    disputed: {
      text: 'Disputed',
      color: theme.ixoYellow,
    },
  }
}
