import { FlexBox } from 'components/App/App.styles'
import React, { useMemo } from 'react'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { themeJson } from 'styles/surveyTheme'
import { useGetOfferFormByClaimCollectionId } from 'graphql/entities'

interface Props {
  claimCollectionId: string
}

const OfferForm: React.FC<Props> = ({ claimCollectionId }) => {
  const claimQuestion = useGetOfferFormByClaimCollectionId(claimCollectionId)

  const survey = useMemo(() => {
    if (!claimQuestion) {
      return undefined
    }
    const survey = new Model(claimQuestion)
    survey.applyTheme(themeJson)
    return survey
  }, [claimQuestion])

  return (
    <FlexBox direction='column' width='100%' gap={7}>
      {survey && <Survey model={survey} />}
    </FlexBox>
  )
}

export default OfferForm
