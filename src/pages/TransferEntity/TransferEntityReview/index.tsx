import { ixo } from '@ixo/impactxclient-sdk'
import { FlexBox } from 'components/App/App.styles'
import FormCard from 'components/Card/FormCard'
import { InputWithLabel } from 'components/Form/InputWithLabel'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
// import { VMKeyMap } from 'constants/entity'
import { useTransferEntityState } from 'hooks/transferEntity'
import { AddVerificationMethod, DeleteLinkedResource, UpdateEntity } from 'lib/protocol'
import { Button, Switch } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { serviceEndpointToUrl } from 'utils/entities'
import { errorToast, successToast } from 'utils/toast'

const TransferEntityReview: React.FC = () => {
  const theme: any = useTheme()
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { signingClient, signer } = useAccount()
  const { selectedEntity } = useTransferEntityState()
  const [submitting, setSubmitting] = useState(false)
  const [
    authentications = [],
    assertionMethods = [],
    keyAgreements = [],
    capabilityInvocations = [],
    capabilityDelegations = [],
    service = [],
    transferDocument = undefined,
  ] = useMemo(
    () => [
      selectedEntity?.authentication,
      selectedEntity?.assertionMethod,
      selectedEntity?.keyAgreement,
      selectedEntity?.capabilityInvocation,
      selectedEntity?.capabilityDelegation,
      selectedEntity?.service,
      selectedEntity?.linkedResource.find((v) => v.type === 'VerificationMethods'),
    ],
    [selectedEntity],
  )

  const [verificationMethods, setVerificationMethods] = useState<any[]>([])

  console.log({
    verificationMethods,
    authentications,
    assertionMethods,
    keyAgreements,
    capabilityInvocations,
    capabilityDelegations,
  })

  const isEligible = useMemo(() => verificationMethods.some((v) => v.reEnable), [verificationMethods])

  useEffect(() => {
    if (transferDocument) {
      const { serviceEndpoint } = transferDocument
      const url = serviceEndpointToUrl(serviceEndpoint, service)
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          setVerificationMethods((response.keys ?? []).map((v: any) => ({ ...v, reEnable: true })))
        })
        .catch((e) => {
          setVerificationMethods([])
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferDocument])

  // const getVMKeyType = (vmId: string): string => {
  //   if (authentications.includes(vmId)) {
  //     return 'authentication'
  //   } else if (assertionMethods.includes(vmId)) {
  //     return 'assertionMethod'
  //   } else if (keyAgreements.includes(vmId)) {
  //     return 'keyAgreement'
  //   } else if (capabilityInvocations.includes(vmId)) {
  //     return 'capabilityInvocation'
  //   } else if (capabilityDelegations.includes(vmId)) {
  //     return 'capabilityDelegation'
  //   }
  //   return ''
  // }

  const handleUpdateVMReEnable = (vmId: string, value: boolean) => {
    setVerificationMethods((v) => v.map((item) => ({ ...item, reEnable: item.id === vmId ? value : item.reEnable })))
  }

  const handleAddVerificationMethods = async (): Promise<boolean> => {
    try {
      const verifications = verificationMethods
        .filter((v) => v.reEnable)
        .map((v) => {
          return ixo.iid.v1beta1.Verification.fromPartial({
            relationships: ['authentication'],
            method: ixo.iid.v1beta1.VerificationMethod.fromPartial({
              id: v.id,
              type: v.type,
              controller: v.controller,
              blockchainAccountID: v.blockchainAccountID,
              publicKeyHex: v.publicKeyHex,
              publicKeyMultibase: v.publicKeyMultibase,
              publicKeyBase58: v.publicKeyBase58,
            }),
          })
        })

      const response = await AddVerificationMethod(signingClient, signer, { did: entityId, verifications })
      if (response.code !== 0) {
        throw response.rawLog
      }
      console.info('handleAddVerificationMethods', { response })
      successToast('Success', 'Successfully updated status to transferred!')
      return true
    } catch (e) {
      console.error('handleAddVerificationMethods', e)
      errorToast('Error at Signing', typeof e === 'string' && e)
      return false
    }
  }

  const handleUpdateStatusToCreated = async (): Promise<boolean> => {
    try {
      if (!entityId) {
        // eslint-disable-next-line no-throw-literal
        throw 'EntityId or RecipientDid is invalid'
      }

      const response = await UpdateEntity(signingClient, signer, { id: entityId, entityStatus: 0 })
      if (response.code !== 0) {
        throw response.rawLog
      }
      console.info('handleUpdateStatusToCreated', { response })
      successToast('Success', 'Successfully updated status to transferred!')
      return true
    } catch (e) {
      console.error('handleUpdateStatusToTransferred', e)
      errorToast('Error at Signing', typeof e === 'string' && e)
      return false
    }
  }

  const handleRemoveDocument = async (): Promise<boolean> => {
    try {
      if (!transferDocument?.id) {
        // eslint-disable-next-line no-throw-literal
        throw 'Resource Id is empty'
      }
      const addRes = await DeleteLinkedResource(signingClient, signer, transferDocument?.id)
      if (addRes.code !== 0) {
        throw addRes.rawLog
      }
      successToast('Success', 'Successfully removed document!')
      return true
    } catch (e) {
      console.error('handleRemoveDocument', e)
      errorToast('Error at Signing', typeof e === 'string' && e)
      return false
    }
  }

  const onBack = () => {
    history.goBack()
  }

  const onSubmit = async () => {
    setSubmitting(true)

    const added = await handleAddVerificationMethods()
    if (added) {
      const updateStatus = await handleUpdateStatusToCreated()
      if (updateStatus) {
        const removeStatus = await handleRemoveDocument()
        if (removeStatus) {
          history.push(`/entity/${entityId}/dashboard`)
        }
      }
    }

    setSubmitting(false)
  }

  return (
    <FlexBox width='100%' justifyContent='center'>
      <FlexBox maxWidth='800px' width='100%' direction='column' gap={5}>
        <Typography>The former owner of the entity created a document to re-enable verification keys.</Typography>

        {verificationMethods.map((vm: any, index) => {
          return (
            <FormCard
              key={index}
              title={
                <FlexBox width='100%' alignItems='center' justifyContent='space-between' gap={4}>
                  <Typography color='black'>KEY #{index + 1}</Typography>
                  <Switch
                    size='base'
                    onLabel='RE-ENABLE'
                    value={vm.reEnable}
                    onChange={(value) => handleUpdateVMReEnable(vm.id, value)}
                  />
                </FlexBox>
              }
            >
              <FlexBox
                direction='column'
                width='100%'
                background={theme.ixoGrey100}
                borderRadius='8px'
                gap={2}
                p={4}
                color='black'
              >
                {Object.entries(vm)
                  .filter(([key]) => key !== 'description' && key !== 'reEnable')
                  .map(([key, value]) => (
                    <Typography key={key} wordBreak={'break-all'}>
                      {key}: {value}
                    </Typography>
                  ))}
              </FlexBox>
              <InputWithLabel
                width='100%'
                height='48px'
                label='Verification Description'
                inputValue={vm.description || ''}
              />
            </FormCard>
          )
        })}

        <FlexBox alignItems='center' width='100%' gap={7}>
          <Button variant='secondary' size='full' height={48} onClick={onBack}>
            Back
          </Button>
          <Button size='full' height={48} loading={submitting} disabled={!isEligible} onClick={onSubmit}>
            Re-enable keys
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default TransferEntityReview
