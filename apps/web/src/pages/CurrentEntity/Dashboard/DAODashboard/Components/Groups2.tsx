import React from 'react'
import { useTheme } from 'styled-components'
import { Card } from '../../../Components'
import { Box, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import useCurrentEntity, { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { TDAOGroupModel } from 'types/entities'
import { Avatar, Flex } from '@mantine/core'
import { ReactComponent as AgentsIcon } from 'assets/img/sidebar/agents.svg'
import { useQuery } from 'hooks/window'
import { useLocation, useNavigate } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'
import { truncateString } from 'utils/formatters'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import { successToast } from 'utils/toast'

interface IGroupCardProps {
  daoGroup: TDAOGroupModel
}

const GroupCard: React.FC<IGroupCardProps> = ({ daoGroup }) => {
  const theme: any = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')
  const { currentEntity: dao } = useCurrentEntity()
  const { isParticipating } = useCurrentEntityDAOGroup(daoGroup.coreAddress)
  const members = daoGroup.votingModule.members

  if (!dao) {
    return null
  }
  return (
    <Flex
      pos={'relative'}
      w={240}
      h={240}
      p={24}
      direction={'column'}
      align={'center'}
      gap={16}
      style={{
        border: `1px solid ${selectedGroup === daoGroup.coreAddress ? theme.ixoNewBlue : 'transparent'}`,
        flex: '0 0 240px',
        cursor: 'pointer',
        background: selectedGroup === daoGroup.coreAddress ? '#184761' : '#213E59',
      }}
      onClick={() => navigate(`${pathname}?selectedGroup=${daoGroup.coreAddress}`)}
    >
      {isParticipating && (
        <Flex pos={'absolute'} top={10} right={10} py={2} px={6} style={{ borderRadius: 999 }} bg={theme.ixoNewBlue}>
          <Typography variant='secondary' size='xs' transform='uppercase'>
            Member
          </Typography>
        </Flex>
      )}

      <Flex direction='column' justify={'center'} align={'center'} gap={8}>
        <Avatar src={dao.profile?.logo} alt='' size={32} radius={100} />
        <Typography variant='primary' size='sm'>
          {dao.profile?.name}
        </Typography>
      </Flex>

      <Flex align={'center'} direction={'column'} justify={'center'} gap={4}>
        <Typography variant='primary' size='lg'>
          {daoGroup.config.name}
        </Typography>
        <CopyToClipboard text={daoGroup.coreAddress} onCopy={() => successToast(null, `Copied to clipboard`)}>
          <Flex align='center' gap={4} onClick={(e) => e.stopPropagation()}>
            <Typography color='blue' weight='medium' size='sm' hover={{ underline: true }}>
              {truncateString(daoGroup.coreAddress, 20, 'middle')}
            </Typography>
            <SvgBox color={theme.ixoNewBlue} $svgWidth={5} $svgHeight={5}>
              <CopyIcon />
            </SvgBox>
          </Flex>
        </CopyToClipboard>
      </Flex>

      <Flex direction={'column'} justify={'center'} align={'center'} gap={8}>
        <Flex align='center' gap={16} h='36px'>
          <Flex ml={-2}>
            {members.slice(0, 4).map((member, index) => (
              <Box key={index} width='24px'>
                <Avatar size={32} src={undefined} radius={999} />
              </Box>
            ))}
          </Flex>
          {members.length > 4 && (
            <Typography color='white' size='4xl'>
              ⋯
            </Typography>
          )}
        </Flex>

        <Typography weight='medium' size='md'>
          {members.length} member{members.length > 1 && 's'}
        </Typography>
      </Flex>
    </Flex>
  )
}

const Groups: React.FC = (): JSX.Element | null => {
  const { daoGroups, daoController } = useCurrentEntity()

  if (Object.values(daoGroups).length === 0) {
    return null
  }

  const sortedGroups = Object.values(daoGroups).sort((group) => {
    if (group.coreAddress === daoController) {
      return -1
    }
    // If 'b' has the 'priority' property and 'a' doesn't, 'b' comes first
    if (group.coreAddress !== daoController) {
      return 1
    }
    // If neither or both have the property, retain original order
    return 0
  })

  return (
    <Box mb={4} width='100%'>
      <Card label={`Groups`} icon={<AgentsIcon />}>
        <Flex gap={12} w={'100%'} style={{ overflowX: 'auto' }}>
          {sortedGroups.map((daoGroup: TDAOGroupModel, index: number) => (
            <GroupCard key={index} daoGroup={daoGroup} />
          ))}
        </Flex>
      </Card>
    </Box>
  )
}

export default Groups
