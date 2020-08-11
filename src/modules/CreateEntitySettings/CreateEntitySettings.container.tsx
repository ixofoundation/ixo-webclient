import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import CreateEntityBase, {
  CreateEntityBaseProps,
} from '../CreateEntity/components/CreateEntityBase/CreateEntityBase'
import { RootState } from '../../common/redux/types'
import {
  addDisplayCredentialSection,
  addRequiredCredentialSection,
  removeDisplayCredentialSection,
  removeRequiredCredentialSection,
  updateCreator,
  updateDisplayCredential,
  updateFilters,
  updateOwner,
  updatePrivacy,
  updateRequiredCredential,
  updateStatus,
  validated,
  validationError,
} from './CreateEntitySettings.actions'
import * as entitySettingsSelectors from './CreateEntitySettings.selectors'
import { FormData } from 'common/components/JsonForm/types'
import {
  Owner,
  Creator,
  Status,
  Privacy,
  RequiredCredential,
  DisplayCredential,
} from './types'
import FormCardWrapper from '../../common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import OwnerCard from './components/OwnerCard/OwnerCard'
import CreatorCard from './components/CreatorCard/CreatorCard'
import StatusCard from './components/StatusCard/StatusCard'
import PrivacyCard from './components/PrivacyCard/PrivacyCard'
import RequiredCredentialCard from './components/RequiredCredentialCard/RequiredCredentialCard'
import DisplayCredentialCard from './components/DisplayCredentialCard/DisplayCredentialCard'
import FilterCard from './components/FilterCard/FilterCard'
import { EntityType } from '../Entities/types'
import { entityTypeMap } from '../Entities/strategy-map'

interface Props extends CreateEntityBaseProps {
  entityType: EntityType
  owner: Owner
  creator: Creator
  status: Status
  privacy: Privacy
  requiredCredentials: RequiredCredential[]
  filters: { [name: string]: string[] }
  displayCredentials: DisplayCredential[]
  handleAddDisplayCredentialSection: () => void
  handleAddFilterSection: () => void
  handleAddRequiredCredentialSection: () => void
  handleRemoveDisplayCredentialSection: (id: string) => void
  handlerRemoveFilterSection: (id: string) => void
  handleRemoveRequiredCredentialSection: (id: string) => void
  handleUpdateCreator: (formData: FormData) => void
  handleUpdateDisplayCredential: (id: string, formData: FormData) => void
  handleUpdateFilters: (formData: FormData) => void
  handleUpdateOwner: (formData: FormData) => void
  handleUpdatePrivacy: (formData: FormData) => void
  handleUpdateRequiredCredential: (id: string, formData: FormData) => void
  handleUpdateStatus: (formData: FormData) => void
}

class CreateEntitySettings extends CreateEntityBase<Props> {
  entityTitle

  constructor(props) {
    super(props)

    this.entityTitle = entityTypeMap[this.props.entityType].title
  }

