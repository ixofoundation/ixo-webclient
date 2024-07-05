import { useWallet } from '@ixo-webclient/wallet-connector'
import { ixo } from '@ixo/impactxclient-sdk'
import { EntityAccount } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/entity'
import { VerificationMethod } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { GetGranteeRole } from 'lib/protocol'
import { useEffect, useState } from 'react'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import { AgentRoles } from 'types/models'
import { useCurrentEntityAdminAccount } from './currentEntity'

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

export function useGetUserGranteeRole(
  userAddress: string,
  entityOwnerAddress: string,
  accounts: EntityAccount[],
  verificationMethod: VerificationMethod[],
  collectionId?: string,
) {
  const adminAddress = useCurrentEntityAdminAccount(accounts)
  const [role, setRole] = useState<AgentRoles | undefined>(undefined)

  useEffect(() => {
    if (userAddress && adminAddress) {
      ;(async () => {
        const { submitAuth, evaluateAuth } = await GetGranteeRole({
          granteeAddress: userAddress,
          adminAddress,
          collectionId,
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
  }, [userAddress, adminAddress, collectionId])

  if (userAddress === entityOwnerAddress) {
    return AgentRoles.owners
  }

  if (verificationMethod.some((verification) => verification?.blockchainAccountID === userAddress)) {
    return AgentRoles.owners
  }

  return role
}

/**
 *
 * @param Props  collectionId, entityId
 * @returns  boolean
 *
 * This hook is used to check if the current user is the owner of the entity.
 */
export function useIsEntityOwner({ collectionId, entityId }: { collectionId: string; entityId: string }) {
  const { wallet } = useWallet()
  const { owner, accounts, verificationMethod } = useAppSelector(getEntityById(entityId))
  const userRole = useGetUserGranteeRole(wallet?.address ?? '', owner, accounts, verificationMethod, collectionId)

  return userRole === AgentRoles.owners
}
