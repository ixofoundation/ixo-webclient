import React from 'react'
import { DashboardSection } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import DashboardIcon from '../../../../assets/icons/Dashboard'
import Shield from './Shield/Shield'

interface Props {
  entityDid: string
  dashboardSection: DashboardSection
}

const Dashboard: React.FunctionComponent<Props> = ({
  entityDid,
  dashboardSection: { title, shields },
}) => {
  return (
    <ControlPanelSection key={title}>
      <h4>
        <div className="heading-icon">
          <DashboardIcon />
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

export default Dashboard
