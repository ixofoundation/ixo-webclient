import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { getClaimTemplate } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.actions'
import * as submitEntityClaimSelectors from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.selectors'
import { Attestation, QuestionForm } from 'modules/EntityClaims/types'
import TemplateCard from './TemplateCard'
import { selectAttestationContent } from '../../EntityOverview.selectors'
import {
  AdditionalInfoList,
  AdditionalInfoRow,
  AdditionalInfoContent,
  AdditionalInfoTitle,
} from './TemplateContent.styles'
import { ReactComponent as ChevDownIcon } from 'assets/images/exchange/chev-down.svg'

interface Props {
  templateId: string
  isTemplateLoading?: boolean
  questions?: QuestionForm[]
  attestationContent?: Attestation
  handleGetClaimTemplate?: (claimTemplateId: string) => void
}

interface State {
  toggleUserGuide: boolean
  toggleReference: boolean
}

class TemplateContent extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      toggleUserGuide: true,
      toggleReference: true,
    }
  }

  componentDidMount(): void {
    const { templateId, handleGetClaimTemplate } = this.props
    handleGetClaimTemplate(templateId)
  }

  renderAdditionalInfo(): JSX.Element {
    const { attestationContent } = this.props
    const { claimInfo } = attestationContent

    const handleToggleUserGuide = (): void =>
      this.setState({ toggleUserGuide: !this.state.toggleUserGuide })

    const handleToggleReference = (): void =>
      this.setState({ toggleReference: !this.state.toggleReference })

    return (
      <AdditionalInfoList>
        <AdditionalInfoRow>
          <AdditionalInfoTitle>Feature:&nbsp;</AdditionalInfoTitle>
          <AdditionalInfoContent>{claimInfo.feature}</AdditionalInfoContent>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <AdditionalInfoTitle>Reliability:&nbsp;</AdditionalInfoTitle>
          <AdditionalInfoContent>{claimInfo.reliability}</AdditionalInfoContent>
        </AdditionalInfoRow>
        <AdditionalInfoRow direction="column">
          <AdditionalInfoTitle>
            User guide
            <ChevDownIcon onClick={handleToggleUserGuide} />
          </AdditionalInfoTitle>
          <AdditionalInfoContent>{claimInfo.userGuide}</AdditionalInfoContent>
        </AdditionalInfoRow>
        <AdditionalInfoRow direction="column">
          <AdditionalInfoTitle>
            Reference
            <ChevDownIcon onClick={handleToggleReference} />
          </AdditionalInfoTitle>
          <AdditionalInfoContent>{claimInfo.reference}</AdditionalInfoContent>
        </AdditionalInfoRow>
        <AdditionalInfoRow>
          <AdditionalInfoTitle>Keywords:&nbsp;</AdditionalInfoTitle>
          <AdditionalInfoContent>
            {claimInfo.keywords.join(', ')}
          </AdditionalInfoContent>
        </AdditionalInfoRow>
      </AdditionalInfoList>
    )
  }

  render(): JSX.Element {
    const { isTemplateLoading, questions } = this.props
    if (isTemplateLoading) {
      return null
    }

    return (
      <>
        {this.renderAdditionalInfo()}
        {questions.map(
          (question, index): JSX.Element => {
            return <TemplateCard question={question} key={index} />
          },
        )}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  isTemplateLoading: submitEntityClaimSelectors.selectIsLoading(state),
  questions: submitEntityClaimSelectors.selectQuestions(state),
  attestationContent: selectAttestationContent(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetClaimTemplate: (templateDid): void =>
    dispatch(getClaimTemplate(templateDid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateContent)
