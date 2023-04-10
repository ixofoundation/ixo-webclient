import React, { useMemo } from 'react'
import cx from 'classnames'
import ClaimIcon from 'assets/icons/ClaimsPanel'
import DownIcon from 'assets/icons/Down'
import { ControlPanelSection } from '../ControlPanel.styles'
import { Widget } from '../types'
import { NavLink } from 'react-router-dom'
import { LinksWrapper } from './Claims.styles'
import Tooltip from '../../Tooltip/Tooltip'
import AddPerson from '../../../assets/icons/AddPerson'
import { useAppSelector } from 'redux/hooks'
import {
  selectEntityStatus,
  selectIsApprovedIA,
  selectIsApprovedSA,
} from 'redux/selectedEntity/selectedEntity.selectors'

interface Props {
  widget: Widget
  showMore: boolean
  toggleShowMore: () => void
  claims: any[]
  entityDid: string
}

const Claims: React.FunctionComponent<Props> = ({ widget, showMore, claims, entityDid, toggleShowMore }) => {
  const controls = widget?.controls ?? []
  const isApprovedSA = useAppSelector(selectIsApprovedSA)
  const isApprovedIA = useAppSelector(selectIsApprovedIA)
  const entityStatus = useAppSelector(selectEntityStatus)

  const tooltipText = useMemo(() => {
    if (entityStatus !== 'STARTED') {
      return 'Project must be started'
    }
    return isApprovedSA || isApprovedIA
      ? 'Submit a Claim'
      : 'Requires Approved Service Agent or Investment Agent sign-in'
  }, [isApprovedSA, isApprovedIA, entityStatus])
  const canSubmitClaim = useMemo(
    () => (isApprovedSA || isApprovedIA) && entityStatus === 'STARTED',
    [isApprovedSA, isApprovedIA, entityStatus],
  )

  return (
    <ControlPanelSection>
      <h4>
        <div className='heading-icon'>
          <ClaimIcon />
        </div>
        Claims
        {controls.length > 3 && (
          <div className={`arrow-icon ${showMore ? 'active' : ''}`} onClick={toggleShowMore}>
            <DownIcon width='16' fill='#BDBDBD' />
          </div>
        )}
      </h4>
      <LinksWrapper>
        {claims
          ? claims.map((claim, index) => {
              const to = `/projects/${entityDid}/overview/claims/new_claim/${claim['@id']}`
              return (
                <Tooltip text={tooltipText} key={index}>
                  <NavLink className={cx({ 'pe-none': !canSubmitClaim })} to={to} activeClassName='active'>
                    <AddPerson fill='#49BFE0' />
                    {claim['title']}
                  </NavLink>
                </Tooltip>
              )
            })
          : null}
      </LinksWrapper>
    </ControlPanelSection>
  )
}

export default Claims
