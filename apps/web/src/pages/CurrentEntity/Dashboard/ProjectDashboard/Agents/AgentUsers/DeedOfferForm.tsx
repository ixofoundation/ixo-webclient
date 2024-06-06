import { FlexBox } from 'components/App/App.styles'
import { useGetOfferFormByClaimCollectionId } from 'graphql/entities'
import React, { useEffect, useMemo, useState } from 'react'
import { customQueries } from '@ixo/impactxclient-sdk'
import { chainNetwork } from 'hooks/configs'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { DisplaySurvey } from 'components/Survey'

interface Props {
  collectionId: string
  agent: IidDocument
}

const DeedOfferForm: React.FC<Props> = ({ collectionId, agent }) => {
  const offerQuestionForm = useGetOfferFormByClaimCollectionId(collectionId)
  const [answerData, setAnswerData] = useState<any>(null)

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
          setAnswerData(null)
        })
      return () => {
        setAnswerData(null)
      }
    }
  }, [deedOfferId])

  return (
    <FlexBox $direction='column' width='100%' $gap={7}>
      {offerQuestionForm && answerData && deedOfferId && <DisplaySurvey surveyId={deedOfferId} surveyJson={offerQuestionForm} surveyData={answerData} />}
    </FlexBox>
  )
}

export default DeedOfferForm
