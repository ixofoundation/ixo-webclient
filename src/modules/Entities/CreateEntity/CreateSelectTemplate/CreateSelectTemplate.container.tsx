import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import { RootState } from 'common/redux/types'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreateEntityBase from '../components/CreateEntityBase/CreateEntityBase'
import { goToStep, updateSelectedTemplateType } from '../CreateEntity.actions'
import {
  selectEntityType,
  selectSelectedTemplateType,
  selectStep,
} from '../CreateEntity.selectors'
import { updateExistingEntityError } from '../CreateTemplate/CreateTemplate.action'
import SelectTemplateCard from './components/SelectTemplateCard/SelectTemplateCard'

class CreateSelectTemplate extends CreateEntityBase<any> {
  constructor(props) {
    super(props)

    const {
      handleUpdateSelectedTemplateType,
      entityType,
      selectedTemplateType,
    } = props

    handleUpdateSelectedTemplateType(
      selectedTemplateType ? selectedTemplateType : entityType,
    )
  }

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

    const {
      entityType,
      entityTypeMap,
      handleUpdateSelectedTemplateType,
      selectedTemplateType,
    } = this.props

    // TODO: Token Class Template should be in a new URL
    const title =
      selectedTemplateType === 'Token_class_template'
        ? 'Create a Token Class Template'
        : entityTypeMap[entityType].createNewTitle

    const updateTemplate = (formData: any): void => {
      if (formData.template) {
        const aa = document.body.scrollTop || document.documentElement.scrollTop
        let link: string = formData.template
        if (link === 'Token_class_template') {
          link = 'Template'
        }
        this.props.history.push(`/${link.toLowerCase()}/new/start`)
        setTimeout((): void => window.scrollTo(0, aa))
        handleUpdateSelectedTemplateType(formData.template)
      }
    }

    return (
      <FormCardWrapper
        showAddSection={false}
        title={title}
        // description="Lorem ipsum"
      >
        <SelectTemplateCard
          ref={this.cardRefs['selectTemplate']}
          handleSubmitted={(): void => console.log('no validation')}
          handleUpdateContent={updateTemplate}
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
  step: selectStep(state),
  entityType: selectEntityType(state),
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
  handleUpdateSelectedTemplateType: (type: string): void =>
    dispatch(updateSelectedTemplateType(type)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateSelectTemplate),
)
