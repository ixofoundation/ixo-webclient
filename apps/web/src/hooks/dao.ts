import { MarketingInfoResponse, TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import { Config as Cw20StakeConfig } from '@ixo/impactxclient-sdk/types/codegen/Cw20Stake.types'
import { useMemo } from 'react'
import { selectDAOEntities } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { Member } from 'types/dao'
import { TEntityModel, TDAOGroupModel } from 'types/entities'

//
export function useDAO() {
  const daos: TEntityModel[] = useAppSelector(selectDAOEntities)
  const daoGroups = useMemo(() => {
    return daos.reduce((prev, cur) => [...prev, ...Object.values(cur.daoGroups ?? {})], [] as TDAOGroupModel[])
  }, [daos])

  const getParentDAOs = (daoId: string): TEntityModel[] => {
    const dao: TEntityModel | undefined = daos.find(({ id }) => id === daoId)
    if (dao) {
      const { accounts } = dao
      const adminAccountAddress = accounts.find(({ name }) => name === 'admin')?.address
      if (adminAccountAddress) {
        return (
          daos.filter(({ daoGroups = {} }) =>
            Object.values(daoGroups).some((daoGroup: TDAOGroupModel) =>
              daoGroup.votingModule.members.some((member: Member) => member.addr === adminAccountAddress),
            ),
          ) ?? []
        )
      }
    }
    return []
  }

  const getTokenInfo = (
    daoId: string,
    groupAddress: string,
  ):
    | {
        config: Cw20StakeConfig
        tokenInfo: TokenInfoResponse
        marketingInfo: MarketingInfoResponse
      }
    | undefined => {
    const dao = daos.find(({ id }) => id === daoId)
    if (dao) {
      const { daoGroups } = dao
      const daoGroup = daoGroups![groupAddress]
      if (daoGroup) {
        return daoGroup.token
      }
    }
    return undefined
  }

  return {
    daos,
    daoGroups,
    getParentDAOs,
    getTokenInfo,
  }
}

export function useParticipatingDAO(address: string) {
  const daos: TEntityModel[] = useAppSelector(selectDAOEntities)

  const participatingDAOEntities: TEntityModel[] = daos.filter((dao) =>
    Object.values(dao.daoGroups ?? {}).find((daoGroup) =>
      daoGroup.votingModule.members.some(({ addr, weight }) => addr === address && weight > 0),
    ),
  )

  const participatingDAOGroups = useMemo(() => {
    const daoGroups: TDAOGroupModel[] = []

    participatingDAOEntities.forEach((dao) =>
      Object.values(dao.daoGroups ?? {}).forEach((daoGroup) => {
        if (daoGroup.votingModule.members.some(({ addr, weight }) => addr === address && weight > 0)) {
          daoGroups.push(daoGroup)
        }
      }),
    )
    return daoGroups
  }, [address, participatingDAOEntities])

  return { participatingDAOEntities, participatingDAOGroups }
}

export function useGetDAOByGroupAddress(groupAddress: string) {
  const daos: TEntityModel[] = useAppSelector(selectDAOEntities)
  return daos.find((dao) => (dao.daoGroups ?? {})[groupAddress])
}
