import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import CreateEntityBase from '../components/CreateEntityBase/CreateEntityBase'
import { RootState } from 'common/redux/types'
import * as createEntitySelectors from '../CreateEntity.selectors'
import { entityTypeMap } from '../../strategy-map'
import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import ExistingEntityCard from './components/ExistingEntityCard/ExistingEntityCard'
import TokenTemplateCard from './components/TokenTemplateCard/TokenTemplateCard'
import {
  fetchExistingEntity,
  updateExistingEntityDid,
  validated,
} from './CreateTemplate.action'
import * as createEntityTemplateSelectors from './CreateTemplate.selectors'
import { importEntityPageContent } from '../CreateEntityPageContent/CreateEntityPageContent.actions'
import { selectHeaderContent } from '../CreateEntityPageContent/CreateEntityPageContent.selectors'
import { goToStep, newEntity } from '../CreateEntity.actions'

class CreateTemplate extends CreateEntityBase<any> {
  entityTitle

  constructor(props) {
    super(props)

    this.entityTitle = entityTypeMap[this.props.entityType].title
  }

  onSubmitted = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getNextStep(entityType, step))
  }

  onBack = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getPreviousStep(entityType, step))
  }

  renderExistingEntityCard = (): JSX.Element => {
    this.cardRefs['existingentity'] = React.createRef()

    const { entityType } = this.props
    
    
    const {
      existingEntity,
      header,
      handleUpdateExistingEntityDid,
      handleFetchExistingEntity,
      handleResetExistingEntity,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`Start with a Copy (or Create a New ${this.entityTitle})`}
      >
        <ExistingEntityCard
          title={header.title}
          ref={this.cardRefs['existingentity']}
          sourceNet={existingEntity.sourceNet}
          existingEntityDid={existingEntity.did}
          error={existingEntity.error}
          handleSubmitted={() => {
            this.props.handleValidated('existingentity')
          }}
          handleUpdateContent={handleUpdateExistingEntityDid}
          handleResetContent={() => handleResetExistingEntity(entityType)}
          handleFetchExistingEntity={handleFetchExistingEntity}
          handleError={(errors): void => console.log('ffffffffffff', errors)}
        />
      </FormCardWrapper>
    )
  }

  renderTokenTemplate = (): JSX.Element => {
    this.cardRefs['template'] = React.createRef()
    return (
      <FormCardWrapper title={`Tokens to be Minted`} showAddSection>
        <TokenTemplateCard
          ref={this.cardRefs['template']}
          displayName=""
          email=""
          website=""
          mission=""
          fileSrc=""
          uploadingImage={false}
          handleUpdateContent={() => {
            console.log('fffffffffffffffffff')
          }}
          handleSubmitted={(): void => {
            console.log('fffffffffffffffffff')
          }}
          handleError={(errors): void => {
            console.log('fffffffffffffffffff')
          }}
        />
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    const { entityType } = this.props
    const identifiers: string[] = []
    identifiers.push('existingentity')

    return (
      <>
        {this.renderExistingEntityCard()}
        {this.renderButtonGroup(identifiers, false)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  step: createEntitySelectors.selectStep(state),
  entityType: createEntitySelectors.selectEntityType(state),
  existingEntity: createEntityTemplateSelectors.selectExistingEntity(state),
  validationComplete: true,
  validated: true,
  header: selectHeaderContent(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateExistingEntityDid: (formData: FormData): void =>
    dispatch(updateExistingEntityDid(formData)),
  handleFetchExistingEntity: (did: string, sourceNet: string) =>
    dispatch(fetchExistingEntity(did, sourceNet)),
  handleImportEntityPageContent: (payload: any) =>
    dispatch(importEntityPageContent(payload)),
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
  handleValidated: (identifier: string): void =>
    dispatch(validated(identifier)),
  handleResetExistingEntity: (entityType) =>
    dispatch(newEntity(entityType, true)),
})

export const CreateTemplateConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateTemplate)
