import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import CreateEntityBase from '../components/CreateEntityBase/CreateEntityBase'
import { RootState } from 'common/redux/types'
import * as createEntitySelectors from '../CreateEntity.selectors'
import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import SelectTemplateCard from './components/SelectTemplateCard/SelectTemplateCard'

import {
  fetchExistingEntity,
  updateExistingEntityDid,
  validated,
} from './CreateTemplate.action'
import * as createEntityTemplateSelectors from './CreateTemplate.selectors'
import { importEntityPageContent } from '../CreateEntityPageContent/CreateEntityPageContent.actions'
import { selectHeaderContent } from '../CreateEntityPageContent/CreateEntityPageContent.selectors'
import { goToStep, newEntity } from '../CreateEntity.actions'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import { articleFormat } from 'common/utils/formatters'

class CreateSelectTemplate extends CreateEntityBase<any> {
  onSubmitted = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getNextStep(entityType, step))
  }

  onBack = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getPreviousStep(entityType, step))
  }

  renderSelectTemplateCard = (): JSX.Element => {
    this.cardRefs['selectTemplate'] = React.createRef()

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
        title={`Create ${articleFormat(entityTypeMap[entityType].title)} ${
          entityTypeMap[entityType].title
        } Template`}
        description="Lorem ipsum"
      >
        <SelectTemplateCard
          ref={this.cardRefs['selectTemplate']}
          handleSubmitted={() => {
            this.props.handleValidated('selectTemplate')
          }}
          handleUpdateContent={handleResetExistingEntity}
          handleResetContent={() => handleResetExistingEntity(entityType)}
          handleError={(errors): void => console.log('ffffffffffff', errors)}
        />
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    // const { entityType } = this.props
    const identifiers: string[] = []
    identifiers.push('selectTemplate')

    return (
      <>
        {this.renderSelectTemplateCard()}
        {this.renderButtonGroup(identifiers, false)}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateSelectTemplate)
