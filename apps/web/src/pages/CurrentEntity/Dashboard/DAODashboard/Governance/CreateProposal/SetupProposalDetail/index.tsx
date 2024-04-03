import React, { useState, useMemo, useEffect } from 'react'
import { Flex } from '@mantine/core'
import styled from 'styled-components'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from 'pages/CreateEntity/Components'
import { useNavigate, useParams } from 'react-router-dom'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { themeJson } from 'styles/surveyTheme'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { apiEntityToEntity, serviceEndpointToUrl } from 'utils/entities'
import { useAppSelector } from 'redux/hooks'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useQuery } from 'hooks/window'
import { TProposalActionModel } from 'types/entities'
import { v4 as uuidv4 } from 'uuid'
import { ProposalActionConfigMap } from 'constants/entity'

export const Wrapper = styled(Flex)`
  font-family: ${(props): string => props.theme.secondaryFontFamily};

  .ce-block,
  .ce-toolbar {
    &__content {
      max-width: 100%;
      margin: 0;
    }
  }

  .cdx-button,
  .ce-header[contentEditable='true'][data-placeholder]::before {
    color: ${(props) => props.theme.ixoGrey700};
  }

  .cdx-button {
    border: none;
    box-shadow: none;
    padding: 0;
  }
`

const SetupProposalDetail: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const [questionFormData, setQuestionFormData] = useState<any[]>([])
  const { getQuery } = useQuery()
  const selectedTemplateEntityId = getQuery('selectedTemplateEntityId')

  const { updateProposal } = useCreateEntityState()

  const templateEntity = useAppSelector(selectEntityById(selectedTemplateEntityId))
  const [proposalActionType, setProposalActionType] = useState()

  useEffect(() => {
    if (templateEntity && (templateEntity?.linkedResource ?? []).length > 0) {
      const claimSchemaLinkedResources: LinkedResource[] = templateEntity.linkedResource.filter(
        (item: LinkedResource) => item.type === 'surveyTemplate',
      )

      ;(async () => {
        const responses = await Promise.all(
          claimSchemaLinkedResources.map((item) => {
            const url = serviceEndpointToUrl(item.serviceEndpoint, templateEntity.service)
            return fetch(url)
              .then((response) => response.json())
              .then((response) => {
                return response
              })
          }),
        )
        setQuestionFormData(responses.map((response) => response.question))
      })()
    }
    return () => {
      setQuestionFormData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(templateEntity?.linkedResource ?? [])])

  useEffect(() => {
    apiEntityToEntity({ entity: templateEntity }, (key, value) => {
      if (key === 'proposalAction') {
        setProposalActionType(value)
      }
    })
  }, [templateEntity])

  const handleMakeProposalData = (data: Record<string, any>) => {
    const pregeneratedProposal: TProposalActionModel = {
      id: uuidv4(),
      text: ProposalActionConfigMap[proposalActionType!]?.text,
      group: ProposalActionConfigMap[proposalActionType!]?.group,
      data: data,
    }
    updateProposal({ actions: [pregeneratedProposal] })
  }

  const survey = useMemo(() => {
    if (!questionFormData[0]) {
      return undefined
    }
    const survey = new Model(questionFormData[0])
    survey.applyTheme(themeJson)
    survey.allowCompleteSurveyAutomatic = survey.pane

    survey.onCompleting.add((sender: any, options: any) => {
      console.log(
        111111111,
        sender,
        sender.data,
        survey.getPlainData({ includeEmpty: true, includeValues: true, includeQuestionTypes: true }),
        survey.toJSON(),
      )
      handleMakeProposalData(sender.data)
    })

    survey.completeText = 'Submit'
    return survey
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionFormData])

  const handleBack = (): void => {
    navigate(
      `/entity/${entityId}/dashboard/governance/${coreAddress}/template?selectedTemplateEntityId=${selectedTemplateEntityId}`,
    )
  }
  const handleNext = (): void => {
    navigate(
      `/entity/${entityId}/dashboard/governance/${coreAddress}/page?selectedTemplateEntityId=${selectedTemplateEntityId}`,
    )
  }

  return (
    <Wrapper direction={'column'} gap={50} w='100%'>
      <Flex direction={'column'} gap={24} w='100%'>
        {survey && <Survey model={survey} />}
      </Flex>
      <Flex align={'center'}>
        <Flex gap={20}>
          <Button variant='secondary' onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext}>Continue</Button>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default SetupProposalDetail
