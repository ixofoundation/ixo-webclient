import { MarketingInfoResponse, TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import { Config as Cw20StakeConfig } from '@ixo/impactxclient-sdk/types/codegen/Cw20Stake.types'
import { selectDAOEntities } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { Member } from 'types/dao'
import { TEntityModel, TDAOGroupModel } from 'types/entities'

//
export function useDAO() {
  const daos: TEntityModel[] = useAppSelector(selectDAOEntities)

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
    getParentDAOs,
    getTokenInfo,
  }
}
