import Image from 'next/image'
import { Card } from 'screens/CurrentEntity/Components'
import React, { useMemo } from 'react'
import { Flex, useMantineTheme } from '@mantine/core'

import { Typography } from 'components/Typography'
import { TDAOGroupModel } from 'types/entities'
import { useGetDAOByGroupAddress } from 'hooks/dao'
import { useAccount } from 'hooks/account'
import { IconUserLockSolid, IconAgentCapability, IconUserCheckSolid } from 'components/IconPaths'

interface Props {
  daoGroup: TDAOGroupModel
}
const RolesCard: React.FC<Props> = ({ daoGroup }) => {
  const { address } = useAccount()
  const dao = useGetDAOByGroupAddress(daoGroup.coreAddress)
  const theme = useMantineTheme()

  const isDelegating = useMemo(() => {
    if (dao && address) {
      const { linkedEntity } = dao
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
  }, [address, dao])

  const MemberRoleItem = () => {
    return (
      <Flex w={'100%'} gap={12} align={'center'} py={16} px={24} bg={'#213E59'}>
        <Image src={IconUserCheckSolid} alt='UserCheck' width={5} height={5} color={theme.colors.blue[5]} />
        <Typography variant='primary'>Member</Typography>
      </Flex>
    )
  }
  const DelegateRoleItem = () => {
    return (
      <Flex w={'100%'} gap={12} align={'center'} py={16} px={24} bg={'#213E59'}>
        <Image src={IconUserLockSolid} alt='UserLock' width={5} height={5} color={theme.colors.blue[5]} />
        <Typography variant='primary'>Delegate</Typography>
      </Flex>
    )
  }
  return (
    <Card label='My Roles' icon={IconAgentCapability}>
      <Flex w={'100%'} direction={'column'} gap={12}>
        <MemberRoleItem />
        {isDelegating && <DelegateRoleItem />}
      </Flex>
    </Card>
  )
}

export default RolesCard
