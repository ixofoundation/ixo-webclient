import React, { Dispatch } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'
import { Hero } from './components/Hero/Hero'
import { CreateEntityWrapper } from './CreateEntity.container.styles'
import { Steps } from '../../common/components/Steps/Steps'
import { CreateEntityPageContentConnected } from '../CreateEntityPageContent/CreateEntityPageContent.container'
import { CreateEntitySettingsConnected } from '../CreateEntitySettings/CreateEntitySettings.container'
import { strategyMap } from '../Entities/strategy-map'
import { toTitleCase } from 'src/common/utils/formatters'
import { EntityType } from '../Entities/types'

interface Props {
  match: any
}

class CreateEntity extends React.Component<Props> {
  render(): JSX.Element {
    const {
      match: {
        params: { entityType: entityTypeAsString },
      },
    } = this.props

    const entityType = toTitleCase(entityTypeAsString) as EntityType
    const { title } = strategyMap[toTitleCase(entityType)]

    return (
      <>
        <Hero title={`Create a ${title}`} />
        <CreateEntityWrapper className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <Steps
                  currentStepTitle="Settings"
                  currentStepNo={2}
                  totalSteps={4}
                  handleGoToStepClick={(): void => null}
                />
                <Route
                  exact
                  path={`/${entityType}/new/page-content`}
                  component={CreateEntityPageContentConnected}
                />
                <Route
                  exact
                  path={`/${entityType}/new/settings`}
                  render={(props): JSX.Element => (
                    <CreateEntitySettingsConnected
                      {...(props as any)}
                      entityType={entityType}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </CreateEntityWrapper>
      </>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({})

export const CreateEntityConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntity)
