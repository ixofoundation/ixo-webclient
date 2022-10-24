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
  AdditionalFilterList,
  IconWrapper,
  SDGList,
  SDGIcon,
} from './TemplateContent.styles'
import { ReactComponent as ChevDownIcon } from 'assets/images/icon-chev-down.svg'
import { selectEntityDdoTags } from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { selectFilterSchemaSdgDdoTags } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'

interface Props {
  templateId: string
  isTemplateLoading?: boolean
  questions?: QuestionForm[]
  attestationContent?: Attestation
  ddoTags?: {
    category: string
    tags: string[]
  }[]
  configSDGTags?: any[]
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
    const { attestationContent, ddoTags, questions, configSDGTags } = this.props
    const { claimInfo } = attestationContent
    const impactCategory =
      ddoTags.find((ddoTag) => ddoTag.category === 'impactCategory')?.tags ?? []
    const targetAudience =
      ddoTags.find((ddoTag) => ddoTag.category === 'targetAudience')?.tags ?? []
    const impactTheme =
      ddoTags.find((ddoTag) => ddoTag.category === 'impactTheme')?.tags ?? []
    const librarySource =
      ddoTags.find((ddoTag) => ddoTag.category === 'librarySource')?.tags ?? []
    const metricLevel =
      ddoTags.find((ddoTag) => ddoTag.category === 'metricLevel')?.tags ?? []
    const sdgs = ddoTags.find((ddoTag) => ddoTag.category === 'SDG')?.tags ?? []
    const sdgDetails = sdgs
      .map((sdg) => {
        const found = configSDGTags.find((commonSdg) => commonSdg.name === sdg)
        if (!found) {
          return undefined
        }
        return found
      })
      .filter((img) => img)

    const handleToggleUserGuide = (): void =>
      this.setState({ toggleUserGuide: !this.state.toggleUserGuide })

    const handleToggleReference = (): void =>
      this.setState({ toggleReference: !this.state.toggleReference })

    return (
      <>
        <SDGList>
          {sdgDetails.map((detail, index) => (
            <SDGIcon key={index}>
              <span>{detail.name}</span>
              <img src={require(`assets/images/sdg/${detail.icon}`)} alt="" />
            </SDGIcon>
          ))}
        </SDGList>
        <AdditionalInfoList>
          {claimInfo.feature && (
            <AdditionalInfoRow>
              <AdditionalInfoTitle>Feature:&nbsp;</AdditionalInfoTitle>
              <AdditionalInfoContent>
                {questions.length} items in {claimInfo.feature}
              </AdditionalInfoContent>
            </AdditionalInfoRow>
          )}
          {claimInfo.reliability && (
            <AdditionalInfoRow>
              <AdditionalInfoTitle>Reliability:&nbsp;</AdditionalInfoTitle>
              <AdditionalInfoContent>
                {claimInfo.reliability}
              </AdditionalInfoContent>
            </AdditionalInfoRow>
          )}
          {librarySource.length > 0 && (
            <AdditionalInfoRow>
              <AdditionalInfoTitle>Library/Source:&nbsp;</AdditionalInfoTitle>
              <AdditionalInfoContent>
                {librarySource.join(', ')}
              </AdditionalInfoContent>
            </AdditionalInfoRow>
          )}
          {claimInfo.userGuide && (
            <AdditionalInfoRow direction="column">
              <AdditionalInfoTitle>
                User guide
                <IconWrapper
                  onClick={handleToggleUserGuide}
                  collapsed={!this.state.toggleUserGuide}
                >
                  <ChevDownIcon />
                </IconWrapper>
              </AdditionalInfoTitle>
              {this.state.toggleUserGuide && (
                <AdditionalInfoContent>
                  {claimInfo.userGuide}
                </AdditionalInfoContent>
              )}
            </AdditionalInfoRow>
          )}
          {claimInfo.reference && (
            <AdditionalInfoRow direction="column">
              <AdditionalInfoTitle>
                Reference
                <IconWrapper
                  onClick={handleToggleReference}
                  collapsed={!this.state.toggleReference}
                >
                  <ChevDownIcon />
                </IconWrapper>
              </AdditionalInfoTitle>
              {this.state.toggleReference && (
                <AdditionalInfoContent>
                  {claimInfo.reference}
                </AdditionalInfoContent>
              )}
            </AdditionalInfoRow>
          )}
          {claimInfo.keywords && claimInfo.keywords.length > 0 && (
            <AdditionalInfoRow>
              <AdditionalInfoTitle>Keywords:&nbsp;</AdditionalInfoTitle>
              <AdditionalInfoContent>
                {claimInfo.keywords.join(', ')}
              </AdditionalInfoContent>
            </AdditionalInfoRow>
          )}
        </AdditionalInfoList>

        <AdditionalFilterList>
          {targetAudience.length > 0 && (
            <AdditionalInfoRow>
              <AdditionalInfoTitle>Target Audience:&nbsp;</AdditionalInfoTitle>
              <AdditionalInfoContent>
                {targetAudience.join(', ')}
              </AdditionalInfoContent>
            </AdditionalInfoRow>
          )}
          {metricLevel.length > 0 && (
            <AdditionalInfoRow>
              <AdditionalInfoTitle>Metric Level:&nbsp;</AdditionalInfoTitle>
              <AdditionalInfoContent>
                {metricLevel.join(', ')}
              </AdditionalInfoContent>
            </AdditionalInfoRow>
          )}
          {impactCategory.length > 0 && (
            <AdditionalInfoRow>
              <AdditionalInfoTitle>Impact Category:&nbsp;</AdditionalInfoTitle>
              <AdditionalInfoContent>
                {impactCategory.join(', ')}
              </AdditionalInfoContent>
            </AdditionalInfoRow>
          )}
          {impactTheme.length > 0 && (
            <AdditionalInfoRow>
              <AdditionalInfoTitle>Impact Themes:&nbsp;</AdditionalInfoTitle>
              <AdditionalInfoContent>
                {impactTheme.join(', ')}
              </AdditionalInfoContent>
            </AdditionalInfoRow>
          )}
        </AdditionalFilterList>
      </>
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
  ddoTags: selectEntityDdoTags(state),
  configSDGTags: selectFilterSchemaSdgDdoTags(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetClaimTemplate: (templateDid): void =>
    dispatch(getClaimTemplate(templateDid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateContent)
