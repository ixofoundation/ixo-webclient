import { FlexBox, SvgBox } from 'components/App/App.styles'
import FormCard from 'components/Card/FormCard'
import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ReactComponent as ArrowCircleRightIcon } from 'assets/images/icon-arrow-circle-right-solid.svg'
import { Button, InputWithLabel, Switch } from 'pages/CreateEntity/Components'
import { useTransferEntityState } from 'hooks/transferEntity'
import { validateDid, validateIid, validateWasmDid } from 'utils/validation'
import { useTheme } from 'styled-components'
import { Typography } from 'components/Typography'
import { ReactComponent as TimesCircleIcon } from 'assets/images/icon-times-circle.svg'
import { ReactComponent as CheckCircleIcon } from 'assets/images/icon-check-circle.svg'
import { ReactComponent as LockOpenIcon } from 'assets/images/icon-lock-open-solid.svg'
import { ReactComponent as InfoIcon } from 'assets/images/icon-info.svg'
import { AddLinkedResource, TransferEntity } from 'lib/protocol'
import { useAccount } from 'hooks/account'
import { errorToast, successToast } from 'utils/toast'
import { LinkedResource, VerificationMethod } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { customQueries, utils } from '@ixo/impactxclient-sdk'
import { chainNetwork } from 'hooks/configs'
import { LinkedResourceProofGenerator, LinkedResourceServiceEndpointGenerator } from 'utils/entities'

const VMKeyMap = {
  authentication: 'Authentication',
  assertionMethod: 'Assertion Method',
  keyAgreement: 'Key Agreement',
  capabilityInvocation: 'Capability Invocation',
  capabilityDelegation: 'Capability Delegation',
}

