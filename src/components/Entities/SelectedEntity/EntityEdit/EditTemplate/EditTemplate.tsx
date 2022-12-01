import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import EditEntityBase from '../Components/EditEntityBase/EditEntityBase'
import { RootState } from 'redux/types'
import * as editEntitySelectors from '../../../../../redux/editEntity/editEntity.selectors'
import FormCardWrapper from 'components/Wrappers/FormCardWrapper/FormCardWrapper'
import ExistingEntityCard from './Components/ExistingEntityCard/ExistingEntityCard'
import TokenTemplateCard from './Components/TokenTemplateCard/TokenTemplateCard'
import {
  fetchExistingEntity,
  updateExistingEntityDid,
  validated,
} from '../../../../../redux/editEntityTemplate/editTemplate.action'
import * as editEntityTemplateSelectors from '../../../../../redux/editEntityTemplate/editTemplate.selectors'
import { importEntityPageContent } from '../../../../../redux/editEntityPageContent/editEntityPageContent.actions'
import { selectHeaderContent } from '../EditEntityPageContent/EditEntityPageContent.selectors'
import { goToStep, newEntity } from '../../../../../redux/editEntity/editEntity.actions'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

class EditTemplate extends EditEntityBase<any> {
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
      header,
      handleUpdateExistingEntityDid,
      handleFetchExistingEntity,
      handleResetExistingEntity,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`Edit with a Copy (or Edit current ${entityTypeMap[entityType].title})`}
        keyword='start'
      >
        <ExistingEntityCard
          title={header.title}
          ref={this.cardRefs['existingentity']}
          existingEntityDid={existingEntity.did}
          error={existingEntity.error}
          handleSubmitted={() => {
            this.props.handleValidated('existingentity')
          }}
          handleUpdateContent={handleUpdateExistingEntityDid}
          handleResetContent={() => handleResetExistingEntity(entityType)}
          handleFetchExistingEntity={handleFetchExistingEntity}
          handleError={(errors): void => {
            // Added as required prop
          }}
        />
      </FormCardWrapper>
    )
  }

  renderTokenTemplate = (): JSX.Element => {
    this.cardRefs['template'] = React.createRef()
    return (
      <FormCardWrapper title={`Tokens to be Minted`} showAddSection keyword='tokens'>
        <TokenTemplateCard
          ref={this.cardRefs['template']}
          displayName=''
          email=''
          website=''
          mission=''
          fileSrc=''
          uploadingImage={false}
          handleUpdateContent={() => {
            // Added as required prop
          }}
          handleSubmitted={(): void => {
            // Added as required prop
          }}
          handleError={(): void => {
            // Added as required prop
          }}
        />
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    // const { entityType } = this.props
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
  step: editEntitySelectors.selectStep(state),
  entityType: editEntitySelectors.selectEntityType(state),
  entityTypeMap: selectEntityConfig(state),
  existingEntity: editEntityTemplateSelectors.selectExistingEntity(state),
  validationComplete: true,
  validated: true,
  header: selectHeaderContent(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateExistingEntityDid: (formData: FormData): void => dispatch(updateExistingEntityDid(formData)),
  handleFetchExistingEntity: (did: string) => dispatch(fetchExistingEntity(did)),
  handleImportEntityPageContent: (payload: any) => dispatch(importEntityPageContent(payload)),
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
  handleValidated: (identifier: string): void => dispatch(validated(identifier)),
  handleResetExistingEntity: (entityType: any) => dispatch(newEntity(entityType, true)),
})

export const EditTemplateConnected = connect(mapStateToProps, mapDispatchToProps)(EditTemplate)
