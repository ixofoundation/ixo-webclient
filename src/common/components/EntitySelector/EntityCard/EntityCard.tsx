import React from 'react'
import { Entity } from '../types'
import { EntityCardWrapper, EntityTitle } from './EntityCard.styles'
import Eye from 'assets/icons/Eye'
import { Link } from 'react-router-dom'

interface Props {
  entity: Entity
  isSelected: boolean
}

const EntityCard: React.FunctionComponent<Props> = ({ entity, isSelected }) => {
  // const { title, dateCreated, imageUrl } = entity

  return (
    <>
      {entity && (
        <EntityCardWrapper className={isSelected ? 'selected' : undefined}>
          {entity.imageUrl && (
            <div className='image'>
              <img src={entity.imageUrl} alt={entity.title} width='100%' />
            </div>
          )}
          <div className='info'>
            <EntityTitle>{entity.title}</EntityTitle>
            <div className='row mt-2'>
              <div className='date col-sm-6'>Created {entity.dateCreated}</div>
              <div className='link col-sm-6 text-right' style={{ height: 0 }}>
                <Link to={`/projects/${entity.did}/overview`} target='_blank'>
                  <Eye width='30' />
                </Link>
              </div>
            </div>
          </div>
        </EntityCardWrapper>
      )}
    </>
  )
}

export default EntityCard
