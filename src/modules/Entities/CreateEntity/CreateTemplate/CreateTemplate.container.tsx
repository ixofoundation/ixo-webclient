import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import { RootState } from 'common/redux/types'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import CreateEntityBase from '../components/CreateEntityBase/CreateEntityBase'
import { clearEntity, goToStep } from '../CreateEntity.actions'
import * as createEntitySelectors from '../CreateEntity.selectors'
import { selectHeaderContent } from '../CreateEntityPageContent/CreateEntityPageContent.selectors'
import ExistingEntityCard from './components/ExistingEntityCard/ExistingEntityCard'
import TokenTemplateCard from './components/TokenTemplateCard/TokenTemplateCard'
import {
  fetchExistingEntity,
  updateExistingEntityDid,
  validated,
} from './CreateTemplate.action'
import * as createEntityTemplateSelectors from './CreateTemplate.selectors'

class CreateTemplate extends CreateEntityBase<any> {
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

    const { entityType, entityTypeMap } = this.props

    const {
      existingEntity,
      handleUpdateExistingEntityDid,
      handleFetchExistingEntity,
      handleResetExistingEntity,
    } = this.props

    const handleNewClick = (): void => {
      handleResetExistingEntity()
      this.setState({ method: 'new' })
    }

    const handleCopyClick = (): void => {
      handleResetExistingEntity()
      handleFetchExistingEntity(existingEntity.did, existingEntity.sourceNet)
      this.setState({ method: 'copy' })
    }

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`Start with a Copy (or Create a New ${entityTypeMap[entityType].title})`}
        description="Lorem ipsum"
      >
        <ExistingEntityCard
          ref={this.cardRefs['existingentity']}
          sourceNet={existingEntity.sourceNet}
          existingEntityDid={existingEntity.did}
          error={existingEntity.error}
          handleSubmitted={(): void => {
            this.props.handleValidated('existingentity')
          }}
          handleUpdateContent={handleUpdateExistingEntityDid}
          handleError={(errors): void => console.log('ffffffffffff', errors)}
          handleMethod={(method): void => this.setState({ method: method })}
          method={this.state.method}
          handleNewClick={handleNewClick}
          handleCopyClick={handleCopyClick}
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
          handleUpdateContent={(): void => {
            console.log('fffffffffffffffffff')
          }}
          handleSubmitted={(): void => {
            console.log('fffffffffffffffffff')
          }}
          handleError={(errors): void => {
            console.log(errors)
          }}
        />
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    // const { entityType } = this.props
    const identifiers: string[] = []
    identifiers.push('existingentity')
    const { header, existingEntity } = this.props
    return (
      <>
        {this.renderExistingEntityCard()}
        {/* {this.renderButtonGroup(identifiers, false)} */}
        {(this.state.method === 'new' ||
          (this.state.method === 'copy' &&
            header.title &&
            !existingEntity.error)) &&
          this.renderButtonGroup(identifiers, false)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  step: createEntitySelectors.selectStep(state),
  entityType: createEntitySelectors.selectEntityType(state),
  entityTypeMap: selectEntityConfig(state),
  existingEntity: createEntityTemplateSelectors.selectExistingEntity(state),
  validationComplete: true,
  validated: true,
  header: selectHeaderContent(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateExistingEntityDid: (formData: FormData): void =>
    dispatch(updateExistingEntityDid(formData)),
  handleFetchExistingEntity: (did: string, sourceNet: string): void =>
    dispatch(fetchExistingEntity(did, sourceNet)),
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
  handleValidated: (identifier: string): void =>
    dispatch(validated(identifier)),
  handleResetExistingEntity: (): void => dispatch(clearEntity()),
})

export const CreateTemplateConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateTemplate)
