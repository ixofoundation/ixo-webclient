import React from 'react'
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
import { Box, Flex, ScrollArea, Text, Card, ActionIcon } from '@mantine/core'
import styled from 'styled-components'
import { useAccount } from 'hooks/account'
import { DidQRCode } from './DidQRCode'
import { EntityType } from 'types/entities'
import { getEntityIcon } from 'utils/getEntityIcon'
import Tooltip from 'components/Tooltip/Tooltip'
import { toTitleCase } from 'utils/formatters'
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'
import { startCase, truncate } from 'lodash'
import { LiaArrowLeftSolid, LiaBoltSolid, LiaExternalLinkAltSolid, LiaPlaySolid } from 'react-icons/lia'
import { useCompanionContext } from 'contexts/CompanionContext'
import { useCompanionDesignConfig } from 'hooks/userInterface/useCompanionDesignConfig'
import { serviceEndpointToUrl } from 'utils/entities'

const StyledScrollArea = styled(ScrollArea)`
  & > div > div {
    height: 100%;
  }
`

interface Props {
  tab?: 'profile' | 'detail' | 'feed' | 'message' | 'assistant'
  entityType: string
  entityName?: string
  service?: any
}
const ControlPanel = ({ tab, entityType, entityName, service }: Props) => {
  const { controlPanelSchema: schema } = useEntityConfig(entityType)
  const { address } = useAccount()
  const { activeTab, setActiveTab } = useCompanionContext()
  const { getKeyValue, goBackToPrevKeyValue } = useKeyValueViewerContext()
  const { toolbarActiveBackground, toolbarActiveColor, toolbarBackground, toolbarColor } = useCompanionDesignConfig()

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
      {/* <PerformanceCard entityType={entityType} /> */}
      {/* <ActionsCard widget={schema?.actions} /> */}
      <ClaimsCard />
      {entityType === EntityType.Project && <DidQRCode />}
      {/* <ConnectCard widget={schema?.connections} /> */}
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

  const renderValue = (data: any, key: string) => {
    // if (key === 'file') {
    //   return (
    //     <Flex w='100%' bg='#E8E8E9' p={10} style={{ borderRadius: 5 }}>
    //       <object className='pdfIframe' data={serviceEndpointToUrl(data[key], service)}></object>
    //     </Flex>
    //   )
    // }

    if (data[key] === undefined || data[key]?.length <= 0)
      return (
        <Flex w='100%' bg='#E8E8E9' p={10} style={{ borderRadius: 50 }}>
          <Text ml={25} size='sm'>
            {'N/A'}
          </Text>
        </Flex>
      )

    return (
      <Flex w='100%' bg='#E8E8E9' p={10} style={{ borderRadius: 50 }}>
        <Text ml={25} size='sm'>
          {truncate(data[key], { length: 30 })}
        </Text>
      </Flex>
    )
  }

  const renderKeyValues = () => {
    return (
      <Box>
        <Flex py={8} style={{ cursor: 'pointer' }} onClick={goBackToPrevKeyValue}>
          <LiaArrowLeftSolid size={24} />
        </Flex>
        <Card>
          <Box w='100%'>
            {Object.keys(getKeyValue()).map((key) => (
              <Box key={key} w='100%'>
                <Flex p={10}>
                  <Text ml={25} w='100%' size='sm'>
                    {startCase(key)}
                  </Text>
                  {key === 'serviceEndpoint' && (
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      href={serviceEndpointToUrl(getKeyValue()[key], service)}
                    >
                      <LiaExternalLinkAltSolid />
                    </a>
                  )}
                </Flex>
                {renderValue(getKeyValue(), key)}
              </Box>
            ))}
          </Box>
        </Card>
      </Box>
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
          {!getKeyValue() && address && activeTab === 'profile' && renderProfile()}
          {!getKeyValue() && activeTab === 'detail' && renderDetail()}
          {!getKeyValue() && activeTab === 'feed' && renderFeed()}
          {!getKeyValue() && activeTab === 'message' && renderMessages()}
          {!getKeyValue() && activeTab === 'assistant' && renderAssistant()}
          {getKeyValue() && renderKeyValues()}
        </Flex>
      </StyledScrollArea>
      <Flex w='100%' bg='#EBEBEB' p={21} justify='space-around' align='center'>
        <Flex gap={40}>
          {EntityIcon && (
            <Tooltip text={entityName || toTitleCase(entityType)}>
              <ActionIcon
                size={46}
                radius='xl'
                bg={activeTab === 'detail' ? toolbarActiveBackground : toolbarBackground}
                onClick={() => setActiveTab('detail')}
              >
                <LiaPlaySolid size='24' color={activeTab === 'detail' ? toolbarActiveColor : toolbarColor} />
              </ActionIcon>
              {/* <CircleTab
              icon={(<LiaPlaySolid />) as JSX.Element}
              active={activeTab === 'detail'}
              onClick={() => setActiveTab('detail')}
            /> */}
            </Tooltip>
          )}
          {address && (
            <Tooltip text={'My Profile'}>
              <ActionIcon
                size={46}
                radius='xl'
                bg={activeTab === 'profile' ? toolbarActiveBackground : toolbarBackground}
                onClick={() => setActiveTab('profile')}
              >
                <LiaBoltSolid size='24' color={activeTab === 'profile' ? toolbarActiveColor : toolbarColor} />
              </ActionIcon>
              {/* <CircleTab
                icon={<LiaBoltSolid />}
                active={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
              /> */}
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
            <ActionIcon
              size={46}
              radius='xl'
              color='#20798C'
              bg={activeTab === 'assistant' ? toolbarActiveBackground : toolbarBackground}
              onClick={() => setActiveTab('assistant')}
            >
              <AssistantIcon color={activeTab === 'assistant' ? toolbarActiveColor : toolbarColor} />
            </ActionIcon>
            {/* <CircleTab
              icon={<AssistantIcon />}
              active={activeTab === 'assistant'}
              onClick={() => setActiveTab('assistant')}
            /> */}
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ControlPanel
