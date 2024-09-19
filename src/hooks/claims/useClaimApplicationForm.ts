import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { useEntitiesQuery } from 'generated/graphql'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getSurveyJsResource } from 'services'

type ClaimApplicationFormProps = {
  collectionId: string
}

type UseClaimApplicationFormResult =
  | {
      claimApplicationForm: Record<string, any>
      status: 'success'
      error?: undefined
    }
  | {
      claimApplicationForm: undefined
      status: 'loading'
      error?: undefined
    }
  | {
      claimApplicationForm: undefined
      status: 'error'
      error: string
    }

type UseClaimApplicationForm = (props: ClaimApplicationFormProps) => UseClaimApplicationFormResult

export const useClaimApplicationForm: UseClaimApplicationForm = ({ collectionId }) => {
  const [result, setResult] = useState<UseClaimApplicationFormResult>({
    claimApplicationForm: undefined,
    status: 'loading',
  })

  const { data: deedOffers, loading } = useEntitiesQuery({
    variables: {
      filter: {
        type: {
          equalTo: 'deed/offer',
        },
      },
    },
  })

  const handleSetClaimApplicationForm = useCallback((form: any) => {
    setResult({ claimApplicationForm: form, status: 'success' })
  }, [])

  const handleClaimApplicationError = useCallback((error: any) => {
    setResult({ claimApplicationForm: undefined, status: 'error', error: JSON.stringify(error) })
  }, [])

  const claimCollectionDeedEntity = useMemo(() => {
    return deedOffers?.entities?.nodes?.find((entity) =>
      entity.linkedEntity.find((entity: LinkedEntity) => entity.id === collectionId),
    )
  }, [deedOffers?.entities?.nodes, collectionId])

  useEffect(() => {
    if (loading) return

    if (!claimCollectionDeedEntity) {
      return handleClaimApplicationError('Claim application form not found')
    }

    const survey = claimCollectionDeedEntity.linkedResource.find(
      (entity: LinkedEntity) => entity.type === 'surveyTemplate',
    )

    if (survey) {
      getSurveyJsResource({ resource: survey, service: claimCollectionDeedEntity.service })
        .then((response) => {
          handleSetClaimApplicationForm(response)
        })
        .catch((error) => handleClaimApplicationError(error))
    }
  }, [claimCollectionDeedEntity, handleClaimApplicationError, handleSetClaimApplicationForm, loading])

  return result
}
