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

interface Props {
  match: any
  entityType: EntityType
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

  renderRoutes = () => {
    const { entityType, currentStep } = this.props
    const stepMap = createEntityMap[entityType]
    const { steps } = stepMap

    return Object.values(steps).map((step, index) => {
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
    })
  }

  render(): JSX.Element {
    const { currentStep, entityType } = this.props

    if (!entityType) {
      return <></>
    }

    const stepMap = createEntityMap[entityType]

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
                  currentStepTitle={stepMap.steps[currentStep].name}
                  currentStepNo={currentStep}
                  totalSteps={stepMap.stepCount}
                  handleGoToStepClick={(): void => null}
                />
                {this.renderRoutes()}
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
