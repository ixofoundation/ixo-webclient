import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { getClaimTemplate } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.actions'
import * as submitEntityClaimSelectors from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.selectors'
import { QuestionForm } from 'modules/EntityClaims/types'
import TemplateCard from './TemplateCard'

interface Props {
  templateId: string
  isTemplateLoading?: boolean
  questions?: QuestionForm[]
  handleGetClaimTemplate?: (claimTemplateId: string) => void
}

class TemplateContent extends React.Component<Props> {
  componentDidMount(): void {
    const { templateId, handleGetClaimTemplate } = this.props;
    handleGetClaimTemplate(templateId);
  }

  render(): JSX.Element[] {
    const { isTemplateLoading, questions } = this.props;
    if (isTemplateLoading) {
      return null;
    }

    return questions.map((question, index): JSX.Element => {
      return (
        <TemplateCard
          question={ question }
          key={ index }
        />
      )
    })
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  isTemplateLoading: submitEntityClaimSelectors.selectIsLoading(state),
  questions: submitEntityClaimSelectors.selectQuestions(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetClaimTemplate: (templateDid): void =>
    dispatch(getClaimTemplate(templateDid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateContent);