import { ixo } from '@ixo/impactxclient-sdk'
import { useTheme } from 'styled-components'
import { useCurrentEntityAdminAccount } from './currentEntity'
import { AgentRoles } from 'types/models'
import { useEffect, useState } from 'react'
import { GetGranteeRole } from 'lib/protocol'
import { EntityAccount } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/entity'
import { VerificationMethod } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'

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
    [ixo.claims.v1beta1.EvaluationStatus.UNRECOGNIZED]: {
      text: 'Remaining',
      color: theme.ixoDarkestBlue,
    },
    [4]: {
      text: 'Saved',
      color: theme.ixoNewBlue,
    },
  }
}

export function useGetUserGranteeRole(userAddress: string, entityOwnerAddress: string, accounts: EntityAccount[], verificationMethod: VerificationMethod[]) {
  const adminAddress = useCurrentEntityAdminAccount(accounts)
  const [role, setRole] = useState<AgentRoles | undefined>(undefined)

  useEffect(() => {
    if ((userAddress) && adminAddress) {
      ;(async () => {
        const { submitAuth, evaluateAuth } = await GetGranteeRole({
          granteeAddress: userAddress,
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
  }, [userAddress, adminAddress])

  if ((userAddress) === entityOwnerAddress) {
    return AgentRoles.owners
  }

  if(verificationMethod.some((verification) => verification?.blockchainAccountID === userAddress)){
    return AgentRoles.owners
  }

  return role
}
