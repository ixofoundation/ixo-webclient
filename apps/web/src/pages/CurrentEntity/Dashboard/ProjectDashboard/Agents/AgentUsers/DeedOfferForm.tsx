import { FlexBox } from 'components/App/App.styles'
import { useGetOfferFormByClaimCollectionId } from 'graphql/entities'
import React, { useEffect, useMemo, useState } from 'react'
import { Survey } from 'survey-react-ui'
import { Model } from 'survey-core'
import { TEntityModel } from 'types/entities'
import { themeJson } from 'styles/surveyTheme'
import { customQueries } from '@ixo/impactxclient-sdk'
import { chainNetwork } from 'hooks/configs'

interface Props {
  collectionId: string
  agent: TEntityModel
}

const DeedOfferForm: React.FC<Props> = ({ collectionId, agent }) => {
  const offerQuestionForm = useGetOfferFormByClaimCollectionId(collectionId)
  const [answerData, setAnswerData] = useState<any>({})

  const deedOfferId = useMemo(
    () => agent.linkedResource.find((v) => v.description.split('#')[0] === collectionId)?.proof,
    [agent, collectionId],
  )

  useEffect(() => {
    if (deedOfferId) {
      customQueries.cellnode
        .getPublicDoc(deedOfferId, undefined, chainNetwork)
        .then((response) => {
          setAnswerData(response)
        })
        .catch((e) => {
          console.error('getPublicDoc', e)
          setAnswerData({})
        })
      return () => {
        setAnswerData({})
      }
    }
  }, [deedOfferId])

  const survey = useMemo(() => {
    if (!offerQuestionForm) {
      return undefined
    }
    const survey = new Model(offerQuestionForm)
    survey.applyTheme(themeJson)
    survey.data = answerData
    survey.allowCompleteSurveyAutomatic = false
    survey.mode = 'display'

    return survey
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerQuestionForm, answerData])

  return (
    <FlexBox $direction='column' width='100%' $gap={7}>
      {survey && <Survey model={survey} />}
    </FlexBox>
  )
}

export default DeedOfferForm
