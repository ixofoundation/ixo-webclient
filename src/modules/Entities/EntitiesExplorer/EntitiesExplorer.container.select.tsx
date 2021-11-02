import React, { Dispatch } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  filterCategories,
  filterSector,
  changeEntitiesType,
  resetSectorFilter,
} from './EntitiesExplorer.actions'
import { EntityType, EntityTypeStrategyMap } from '../types'
import { DDOTagCategory } from './types'
import * as entitiesUtils from '../Entities.utils'
import * as queryString from 'query-string'
import { ErrorContainer } from './EntitiesExplorer.container.styles'
import { RootState } from 'common/redux/types'
import { selectEntityConfig } from './EntitiesExplorer.selectors'

interface Props {
  location: any
  entityTypeMap: EntityTypeStrategyMap
  handleChangeEntitiesType: (entityType: EntityType) => void
  handleFilterCategories: (categories: DDOTagCategory[]) => void
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

  if (entityTypes.find((e) => e === params.type)) {
    const entityType = params.type as EntityType

    handleChangeEntitiesType(entityType)
    // "type" must be set and valid in order for any filters to be able to be applied
    if (params.categories) {
      const categoriesFromParams = JSON.parse(params.categories as string)
      const remainingCategories = entitiesUtils
        .getInitialSelectedCategories(entityTypeMap[entityType])
        .filter(
          (c) => !categoriesFromParams.map((c) => c.name).includes(c.name),
        )
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

  return <Redirect to="/" />
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  entityTypeMap: selectEntityConfig(state),
})


const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleChangeEntitiesType: (entityType: EntityType): void =>
    dispatch(changeEntitiesType(entityType)),
  handleFilterCategories: (categories: DDOTagCategory[]): void =>
    dispatch(filterCategories(categories)),
  handleFilterSector: (tag: string): void => dispatch(filterSector(tag)),
  handleResetSectorFilter: (): void => dispatch(resetSectorFilter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesSelect)
