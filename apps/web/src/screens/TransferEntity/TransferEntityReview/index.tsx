import { ixo, utils } from '@ixo/impactxclient-sdk'
import { FlexBox } from 'components/App/App.styles'
import { FormCard } from 'components'
import { InputWithLabel } from 'components/Form/InputWithLabel'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { useQuery } from 'hooks/window'
import { fee } from 'lib/protocol'
import { Button, Switch } from 'screens/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { serviceEndpointToUrl } from 'utils/entities'
import { errorToast, successToast } from 'utils/toast'
import { CosmosMsgForEmpty } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { makeStargateMessage } from 'utils/messages'
import { depositInfoToCoin } from 'utils/conversions'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { useWallet } from 'wallet-connector'
import { DeliverTxResponse } from '@cosmjs/stargate'
import { DaoPreProposeSingleClient } from '@ixo-webclient/cosmwasm-clients'
import { useTransferEntityState } from 'hooks/transferEntity'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const TransferEntityToGroupButton: React.FC<{
  groupAddress: string
  verificationMethods: any[]
  setVerificationMethods: (verificationMethods: any) => void
}> = ({ groupAddress, verificationMethods, setVerificationMethods }) => {
  const navigate = useNavigate()
  const { entityId = '' } = useParams<{ entityId: string }>()

  const { address } = useAccount()
  const { execute, close } = useWallet()
  const currentEntity = useAppSelector(getEntityById(entityId))
  const daoGroups = useMemo(() => currentEntity?.daoGroups ?? {}, [currentEntity])
  const daoGroup = useMemo(() => daoGroups[groupAddress], [daoGroups, groupAddress])
  const preProposalContractAddress = useMemo(() => daoGroup?.proposalModule?.preProposalContractAddress, [daoGroup])
  const depositInfo: Coin | undefined = useMemo(
    () => daoGroup && depositInfoToCoin(daoGroup.proposalModule.preProposeConfig.deposit_info!),
    [daoGroup],
  )

  const [submitting, setSubmitting] = useState(false)

  const [service = [], transferDocument = undefined] = useMemo(
    () => [currentEntity?.service, currentEntity?.linkedResource.find((v) => v.type === 'VerificationMethods')],
    [currentEntity],
  )

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

  const handlePublishProposal = async (): Promise<boolean> => {
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

      if (!groupAddress || !entityId) {
        // eslint-disable-next-line no-throw-literal
        throw 'EntityId or Group Address is invalid'
      }

      if (verifications.length === 0) {
        // eslint-disable-next-line no-throw-literal
        throw 'No keys to re-enable'
      }

      let wasmMessage: CosmosMsgForEmpty[] = []

      wasmMessage.push(
        makeStargateMessage({
          stargate: {
            typeUrl: '/ixo.entity.v1beta1.MsgUpdateEntity',
            value: ixo.entity.v1beta1.MsgUpdateEntity.fromPartial({
              id: entityId,
              entityStatus: 0,
              startDate: currentEntity?.startDate,
              endDate: currentEntity?.startDate,
              credentials: currentEntity?.credentials,
              controllerDid: utils.did.generateWasmDid(groupAddress),
              controllerAddress: groupAddress,
            }),
          },
        }),
      )

      wasmMessage.push(
        makeStargateMessage({
          stargate: {
            typeUrl: '/ixo.iid.v1beta1.MsgDeleteLinkedResource',
            value: ixo.iid.v1beta1.MsgDeleteLinkedResource.fromPartial({
              id: entityId,
              resourceId: transferDocument?.id,
              signer: groupAddress,
            }),
          },
        }),
      )

      wasmMessage = [
        ...wasmMessage,
        ...verifications.map((verification) =>
          makeStargateMessage({
            stargate: {
              typeUrl: '/ixo.iid.v1beta1.MsgAddVerification',
              value: ixo.iid.v1beta1.MsgAddVerification.fromPartial({
                id: entityId,
                verification,
                signer: groupAddress,
              }),
            },
          }),
        ),
      ]

      const daoPreProposeSingleClient = new DaoPreProposeSingleClient(execute, address, preProposalContractAddress)
      await daoPreProposeSingleClient
        .propose(
          {
            msg: {
              propose: {
                title: 'Re-enable Verification Methods',
                description:
                  'The former owner of the entity submitted a request to re-enable some Verification Methods.',
                msgs: wasmMessage,
              },
            },
            transactionConfig: { sequence: 1 },
          },
          fee,
          undefined,
          depositInfo ? [depositInfo] : undefined,
        )
        .then((res) => {
          const { transactionHash } = res
          const proposalId = Number(
            utils.common.getValueFromEvents(res as unknown as DeliverTxResponse, 'wasm', 'proposal_id') || '0',
          )
          close()
          successToast(null, `Successfully published proposals`)
          return { transactionHash, proposalId }
        })
        .catch((e) => {
          console.error(e)
          errorToast(null, typeof e === 'string' && e)
          return undefined
        })

      return true
    } catch (e) {
      console.error('handlePublishProposal', e)
      return false
    }
  }

  const onSubmit = async () => {
    setSubmitting(true)

    const publishProposal = await handlePublishProposal()
    if (publishProposal) {
      navigate(`/entity/${entityId}/dashboard`)
    }

    setSubmitting(false)
  }

  return (
    <Button size='full' height={48} loading={submitting} disabled={!isEligible} onClick={onSubmit}>
      Submit Proposal To Re-enable
    </Button>
  )
}

const TransferEntityToAccountButton: React.FC<{
  verificationMethods: any[]
  setVerificationMethods: (verificationMethods: any) => void
}> = ({ verificationMethods, setVerificationMethods }) => {
  const navigate = useNavigate()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const currentEntity = useAppSelector(getEntityById(entityId))
  const [submitting, setSubmitting] = useState(false)
  const { handleReEnableKeys } = useTransferEntityState()
  const { close } = useWallet()

  const [service = [], transferDocument = undefined] = useMemo(
    () => [currentEntity?.service, currentEntity?.linkedResource.find((v) => v.type === 'VerificationMethods')],
    [currentEntity],
  )

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

  const onSubmit = async () => {
    try {
      setSubmitting(true)
      await handleReEnableKeys({ entityId, transferDocument, verificationMethods })
      close()
      navigate(`/entity/${entityId}/dashboard`)
      setSubmitting(false)
    } catch (error) {
      setSubmitting(false)
    }
  }

  return (
    <Button size='full' height={48} loading={submitting} disabled={!isEligible} onClick={onSubmit}>
      Re-enable keys
    </Button>
  )
}

const TransferEntityReview: React.FC = () => {
  const theme: any = useTheme()
  const navigate = useNavigate()
  const { getQuery } = useQuery()
  const groupAddress = getQuery('groupAddress')

  const [verificationMethods, setVerificationMethods] = useState<any[]>([])

  const handleUpdateVMReEnable = (vmId: string, value: boolean) => {
    setVerificationMethods((v) => v.map((item) => ({ ...item, reEnable: item.id === vmId ? value : item.reEnable })))
  }

  const onBack = () => {
    navigate(-1)
  }

  return (
    <FlexBox width='100%' $justifyContent='center'>
      <FlexBox $maxWidth='800px' width='100%' $direction='column' $gap={5}>
        <Typography>The former owner of the entity created a document to re-enable verification keys.</Typography>

        {verificationMethods.map((vm: any, index) => {
          return (
            <FormCard
              key={index}
              title={
                <FlexBox width='100%' $alignItems='center' $justifyContent='space-between' $gap={4}>
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
                $direction='column'
                width='100%'
                background={theme.ixoGrey100}
                $borderRadius='8px'
                $gap={2}
                p={4}
                color='black'
              >
                {Object.entries(vm)
                  .filter(([key]) => key !== 'description' && key !== 'reEnable')
                  .map(([key, value]) => (
                    <Typography key={key} $wordBreak={'break-all'}>
                      <>
                        {key}: {value}
                      </>
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

        <FlexBox $alignItems='center' width='100%' $gap={7}>
          <Button variant='secondary' size='full' height={48} onClick={onBack}>
            Back
          </Button>
          {groupAddress ? (
            <TransferEntityToGroupButton
              groupAddress={groupAddress}
              verificationMethods={verificationMethods}
              setVerificationMethods={setVerificationMethods}
            />
          ) : (
            <TransferEntityToAccountButton
              verificationMethods={verificationMethods}
              setVerificationMethods={setVerificationMethods}
            />
          )}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default TransferEntityReview
