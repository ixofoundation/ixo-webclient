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
  claims: any[]
  entityDid: string
}

const Claims: React.FunctionComponent<Props> = ({
  widget: { title, controls },
  showMore,
  claims,
  entityDid,
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
        {
          claims ? claims.map((claim, index) => {
            const to = `/projects/${entityDid}/overview/claims/new_claim/${claim['@id']}`
            return (
              <Tooltip text='Submit a Claim' key={ index }>
                <NavLink to={ to } activeClassName="active">
                  <AddPerson fill='#49BFE0' />
                  { claim['title'] }
                </NavLink>
              </Tooltip>
            )
          }) : null
        }
      </LinksWrapper>
    </ControlPanelSection>

  )
}

export default Claims
