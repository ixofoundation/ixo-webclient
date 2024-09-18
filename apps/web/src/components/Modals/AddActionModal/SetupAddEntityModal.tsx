import { customMessages, ixo, utils } from '@ixo/impactxclient-sdk'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import {
  AccordedRight,
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Accordion } from '@mantine/core'
import {
  Review,
  SelectCreationProcess,
  SelectType,
  SetupDataCollection,
  SetupGroups,
  SetupInstrument,
  SetupMetadata,
  SetupProperties,
} from 'components/Entities/CreateEntityFlow'
import { SelectEntityType } from 'components/SelectEntityType'
import { currentRelayerNode } from 'constants/common'
import { useCreateEntityStateAsActionState } from 'hooks/entity/useCreateEntityStateAsAction'
import { CheckIidDoc, CreateIidDocForGroup, TSigner } from 'lib/protocol'
import { upperFirst } from 'lodash'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { selectAllClaimProtocols } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { transformEntityStateToLinkedClaims } from 'services/entities/transformEntityStateToLinkedClaims'
import { transformEntityStateToLinkedResources } from 'services/entities/transformEntityStateToLinkedResources'
import { TProposalActionModel } from 'types/entities'
import { hexToUint8Array } from 'utils/encoding'
import { useWallet } from 'wallet-connector'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { AddAssetToCollection } from 'screens/CreateEntity/EntityPages'

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const steps = [
  {
    path: 'process',
    element: <SelectCreationProcess />,
  },
  {
    path: 'profile',
    element: <SetupMetadata showNavigation={false} />,
  },
  {
    path: 'groups',
    element: <SetupGroups showNavigation={false} />,
  },
  {
    path: 'settings',
    element: <SetupProperties showNavigation={false} />,
  },
  {
    path: 'review',
    element: <Review showNavigation={false} />,
  },
  {
    path: 'type',
    element: <SelectType showNavigation={false} />,
  },
  {
    path: 'instrument',
    element: <SetupInstrument showNavigation={false} />,
  },
  {
    path: 'collection',
    element: <SetupDataCollection showNavigation={false} />,
  },
  {
    path: 'add-asset-to-collection',
    element: <AddAssetToCollection />,
  },
]
type EntityTypes =
  | 'dao'
  | 'protocol'
  | 'oracle'
  | 'project'
  | 'investment'
  | 'asset-coin'
  | 'asset-collection'
  | 'asset-impact_credit'
const stepMap = new Map<EntityTypes, string[]>([
  ['dao', ['process', 'profile', 'groups', 'settings', 'review']],
  ['protocol', ['type', 'process', 'profile', 'collection', 'settings', 'review']],
  ['oracle', ['process', 'profile', 'settings', 'review']],
  ['project', ['process', 'profile', 'settings', 'review']],
  ['investment', ['profile', 'instrument', 'settings', 'review']],
  ['asset-coin', ['profile', 'add-asset-to-collection', 'settings', 'review', 'create-token']],
  ['asset-impact_credit', ['profile', 'add-asset-to-collection', 'settings', 'review', 'create-token']],
  ['asset-collection', ['profile', 'settings', 'review']],
])

const getCreateEntityMessageForProposal = ({
  entityType,
  signer,
  daoDaoGroup,
  service,
  linkedResource,
  accordedRight,
  linkedClaim,
  linkedEntity,
  startDate,
  endDate,
}: {
  signer: TSigner
  daoDaoGroup: { address: string; did: string }
  service: Service[]
  linkedResource: LinkedResource[]
  accordedRight: AccordedRight[]
  linkedClaim: LinkedClaim[]
  linkedEntity: LinkedEntity[]
  startDate: string
  endDate: string
  entityType: string
}) => {
  const hexPubKey = hexToUint8Array(signer.pubKey as any)
  return {
    typeUrl: '/ixo.entity.v1beta1.MsgCreateEntity',
    value: ixo.entity.v1beta1.MsgCreateEntity.fromPartial({
      entityType: entityType.replace('-', '/'),
      context: customMessages.iid.createAgentIidContext([
        { key: 'class', val: 'did:ixo:entity:f3ef757bc0404e8b6849ee7d9cf66d4e' },
      ]),
      verification: [
        ...customMessages.iid.createIidVerificationMethods({
          did: signer.did,
          pubkey: hexPubKey,
          address: signer.address,
          controller: signer.did,
          type: signer.keyType,
        }),
        ixo.iid.v1beta1.Verification.fromPartial({
          relationships: ['authentication'],
          method: ixo.iid.v1beta1.VerificationMethod.fromPartial({
            id: daoDaoGroup.did,
            type: 'CosmosAccountAddress',
            blockchainAccountID: daoDaoGroup.address,
            controller: '{id}',
          }),
        }),
        ixo.iid.v1beta1.Verification.fromPartial({
          relationships: ['authentication'],
          method: ixo.iid.v1beta1.VerificationMethod.fromPartial({
            id: daoDaoGroup.did + '#' + daoDaoGroup.address,
            type: 'CosmosAccountAddress',
            blockchainAccountID: daoDaoGroup.address,
            controller: '{id}',
          }),
        }),
      ],
      controller: [daoDaoGroup.did, signer.did],
      ownerDid: daoDaoGroup.did,
      ownerAddress: daoDaoGroup.address,
      relayerNode: currentRelayerNode,
      service: service,
      linkedResource: linkedResource,
      accordedRight: accordedRight,
      linkedEntity: linkedEntity,
      linkedClaim: linkedClaim,
      entityStatus: 0,
      startDate: startDate ? utils.proto.toTimestamp(new Date(startDate)) : undefined,
      endDate: endDate ? utils.proto.toTimestamp(new Date(endDate)) : undefined,
    }),
  }
}

const SetupAddEntityModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [entityType, setEntityType] = React.useState<EntityTypes | null>(null)
  const createEntityState = useCreateEntityStateAsActionState()
  const claimProtocols = useAppSelector(selectAllClaimProtocols)
  const { coreAddress } = useParams()
  const { wallet, execute, close } = useWallet()

  const signer = {
    address: wallet?.address as string,
    keyType: wallet?.keyType as any,
    pubKey: wallet?.pubKey as any,
    did: wallet?.did as string,
  }

  useEffect(() => {
    if (entityType && createEntityState.entityType !== entityType) {
      createEntityState.updateEntityType(entityType)
    }
  }, [entityType, createEntityState])

  const getEntityCreateMessage = async () => {
    const accordedRight: AccordedRight[] = createEntityState?.accordedRight
      ? Object.values(createEntityState?.accordedRight)
          .map((accordedRight) => (accordedRight as any)?.data)
          .flat()
      : []
    const verification: Verification[] = []
    let service: Service[] = []
    let linkedEntity: LinkedEntity[] = []
    let linkedResource: LinkedResource[] = []
    let linkedClaim: LinkedClaim[] = []

    // Service
    service = createEntityState.service

    // LinkedEntity
    linkedEntity = Object.values(createEntityState.linkedEntity)

    // LinkedResource
    linkedResource = linkedResource.concat(Object.values(createEntityState.linkedResource))
    linkedResource = linkedResource.concat(
      await transformEntityStateToLinkedResources({
        profile: createEntityState.profile,
        creator: createEntityState.creator,
        administrator: createEntityState.administrator,
        page: createEntityState.page,
        ddoTags: createEntityState.ddoTags,
        questionJSON: createEntityState.questionJSON,
        signerDid: signer.did,
      }),
    )

    // LinkedClaim
    linkedClaim = linkedClaim.concat(
      await transformEntityStateToLinkedClaims({ claimProtocols, claim: createEntityState.claim }),
    )

    // const protocolDid = utils.common.getValueFromEvents(protocolResponse, 'wasm', 'token_id')

    const daoDaoGroupDid = utils.did.generateWasmDid(coreAddress as string)

    if (!(await CheckIidDoc(daoDaoGroupDid))) {
      const createIidDocForGroupPayload = CreateIidDocForGroup(signer, daoDaoGroupDid)
      await execute({ data: createIidDocForGroupPayload, transactionConfig: { sequence: 1 } })
      close()
    }

    verification.concat([
      ixo.iid.v1beta1.Verification.fromPartial({
        relationships: ['authentication'],
        method: ixo.iid.v1beta1.VerificationMethod.fromPartial({
          id: daoDaoGroupDid,
          type: 'CosmosAccountAddress',
          blockchainAccountID: coreAddress,
          controller: '{id}',
        }),
      }),
      ixo.iid.v1beta1.Verification.fromPartial({
        relationships: ['authentication'],
        method: ixo.iid.v1beta1.VerificationMethod.fromPartial({
          id: daoDaoGroupDid + '#' + coreAddress,
          type: 'CosmosAccountAddress',
          blockchainAccountID: coreAddress,
          controller: '{id}',
        }),
      }),
    ])

    const createEntityMessagePayload = getCreateEntityMessageForProposal({
      signer,
      daoDaoGroup: { did: daoDaoGroupDid, address: coreAddress ?? '' },
      service,
      linkedResource,
      accordedRight,
      linkedClaim,
      linkedEntity,
      startDate: createEntityState.startDate,
      endDate: createEntityState.endDate,
      entityType: createEntityState.entityType,
    })

    return createEntityMessagePayload
  }

  const handleConfirm = async () => {
    const data = await getEntityCreateMessage()
    onSubmit && onSubmit({ ...action, data })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      width='1200px'
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={true}
    >
      {!entityType && <SelectEntityType setEntityType={(type) => setEntityType(type as EntityTypes)} />}
      {entityType && (
        <Accordion defaultValue='profile' w='100%'>
          {stepMap.get(entityType)?.map((step) => {
            const currentStep = steps.find((s) => s.path === step)
            return (
              <Accordion.Item key={step} value={step}>
                <Accordion.Control>{upperFirst(currentStep?.path.replace('-', ' '))}</Accordion.Control>
                <Accordion.Panel>{currentStep?.element}</Accordion.Panel>
              </Accordion.Item>
            )
          })}
        </Accordion>
      )}
    </SetupActionModalTemplate>
  )
}

export default SetupAddEntityModal
