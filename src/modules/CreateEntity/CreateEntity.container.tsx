import React, { Dispatch } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'
import { Hero } from './components/Hero/Hero'
import { CreateEntityWrapper } from './CreateEntity.container.styles'
import { Steps } from '../../common/components/Steps/Steps'
import { CreateEntityPageContentConnected } from '../CreateEntityPageContent/CreateEntityPageContent.container'

interface Props {
  match: any
}

class CreateEntity extends React.Component<Props> {
  render(): JSX.Element {
    const {
      match: {
        params: { entityType },
      },
    } = this.props

    return (
      <>
        <Hero title="Create a Project" />
        <CreateEntityWrapper className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <Steps
                  currentStepTitle="Page"
                  currentStepNo={1}
                  totalSteps={4}
                  handleGoToStepClick={(): void => null}
                />
                <Route
                  exact
                  path={`/${entityType}/new/page-content`}
                  component={CreateEntityPageContentConnected}
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
