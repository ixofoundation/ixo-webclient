import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { useClaimCollectionQuery, useEntityLazyQuery } from 'generated/graphql'
import { useEffect, useState } from 'react'
import { getSurveyJsResource } from 'services'

export const useSurveyTemplate = ({ claimCollectionId }: { claimCollectionId: string }) => {
  const [surveyTemplate, setSurveyTemplate] = useState<any>(undefined)

  const { data: collection } = useClaimCollectionQuery({
    variables: {
      claimCollectionId,
    },
  })

  const [getProtocol] = useEntityLazyQuery()

  useEffect(() => {
    if (collection?.claimCollection?.protocol) {
      getProtocol({ variables: { id: collection?.claimCollection?.protocol } }).then(({ data }) => {
        const survey = data?.entity?.linkedResource.find(
          (resource: LinkedResource) => resource.type === 'surveyTemplate',
        )
        if (survey) {
          getSurveyJsResource({ resource: survey, service: data?.entity?.service }).then((response) => {
            setSurveyTemplate(response)
          })
        }
      })
    }
  }, [collection, getProtocol])

  return surveyTemplate
}
