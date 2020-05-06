import React from 'react'
import { SchemaShield } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import PerformanceIcon from '../../../../assets/icons/Performance'

interface Props {
  entityDid: string
  title: string
  shields: SchemaShield[]
}

const Performance: React.FunctionComponent<Props> = ({
  entityDid,
  title,
  shields,
}) => {
  return (
    <ControlPanelSection key={title}>
      <h4>
        <div className="heading-icon">
          <PerformanceIcon />
        </div>
      </h4>
      {title}
      {shields.map(shield => {
        const shieldUrl = encodeURIComponent(
          `${process.env.REACT_APP_BLOCK_SYNC_URL}/api/project/shields/${shield.field}/${entityDid}`,
        )
        return (
          <img
            key={shield.field}
            src={`https://img.shields.io/endpoint?url=${shieldUrl}`}
          />
        )
      })}
    </ControlPanelSection>
  )
}

export default Performance
