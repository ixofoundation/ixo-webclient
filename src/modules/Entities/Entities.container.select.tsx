import React, { Dispatch } from 'react'
import { match } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeEntitiesTypeAndFilter } from './Entities.actions'
import { EntityType, Filter } from './types'
import { toTitleCase } from '../../common/utils/formatters'

interface Props {
  match: match
  handleChangeEntitiesTypeAndFilter: (
    entityType: EntityType,
    filter: Filter,
  ) => void
}

const EntitiesSelect: React.FunctionComponent<Props> = ({
  match: { params },
  handleChangeEntitiesTypeAndFilter,
}) => {
  handleChangeEntitiesTypeAndFilter(toTitleCase(params['type']) as EntityType, {
    dateFrom: null,
    dateTo: null,
    categories: JSON.parse(params['categories']),
    userEntities: false,
    featuredEntities: true,
    popularEntities: false,
  })

  return <Redirect to="/" />
}

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleChangeEntitiesTypeAndFilter: (
    entityType: EntityType,
    filter: Filter,
  ): void => dispatch(changeEntitiesTypeAndFilter(entityType, filter)),
})

export const EntitiesSelectConnected = connect(
  null,
  mapDispatchToProps,
)(EntitiesSelect)
