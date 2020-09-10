import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { RootState } from '../../../common/redux/types'
import { Hero } from './components/Hero/Hero'
import { CreateEntityWrapper } from './CreateEntity.container.styles'
import { Steps } from '../../../common/components/Steps/Steps'
import { entityTypeMap } from '../Entities/strategy-map'
import { toTitleCase } from '../../../common/utils/formatters'
import { EntityType } from '../Entities/types'
import * as createEntitySelectors from './CreateEntity.selectors'
import { newEntity } from './CreateEntity.actions'
import { createEntityMap } from './strategy-map'
import { CreateEntityFinalConnected } from 'modules/EntityModules/CreateEntityFinal/CreateEntityFinal.container'
import * as Toast from 'common/utils/Toast'

interface Props {
  match: any
  entityType: EntityType
  isFinal: boolean
  created: boolean
  currentStep: number
  handleNewEntity: (entityType: EntityType, forceNew: boolean) => void
}

class CreateEntity extends React.Component<Props> {
  componentDidMount(): void {
    const {
      match: {
        params: { entityType: entityTypeUrlParam },
      },
      handleNewEntity,
    } = this.props

    handleNewEntity(toTitleCase(entityTypeUrlParam) as EntityType, false)
  }

  handleReset = (): any => {
    const { entityType, handleNewEntity } = this.props
    if (
      window.confirm(
        'Are you sure you want to reset this form? All progress on the setup will be lost',
      )
    ) {
      handleNewEntity(entityType, true)

      Toast.successToast('Form has been reset')
    }
  }

  handleSave = (): void => {
    // does nothing except display a message
    Toast.successToast('Progress has been saved')
  }

  renderStartRoute = (): JSX.Element => {
    const {
      match: {
        params: { entityType: entityTypeUrlParam },
      },
      handleNewEntity,
    } = this.props

    const entityType = toTitleCase(entityTypeUrlParam) as EntityType

    const stepMap = createEntityMap[entityType]

    return (
      <Route
        exact
        path={`/${entityTypeUrlParam}/new/start`}
        render={(): JSX.Element => {
          handleNewEntity(entityType, false)

          return <Redirect to={stepMap.steps[1].url} />
        }}
      />
    )
  }

  renderStepRoutes = (): JSX.Element[] => {
    const { entityType, currentStep, isFinal } = this.props
    const stepMap = createEntityMap[entityType]
    const { steps } = stepMap

    return Object.values(steps).map((step, index) => {
      const { url: urls, container } = step

      return (
        <Route
          key={index}
          exact
          path={urls}
          render={(props: any): JSX.Element => {
            if (isFinal) {
              return (
                <Redirect to={`/${entityType.toLowerCase()}/new/finalise`} />
              )
            }

            return (
              <>
                <Steps
                  currentStepTitle={stepMap.steps[currentStep].name}
                  currentStepNo={currentStep}
                  totalSteps={stepMap.stepCount}
                  handleGoToStepClick={(): void => null}
                />
                {currentStep === index + 1 ? (
                  React.createElement(container, { ...props })
                ) : (
                  <Redirect to={stepMap.steps[currentStep].url} />
                )}
              </>
            )
          }}
        />
      )
    })
  }

  renderFinalRoute = (): JSX.Element => {
    const { entityType, isFinal, currentStep } = this.props
    const stepMap = createEntityMap[entityType]

    return (
      <Route
        exact
        path={`/${entityType.toLowerCase()}/new/finalise`}
        render={(props: any): JSX.Element => {
          if (!isFinal) {
            return <Redirect to={stepMap.steps[currentStep].url} />
          }

          return <CreateEntityFinalConnected {...props} />
        }}
      />
    )
  }

  render(): JSX.Element {
    const { entityType, isFinal, created } = this.props

    if (!entityType) {
      return <></>
    }

    const entityMap = entityTypeMap[toTitleCase(entityType)]

    return (
      <>
        <Hero
          title={entityMap.createNewTitle}
          allowReset={!created}
          allowSave={!isFinal}
          onReset={this.handleReset}
          onSave={this.handleSave}
        />
        <CreateEntityWrapper className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {this.renderStartRoute()}
                {this.renderStepRoutes()}
                {this.renderFinalRoute()}
              </div>
            </div>
          </div>
        </CreateEntityWrapper>
      </>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  currentStep: createEntitySelectors.selectStep(state),
  isFinal: createEntitySelectors.selectIsFinal(state),
  created: createEntitySelectors.selectCreated(state),
  entityType: createEntitySelectors.selectEntityType(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleNewEntity: (entityType: EntityType, forceNew: boolean): void =>
    dispatch(newEntity(entityType, forceNew)),
})

export const CreateEntityConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntity)
