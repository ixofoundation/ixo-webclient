import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import React, { useMemo } from 'react'
import { Button } from 'pages/CreateEntity/Components'
import { useHistory, useParams } from 'react-router-dom'
import { useDAO } from 'hooks/dao'

const SetupTargetGroup: React.FC = (): JSX.Element => {
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const history = useHistory()
  const { getParentDAOs } = useDAO()
  const parentDAOs = useMemo(() => getParentDAOs(entityId), [entityId, getParentDAOs])

  console.log({ parentDAOs })

  const onBack = () => {
    history.push(`/entity/${entityId}/dashboard/governance`)
  }
  const onContinue = () => {
    history.push(`/create/entity/deed/${entityId}/${coreAddress}/info`)
  }

  return (
    <FlexBox width={'100%'} justifyContent='center'>
      <FlexBox direction='column' gap={15} width={deviceWidth.tablet + 'px'}>
        <FlexBox width='100%'>
          <Typography variant='secondary' size='xl'>
            Submit a proposal as a sub-group of the Impacts DAO Members Group. The sub-group must approve the proposal
            first. Once approved, the proposal goes to the Impacts DAO Members group for a vote by all members.
          </Typography>
        </FlexBox>

        <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
          <Typography variant='secondary' size='xl'>
            Target group
          </Typography>
        </FlexBox>

        <FlexBox width='100%' justifyContent='flex-end' gap={4}>
          <Button variant='secondary' onClick={onBack}>
            Back
          </Button>
          <Button onClick={onContinue}>Continue</Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupTargetGroup
