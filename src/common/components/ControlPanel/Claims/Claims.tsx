import React from 'react'
import ClaimIcon from 'assets/icons/ClaimsPanel'
import DownIcon from 'assets/icons/Down'
import { ControlPanelSection } from '../ControlPanel.styles'
import { Widget } from '../types'
import { NavLink } from 'react-router-dom'
import { LinksWrapper } from './Claims.styles'
import Tooltip from '../../Tooltip/Tooltip'
import AddPerson from '../../../../assets/icons/AddPerson'

interface Props {
  widget: Widget
  showMore: boolean
  toggleShowMore: () => void
}

const Claims: React.FunctionComponent<Props> = ({
  widget: { title, controls },
  showMore,
  toggleShowMore,
}) => {
  return (
    <ControlPanelSection>
      <h4>
        <div className="heading-icon">
          <ClaimIcon />
        </div>
        Claims
        {controls.length > 3 && (
          <div
            className={`arrow-icon ${showMore ? 'active' : ''}`}
            onClick={toggleShowMore}
          >
            <DownIcon width="16" fill="#BDBDBD" />
          </div>
        )}
      </h4>
      <LinksWrapper>
        <Tooltip text='Coming soon'>
          <NavLink to={'#'}>
            <AddPerson fill='#49BFE0' />
            Tablet Distributed
          </NavLink>
        </Tooltip>
        <Tooltip text='Coming soon'>
          <NavLink to={'#'}>
            <AddPerson fill='#49BFE0' />
            Qualified Teacher
          </NavLink>
        </Tooltip>
      </LinksWrapper>
    </ControlPanelSection>

  )
}

export default Claims
