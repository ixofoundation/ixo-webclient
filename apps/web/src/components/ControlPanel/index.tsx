import React, { useState } from 'react'
import CircleTab from './components/CircleTab'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
// import { ReactComponent as BellIcon } from 'assets/images/icon-bell.svg'
// import { ReactComponent as CommentIcon } from 'assets/images/icon-comment-alt.svg'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import AccountCard from './Account'
import MyParticipationCard from './MyParticipation'
import BalanceCard from './Balance'
import PerformanceCard from './Performance/Performance'
import ActionsCard from './Actions/Actions'
import ClaimsCard from './Claims'
import ConnectCard from './Connect/Connect'
import FeedCard from './Feed'
import MessagesCard from './Messages'
import AssistantCard from './Assistant'
import { useEntityConfig } from 'hooks/configs'
import { Box, Flex, ScrollArea, Text, Card } from '@mantine/core'
import styled from 'styled-components'
import { useAccount } from 'hooks/account'
import { DidQRCode } from './DidQRCode'
import { EntityType } from 'types/entities'
import { getEntityIcon } from 'utils/getEntityIcon'
import Tooltip from 'components/Tooltip/Tooltip'
import { toTitleCase } from 'utils/formatters'
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'
import { startCase } from 'lodash'

const StyledScrollArea = styled(ScrollArea)`
  & > div > div {
    height: 100%;
  }
`

interface Props {
  tab?: 'profile' | 'detail' | 'feed' | 'message' | 'assistant'
  entityType: string
  entityName?: string
}
const ControlPanel = ({ tab, entityType, entityName }: Props) => {
  const { controlPanelSchema: schema } = useEntityConfig(entityType)
  const { address } = useAccount()
  const [activeTab, setActiveTab] = useState<'profile' | 'detail' | 'feed' | 'message' | 'assistant'>(tab || 'detail')
  const { keyValue } = useKeyValueViewerContext()

  const EntityIcon = getEntityIcon(entityType)

  const renderProfile = () => (
    <>
      <AccountCard />
      <MyParticipationCard />
      <BalanceCard />
    </>
  )

  const renderDetail = () => (
    <>
      <PerformanceCard entityType={entityType} />
      <ActionsCard widget={schema?.actions} />
      <ClaimsCard />
      {entityType === EntityType.Project && <DidQRCode />}
      <ConnectCard widget={schema?.connections} />
    </>
  )

  const renderFeed = () => (
    <>
      <FeedCard />
    </>
  )

  const renderMessages = () => (
    <>
      <MessagesCard />
    </>
  )

  const renderAssistant = () => <AssistantCard />

  const renderKeyValues = () => {
    return (
      <Card>
        <Box w='100%'>
          {Object.keys(keyValue).map((key) => (
            <Box key={key} w='100%'>
              <Flex p={10}>
                <Text ml={25} w='100%' size='sm'>
                  {startCase(key)}
                </Text>
              </Flex>
              <Flex w='100%' bg='#E8E8E9' p={10} style={{ borderRadius: 50 }}>
                <Text ml={25} size="sm">{keyValue[key]}</Text>
              </Flex>
            </Box>
          ))}
        </Box>
      </Card>
    )
  }

  return (
    <Flex
      w='360px'
      h='100%'
      bg='#F0F3F9'
      direction='column'
      justify='space-between'
      gap={24}
      style={{ color: 'black' }}
    >
      <StyledScrollArea h='100%'>
        <Flex w='100%' direction='column' h='100%' gap={24} p={20} pt={32}>
          {!keyValue && address && activeTab === 'profile' && renderProfile()}
          {!keyValue && activeTab === 'detail' && renderDetail()}
          {!keyValue && activeTab === 'feed' && renderFeed()}
          {!keyValue && activeTab === 'message' && renderMessages()}
          {!keyValue && activeTab === 'assistant' && renderAssistant()}
          {keyValue && renderKeyValues()}
        </Flex>
      </StyledScrollArea>
      <Flex w='100%' bg='#D7DFED' p={20} justify='space-around' align='center' wrap='wrap' gap={16}>
        {EntityIcon && (
          <Tooltip text={entityName || toTitleCase(entityType)}>
            <CircleTab
              icon={EntityIcon as JSX.Element}
              active={activeTab === 'detail'}
              onClick={() => setActiveTab('detail')}
            />
          </Tooltip>
        )}
        {address && (
          <Tooltip text={'My Profile'}>
            <CircleTab
              icon={<ProfileIcon />}
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            />
          </Tooltip>
        )}
        {/* <Tooltip text={'Notifications'}>
          <CircleTab
            icon={<BellIcon />}
            active={activeTab === 'feed'}
            onClick={() => setActiveTab('feed')}
            badge={0}
          />
        </Tooltip>
        <Tooltip text={'Messages'}>
          <CircleTab
            icon={<CommentIcon />}
            active={activeTab === 'message'}
            onClick={() => setActiveTab('message')}
            badge={0}
          />
        </Tooltip> */}
        <Tooltip text={'Oxi'}>
          <CircleTab
            icon={<AssistantIcon />}
            active={activeTab === 'assistant'}
            onClick={() => setActiveTab('assistant')}
          />
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default ControlPanel
