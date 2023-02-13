import FormCardWrapper from 'components/Wrappers/FormCardWrapper/FormCardWrapper'
import { RootState } from 'redux/store'
import { articleFormat } from 'utils/formatters'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import CreateEntityBase from '../Components/CreateEntityBase/CreateEntityBase'
import { goToStep } from '../../../../redux/createEntityOld/createEntity.actions'
import {
  selectEntityType,
  selectSelectedTemplateType,
  selectStep,
} from '../../../../redux/createEntityOld/createEntity.selectors'
import { updateExistingEntityError } from '../../../../redux/createTemplate/createTemplate.action'
import SelectTemplateCard from './Components/SelectTemplateCard/SelectTemplateCard'
import { updateTemplateType } from '../../../../redux/createSelectTemplate/createSelectTemplate.action'
import { selectTemplateType } from '../../../../redux/createSelectTemplate/createSelectTemplate.selectors'

class CreateSelectTemplate extends CreateEntityBase<any> {
  constructor(props: any) {
    super(props)

    const { handleUpdateTemplateType, entityType, templateType } = props

    handleUpdateTemplateType(templateType ? templateType : entityType)
  }

  onSubmitted = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getNextStep(entityType, step))
  }

  onBack = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getPreviousStep(entityType, step))
  }

  renderSelectProtocolCard = (): JSX.Element => {
    this.cardRefs['selectProtocol'] = React.createRef()

    const { templateType, handleUpdateTemplateType } = this.props

    return (
      <FormCardWrapper
        showAddSection={false}
        title={templateType ? `Create ${articleFormat(templateType)} ${templateType} Protocol` : `Create a Protocol`}
        // description="Lorem ipsum"
        keyword='template'
      >
        <SelectTemplateCard
          ref={this.cardRefs['selectProtocol']}
          handleSubmitted={(): void => {
            // Added as required prop
          }}
          handleUpdateContent={handleUpdateTemplateType}
          handleError={(): void => {
            // Added as required prop
          }}
        />
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    const { templateType } = this.props
    const identifiers: string[] = []
    identifiers.push('selectProtocol')

    return (
      <>
        {this.renderSelectProtocolCard()}
        {templateType && this.renderButtonGroup(identifiers, false)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  step: selectStep(state),
  entityType: selectEntityType(state),
  templateType: selectTemplateType(state),
  entityTypeMap: selectEntityConfig(state),
  validationComplete: true,
  validated: true,
  selectedTemplateType: selectSelectedTemplateType(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGoToStep: (step: number): void => {
    dispatch(updateExistingEntityError())
    dispatch(goToStep(step))
  },
  handleUpdateTemplateType: (formData: FormData): void => {
    dispatch(updateTemplateType(formData))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateSelectTemplate)
