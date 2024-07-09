import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { useEntitiesQuery } from 'generated/graphql'
import { useEffect, useMemo, useState } from 'react'
import { getSurveyJsResource } from 'services'

type ClaimApplicationFormProps = {
  collectionId: string
}
export const useClaimApplicationForm = ({ collectionId }: ClaimApplicationFormProps) => {
  const [claimApplicationForm, setClaimApplicationForm] = useState<any>(undefined)
  const [claimApplicationError, setClaimApplicationError] = useState<any>(undefined)

  const { data: deedOffers } = useEntitiesQuery({
    variables: {
      filter: {
        type: {
          equalTo: 'deed/offer',
        },
      },
    },
  })

  const claimCollectionDeedEntity = useMemo(() => {
    return deedOffers?.entities?.nodes?.find((entity) =>
      entity.linkedEntity.find((entity: LinkedEntity) => entity.id === collectionId),
    )
  }, [deedOffers?.entities?.nodes, collectionId])

  useEffect(() => {
    if (claimCollectionDeedEntity) {
      const survey = claimCollectionDeedEntity.linkedResource.find(
        (entity: LinkedEntity) => entity.type === 'surveyTemplate',
      )
      if (survey) {
        getSurveyJsResource({ resource: survey, service: claimCollectionDeedEntity.service })
          .then((response) => {
            setClaimApplicationForm(response)
          })
          .catch((error) => setClaimApplicationError(error))
      }
    } else {
        setClaimApplicationError('Claim application form not found')
    }
  }, [claimCollectionDeedEntity])

  return { claimApplicationForm, claimApplicationError }
}
