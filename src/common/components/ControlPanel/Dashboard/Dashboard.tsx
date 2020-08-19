import React from 'react'
import { Widget } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ShieldsWrapper } from './Dashboard.styles'
import DashboardIcon from '../../../../assets/icons/Dashboard'
import Shield from './Shield/Shield'

interface Props {
  entityDid: string
  widget: Widget
}

const Dashboard: React.FunctionComponent<Props> = ({
  entityDid,
  widget: { title, controls },
}) => {
  return (
    <ControlPanelSection key={title}>
      <h4>
        <div className="heading-icon">
          <DashboardIcon />
        </div>
        {title}
      </h4>
      <ShieldsWrapper>
        {controls.map((control, index) => {
          return <Shield key={index} control={control} entityDid={entityDid} />
        })}
      </ShieldsWrapper>
    </ControlPanelSection>
  )
}

export default Dashboard
