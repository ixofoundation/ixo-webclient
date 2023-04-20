import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import Instructions from './Instructions/Instructions'
import { FormContainer } from 'components/JsonForm/JsonForm.styles'
import * as submitEntityClaimSelectors from '../../../../../redux/submitEntityClaim/submitEntityClaim.selectors'
import * as selectedEntitySelectors from 'redux/selectedEntity/selectedEntity.selectors'
import { ActionWrapper } from 'components/ControlPanel/Actions/Actions.styles'
import { QuestionForm } from '../../../../../types/entityClaims'
import { getClaimTemplate } from '../../../../../redux/submitEntityClaim/submitEntityClaim.actions'
import { Spinner } from 'components/Spinner/Spinner'

interface Props {
  entityDid: string
  templateDid: string
  claimTemplateIsLoading: boolean
  questions: QuestionForm[]
  match: any
  handleGetClaimTemplate: (templateDid: string) => void
}

class InstructionsContainer extends React.Component<Props> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props)
  }

  componentDidMount(): void {
    if (!document.querySelector('body')?.classList.contains('overflow-hidden')) {
      document.querySelector('body')!.classList.add('overflow-hidden')
    }
    document.querySelector('#ControlPanelWrapper')?.classList.add('fixed')

    const { templateDid, handleGetClaimTemplate } = this.props

    handleGetClaimTemplate(templateDid)
  }

  componentWillUnmount(): void {
    document.querySelector('body')?.classList.remove('overflow-hidden')
    document.querySelector('#ControlPanelWrapper')?.classList.remove('fixed')
  }

  render(): JSX.Element {
    const { claimTemplateIsLoading, entityDid, questions } = this.props

    if (claimTemplateIsLoading) {
      return <Spinner info={`Initialising claim form...`} />
    }

    return (
      <ActionWrapper className='open summary'>
        <FormContainer>
          <Instructions
            backLink={`/projects/${entityDid}/overview`}
            formLink={`/projects/${entityDid}/overview/action/new_claim/form`}
            listItems={
              questions.map((question) => ({
                title: question.schema.title,
                control: question.uiSchema[Object.keys(question.schema.properties!)[0]]['ui:widget'],
              })) as any
            }
          />
        </FormContainer>
      </ActionWrapper>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  questions: submitEntityClaimSelectors.selectQuestions(state),
  entityDid: selectedEntitySelectors.selectEntityDid(state),
  templateDid: selectedEntitySelectors.selectEntityClaimTemplateId(state),
  claimTemplateIsLoading: submitEntityClaimSelectors.selectIsLoading(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetClaimTemplate: (templateDid: any): void => dispatch(getClaimTemplate(templateDid)),
})

export const InstructionsContainerConnected = connect(mapStateToProps, mapDispatchToProps)(InstructionsContainer)
