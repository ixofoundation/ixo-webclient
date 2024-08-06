import Image from 'next/image'
import { FormCard } from 'components'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, InputWithLabel, Switch } from 'screens/CreateEntity/Components'
import { useTransferEntityState } from 'hooks/transferEntity'
import { validateDid, validateWasmDid } from 'utils/validation'
import { Flex, useMantineTheme } from '@mantine/core'
import { Typography } from 'components/Typography'
import { errorToast, successToast } from 'utils/toast'
import { VerificationMethod } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { VMKeyMap } from 'constants/entity'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { IconInfo } from 'components/IconPaths'
import { IconTimesCircle } from 'components/IconPaths'
import { IconArrowCircleRightSolid, IconLockOpenSolid, IconCheckCircle } from 'components/IconPaths'

const TransferEntityTo: React.FC = (): JSX.Element => {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const currentEntity = useAppSelector(getEntityById(entityId))
  const { recipientDid, updateRecipientDid, handleTransfer } = useTransferEntityState()
  const { close } = useWallet()

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
      currentEntity?.daoGroups,
      currentEntity?.verificationMethod,
      currentEntity?.authentication,
      currentEntity?.assertionMethod,
      currentEntity?.keyAgreement,
      currentEntity?.capabilityInvocation,
      currentEntity?.capabilityDelegation,
    ],
    [currentEntity],
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
    return () => {
      setKeys([])
    }
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
    navigate(-1)
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      await handleTransfer({ reEnableKeys, keys, entityId })
      successToast('Success', 'Successfully transferred!')
      setSubmitting(false)
      close()
      navigate(`/entity/${entityId}/dashboard`)
    } catch (error) {
      setSubmitting(false)

      errorToast('Error at Signing', typeof error === 'string' && error)
    }
  }

  return (
    <Flex w='100%' justify='center'>
      <Flex maw='800px' w='100%' direction='column' gap={5}>
        <FormCard
          preIcon={
            <Image
              src={IconArrowCircleRightSolid}
              alt='ArrowCircleRight'
              width={5}
              height={5}
              color={theme.colors.blue[5]}
            />
          }
          title='Transferring to'
        >
          {validateWasmDid(recipientDid) ? (
            <Flex w='100%' align='center' gap={4}>
              <InputWithLabel
                name='group_name'
                width='100%'
                height='48px'
                label='Group Name'
                inputValue={daoGroups[recipientDid.replace('did:ixo:wasm:', '')]?.config?.name || ''}
              />
              <InputWithLabel
                name='entity_name'
                width='100%'
                height='48px'
                label='DAO Entity'
                inputValue={currentEntity?.profile?.name}
              />
            </Flex>
          ) : (
            <Flex direction='column' gap={5} w='100%'>
              <InputWithLabel
                name='ixo_did'
                width='100%'
                height='48px'
                label='Recipient ixo did'
                inputValue={recipientDid}
                wrapperStyle={{
                  color: recipientDid
                    ? validateDid(recipientDid)
                      ? theme.colors.green[5]
                      : theme.colors.red[5]
                    : theme.colors.blue[5],
                }}
                handleChange={updateRecipientDid}
              />

              {recipientDid && !validateDid(recipientDid) && (
                <Flex w='100%' justify='flex-end' align='center' gap={2}>
                  <Typography size='xl'>Not a valid ixo DID</Typography>
                  <Image src={IconTimesCircle} alt='TimesCircle' width={5} height={5} color={theme.colors.blue[5]} />
                </Flex>
              )}
              {recipientDid && validateDid(recipientDid) && (
                <Flex w='100%' justify='flex-end' align='center' gap={2}>
                  <Typography size='xl'>Valid ixo DID</Typography>
                  <Image src={IconCheckCircle} alt='CheckCircle' width={5} height={5} color={theme.colors.blue[5]} />
                </Flex>
              )}
            </Flex>
          )}
        </FormCard>

        <FormCard
          preIcon={<Image src={IconLockOpenSolid} alt='LockOpen' width={5} height={5} color={theme.colors.blue[5]} />}
          title='Keys'
        >
          <Typography size='xl'>
            When transferring the entity, the existing keys (verification methods) will be removed. You can create a
            document with which the new owner can re-enable the keys. The document will be transferred along with the
            entity.
          </Typography>
          <Flex w='100%' justify='space-between' align='center'>
            <Typography size='xl'>Create document to re-enable keys</Typography>
            <Switch size='md' onLabel='YES' offLabel='NO' value={reEnableKeys} onChange={setReEnablekeys} />
          </Flex>

          {!reEnableKeys && (
            <Flex
              w='100%'
              direction='column'
              align='center'
              justify='center'
              gap={5}
              p={3}
              bg={`${theme.colors.orange[5]}22`}
            >
              <Flex align='center' color={theme.colors.orange[5]} gap={1}>
                <Image src={IconInfo} alt='Info' width={5} height={5} color={theme.colors.blue[5]} />

                <Typography size='xl'>Warning</Typography>
              </Flex>

              <Typography size='xl' color={theme.colors.blue[5]}>
                Are you sure you don’t want to create a document to re-enable keys?
              </Typography>
            </Flex>
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
                  <Flex align='center' gap={4}>
                    <Typography color='black'>KEY #{index + 1}</Typography>
                    <Flex p={2} bg={`${theme.colors.green[5]}22`}>
                      <Typography color='black'>{VMKeyMap[vmKeyType]}</Typography>
                    </Flex>
                  </Flex>
                }
              >
                <Flex direction='column' w='100%' bg={theme.colors.gray[1]} gap={2} p={4} color='black'>
                  {Object.entries(vm)
                    .filter(([key]) => key !== 'description')
                    .map(([key, value]) => (
                      <Typography key={key} $wordBreak={'break-all'}>
                        {key}: {value}
                      </Typography>
                    ))}
                </Flex>
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

        <Flex align='center' w='100%' gap={7}>
          <Button variant='secondary' size='full' height={48} onClick={onBack}>
            Back
          </Button>
          <Button disabled={!recipientDid} size='full' height={48} loading={submitting} onClick={handleSubmit}>
            Transfer Entity
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TransferEntityTo