const TransferEntityTo: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { signingClient, signer } = useAccount()
  const { selectedEntity, recipientDid } = useTransferEntityState()
  const [
    daoGroups = {},
    verificationMethods = [],
    authentications = [],
    assertionMethods = [],
    keyAgreements = [],
    capabilityInvocations = [],
    capabilityDelegations = [],
  ] = useMemo(
    () => [
      selectedEntity?.daoGroups,
      selectedEntity?.verificationMethod,
      selectedEntity?.authentication,
      selectedEntity?.assertionMethod,
      selectedEntity?.keyAgreement,
      selectedEntity?.capabilityInvocation,
      selectedEntity?.capabilityDelegation,
    ],
    [selectedEntity],
  )

  const [reEnableKeys, setReEnablekeys] = useState(true)
  const [keyDescriptions, setKeyDescriptions] = useState(false)
  const [keys, setKeys] = useState<(VerificationMethod & { description?: string })[]>(verificationMethods)
  const [submitting, setSubmitting] = useState(false)

  const handleUpdateVMDescription = (vmId: string, value: string) => {
    setKeys((v) => v.map((item) => ({ ...item, description: item.id === vmId ? value : item.description })))
  }

  useEffect(() => {
    setKeys(verificationMethods)
  }, [verificationMethods])

  const getVMKeyType = (vmId: string): string => {
    if (authentications.includes(vmId)) {
      return 'authentication'
    } else if (assertionMethods.includes(vmId)) {
      return 'assertionMethod'
    } else if (keyAgreements.includes(vmId)) {
      return 'keyAgreement'
    } else if (capabilityInvocations.includes(vmId)) {
      return 'capabilityInvocation'
    } else if (capabilityDelegations.includes(vmId)) {
      return 'capabilityDelegation'
    }
    return ''
  }

  const onBack = () => {
    history.goBack()
  }

  const handleCreateDocument = async () => {
    try {
      const payload = {
        reEnableKeys,
        keys,
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await customQueries.cellnode.uploadWeb3Doc(
        utils.common.generateId(12),
        'application/ld+json',
        buff.toString('base64'),
        undefined,
        chainNetwork,
      )

      const linkedResource: LinkedResource = {
        id: '{id}#vm',
        type: 'text',
        description: 'verification key re-enabling',
        mediaType: 'application/ld+json',
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(res),
        proof: LinkedResourceProofGenerator(res),
        encrypted: 'false',
        right: '',
      }
      console.log({ linkedResource })
      const addRes = await AddLinkedResource(signingClient, signer, linkedResource)
      console.log('AddLinkedResource', addRes)
      successToast('Success', 'Successfully created document!')
    } catch (e) {
      console.error(e)
      errorToast('Error at Signing', e)
    }
  }

  const handleSigningTransfer = async () => {
    try {
      if (!entityId || !recipientDid) {
        // eslint-disable-next-line no-throw-literal
        throw 'EntityId or RecipientDid is invalid'
      }
      const { code, rawLog } = await TransferEntity(signingClient, signer, { id: entityId, recipientDid })
      if (code !== 0) {
        throw rawLog
      }
      successToast('Success', 'Successfully transferred!')
    } catch (e) {
      errorToast('Error at Signing', e)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    await handleCreateDocument()
    await handleSigningTransfer()

    setSubmitting(false)
  }

  return (
    <FlexBox width='100%' justifyContent='center'>
      <FlexBox maxWidth='800px' width='100%' direction='column' gap={5}>
        <FormCard
          preIcon={
            <SvgBox svgWidth={8} svgHeight={8} color='black'>
              <ArrowCircleRightIcon />
            </SvgBox>
          }
          title='Transferring to'
        >
          {validateIid(recipientDid) && (
            <FlexBox direction='column' gap={5} width='100%'>
              <InputWithLabel
                name='ixo_did'
                width='100%'
                height='48px'
                label='Recipient ixo did'
                inputValue={recipientDid}
                wrapperStyle={{
                  color: recipientDid ? (validateDid(recipientDid) ? theme.ixoGreen : theme.ixoRed) : theme.ixoNewBlue,
                }}
              />

              {recipientDid && !validateDid(recipientDid) && (
                <FlexBox width='100%' justifyContent='flex-end' alignItems='center' gap={2}>
                  <Typography size='xl'>Not a valid ixo DID</Typography>
                  <SvgBox color={theme.ixoRed}>
                    <TimesCircleIcon />
                  </SvgBox>
                </FlexBox>
              )}
              {recipientDid && validateDid(recipientDid) && (
                <FlexBox width='100%' justifyContent='flex-end' alignItems='center' gap={2}>
                  <Typography size='xl'>Valid ixo DID</Typography>
                  <SvgBox color={theme.ixoGreen}>
                    <CheckCircleIcon />
                  </SvgBox>
                </FlexBox>
              )}
            </FlexBox>
          )}
          {validateWasmDid(recipientDid) && (
            <FlexBox width='100%' alignItems='center' gap={4}>
              <InputWithLabel
                name='group_name'
                width='100%'
                height='48px'
                label='Group Name'
                inputValue={daoGroups[recipientDid.replace('did:ixo:wasm:', '')].config.name || ''}
              />
              <InputWithLabel
                name='entity_name'
                width='100%'
                height='48px'
                label='DAO Entity'
                inputValue={selectedEntity?.profile?.name}
              />
            </FlexBox>
          )}
        </FormCard>

        <FormCard
          preIcon={
            <SvgBox svgWidth={8} svgHeight={8} color='black'>
              <LockOpenIcon />
            </SvgBox>
          }
          title='Keys'
        >
          <Typography size='xl'>
            When transferring the entity, the existing keys (verification methods) will be removed. You can create a
            document with which the new owner can re-enable the keys. The document will be transferred along with the
            entity.
          </Typography>
          <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
            <Typography size='xl'>Create document to re-enable keys</Typography>
            <Switch size='md' onLabel='YES' offLabel='NO' value={reEnableKeys} onChange={setReEnablekeys} />
          </FlexBox>

          {!reEnableKeys && (
            <FlexBox
              width='100%'
              direction='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              borderRadius='8px'
              gap={5}
              p={3}
              background={`${theme.ixoDarkOrange}22`}
            >
              <FlexBox alignItems='center' color={theme.ixoDarkOrange} gap={1}>
                <SvgBox color='inherit' svgWidth={6} svgHeight={6}>
                  <InfoIcon />
                </SvgBox>
                <Typography size='xl'>Warning</Typography>
              </FlexBox>

              <Typography size='xl' color={theme.ixoBlack}>
                Are you sure you don’t want to create a document to re-enable keys?
              </Typography>
            </FlexBox>
          )}
        </FormCard>

        <Typography size='xl' color='blue' onClick={() => setKeyDescriptions((v) => !v)}>
          {!keyDescriptions ? 'Add' : 'Hide'} key descriptions
        </Typography>

        {keyDescriptions &&
          keys.map((vm, index) => {
            const vmKeyType = getVMKeyType(vm.id)
            return (
              <FormCard
                key={index}
                title={
                  <FlexBox alignItems='center' gap={4}>
                    <Typography color='black'>KEY #{index + 1}</Typography>
                    <FlexBox p={2} borderRadius={'8px'} background={'#A1E393'}>
                      <Typography color='black'>{VMKeyMap[vmKeyType]}</Typography>
                    </FlexBox>
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
                    .filter(([key]) => key !== 'description')
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
                  handleChange={(value) => handleUpdateVMDescription(vm.id, value)}
                />
              </FormCard>
            )
          })}

        <FlexBox alignItems='center' width='100%' gap={7}>
          <Button variant='secondary' size='full' height={48} onClick={onBack}>
            Back
          </Button>
          <Button disabled={!recipientDid} size='full' height={48} loading={submitting} onClick={handleSubmit}>
            Transfer Entity
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default TransferEntityTo
