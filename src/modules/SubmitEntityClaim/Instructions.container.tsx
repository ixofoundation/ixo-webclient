import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'
import Instructions from './components/Instructions/Instructions'
import { Container } from './SubmitEntityClaim.container.styles'
import { FormControl } from '../../common/components/JsonForm/types'
import * as submitEntityClaimSelectors from './SubmitEntityClaim.selectors'
import * as selectedEntitySelectors from '../SelectedEntity/SelectedEntity.selectors'
import { getEntity } from '../SelectedEntity/SelectedEntity.actions'
import { ActionWrapper } from '../../common/components/ControlPanel/Actions/Actions.styles'

interface Props {
  entityDid: string
  questions: FormControl[]
  match: any
  handleGetEntity: (entityDid: string) => void
}

class InstructionsContainer extends React.Component<Props> {
  constructor(props) {
    super(props)
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

  render(): JSX.Element {
    const { entityDid, questions } = this.props

    return (
      <ActionWrapper className="open summary">
        <Container>
          <Instructions
            backLink={`/projects/${entityDid}/overview`}
            formLink={`/projects/${entityDid}/overview/action/new_claim/form`}
            listItems={questions.map(question => ({
              title: question.title,
              control: question.control,
            }))}
          />
        </Container>
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
