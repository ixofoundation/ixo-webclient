import { gql, useQuery } from '@apollo/client'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { GetGranteeRole } from 'lib/protocol'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IAgent } from 'types/agent'
import { AgentRoles } from 'types/models'
import { useGetClaimCollectionsByEntityId } from './claims'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

// GET_USER_IIDS
const GET_USER_IIDS = gql`
  query GetUserIids {
    iids(filter: { alsoKnownAs: { equalTo: "" } }) {
      nodes {
        id
        service
        linkedClaim
        linkedEntity
        linkedResource
        verificationMethod
        nodeId
        metadata
        keyAgreement
        controller
        context
        capabilityInvocation
        capabilityDelegation
        authentication
        assertionMethod
        alsoKnownAs
        accordedRight
      }
    }
  }
`
export function useGetUserIids() {
  const { loading, error, data, refetch } = useQuery(GET_USER_IIDS, {
    pollInterval: 1000 * 5,
  })

  return { loading, error, data: (data?.iids?.nodes ?? []) as IidDocument[], refetch }
}

export function useGetJoiningAgentsByCollectionId(collectionId: string, entityId: string) {
  const { accounts } = useAppSelector(getEntityById(entityId))
  const adminAddress = accounts?.find((account) => account.name === 'admin')?.address || ''

  const { data: users } = useGetUserIids()
  const [pendingAgents, setPendingAgents] = useState<IAgent[]>([])
  const [approvedAgents, setApprovedAgents] = useState<IAgent[]>([])

  const agents = useMemo(
    () =>
      users.filter((user: any) =>
        user.linkedResource.some(
          (item: any) =>
            item.id === `{id}#offer#${collectionId}` &&
            item.type === 'DeedOffer' &&
            item.description.split('#')[0] === collectionId,
        ),
      ),
    [collectionId, users],
  )

  const getAgentsRole = useCallback(async () => {
    const joiningAgents: IAgent[] = agents
      .map((agent: any) => ({
        address:
          agent.verificationMethod.find((vm: any) => vm.type === 'CosmosAccountAddress')?.blockchainAccountID || '',
        role:
          agent.linkedResource
            .find(
              (item: any) =>
                item.id === `{id}#offer#${collectionId}` &&
                item.type === 'DeedOffer' &&
                item.description.split('#')[0] === collectionId,
            )
            ?.description.split('#')[1] ?? AgentRoles.serviceProviders,
      }))
      .filter(Boolean)

    const pendingAgents: IAgent[] = []
    const approvedAgents: IAgent[] = []
    for (const agent of joiningAgents) {
      try {
        const { submitAuth, evaluateAuth } = await GetGranteeRole({
          granteeAddress: agent.address,
          adminAddress,
          collectionId,
        })
        if (submitAuth || evaluateAuth) {
          approvedAgents.push(agent)
        } else {
          pendingAgents.push(agent)
        }
      } catch (e) {
        console.error(e)
      }
    }
    setPendingAgents(pendingAgents)
    setApprovedAgents(approvedAgents)
  }, [adminAddress, agents, collectionId])

  useEffect(() => {
    getAgentsRole()
    const interval = setInterval(() => {
      getAgentsRole()
    }, 5 * 1000)

    return () => {
      setPendingAgents([])
      setApprovedAgents([])
      clearInterval(interval)
    }
  }, [getAgentsRole])

  return { agents, pendingAgents, approvedAgents }
}

export function useGetJoiningAgentsByEntityId(entityId: string) {
  const { data: claimCollections } = useGetClaimCollectionsByEntityId(entityId)
  const claimCollectionIds = useMemo(() => claimCollections.map((v) => v.id), [claimCollections])
  const { accounts } = useAppSelector(getEntityById(entityId))
  const adminAddress = useCurrentEntityAdminAccount(accounts)
  const { data: users } = useGetUserIids()
  const [pendingAgents, setPendingAgents] = useState<IAgent[]>([])
  const [approvedAgents, setApprovedAgents] = useState<IAgent[]>([])

  const agents = useMemo(() => {
    return users.filter((user: any) =>
      user.linkedResource.some(
        (item: any) =>
          claimCollectionIds.some((id) => item.id === `{id}#offer#${id}`) &&
          item.type === 'DeedOffer' &&
          claimCollectionIds.some((id) => item.description.split('#')[0] === id),
      ),
    )
  }, [claimCollectionIds, users])

  const getAgentsRole = useCallback(async () => {
    const joiningAgents: IAgent[] = agents
      .map((agent: any) => ({
        address:
          agent.verificationMethod.find((vm: any) => vm.type === 'CosmosAccountAddress')?.blockchainAccountID || '',
        role:
          agent.linkedResource
            .find(
              (item: any) =>
                claimCollectionIds.some((id) => item.id === `{id}#offer#${id}`) &&
                item.type === 'DeedOffer' &&
                claimCollectionIds.some((id) => item.description.split('#')[0] === id),
            )
            ?.description.split('#')[1] ?? AgentRoles.serviceProviders,
        collectionId: agent.linkedResource
          .find(
            (item: any) =>
              claimCollectionIds.some((id) => item.id === `{id}#offer#${id}`) &&
              item.type === 'DeedOffer' &&
              claimCollectionIds.some((id) => item.description.split('#')[0] === id),
          )
          ?.id?.replace('{id}#offer#', ''),
      }))
      .filter(Boolean)

    const pendingAgents: IAgent[] = []
    const approvedAgents: IAgent[] = []
    for (const agent of joiningAgents) {
      try {
        const { submitAuth, evaluateAuth } = await GetGranteeRole({
          granteeAddress: agent.address,
          adminAddress,
          collectionId: agent.collectionId,
        })
        if (submitAuth || evaluateAuth) {
          approvedAgents.push(agent)
        } else {
          pendingAgents.push(agent)
        }
      } catch (e) {
        console.error(e)
      }
    }
    setPendingAgents(pendingAgents)
    setApprovedAgents(approvedAgents)
  }, [adminAddress, agents, claimCollectionIds])

  useEffect(() => {
    getAgentsRole()
    const interval = setInterval(() => {
      getAgentsRole()
    }, 5 * 1000)

    return () => {
      setPendingAgents([])
      setApprovedAgents([])
      clearInterval(interval)
    }
  }, [getAgentsRole])

  return { agents, pendingAgents, approvedAgents }
}

// GET_IID
const GET_IID = gql`
  query GetIid($id: String!) {
    iid(id: $id) {
      linkedEntity
      id
      linkedResource
      verificationMethod
      service
      nodeId
      metadata
      linkedClaim
      keyAgreement
      controller
      context
      capabilityInvocation
      capabilityDelegation
      authentication
      assertionMethod
      alsoKnownAs
      accordedRight
    }
  }
`
export function useGetIid(id: string) {
  const { loading, error, data, refetch } = useQuery(GET_IID, {
    variables: { id },
    skip: !id,
    pollInterval: 1000 * 5,
  })

  return { loading, error, data: data?.iid as IidDocument, refetch }
}
