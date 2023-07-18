import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { Button } from 'pages/CreateEntity/Components'
import React, { useContext, useMemo } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import DAOCard from 'pages/CreateEntity/Forms/ReviewCard/DAOCard'
import { EditEntityContext } from 'pages/EditEntity/EditEntity'

const ReviewDAO: React.FC = (): JSX.Element => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const entity = useContext(EditEntityContext)

  const profile = entity.profile
  const { daoGroups, daoController } = entity

  const numOfMembers = useMemo(() => {
    const daoGroup = daoGroups![daoController!]
    if (!daoGroup) {
      return 0
    }
    return daoGroup.votingModule.members.length
  }, [daoGroups, daoController])

  const handleSignToCreate = async (): Promise<void> => {
    console.log('modified => ', { entity })
    if (history.location.search) {
      const searchParams = new URLSearchParams(history.location.search)
      const redirectTo = searchParams.get('redirectTo')
      if (redirectTo) {
        history.push({
          pathname: redirectTo,
          state: { type: 'Edit Entity', data: { linkedEntity: entity.linkedEntity } },
        })
      }
    }
  }

  return (
    <FlexBox width={`${deviceWidth.tablet}px`} gap={10} alignItems='stretch'>
      <DAOCard image={profile?.image ?? ''} name={profile?.name ?? ''} numberOfMembers={numOfMembers} />
      <FlexBox direction='column' justifyContent='space-between' gap={4} width='100%' style={{ flex: 1 }}>
        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary'>
            This is the last step before creating this DAO on the ixo Blockchain.
          </Typography>
          <Typography variant='secondary'>
            <NavLink to={{ pathname: `/edit/entity/${entityId}/metadata`, search: history.location.search }}>
              Review the DAO details
            </NavLink>{' '}
            you have configured.
          </Typography>
          <Typography variant='secondary'>
            <NavLink to={{ pathname: `/edit/entity/${entityId}/groups`, search: history.location.search }}>
              View the DAO Groups
            </NavLink>{' '}
            you have added.
          </Typography>
          <Typography variant='secondary'>
            When you are ready to commit, sign with your DID Account keys, or{' '}
            <Typography variant='secondary' color='black'>
              connect a different account
            </Typography>{' '}
            as the DAO Creator.
          </Typography>
        </FlexBox>
        <FlexBox width='100%' gap={4}>
          <Button variant='secondary' onClick={(): void => history.goBack()} style={{ width: '100%' }}>
            Back
          </Button>
          <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }}>
            Sign To Create
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default ReviewDAO
