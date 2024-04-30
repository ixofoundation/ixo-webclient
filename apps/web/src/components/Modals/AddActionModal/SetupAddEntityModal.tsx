import React from 'react'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { Accordion, Flex, TextInput, Textarea } from '@mantine/core'
import { TbChartInfographic, TbUserCircle } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import {
  SelectCreationProcess,
  SetupMetadata,
  SetupGroups,
  SetupProperties,
  Review,
  SelectType,
  SetupInstrument,
  SetupDataCollection,
} from 'pages/CreateEntity/EntityPages'
import { SelectEntityType } from 'components/SelectEntityType'
import { upperFirst } from 'lodash'
import { useCreateEntity, useCreateEntityState } from 'hooks/createEntity'
import {
  AccordedRight,
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import { utils } from '@ixo/impactxclient-sdk'
import { useQuery } from 'hooks/window'
import { currentRelayerNode } from 'constants/common'
import { CreateEntityMessage } from 'lib/protocol'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { useParams } from 'react-router-dom'

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
]
type EntityTypes = 'dao' | 'protocol' | 'oracle' | 'project' | 'investment' | 'asset'
const stepMap = new Map<EntityTypes, string[]>([
  ['dao', ['process', 'profile', 'groups', 'settings', 'review']],
  ['protocol', ['type', 'process', 'profile', 'collection', 'settings', 'review']],
  ['oracle', ['process', 'profile', 'settings', 'review']],
  ['project', ['process', 'profile', 'settings', 'review']],
  ['investment', ['profile', 'instrument', 'settings', 'review']],
  ['asset', ['process', 'profile', 'settings', 'review', 'create-token']],
])

const SetupAddEntityModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [entityType, setEntityType] = React.useState<EntityTypes | null>(null)
  const { UploadLinkedResource, UploadLinkedClaim, CreateProtocol, CreateEntityBase } = useCreateEntity()
  const createEntityState = useCreateEntityState()
  const { coreAddress } = useParams()

  const { wallet } = useWallet()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const getEntityCreateMessage = async () => {
    const accordedRight: AccordedRight[] = []
    const verification: Verification[] = []
    let service: Service[] = []
    let linkedEntity: LinkedEntity[] = []
    let linkedResource: LinkedResource[] = []
    let linkedClaim: LinkedClaim[] = []
    let controller: string[] = []

    // AccordedRight TODO:

    // Service
    service = createEntityState.service

    // LinkedEntity
    linkedEntity = Object.values(createEntityState.linkedEntity)

    // LinkedResource
    linkedResource = linkedResource.concat(Object.values(createEntityState.linkedResource))
    linkedResource = linkedResource.concat(await UploadLinkedResource())

    // LinkedClaim
    linkedClaim = linkedClaim.concat(await UploadLinkedClaim())

    // const protocolDid = utils.common.getValueFromEvents(protocolResponse, 'wasm', 'token_id')

    controller = controller.concat([utils.did.generateWasmDid(coreAddress as string)])

    // Create an entity
    const createEntityMessagePayload = await CreateEntityMessage(
      {
        address: wallet?.address as string,
        keyType: wallet?.keyType as any,
        pubKey: wallet?.pubKey as any,
        did: wallet?.did as string,
      },
      [
        {
          entityType: entityType as string,
          entityStatus: 0,
          context: [{ key: 'class', val: 'did:ixo:entity:f3ef757bc0404e8b6849ee7d9cf66d4e' }],
          service,
          linkedResource,
          linkedClaim,
          accordedRight,
          linkedEntity,
          verification,
          relayerNode: currentRelayerNode,
          controller,
          startDate: createEntityState.startDate,
          endDate: createEntityState.endDate,
        },
      ],
    )

    return createEntityMessagePayload
  }

  const handleConfirm = async () => {
    onSubmit && onSubmit({ ...action, data: (await getEntityCreateMessage()).messages[0] })
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
                <Accordion.Control>{upperFirst(currentStep?.path)}</Accordion.Control>
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
