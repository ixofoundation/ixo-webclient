import { TEntityModel } from 'types/entities'

export function withEntityData(Component: React.ComponentType<any>) {
  const WrappedComponent = (entity: TEntityModel): JSX.Element => {
    // Transform the entity data based on its type or any other criteria
    const transformedData = transformEntityData(entity)

    // Pass the transformed data as props to the actual entity card component
    return <Component {...transformedData} />
  }

  WrappedComponent.displayName = `WithEntityData(${getDisplayName(Component)})`

  return WrappedComponent
}

export function transformEntityData(entity: TEntityModel): any {
  // Here, you can add logic to transform the entity data based on its type or any other criteria
  // For demonstration purposes, I'm returning the entity as is
  return {
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
    tags: [],
    type: '',
    assetNumber: '',
    maxSupply: 0,
  }
}

function getDisplayName(WrappedComponent: React.ComponentType<any>): string {
  return WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
}
