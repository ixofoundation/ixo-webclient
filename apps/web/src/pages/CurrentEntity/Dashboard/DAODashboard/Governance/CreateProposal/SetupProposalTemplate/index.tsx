import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import React, { useEffect, useState } from 'react'
import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import { useNavigate, useParams } from 'react-router-dom'
import { Flex } from '@mantine/core'
import { ReactComponent as UserCheckIcon } from 'assets/images/icon-user-check-solid.svg'
import { ReactComponent as UserTimesIcon } from 'assets/images/icon-user-times-solid.svg'
import { ReactComponent as HandHoldingUsdIcon } from 'assets/images/icon-hand-holding-usd-solid.svg'
import { ReactComponent as UsersIcon } from 'assets/images/icon-users-solid.svg'
import { ReactComponent as PenIcon } from 'assets/images/icon-pen-solid.svg'

export interface TProposalTemplate {
  id: string
  label: string
  description: string
  icon: React.FC
}
const ProposalTemplates: TProposalTemplate[] = [
  {
    id: 'elect_delegate',
    label: 'Elect Delegate',
    description:
      'A delegate account or multisig can represent the DAO in decentralised cooperatives. It can be revoked at any time by a governance proposal.',
    icon: UserCheckIcon,
  },
  {
    id: 'revoke_delegate',
    label: 'Revoke Delegate',
    description:
      'Lorem ipsum dolor sit amet pretium placerat laoreet aliquet justo habitant per ligula morbi lobortis faucibus ullamcorper fames montes massa sodales senectus suscipit accumsan letius dui consectetur',
    icon: UserTimesIcon,
  },
  {
    id: 'spend_funds',
    label: 'Spend Funds',
    description:
      'Lorem ipsum dolor sit amet pretium placerat laoreet aliquet justo habitant per ligula morbi lobortis faucibus ullamcorper fames montes massa sodales senectus suscipit accumsan letius dui consectetur',
    icon: HandHoldingUsdIcon,
  },
  {
    id: 'manage_membership',
    label: 'Manage Membership',
    description:
      'Lorem ipsum dolor sit amet pretium placerat laoreet aliquet justo habitant per ligula morbi lobortis faucibus ullamcorper fames montes massa sodales senectus suscipit accumsan letius dui consectetur',
    icon: UsersIcon,
  },
  {
    id: 'custom_proposal',
    label: 'Custom Proposal',
    description:
      'Lorem ipsum dolor sit amet pretium placerat laoreet aliquet justo habitant per ligula morbi lobortis faucibus ullamcorper fames montes massa sodales senectus suscipit accumsan letius dui consectetur',
    icon: PenIcon,
  },
]

const SetupProposalTemplate: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const [selectedTemplate, setSelectedTemplate] = useState<TProposalTemplate | undefined>()

  const onBack = () => {
    navigate(`/entity/${entityId}/dashboard/governance?selectedGroup=${coreAddress}`)
  }
  const onContinue = () => {
    navigate(`/entity/${entityId}/dashboard/governance/${coreAddress}/page`)
  }

  useEffect(() => {
    if (!entityId) {
      navigate(`/explore`)
    }
  }, [entityId, navigate])

  return (
    <Flex w={'100%'} justify='left'>
      <Flex direction='column' gap={60} w={deviceWidth.tablet}>
        <Flex direction={'column'} gap={36}>
          <Typography>Select one of the proposal templates, or create a custom proposal</Typography>

          <Flex gap={24}>
            {ProposalTemplates.map((template) => {
              const Icon = template.icon

              return (
                <PropertyBox
                  key={template.id}
                  icon={Icon && <Icon />}
                  label={template.label}
                  set={selectedTemplate?.id === template.id}
                  handleClick={() => setSelectedTemplate(template)}
                />
              )
            })}
          </Flex>
        </Flex>

        <Flex w='100%' justify='flex-start' gap={16}>
          <Button variant='secondary' onClick={onBack}>
            Back
          </Button>
          <Button onClick={onContinue}>Continue</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SetupProposalTemplate
