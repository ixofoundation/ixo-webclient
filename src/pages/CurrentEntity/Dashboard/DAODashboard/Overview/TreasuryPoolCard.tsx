import { SvgBox } from 'components/App/App.styles'
import { Card } from 'pages/CurrentEntity/Components'
import React from 'react'
import { Flex } from '@mantine/core'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

import { ReactComponent as FundingIcon } from 'assets/images/icon-funding.svg'
import { ReactComponent as UpIcon } from 'assets/images/icon-up-full.svg'
import { ReactComponent as EntityAccountIcon } from 'assets/images/icon-entity-account.svg'
import { ReactComponent as GroupAccountIcon } from 'assets/images/icon-group-account.svg'
import { ReactComponent as LinkedAccountIcon } from 'assets/images/icon-linked-account.svg'

const TreasuryPoolCard: React.FC = () => {
  const theme: any = useTheme()

  const accounts = [
    {
      icon: <EntityAccountIcon />,
      label: 'Entity Accounts',
      value: '$245.43K',
    },
    {
      icon: <GroupAccountIcon />,
      label: 'Group Accounts',
      value: '$345.43K',
    },
    {
      icon: <LinkedAccountIcon />,
      label: 'Linked Accounts',
      value: '$245.43K',
    },
  ]

  return (
    <Card
      label='Treasury Pool'
      icon={
        <SvgBox svgWidth={6} svgHeight={6}>
          <FundingIcon />
        </SvgBox>
      }
    >
      <Flex w='100%' h='100%' direction={'column'} justify={'space-between'} align={'center'}>
        <Flex direction='column' justify={'center'} align={'center'}>
          <Typography size='5xl'>$230.75k</Typography>
          <Flex align={'center'} gap={4} style={{ color: theme.ixoGreen }}>
            <Typography size='md'>+0.14%</Typography>
            <SvgBox svgWidth={5} svgHeight={5}>
              <UpIcon />
            </SvgBox>
          </Flex>
          <Typography variant='secondary' color='grey700'>
            Treasury Assets
          </Typography>
        </Flex>

        <Flex w='100%' h='170px' gap={16}>
          {accounts.map((account, index) => (
            <Flex
              key={index}
              bg={'#213E59'}
              py={20}
              w={'100%'}
              direction={'column'}
              align={'center'}
              justify={'center'}
              style={{ borderRadius: 4 }}
            >
              <Flex direction={'column'} gap={16} justify={'center'} align={'center'}>
                <Flex direction={'column'} align={'center'} gap={4} style={{ color: theme.ixoNewBlue }}>
                  <SvgBox>{account.icon}</SvgBox>
                  <Typography size='md'>{account.label}</Typography>
                </Flex>
                <Typography size='xl'>{account.value}</Typography>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Card>
  )
}

export default TreasuryPoolCard
