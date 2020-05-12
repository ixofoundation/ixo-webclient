import React from 'react'
import { PerformanceSection } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import PerformanceIcon from '../../../../assets/icons/Performance'
import Shield from './Shield/Shield'

interface Props {
  entityDid: string
  performanceSection: PerformanceSection
}

const Performance: React.FunctionComponent<Props> = ({
  entityDid,
  performanceSection: { title, shields },
}) => {
  return (
    <ControlPanelSection key={title}>
      <h4>
        <div className="heading-icon">
          <PerformanceIcon />
        </div>
        {title}
      </h4>
      {shields.map(shield => {
        return (
          <Shield
            key={shield.field}
            shieldSettings={shield}
            entityDid={entityDid}
          />
        )
      })}
    </ControlPanelSection>
  )
}

export default Performance
