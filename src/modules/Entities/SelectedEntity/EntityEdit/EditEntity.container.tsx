import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { RootState } from '../../../../common/redux/types'
import { Hero } from './components/Hero/Hero'
import { EditEntityWrapper } from './EditEntity.container.styles'
import { Steps } from '../../../../common/components/Steps/Steps'
import { toTitleCase } from '../../../../common/utils/formatters'
import { EntityType, EntityTypeStrategyMap } from '../../types'
import * as editEntitySelectors from './EditEntity.selectors'
import * as selectEntitySelectors from '../SelectedEntity.selectors'
import { newEntity } from './EditEntity.actions'
import { editEntityMap } from './strategy-map'
import { EditEntityFinalConnected } from './EditEntityFinal/EditEntityFinal.container'
import * as Toast from 'common/utils/Toast'
import { fetchExistingEntity } from './EditTemplate/EditTemplate.action'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'

interface Props {
  match: any
  entityType: EntityType
  isFinal: boolean
  edited: boolean
  currentStep: number
  projectDID: string
  entityConfig?: EntityTypeStrategyMap
  handleNewEntity: (entityType: EntityType, forceNew: boolean) => void
  handleFetchExistingEntity: (did: string) => void
}

class EditEntity extends React.Component<Props> {
  componentDidMount(): void {
    // TODO - check if keysafe installed
    /*
    example...
    if (this.props.keysafe === null) {
      errorToast('Please install IXO Credential Manager first.')
    } else {
      // ok
    }
    */
    // const {
    //   match: {
    //     params: { entityType: entityTypeUrlParam },
    //   },
    //   handleNewEntity,
    // } = this.props

    // handleNewEntity(toTitleCase(entityTypeUrlParam) as EntityType, false)
  }

  handleReset = (): any => {
    const { projectDID, handleFetchExistingEntity } = this.props
    if (
      window.confirm(
        'Are you sure you want to reset this form? All progress on the setup will be lost',
      )
    ) {
      handleFetchExistingEntity(projectDID)
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
      projectDID
    } = this.props

    const entityType = toTitleCase(entityTypeUrlParam) as EntityType

    const stepMap = editEntityMap[entityType]
    console.log(entityType);
    console.log(stepMap);
    return (
      <Route
        exact
        path={`/projects/:projectDid/detail/:entityType/edit`}
        render={(): JSX.Element => {
          // handleNewEntity(entityType, false)
          // console.log(stepMap);
          return <Redirect to={`/projects/${projectDID}/detail${stepMap.steps[1].url}`} />
        }}
      />
    )
  }

  renderStepRoutes = (): JSX.Element[] => {
    const { entityType, currentStep, isFinal, projectDID } = this.props
    const stepMap = editEntityMap[entityType]
    const { steps } = stepMap

    return Object.values(steps).map((step, index) => {
      const { url: urls, container } = step

      return (
        <Route
          exact
          key={index}
          path={`/projects/:projectDid/detail${urls}`}
          render={(props: any): JSX.Element => {
            console.log('rendered')
            if (isFinal) {
              return (
                <Redirect to={`/projects/${projectDID}/detail/${entityType.toLowerCase()}/edit/finalise`} />
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
                  <Redirect to={`/projects/${projectDID}/detail${stepMap.steps[currentStep].url}`} />
                )}
              </>
            )
          }}
        />
      )
    })
  }

  renderFinalRoute = (): JSX.Element => {
    const { entityType, isFinal, currentStep, projectDID } = this.props
    const stepMap = editEntityMap[entityType]

    return (
      <Route
        exact
        path={`/projects/:projectDID/detail/:entityType/edit/finalise`}
        render={(props: any): JSX.Element => {
          if (!isFinal) {
            return <Redirect to={`/projects/${projectDID}/detail${stepMap.steps[currentStep].url}`} />
          }

          return <EditEntityFinalConnected {...props} />
        }}
      />
    )
  }

  render(): JSX.Element {
    const { entityType, isFinal, edited, 
      // entityConfig
    } = this.props

    if (!entityType) {
      return <></>
    }

    // const entityMap = entityConfig
    // ? entityConfig[toTitleCase(entityType)]
    // : null

    return (
      <>
        <Hero
          title={null}
          allowReset={!edited}
          allowSave={!isFinal}
          onReset={this.handleReset}
          onSave={this.handleSave}
        />
        <EditEntityWrapper className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {this.renderStartRoute()}
                {this.renderStepRoutes()}
                {this.renderFinalRoute()}
              </div>
            </div>
          </div>
        </EditEntityWrapper>
      </>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  currentStep: editEntitySelectors.selectStep(state),
  isFinal: editEntitySelectors.selectIsFinal(state),
  edited: editEntitySelectors.selectEdited(state),
  projectDID: selectEntitySelectors.selectEntityDid(state),
  entityType: selectEntitySelectors.selectEntityType(state),
  entityTypeMap: selectEntityConfig(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleNewEntity: (entityType: EntityType, forceNew: boolean): void =>
    dispatch(newEntity(entityType, forceNew)),
  handleFetchExistingEntity: (did: string): void => dispatch(fetchExistingEntity(did))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditEntity)
