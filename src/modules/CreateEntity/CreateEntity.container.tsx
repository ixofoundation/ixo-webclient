import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { RootState } from '../../common/redux/types'
import { Hero } from './components/Hero/Hero'
import { CreateEntityWrapper } from './CreateEntity.container.styles'
import { Steps } from '../../common/components/Steps/Steps'
import { CreateEntityPageContentConnected } from '../CreateEntityPageContent/CreateEntityPageContent.container'
import { CreateEntityAttestationConnected } from '../CreateEntityAttestation/CreateEntityAttestation.container'
import { CreateEntitySettingsConnected } from '../CreateEntitySettings/CreateEntitySettings.container'
import { CreateEntityAdvancedConnected } from '../CreateEntityAdvanced/CreateEntityAdvanced.container'
import { entityTypeMap } from '../Entities/strategy-map'
import { toTitleCase } from '../../common//utils/formatters'
import { EntityType } from '../Entities/types'
import * as createEntitySelectors from './CreateEntity.selectors'
import { newEntity } from './CreateEntity.actions'
import { Step } from './types'
import { stepNameMap } from './strategy-map'

interface Props {
  match: any
  entityType: EntityType
  step: Step
  handleSetEntityType: (entityType: EntityType) => void
}

class CreateEntity extends React.Component<Props> {
  componentDidMount(): void {
    const {
      match: {
        params: { entityType: entityTypeAsString },
      },
      handleSetEntityType,
    } = this.props

    handleSetEntityType(toTitleCase(entityTypeAsString) as EntityType)
  }

  redirectToCurrentStep = (): JSX.Element => {
    const { entityType, step } = this.props

    switch (step) {
      case Step.Settings:
        return <Redirect to={`/${entityType.toLowerCase()}/new/settings`} />
      case Step.Advanced:
        return <Redirect to={`/${entityType.toLowerCase()}/new/advanced`} />
    }

    return <Redirect to={`/${entityType.toLowerCase()}/new/page`} />
  }

  render(): JSX.Element {
    const { step, entityType } = this.props

    if (!entityType) {
      return <></>
    }

    return (
      <>
        <Hero
          title={`Create a ${entityTypeMap[toTitleCase(entityType)].title}`}
        />
        <CreateEntityWrapper className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <Steps
                  currentStepTitle={stepNameMap[step].name}
                  currentStepNo={step}
                  totalSteps={3}
                  handleGoToStepClick={(): void => null}
                />
                <Route
                  exact
                  path={[`/${entityType}/new/page`, `/${entityType}/new`]}
                  render={(props: any): JSX.Element => {
                    if (
                      step === Step.PageContent &&
                      entityType !== EntityType.Template
                    ) {
                      return <CreateEntityPageContentConnected {...props} />
                    } else if (
                      step === Step.PageContent &&
                      entityType === EntityType.Template
                    ) {
                      return <CreateEntityAttestationConnected {...props} />
                    } else {
                      return this.redirectToCurrentStep()
                    }
                  }}
                />
                <Route
                  exact
                  path={`/${entityType}/new/settings`}
                  render={(props: any): JSX.Element => {
                    if (step === Step.Settings) {
                      return <CreateEntitySettingsConnected {...props} />
                    } else {
                      return this.redirectToCurrentStep()
                    }
                  }}
                />
                <Route
                  exact
                  path={`/${entityType}/new/advanced`}
                  render={(props: any): JSX.Element => {
                    if (step === Step.Advanced) {
                      return <CreateEntityAdvancedConnected {...props} />
                    } else {
                      return this.redirectToCurrentStep()
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </CreateEntityWrapper>
      </>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  step: createEntitySelectors.selectStep(state),
  entityType: createEntitySelectors.selectEntityType(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleSetEntityType: (entityType: EntityType): void =>
    dispatch(newEntity(entityType)),
})

export const CreateEntityConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntity)
