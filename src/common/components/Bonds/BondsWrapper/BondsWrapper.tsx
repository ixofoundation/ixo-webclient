import React, { Dispatch } from 'react'
import { Moment } from 'moment'
import './BondsWrapper.scss'
import BondsSidebar from '../BondsSidebar/BondsSidebar'
import { Spinner } from '../../Spinner'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { RootState } from '../../../redux/types'
import { getEntity } from 'modules/Entities/SelectedEntity/SelectedEntity.actions'
import EntityHero from 'modules/Entities/SelectedEntity/EntityHero/EntityHero'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { EntityType } from 'modules/Entities/types'

interface Props {
  match: any
  enableAssistantButton?: boolean
  did: string
  name: string
  bondDid: string
  type: EntityType
  dateCreated: Moment
  description: string
  creatorName: string
  location: string
  sdgs: string[]
  isLoading: boolean
  assistantPanelToggle: () => void
  handleGetEntity: (did: string) => void
}

// eslint-disable-next-line react/display-name
const MemorizedSpinner = React.memo((props) => (
  <Spinner info="Loading..." {...props} />
))

export class BondsWrapper extends React.Component<Props> {
  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: did },
      },
      handleGetEntity,
    } = this.props

    handleGetEntity(did)
  }

  render(): JSX.Element {
    const {
      did,
      name,
      bondDid,
      type,
      dateCreated,
      description,
      creatorName,
      location,
      sdgs,
      isLoading,
      assistantPanelToggle,
      children,
    } = this.props
    if (isLoading) {
      return <MemorizedSpinner />
    }

    return (
      <div className="BondsWrapper">
        <BondsSidebar projectDID={did} bondDID={bondDid} />
        <div className="pane">
          <EntityHero
            type={type}
            did={did}
            name={name}
            description={description}
            dateCreated={dateCreated}
            creatorName={creatorName}
            location={location}
            sdgs={sdgs}
            assistantPanelToggle={assistantPanelToggle}
            onlyTitle
          />
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  did: entitySelectors.selectEntityDid(state),
  name: entitySelectors.selectEntityName(state),
  bondDid: entitySelectors.selectEntityBondDid(state),
  type: entitySelectors.selectEntityType(state),
  dateCreated: entitySelectors.selectEntityDateCreated(state),
  creatorName: entitySelectors.selectEntityCreatorName(state),
  description: entitySelectors.selectEntityDescription(state),
  sdgs: entitySelectors.selectEntitySdgs(state),
  location: entitySelectors.selectEntityLocation(state),
  isLoading: entitySelectors.entityIsLoading(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
})

export const BondsWrapperConnected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BondsWrapper as any),
) as any
