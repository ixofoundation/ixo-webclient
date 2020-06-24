import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'
import Instructions from './components/Instructions/Instructions'
import Question from './components/Question/Question'
import { Container } from './SubmitEntityClaim.container.styles'
import { FormControl } from '../../common/components/JsonForm/types'
import * as submitEntityClaimSelectors from './SubmitEntityClaim.selectors'
import * as accountSelectors from '../Account/Account.selectors'
import * as selectedEntitySelectors from '../SelectedEntity/SelectedEntity.selectors'
import {
  goToNextQuestion,
  goToPreviousQuestion,
} from './SubmitEntityClaim.actions'
import { EntityType } from '../Entities/types'
import { strategyMap } from '../Entities/strategy-map'
import ControlPanel from '../../common/components/ControlPanel/ControlPanel'
import { Spinner } from '../../components/common/Spinner'
import { getEntity } from '../SelectedEntity/SelectedEntity.actions'

interface Props {
  userDid: string
  entityIsLoading: boolean
  entityTitle: string
  entityDid: string
  entityType: EntityType
  currentQuestion: FormControl
  currentQuestionNo: number
  questionCount: number
  match: any
  handleGetEntity: (entityDid: string) => void
  handlePreviousClick: () => void
  handleNextClick: () => void
}

interface State {
  showInstructions: boolean
}

class SubmitEntityClaim extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      showInstructions: true, // temp
    }
  }

  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: entityDid },
      },
      handleGetEntity,
    } = this.props

    handleGetEntity(entityDid)
  }

  handleToggleInstructions = (): void => {
    this.setState({
      showInstructions: !this.state.showInstructions,
    })
  }

  render(): JSX.Element {
    const {
      userDid,
      entityIsLoading,
      entityDid,
      entityType,
      currentQuestion,
      currentQuestionNo,
      questionCount,
      handlePreviousClick,
      handleNextClick,
    } = this.props

    if (entityIsLoading) {
      return <Spinner info={`Loading claim form...`} />
    }

    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Container>
                {this.state.showInstructions ? (
                  <Instructions
                    toggleInstructions={this.handleToggleInstructions}
                  />
                ) : (
                  <Question
                    handlePreviousClick={handlePreviousClick}
                    handleNextClick={handleNextClick}
                    question={currentQuestion}
                    currentQuestionNo={currentQuestionNo}
                    questionCount={questionCount}
                  />
                )}
              </Container>
            </div>
            <div className="col-lg-4">
              <ControlPanel
                schema={strategyMap[entityType].controlPanelSchema}
                entityDid={entityDid}
                userDid={userDid}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  currentQuestion: submitEntityClaimSelectors.selectCurrentQuestion(state),
  currentQuestionNo: submitEntityClaimSelectors.selectCurrentQuestionNo(state),
  questionCount: submitEntityClaimSelectors.selectQuestionCount(state),
  userDid: accountSelectors.selectUserDid(state),
  entityDid: selectedEntitySelectors.selectEntityDid(state),
  entityType: selectedEntitySelectors.selectEntityType(state),
  entityTitle: selectedEntitySelectors.selectEntityTitle(state),
  entityIsLoading: selectedEntitySelectors.entityIsLoading(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handlePreviousClick: (): void => dispatch(goToPreviousQuestion()),
  handleNextClick: (): void => dispatch(goToNextQuestion()),
  handleGetEntity: (entityDid): void => dispatch(getEntity(entityDid)),
})

export const SubmitEntityClaimConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitEntityClaim)
