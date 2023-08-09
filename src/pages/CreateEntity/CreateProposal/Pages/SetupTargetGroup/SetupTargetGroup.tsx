import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import React, { useMemo, useState } from 'react'
import { Button, InputWithLabel } from 'pages/CreateEntity/Components'
import { useHistory, useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { selectEntitiesByType } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { validateEntityDid } from 'utils/validation'
import { useAccount } from 'hooks/account'
import { useTheme } from 'styled-components'
import { Avatar } from 'pages/CurrentEntity/Components'
import { v4 as uuidv4 } from 'uuid'
import { TProposalActionModel } from 'types/entities'
import { ReactComponent as TimesCircleIcon } from 'assets/images/icon-times-circle.svg'
import { ReactComponent as CheckCircleIcon } from 'assets/images/icon-check-circle.svg'
import { useCreateEntityState } from 'hooks/createEntity'

const SetupTargetGroup: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const history = useHistory()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()

  const { address } = useAccount()
  const { updateProfile, updateProposal } = useCreateEntityState()
  const daos = useAppSelector(selectEntitiesByType('dao'))
  const [daoId, setDAOId] = useState('')

  const parentDAOEntity = useMemo(() => {
    if (validateEntityDid(entityId)) {
      return daos.find((v) => v.id === entityId)
    }
    return undefined
  }, [daos, entityId])
  const daoEntity = useMemo(() => {
    if (validateEntityDid(daoId)) {
      return daos.find((v) => v.id === daoId)
    }
    return undefined
  }, [daos, daoId])

  const isDelegating = useMemo(() => {
    if (daoEntity && address) {
      const { linkedEntity } = daoEntity
      if (
        linkedEntity.some(
          ({ id, type, relationship }) =>
            id.includes(address) && type === 'IndividualAccount' && relationship === 'delegate',
        )
      ) {
        return true
      }
    }
    return false
  }, [address, daoEntity])

  const onBack = () => {
    history.push(`/entity/${entityId}/dashboard/governance`)
  }
  const onContinue = () => {
    const JoinImpactsDAOAction: TProposalActionModel = {
      id: uuidv4(),
      text: 'Join',
      group: 'Groups',
      data: { id: entityId, coreAddress, address },
    }
    updateProposal({ actions: [JoinImpactsDAOAction] })
    updateProfile({
      name: `${daoEntity?.profile?.name || 'SubDAO'} application to join ${
        parentDAOEntity?.profile?.name || 'ImpactsDAO'
      }`,
      description: '',
    })

    history.push(`/create/entity/deed/${entityId}/${coreAddress}/info${history.location.search}`)
  }

  return (
    <FlexBox width={'100%'} justifyContent='center'>
      <FlexBox direction='column' gap={15} width={deviceWidth.tablet + 'px'}>
        <FlexBox direction='column' width='100%' gap={4}>
          <Typography>
            ImpactsDAO is a cooperative of DAOs. If you’re a delegate of a DAO entity that wants to join ImpactsDAO,
            submit a proposal for your DAO to be added.
          </Typography>
          <InputWithLabel
            name='subdao_id'
            height='48px'
            label='DAO Entity'
            inputValue={daoId}
            handleChange={(value) => setDAOId(value)}
            wrapperStyle={{
              color: daoId ? (isDelegating ? theme.ixoGreen : theme.ixoRed) : theme.ixoNewBlue,
            }}
          />
          {daoId && !daoEntity && (
            <FlexBox width='100%' justifyContent='flex-end' alignItems='center' gap={2}>
              <Typography size='xl'>Not a valid did</Typography>
              <SvgBox color={theme.ixoRed}>
                <TimesCircleIcon />
              </SvgBox>
            </FlexBox>
          )}
          {daoId && daoEntity && !isDelegating && (
            <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
              <FlexBox alignItems='center' gap={2}>
                <Avatar url={daoEntity?.profile?.logo} size={60} borderWidth={0} />
                <Typography size='xl'>{daoEntity?.profile?.name}</Typography>
              </FlexBox>
              <FlexBox alignItems='center' gap={2}>
                <Typography size='xl'>You are not a delegate on this entity</Typography>
                <SvgBox color={theme.ixoRed}>
                  <TimesCircleIcon />
                </SvgBox>
              </FlexBox>
            </FlexBox>
          )}
          {daoId && daoEntity && isDelegating && (
            <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
              <FlexBox alignItems='center' gap={2}>
                <Avatar url={daoEntity?.profile?.logo} size={60} borderWidth={0} />
                <Typography size='xl'>{daoEntity?.profile?.name}</Typography>
              </FlexBox>
              <FlexBox alignItems='center' gap={2}>
                <Typography size='xl'>You are a delegate on this entity</Typography>
                <SvgBox color={theme.ixoGreen}>
                  <CheckCircleIcon />
                </SvgBox>
              </FlexBox>
            </FlexBox>
          )}
        </FlexBox>

        <FlexBox width='100%' justifyContent='flex-end' gap={4}>
          <Button variant='secondary' onClick={onBack}>
            Back
          </Button>
          <Button onClick={onContinue} disabled={!isDelegating}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupTargetGroup
