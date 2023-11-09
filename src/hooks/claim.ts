import { ixo } from '@ixo/impactxclient-sdk'
import { useTheme } from 'styled-components'
import { useAccount } from './account'
import useCurrentEntity, { useCurrentEntityAdminAccount } from './currentEntity'
import { AgentRoles } from 'types/models'
import { useEffect, useState } from 'react'
import { GetGranteeRole } from 'lib/protocol'

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

export function useGetUserGranteeRole(userAddress?: string) {
  const { address } = useAccount()
  const adminAddress = useCurrentEntityAdminAccount()
  const { owner } = useCurrentEntity()
  const [role, setRole] = useState<AgentRoles | undefined>(undefined)

  useEffect(() => {
    if ((userAddress ?? address) && adminAddress) {
      ;(async () => {
        const { submitAuth, evaluateAuth } = await GetGranteeRole({
          granteeAddress: userAddress ?? address,
          adminAddress,
        })
        if (submitAuth) {
          setRole(AgentRoles.serviceProviders)
        } else if (evaluateAuth) {
          setRole(AgentRoles.evaluators)
        }
      })()
    }
    return () => {
      setRole(undefined)
    }
  }, [userAddress, address, adminAddress])

  if ((userAddress ?? address) === owner) {
    return AgentRoles.owners
  }

  return role
}
