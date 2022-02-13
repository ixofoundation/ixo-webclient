import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import { RootState } from 'common/redux/types'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreateEntityBase from '../components/CreateEntityBase/CreateEntityBase'
import { goToStep } from '../CreateEntity.actions'
import { selectEntityType, selectStep } from '../CreateEntity.selectors'
import SelectTemplateCard from './components/SelectTemplateCard/SelectTemplateCard'

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

    const updateTemplate = (formData: any): void => {
      if (formData.template) {
        const aa = document.body.scrollTop || document.documentElement.scrollTop
        this.props.history.push(`/${formData.template.toLowerCase()}/new/start`)
        setTimeout((): void => window.scrollTo(0, aa))
      }
    }

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`${entityTypeMap[entityType].createNewTitle}`}
        description="Lorem ipsum"
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
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateSelectTemplate),
)
