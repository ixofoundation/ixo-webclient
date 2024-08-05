import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { InputWithLabel } from 'screens/CreateEntity/Components'
import { TProposalActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { validateEntityDid } from 'utils/validation'
import { Typography } from 'components/Typography'
import { useMantineTheme } from '@mantine/core'
import { useAccount } from 'hooks/account'
import { useAppSelector } from 'redux/hooks'
import { selectEntitiesByType } from 'redux/entities/entities.selectors'
import { Avatar } from 'screens/CurrentEntity/Components'
import { IconCheckCircle } from 'components/IconPaths'
import { IconTimesCircle } from 'components/IconPaths'


export interface JoinData {
  id: string
  address: string
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupJoinModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const theme = useMantineTheme()
  const daos = useAppSelector(selectEntitiesByType('dao'))
  const { address } = useAccount()
  const [daoId, setDAOId] = useState('')

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

  useEffect(() => {
    setDAOId(action?.data?.id ?? '')
  }, [action])

  const handleUpdateDAOId = (value: any) => {
    onSubmit && setDAOId(value)
  }

  const handleConfirm = () => {
    onSubmit && onSubmit({ ...action, data: { id: daoId, address } })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      width='700px'
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={isDelegating}
    >
      <FlexBox $direction='column' width='100%' $gap={4}>
        <Typography>
          ImpactsDAO is a cooperative of DAOs. If you’re a delegate of a DAO entity that wants to join ImpactsDAO,
          submit a proposal for your DAO to be added.
        </Typography>
        <InputWithLabel
          name='subdao_id'
          height='48px'
          label='DAO Entity'
          inputValue={daoId}
          handleChange={(value) => handleUpdateDAOId(value)}
          wrapperStyle={{
            color: daoId ? (isDelegating ? theme.ixoGreen : theme.ixoRed) : theme.colors.blue[5],
          }}
        />
        {daoId && !daoEntity && (
          <FlexBox width='100%' $justifyContent='flex-end' $alignItems='center' $gap={2}>
            <Typography size='xl'>Not a valid did</Typography>
            <SvgBox color={theme.ixoRed}>
              <Image src={IconTimesCircle} alt='TimesCircle' width={5} height={5} color={theme.colors.blue[5]} />
            </SvgBox>
          </FlexBox>
        )}
        {daoId && daoEntity && !isDelegating && (
          <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
            <FlexBox $alignItems='center' $gap={2}>
              <Avatar url={daoEntity?.profile?.logo} size={60} borderWidth={0} />
              <Typography size='xl'>{daoEntity?.profile?.name}</Typography>
            </FlexBox>
            <FlexBox $alignItems='center' $gap={2}>
              <Typography size='xl'>You are not a delegate on this entity</Typography>
              <SvgBox color={theme.ixoRed}>
                <Image src={IconTimesCircle} alt='TimesCircle' width={5} height={5} color={theme.colors.blue[5]} />
              </SvgBox>
            </FlexBox>
          </FlexBox>
        )}
        {daoId && daoEntity && isDelegating && (
          <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
            <FlexBox $alignItems='center' $gap={2}>
              <Avatar url={daoEntity?.profile?.logo} size={60} borderWidth={0} />
              <Typography size='xl'>{daoEntity?.profile?.name}</Typography>
            </FlexBox>
            <FlexBox $alignItems='center' $gap={2}>
              <Typography size='xl'>You are a delegate on this entity</Typography>
              <SvgBox color={theme.ixoGreen}>
                <Image src={IconCheckCircle} alt='CheckCircle' width={5} height={5} color={theme.colors.blue[5]} />
              </SvgBox>
            </FlexBox>
          </FlexBox>
        )}
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupJoinModal
