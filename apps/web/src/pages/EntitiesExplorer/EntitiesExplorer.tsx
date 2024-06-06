import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import {
  filterCategories,
  filterSector,
  changeEntitiesType,
  resetSectorFilter,
} from 'redux/entitiesExplorer/entitiesExplorer.actions'
import { EntityType, EntityTypeStrategyMap, TEntityDDOTagModel } from 'types/entities'
import * as entitiesUtils from 'utils/entities'
import queryString from 'query-string'
import { ErrorContainer } from './EntitiesExplorer.container.styles'
import { RootState } from 'redux/store'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { Navigate } from 'react-router-dom'
import { useIxoConfigs } from 'hooks/configs'

interface Props {
  location: any
  entityTypeMap: EntityTypeStrategyMap
  handleChangeEntitiesType: (entityType: EntityType) => void
  handleFilterCategories: (categories: TEntityDDOTagModel[]) => void
  handleFilterSector: (tag: string) => void
  handleResetSectorFilter: () => void
}

const EntitiesSelect: React.FunctionComponent<Props> = ({
  location: { search },
  entityTypeMap,
  handleChangeEntitiesType,
  handleFilterCategories,
  handleFilterSector,
  handleResetSectorFilter,
}) => {
  const params = queryString.parse(search)
  const entityTypes = Object.values(EntityType)
  const { entityConfig } = useIxoConfigs()


  if (entityTypes.find((e) => e === params.type)) {
    const entityType = params.type as EntityType

    handleChangeEntitiesType(entityType)
    // "type" must be set and valid in order for any filters to be able to be applied
    if (params.categories) {
      const categoriesFromParams = JSON.parse(params.categories as string)
      const remainingCategories = entitiesUtils
        .getInitialSelectedCategories(entityTypeMap[entityType])
        .filter((c) => !categoriesFromParams.map((c: any) => c.name).includes(c.category))
      const categories = [...categoriesFromParams, ...remainingCategories]

      handleFilterCategories(categories)
    }

    if (params.sector) {
      if (params.sector === 'all') {
        handleResetSectorFilter()
      } else {
        handleFilterSector(params.sector as string)
      }
    }

    // Other filters can be handled here in the future
  } else {
    return (
      <ErrorContainer>
        Error: expected &quot;type&quot; parameter of one of the following&nbsp;
        {entityTypes.map((e) => (
          <strong key={e}>&nbsp;{e},</strong>
        ))}
      </ErrorContainer>
    )
  }

  return <Navigate to={`/explore?type=${entityConfig?.UI?.explorer?.defaultView}`} />
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  entityTypeMap: selectEntityConfig(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleChangeEntitiesType: (entityType: EntityType): void => dispatch(changeEntitiesType(entityType)),
  handleFilterCategories: (categories: TEntityDDOTagModel[]): void => dispatch(filterCategories(categories)),
  handleFilterSector: (tag: string): void => dispatch(filterSector(tag)),
  handleResetSectorFilter: (): void => dispatch(resetSectorFilter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesSelect)
