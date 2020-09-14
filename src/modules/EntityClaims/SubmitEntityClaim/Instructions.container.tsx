import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import Instructions from './components/Instructions/Instructions'
import { FormContainer } from 'common/components/JsonForm/JsonForm.styles'
import { FormControl } from 'common/components/JsonForm/types'
import * as submitEntityClaimSelectors from './SubmitEntityClaim.selectors'
import * as selectedEntitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { getEntity } from 'modules/Entities/SelectedEntity/SelectedEntity.actions'
import { ActionWrapper } from 'common/components/ControlPanel/Actions/Actions.styles'

interface Props {
  entityDid: string
  questions: FormControl[]
  match: any
  handleGetEntity: (entityDid: string) => void
}

class InstructionsContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }

  componentDidMount(): void {
    if (!document.querySelector('body').classList.contains('noScroll')) {
      document.querySelector('body').classList.add('noScroll')
    }
    document.querySelector('#ControlPanelWrapper').classList.add('fixed')
    const {
      match: {
        params: { projectDID: entityDid },
      },
      handleGetEntity,
    } = this.props

    handleGetEntity(entityDid)
  }

  componentWillUnmount(): void {
    document.querySelector('body').classList.remove('noScroll')
    document.querySelector('#ControlPanelWrapper').classList.remove('fixed')
  }

  render(): JSX.Element {
    const { entityDid, questions } = this.props

    return (
      <ActionWrapper className="open summary">
        <FormContainer>
          <Instructions
            backLink={`/projects/${entityDid}/overview`}
            formLink={`/projects/${entityDid}/overview/action/new_claim/form`}
            listItems={questions.map((question) => ({
              title: question.title,
              control: question.control,
            }))}
          />
        </FormContainer>
      </ActionWrapper>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  questions: submitEntityClaimSelectors.selectQuestions(state),
  entityDid: selectedEntitySelectors.selectEntityDid(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (entityDid): void => dispatch(getEntity(entityDid)),
})

export const InstructionsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstructionsContainer)
