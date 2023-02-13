import * as React from 'react'
import { NavLink } from 'react-router-dom'
import ApprovedTick from 'assets/icons/ApprovedTick'
import { SummaryWrapper, ClaimSummaryList, ButtonWrapper } from './Summary.styles'

interface Props {
  cancelLink: string
  questions: { title: string }[]
  handleNavigatetoQuestion: (questionNumber: number) => void
  handleSubmit: () => void
}

class ClaimSummary extends React.Component<Props> {
  render(): JSX.Element {
    const { questions, cancelLink, handleSubmit, handleNavigatetoQuestion } = this.props

    return (
      <SummaryWrapper>
        <div>
          <h2 className='summary-header'>Claim Summary</h2>
          <h3 className='list-header'>Sections</h3>
        </div>
        <ClaimSummaryList>
          {questions.map((item, index): JSX.Element => {
            return (
              <li key={index}>
                <div>
                  <ApprovedTick width='13' fill='#6FCF97' />
                  {item.title}
                </div>
                <button onClick={(): void => handleNavigatetoQuestion(index + 1)}>View answer</button>
              </li>
            )
          })}
        </ClaimSummaryList>
        <ButtonWrapper className='row'>
          <div className='col-6'>
            <NavLink className='button-cancel' to={cancelLink}>
              Cancel
            </NavLink>
          </div>
          <div className='col-6 select-button-wrapper'>
            <button className='button-submit' onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </ButtonWrapper>
      </SummaryWrapper>
    )
  }
}

export default ClaimSummary
