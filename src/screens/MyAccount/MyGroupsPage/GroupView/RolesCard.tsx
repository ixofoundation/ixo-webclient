import { Card } from 'screens/CurrentEntity/Components'
import React, { useMemo } from 'react'
import { Flex } from '@mantine/core'

import { SvgBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { TDAOGroupModel } from 'types/entities'
import { useGetDAOByGroupAddress } from 'hooks/dao'
import { useAccount } from 'hooks/account'

interface Props {
  daoGroup: TDAOGroupModel
}
const RolesCard: React.FC<Props> = ({ daoGroup }) => {
  const { address } = useAccount()
  const dao = useGetDAOByGroupAddress(daoGroup.coreAddress)

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
        <SvgBox $svgWidth={6} $svgHeight={6}>
          <img src='/assets/images/icon-user-check-solid.svg' />
        </SvgBox>
        <Typography variant='primary'>Member</Typography>
      </Flex>
    )
  }
  const DelegateRoleItem = () => {
    return (
      <Flex w={'100%'} gap={12} align={'center'} py={16} px={24} bg={'#213E59'}>
        <SvgBox $svgWidth={6} $svgHeight={6}>
          <img src='/assets/images/icon-user-lock-solid.svg' />
        </SvgBox>
        <Typography variant='primary'>Delegate</Typography>
      </Flex>
    )
  }
  return (
    <Card label='My Roles' icon={<img src='/assets/img/sidebar/agents.svg' />}>
      <Flex w={'100%'} direction={'column'} gap={12}>
        <MemberRoleItem />
        {isDelegating && <DelegateRoleItem />}
      </Flex>
    </Card>
  )
}

export default RolesCard
