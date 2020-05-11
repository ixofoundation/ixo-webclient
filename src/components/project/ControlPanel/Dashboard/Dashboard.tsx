import React from 'react'
import { Widget } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import PerformanceIcon from '../../../../assets/icons/Performance'
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
          <PerformanceIcon />
        </div>
        {title}
      </h4>
      {controls.map((control, index) => {
        return <Shield key={index} control={control} entityDid={entityDid} />
      })}
    </ControlPanelSection>
  )
}

export default Dashboard
