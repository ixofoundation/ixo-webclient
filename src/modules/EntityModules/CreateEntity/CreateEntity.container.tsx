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

interface Props {
  match: any
  entityType: EntityType
  creating: boolean
  created: boolean
  error: string
  currentStep: number
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

  renderSteps = (): JSX.Element => {
    const { entityType, currentStep } = this.props
    const stepMap = createEntityMap[entityType]
    const { steps } = stepMap

    return (
      <>
        <Steps
          currentStepTitle={stepMap.steps[currentStep].name}
          currentStepNo={currentStep}
          totalSteps={stepMap.stepCount}
          handleGoToStepClick={(): void => null}
        />
        {Object.values(steps).map((step, index) => {
          const { urls, container } = step

          return (
            <Route
              key={index}
              exact
              path={urls}
              render={(props: any): JSX.Element => {
                if (currentStep === index + 1) {
                  return React.createElement(container, { ...props })
                } else {
                  return <Redirect to={stepMap.steps[currentStep].urls[0]} />
                }
              }}
            />
          )
        })}
      </>
    )
  }

  renderFinal = (): JSX.Element => {
    const { entityType, creating, created, error, currentStep } = this.props
    const stepMap = createEntityMap[entityType]

    return (
      <Route
        exact
        path={`/${entityType.toLowerCase()}/new/finalise`}
        render={(props: any): JSX.Element => {
          if (creating || created || error) {
            return <CreateEntityFinalConnected {...props} />
          } else {
            return <Redirect to={stepMap.steps[currentStep].urls[0]} />
          }
        }}
      />
    )
  }

  render(): JSX.Element {
    const { entityType, creating, created, error, currentStep } = this.props

    if (!entityType) {
      return <></>
    }

    const entityMap = entityTypeMap[toTitleCase(entityType)]

    return (
      <>
        <Hero title={entityMap.createNewTitle} />
        <CreateEntityWrapper className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {(creating || created || error) &&
                currentStep === entityMap.stepCount
                  ? this.renderFinal()
                  : this.renderSteps()}
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
  creating: createEntitySelectors.selectCreating(state),
  created: createEntitySelectors.selectCreated(state),
  error: createEntitySelectors.selectError(state),
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
