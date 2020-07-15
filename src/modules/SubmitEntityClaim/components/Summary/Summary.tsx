import * as React from 'react'
import { NavLink } from 'react-router-dom'
import ApprovedTick from '../../../../assets/icons/ApprovedTick'
// import Query from '../../../../assets/icons/Query'
import {
  ActionWrapper,
  SummaryWrapper,
  ClaimSummaryList,
  ButtonWrapper,
} from './Summary.styles'

interface Props {
  cancelLink: string
  submitLink: string
  questions: { control: string; title: string }[]
  handleNavigatetoQuestion: (questionNumber: number) => void
}

class ClaimSummary extends React.Component<Props> {
  componentDidMount(): void {
    if (!document.querySelector('body').classList.contains('noScroll')) {
      document.querySelector('body').classList.add('noScroll')
    }
    document.querySelector('#ControlPanelWrapper').classList.add('fixed')
  }

  componentWillUnmount(): void {
    document.querySelector('body').classList.remove('noScroll')
    document.querySelector('#ControlPanelWrapper').classList.remove('fixed')
  }

  render(): JSX.Element {
    const {
      questions,
      cancelLink,
      submitLink,
      handleNavigatetoQuestion,
    } = this.props

    return (
      <ActionWrapper className="open summary">
        <SummaryWrapper>
          <div>
            <h2 className="summary-header">Claim Summary</h2>
            <h6>Claim Identifier</h6>
            <strong>
              {/* @TODO Upadate this dynamically */}
              a5e45d26a84df315a11384a1b7c1e3e94dda327fa15bd22254da8d45ed95840e
            </strong>
            <h3 className="list-header">Sections</h3>
          </div>
          <ClaimSummaryList>
            {questions.map(
              (item, index): JSX.Element => {
                return (
                  <li key={index}>
                    <div>
                      {/* @TODO Add conditional to check for answer status */}
                      {/* {item.title === 'Date Picker' ? (
                        <Query width="13" fill="#F89D28" />
                      ) : (
                        <ApprovedTick width="13" fill="#6FCF97" />
                        )} */}
                      <ApprovedTick width="13" fill="#6FCF97" />
                      {item.title}
                    </div>
                    <button
                      onClick={(): void => handleNavigatetoQuestion(index + 1)}
                    >
                      View answer
                    </button>
                  </li>
                )
              },
            )}
          </ClaimSummaryList>
          <ButtonWrapper className="row">
            <div className="col-6">
              <NavLink className="button-cancel" to={cancelLink}>
                Cancel
              </NavLink>
            </div>
            <div className="col-6 select-button-wrapper">
              <NavLink className="button-submit" to={submitLink}>
                Submit
              </NavLink>
            </div>
          </ButtonWrapper>
        </SummaryWrapper>
      </ActionWrapper>
    )
  }
}

export default ClaimSummary