  renderCreator = (): JSX.Element => {
    this.cardRefs['creator'] = React.createRef()

    const {
      creator: {
        name,
        country,
        email,
        website,
        mission,
        identifier,
        credentialTokenId,
        fileSrc,
        uploading,
      },
      handleUpdateCreator,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`${this.entityTitle} Creator`}
      >
        <CreatorCard
          ref={this.cardRefs['creator']}
          name={name}
          country={country}
          email={email}
          website={website}
          mission={mission}
          identifier={identifier}
          credentialTokenId={credentialTokenId}
          fileSrc={fileSrc}
          uploadingImage={uploading}
          handleUpdateContent={handleUpdateCreator}
          handleSubmitted={(): void => this.props.handleValidated('creator')}
          handleError={(errors): void =>
            this.props.handleValidationError('creator', errors)
          }
        />
      </FormCardWrapper>
    )
  }

  renderOwner = (): JSX.Element => {
    this.cardRefs['owner'] = React.createRef()

    const {
      owner: {
        name,
        country,
        email,
        website,
        mission,
        identifier,
        matrixId,
        fileSrc,
        uploading,
      },
      handleUpdateOwner,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`${this.entityTitle} Owner`}
      >
        <OwnerCard
          ref={this.cardRefs['owner']}
          name={name}
          country={country}
          email={email}
          website={website}
          mission={mission}
          identifier={identifier}
          matrixId={matrixId}
          fileSrc={fileSrc}
          uploadingImage={uploading}
          handleUpdateContent={handleUpdateOwner}
          handleSubmitted={(): void => this.props.handleValidated('owner')}
          handleError={(errors): void =>
            this.props.handleValidationError('owner', errors)
          }
        />
      </FormCardWrapper>
    )
  }

  renderStatus = (): JSX.Element => {
    this.cardRefs['status'] = React.createRef()

    const {
      status: { startDate, endDate, stage, status },
      handleUpdateStatus,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`${this.entityTitle} Status`}
      >
        <StatusCard
          ref={this.cardRefs['status']}
          startDate={startDate}
          endDate={endDate}
          stage={stage}
          status={status}
          handleUpdateContent={handleUpdateStatus}
          handleSubmitted={(): void => this.props.handleValidated('status')}
          handleError={(errors): void =>
            this.props.handleValidationError('status', errors)
          }
        />
      </FormCardWrapper>
    )
  }

  renderPrivacy = (): JSX.Element => {
    this.cardRefs['privacy'] = React.createRef()

    const {
      privacy: { entityView, pageView },
      handleUpdatePrivacy,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`${this.entityTitle} Privacy Settings`}
      >
        <PrivacyCard
          ref={this.cardRefs['privacy']}
          pageView={pageView}
          entityView={entityView}
          handleUpdateContent={handleUpdatePrivacy}
          handleSubmitted={(): void => this.props.handleValidated('privacy')}
          handleError={(errors): void =>
            this.props.handleValidationError('privacy', errors)
          }
        />
      </FormCardWrapper>
    )
  }

  renderRequiredCredentials = (): JSX.Element => {
    const {
      requiredCredentials,
      handleUpdateRequiredCredential,
      handleAddRequiredCredentialSection,
      handleRemoveRequiredCredentialSection,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Required Privacy Credentials"
        addSectionText="Add Credential"
        onAddSection={handleAddRequiredCredentialSection}
      >
        {requiredCredentials.map(requiredCredential => {
          this.cardRefs[requiredCredential.id] = React.createRef()

          const { id, credential, issuer } = requiredCredential

          return (
            <RequiredCredentialCard
              ref={this.cardRefs[requiredCredential.id]}
              key={id}
              credential={credential}
              issuer={issuer}
              handleUpdateContent={(formData): void =>
                handleUpdateRequiredCredential(id, formData)
              }
              handleRemoveSection={(): void =>
                handleRemoveRequiredCredentialSection(id)
              }
              handleSubmitted={(): void =>
                this.props.handleValidated(requiredCredential.id)
              }
              handleError={(errors): void =>
                this.props.handleValidationError(requiredCredential.id, errors)
              }
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderFilters = (): JSX.Element => {
    this.cardRefs['filter'] = React.createRef()

    const { entityType, filters, handleUpdateFilters } = this.props

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`${this.entityTitle} Filters`}
        description="Use Ctrl (Windows) or Cmd (Mac) to select and deselect the filter tags"
      >
        <FilterCard
          ref={this.cardRefs['filter']}
          entityType={entityType}
          filters={filters}
          handleUpdateContent={handleUpdateFilters}
          handleSubmitted={(): void => this.props.handleValidated('filter')}
          handleError={(errors): void =>
            this.props.handleValidationError('filter', errors)
          }
        />
      </FormCardWrapper>
    )
  }

  renderDisplayCredentials = (): JSX.Element => {
    const {
      displayCredentials,
      handleUpdateDisplayCredential,
      handleAddDisplayCredentialSection,
      handleRemoveDisplayCredentialSection,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Display Credentials"
        addSectionText="Add Credential"
        onAddSection={handleAddDisplayCredentialSection}
      >
        {displayCredentials.map(displayCredential => {
          this.cardRefs[displayCredential.id] = React.createRef()

          const { id, credential, badge } = displayCredential

          return (
            <DisplayCredentialCard
              ref={this.cardRefs[displayCredential.id]}
              key={id}
              credential={credential}
              badge={badge}
              handleUpdateContent={(formData): void =>
                handleUpdateDisplayCredential(id, formData)
              }
              handleRemoveSection={(): void =>
                handleRemoveDisplayCredentialSection(id)
              }
              handleSubmitted={(): void =>
                this.props.handleValidated(displayCredential.id)
              }
              handleError={(errors): void =>
                this.props.handleValidationError(displayCredential.id, errors)
              }
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    const { requiredCredentials, displayCredentials } = this.props
    const identifiers: string[] = []

    identifiers.push('owner')
    identifiers.push('creator')
    identifiers.push('status')
    identifiers.push('privacy')
    identifiers.push('filter')

    requiredCredentials.forEach(section => {
      identifiers.push(section.id)
    })
    displayCredentials.forEach(section => {
      identifiers.push(section.id)
    })

    return (
      <>
        {this.renderCreator()}
        {this.renderOwner()}
        {this.renderStatus()}
        {this.renderPrivacy()}
        {this.renderRequiredCredentials()}
        {this.renderFilters()}
        {this.renderDisplayCredentials()}
        {this.renderButtonGroup(identifiers)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  owner: entitySettingsSelectors.selectOwner(state),
  creator: entitySettingsSelectors.selectCreator(state),
  status: entitySettingsSelectors.selectStatus(state),
  privacy: entitySettingsSelectors.selectPrivacy(state),
  requiredCredentials: entitySettingsSelectors.selectRequiredCredentials(state),
  filters: entitySettingsSelectors.selectFilters(state),
  displayCredentials: entitySettingsSelectors.selectDisplayCredentials(state),
  validationComplete: entitySettingsSelectors.selectValidationComplete(state),
  validated: entitySettingsSelectors.selectValidated(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleAddDisplayCredentialSection: (): void =>
    dispatch(addDisplayCredentialSection()),
  handleAddRequiredCredentialSection: (): void =>
    dispatch(addRequiredCredentialSection()),
  handleRemoveDisplayCredentialSection: (id: string): void =>
    dispatch(removeDisplayCredentialSection(id)),
  handleRemoveRequiredCredentialSection: (id: string): void =>
    dispatch(removeRequiredCredentialSection(id)),
  handleUpdateCreator: (formData: FormData): void =>
    dispatch(updateCreator(formData)),
  handleUpdateDisplayCredential: (id: string, formData: FormData): void =>
    dispatch(updateDisplayCredential(id, formData)),
  handleUpdateFilters: (formData: FormData): void =>
    dispatch(updateFilters(formData)),
  handleUpdateOwner: (formData: FormData): void =>
    dispatch(updateOwner(formData)),
  handleUpdatePrivacy: (formData: FormData): void =>
    dispatch(updatePrivacy(formData)),
  handleUpdateRequiredCredential: (id: string, formData: FormData): void =>
    dispatch(updateRequiredCredential(id, formData)),
  handleUpdateStatus: (formData: FormData): void =>
    dispatch(updateStatus(formData)),
  handleValidated: (identifier: string): void =>
    dispatch(validated(identifier)),
  handleValidationError: (identifier: string, errors: string[]): void =>
    dispatch(validationError(identifier, errors)),
})

export const CreateEntitySettingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntitySettings)
