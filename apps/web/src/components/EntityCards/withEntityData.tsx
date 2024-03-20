import { isPlainObject } from 'lodash'
import { TEntityClaimModel, TEntityModel } from 'types/entities'
import { isExpired } from 'utils/time'

export function withEntityData(Component: React.ComponentType<any>) {
  const WrappedComponent = ({entity, loading}: {entity: TEntityModel, loading?: boolean}): JSX.Element => {
    // Transform the entity data based on its type or any other criteria
    const transformedData = transformEntityData(entity)

    // Pass the transformed data as props to the actual entity card component
    return <Component {...transformedData} loading={loading}/>
  }

  WrappedComponent.displayName = `WithEntityData(${getDisplayName(Component)})`

  return WrappedComponent
}

export function transformEntityData(entity: TEntityModel): any {
  if (entity.type === 'dao') {
    const daoGroupsArr = Object.values(entity.daoGroups ?? {})

    const { members, proposals, activeProposals } = daoGroupsArr.reduce(
      (acc, cur) => {
        // Add to the members count
        acc.members += cur.votingModule.members.length

        // Add to the proposals count
        acc.proposals += cur.proposalModule.proposals.length

        // Add to the active proposals count
        acc.activeProposals += cur.proposalModule.proposals.filter((proposal) =>
          isExpired(proposal.proposal.expiration),
        ).length

        return acc
      },
      { members: 0, proposals: 0, activeProposals: 0 },
    )

    let daoTypeTags: any = []
    let stageTag = 'TBA'

    if (Array.isArray(entity.tags)) {
      daoTypeTags = entity.tags?.find(({ category }: any) => category === 'DAO Type') ?? []
      stageTag = entity.tags?.find(({ category }: any) => category === 'Stage')?.tags[0] ?? 'TBA'
    }
    if (isPlainObject(entity?.tags)) {
      const tags = Object.values(entity.tags as any) as any

      daoTypeTags = tags?.find(({ category }: any) => category === 'DAO Type') ?? []
      stageTag = tags?.find(({ category }: any) => category === 'Stage')?.tags[0] ?? 'TBA'
    }

    return {
      ...entity,
      id: entity.id,
      collectionName: entity.profile?.name,
      cardImage: entity.profile?.image,
      metrics: {
        members,
        proposals,
        activeProposals,
      },
      creator: entity.creator?.displayName,
      animation: entity.zlottie,
      title: entity.profile?.brand,
      logo: entity.profile?.logo,
      assetNumber: '',
      maxSupply: 0,
      tags: {
        stage: stageTag,
        daoTypeTags,
      },
    }
  }

  if (entity.type === 'project') {
    const headlineMetric: TEntityClaimModel | undefined = Object.values(entity.claim ?? {}).find(
      (v) => v.isHeadlineMetric,
    )
    return {
      ...entity,
      id: entity.id,
      collectionName: entity.profile?.name,
      cardImage: entity.profile?.image,
      metrics: {
        title: headlineMetric?.template?.title ?? 'Metric',
        nominator: 0,
        denominator: 0,
      },
      creator: entity.creator?.displayName,
      animation: entity.zlottie,
      title: entity.profile?.brand,
      logo: entity.profile?.logo,
      tags: entity.tags?.slice(0, 2),
      type: '',
      assetNumber: '',
      maxSupply: 0,
    }
  }

  return {
    ...entity,
    id: entity.id,
    collectionName: entity.profile?.name,
    cardImage: entity.profile?.image,
    metrics: {
      members: 120,
      proposals: 1500,
      activeProposals: 3000,
    },
    creator: entity.creator?.displayName,
    animation: entity.zlottie,
    title: entity.profile?.brand,
    logo: entity.profile?.logo,
    tags: entity.tags?.slice(0, 2),
    type: entity.type,
    assetNumber: '',
    maxSupply: 0,
  }
}

function getDisplayName(WrappedComponent: React.ComponentType<any>): string {
  return WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
}
