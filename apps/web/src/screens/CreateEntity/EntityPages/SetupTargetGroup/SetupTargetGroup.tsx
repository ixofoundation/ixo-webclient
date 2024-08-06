import Image from 'next/image'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import React, { useMemo, useState } from 'react'
import { Button, InputWithLabel } from 'screens/CreateEntity/Components'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { selectEntitiesByType } from 'redux/entities/entities.selectors'
import { validateEntityDid } from 'utils/validation'
import { useAccount } from 'hooks/account'
import { Flex, useMantineTheme } from '@mantine/core'
import { Avatar } from 'screens/CurrentEntity/Components'
import { v4 as uuidv4 } from 'uuid'
import { TProposalActionModel } from 'types/entities'
import { useCreateEntityState } from 'hooks/createEntity'
import { IconCheckCircle } from 'components/IconPaths'
import { IconTimesCircle } from 'components/IconPaths'

const SetupTargetGroup: React.FC = (): JSX.Element => {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { entityId = '', coreAddress } = useParams<{ entityId: string; coreAddress: string }>()

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
    navigate(`/entity/${entityId}/dashboard/governance`)
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

    navigate(`/create/entity/deed/${entityId}/${coreAddress}/info${search}`)
  }

  return (
    <Flex w={'100%'} justify='center'>
      <Flex direction='column' gap={15} w={deviceWidth.tablet + 'px'}>
        <Flex direction='column' w='100%' gap={4}>
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
              color: daoId ? (isDelegating ? theme.colors.green[5] : theme.colors.red[5]) : theme.colors.blue[5],
            }}
          />
          {daoId && !daoEntity && (
            <Flex justify='flex-end' align='center' gap={2}>
              <Typography size='xl'>Not a valid did</Typography>
              <Image src={IconTimesCircle} alt='TimesCircle' width={5} height={5} color={theme.colors.blue[5]} />
            </Flex>
          )}
          {daoId && daoEntity && !isDelegating && (
            <Flex justify='space-between' align='center' gap={2}>
              <Flex align='center' gap={2}>
                <Avatar url={daoEntity?.profile?.logo} size={60} borderWidth={0} />
                <Typography size='xl'>{daoEntity?.profile?.name}</Typography>
              </Flex>
              <Flex align='center' gap={2}>
                <Typography size='xl'>You are not a delegate on this entity</Typography>
                <Image src={IconTimesCircle} alt='TimesCircle' width={5} height={5} color={theme.colors.red[5]} />
              </Flex>
            </Flex>
          )}
          {daoId && daoEntity && isDelegating && (
            <Flex justify='space-between' align='center' gap={2}>
              <Flex align='center' gap={2}>
                <Avatar url={daoEntity?.profile?.logo} size={60} borderWidth={0} />
                <Typography size='xl'>{daoEntity?.profile?.name}</Typography>
              </Flex>
              <Flex align='center' gap={2}>
                <Typography size='xl'>You are a delegate on this entity</Typography>
                <Image src={IconCheckCircle} alt='CheckCircle' width={5} height={5} color={theme.colors.green[5]} />
              </Flex>
            </Flex>
          )}
        </Flex>

        <Flex justify='flex-end' gap={4}>
          <Button variant='secondary' onClick={onBack}>
            Back
          </Button>
          <Button onClick={onContinue} disabled={!isDelegating}>
            Continue
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SetupTargetGroup
