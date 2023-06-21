import { FlexBox, theme } from 'components/App/App.styles'
import React, { useMemo, useState } from 'react'
import SetupGroupSettings, {
  initialMembership,
  initialStaking,
} from 'pages/CreateEntity/CreateDAO/Pages/SetupDAOGroups/SetupGroupSettings'
import { TDAOGroupModel } from 'types/protocol'
import { v4 as uuidv4 } from 'uuid'
import { initialPreProposeConfigState } from 'components/Modals/AddActionModal/SetupUpdateProposalSubmissionConfigModal'
import { initialProposalConfigState } from 'components/Modals/AddActionModal/SetupUpdateVotingConfigModal'
import { Button } from 'pages/CreateEntity/Components'
import { useCreateEntity } from 'hooks/createEntity'
import { useParams } from 'react-router-dom'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { ixo } from '@ixo/impactxclient-sdk'
import { errorToast, successToast } from 'utils/toast'

const AddGroup: React.FC = () => {
  const { entityId } = useParams<{ entityId: string }>()
  const { AddLinkedEntity } = useCreateEntity()
  const [type, setType] = useState<'staking' | 'membership'>('membership')
  const initialDaoGroup = useMemo(() => {
    if (type === 'staking') {
      return {
        id: uuidv4(),
        type,
        name: '',
        description: '',
        ...initialPreProposeConfigState,
        ...initialProposalConfigState,
        memberships: [initialMembership],
        staking: { ...initialStaking },
      }
    } else if (type === 'membership') {
      return {
        id: uuidv4(),
        type,
        name: '',
        description: '',
        ...initialPreProposeConfigState,
        ...initialProposalConfigState,
        memberships: [initialMembership],
      }
    }
    return undefined
  }, [type])

  const handleUpdateGroup = (data: TDAOGroupModel): void => {
    if (data.contractAddress) {
      const linkedEntity: LinkedEntity = ixo.iid.v1beta1.LinkedEntity.fromPartial({
        type: 'Group',
        id: `{id}#${data.contractAddress}`,
        relationship: 'subsidiary',
        service: '',
      })
      AddLinkedEntity(entityId, linkedEntity).then((response) => {
        if (response) {
          successToast('Success', 'Linked Entity Added')
        } else {
          errorToast('Error', 'Failed to Add Linked Entity')
        }
      })
    }
  }

  return (
    <FlexBox width='100%' direction='column' alignItems='center' gap={6} color='black'>
      <FlexBox gap={7}>
        <Button
          variant={type === 'membership' ? 'primary' : 'grey500'}
          width={200}
          size='custom'
          onClick={(): void => setType('membership')}
        >
          Membership
        </Button>
        <Button
          variant={type === 'staking' ? 'primary' : 'grey500'}
          size='custom'
          width={200}
          onClick={(): void => setType('staking')}
        >
          Staking
        </Button>
      </FlexBox>
      <FlexBox direction='column' alignItems='center' gap={6} background={theme.ixoWhite} p={8} borderRadius='8px'>
        {initialDaoGroup && <SetupGroupSettings daoGroup={initialDaoGroup} onSubmit={handleUpdateGroup} />}
      </FlexBox>
    </FlexBox>
  )
}

export default AddGroup
