import React, { Dispatch } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Hero } from './components/Hero/Hero'
import { CreateEntityWrapper } from './CreateEntity.container.styles'
import { Steps } from '../../common/components/Steps/Steps'
import { CreateEntityPageContentConnected } from '../CreateEntityPageContent/CreateEntityPageContent.container'
import { CreateEntitySettingsConnected } from '../CreateEntitySettings/CreateEntitySettings.container'
import { CreateEntityAdvancedConnected } from '../CreateEntityAdvanced/CreateEntityAdvanced.container'
import { entityTypeMap } from '../Entities/strategy-map'
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
    const { title } = entityTypeMap[toTitleCase(entityType)]

    return (
      <>
        <Hero title={`Create a ${title}`} />
        <CreateEntityWrapper className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <Steps
                  currentStepTitle="Advanced"
                  currentStepNo={4}
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
                <Route
                  exact
                  path={`/${entityType}/new/advanced`}
                  component={CreateEntityAdvancedConnected}
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
