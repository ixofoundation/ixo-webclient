import Image from 'next/image'
import AccountCard from './Account'
import MyParticipationCard from './MyParticipation'
import BalanceCard from './Balance'
import ClaimsCard from './Claims'
import FeedCard from './Feed'
import MessagesCard from './Messages'
import { Flex, ScrollArea, ActionIcon, useMantineTheme } from '@mantine/core'
import { useAccount } from 'hooks/account'
import { DidQRCode } from './DidQRCode'
import { EntityType } from 'types/entities'
import Tooltip from 'components/Tooltip/Tooltip'
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'
import { LiaBoltSolid, LiaPlaySolid } from 'react-icons/lia'
import { useCompanionContext } from 'contexts/CompanionContext'
import { useCompanionDesignConfig } from 'hooks/userInterface/useCompanionDesignConfig'
import ActionPanel from './ActionPanel/ActionPanel'
import { GoArrowLeft } from 'react-icons/go'
import { useLocation, useNavigate } from 'react-router-dom'
import Assistant from 'components/Assistant'
import AssistantActiveLottie from 'components/Zlotties/AssistantActiveLottie'
import { IconAssistant } from 'components/IconPaths'
interface Props {
  tab?: 'profile' | 'detail' | 'feed' | 'message' | 'assistant'
  entityType: string
  entityName?: string
  service?: any
}
const ControlPanel = ({ entityType }: Props) => {
  const { address } = useAccount()
  const { activeTab, setActiveTab } = useCompanionContext()
  const { keyValue, resetKeyValue } = useKeyValueViewerContext()
  const { toolbarActiveBackground, toolbarActiveColor, toolbarBackground, toolbarColor } = useCompanionDesignConfig()
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const { pathname } = useLocation()

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

  const goBack = () => {
    resetKeyValue()
    if (keyValue?.type === 'claim') {
      const search = new URLSearchParams()
      search.delete('collectionId')
      search.delete('agentRole')
      navigate({ pathname: pathname, search: search.toString() })
    }
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
      <ScrollArea h='100%'>
        <Flex w='100%' direction='column' h='100%' p={20} pt={32}>
          {!keyValue && address && activeTab === 'profile' && renderProfile()}
          {!keyValue && activeTab === 'detail' && renderDetail()}
          {!keyValue && activeTab === 'feed' && <FeedCard />}
          {!keyValue && activeTab === 'message' && <MessagesCard />}
          {!keyValue && activeTab === 'assistant' && <Assistant />}
          {keyValue && <ActionPanel type={keyValue.type} data={keyValue.data} />}
        </Flex>
      </ScrollArea>
      <Flex w='100%' bg='#EBEBEB' p={21} justify='space-around' align='center'>
        <Flex gap={40}>
          {!keyValue && (
            <Tooltip text={'Actions'}>
              <ActionIcon
                size={46}
                radius='xl'
                bg={activeTab === 'detail' ? toolbarActiveBackground : toolbarBackground}
                onClick={() => setActiveTab('detail')}
              >
                <LiaPlaySolid size='24' color={activeTab === 'detail' ? toolbarActiveColor : toolbarColor} />
              </ActionIcon>
            </Tooltip>
          )}
          {address && !keyValue && (
            <Tooltip text={'Notifications'}>
              <ActionIcon
                size={46}
                radius='xl'
                bg={activeTab === 'profile' ? toolbarActiveBackground : toolbarBackground}
                onClick={() => setActiveTab('profile')}
              >
                <LiaBoltSolid size='24' color={activeTab === 'profile' ? toolbarActiveColor : toolbarColor} />
              </ActionIcon>
            </Tooltip>
          )}
          {keyValue && (
            <Tooltip text={'Back'}>
              <ActionIcon
                size={46}
                radius='xl'
                color='#20798C'
                bg={activeTab === 'assistant' ? toolbarActiveBackground : toolbarBackground}
                onClick={goBack}
              >
                <GoArrowLeft size={24} color={activeTab === 'assistant' ? toolbarActiveColor : toolbarColor} />
              </ActionIcon>
            </Tooltip>
          )}
          {!keyValue && (
            <Tooltip text={'Oxi'}>
              <ActionIcon
                size={46}
                radius='xl'
                color='#20798C'
                bg={activeTab === 'assistant' ? toolbarActiveBackground : toolbarBackground}
                onClick={() => setActiveTab('assistant')}
              >
                {activeTab === 'assistant' ? (
                  <AssistantActiveLottie />
                ) : (
                  <Image src={IconAssistant} alt='Assistant' width={5} height={5} color={theme.colors.blue[5]} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ControlPanel
