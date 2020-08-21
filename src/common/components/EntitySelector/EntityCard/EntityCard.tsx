import React from 'react'
import { Entity } from '../types'
import { EntityCardWrapper } from './EntityCard.styles'
import Eye from 'assets/icons/Eye'

interface Props {
  entity: Entity
  isSelected: boolean
  showImage: boolean
}

const EntityCard: React.FunctionComponent<Props> = ({
  entity,
  isSelected,
  showImage,
}) => {
  const { title, dateCreated, imageUrl, previewUrl } = entity

  return (
    <EntityCardWrapper className={isSelected ? 'selected' : null}>
      {showImage && (
        <div className="image">
          <img src={imageUrl} alt={title} width="100%" />
        </div>
      )}
      <div className="info">
        <h4>{title}</h4>
        <div className="row">
          <div className="date col-sm-6">Created {dateCreated}</div>
          <div className="link col-sm-6 text-right">
            <a href={previewUrl} target="_blank">
              <Eye fill="#39c3e6" width="30" />
            </a>
          </div>
        </div>
      </div>
    </EntityCardWrapper>
  )
}

export default EntityCard
