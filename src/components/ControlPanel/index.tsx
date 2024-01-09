import React, { useState } from 'react'
import { Schema } from './types'
import { FlexBox } from 'components/App/App.styles'
import CircleTab from './components/CircleTab'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
import { ReactComponent as DAOIcon } from 'assets/images/icon-dao.svg'
import { ReactComponent as BellIcon } from 'assets/images/icon-bell.svg'
import { ReactComponent as CommentIcon } from 'assets/images/icon-comment-alt.svg'
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

interface Props {
  schema: Schema
}
const ControlPanel: React.FC<Props> = ({ schema }) => {
  const [activeTab, setActiveTab] = useState('profile')

  const renderProfile = () => (
    <>
      <AccountCard />
      <MyParticipationCard />
      <BalanceCard />
    </>
  )

  const renderDetail = () => (
    <>
      <PerformanceCard />
      <ActionsCard widget={schema.actions} />
      <ClaimsCard />
      <ConnectCard widget={schema.connections} />
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

  const renderAssistant = () => (
    <>
      <AssistantCard />
    </>
  )

  return (
    <FlexBox width='100%' height='100%' background='#F0F3F9' direction='column' justifyContent='space-between' gap={6}>
      <FlexBox width='100%' direction='column' gap={6} p={5}>
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'detail' && renderDetail()}
        {activeTab === 'feed' && renderFeed()}
        {activeTab === 'message' && renderMessages()}
        {activeTab === 'assistant' && renderAssistant()}
      </FlexBox>
      <FlexBox
        width='100%'
        background='#D7DFED'
        p={5}
        justifyContent='space-around'
        alignItems='center'
        flexWrap='wrap'
        gap={4}
      >
        <CircleTab icon={<ProfileIcon />} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        <CircleTab icon={<DAOIcon />} active={activeTab === 'detail'} onClick={() => setActiveTab('detail')} />
        <CircleTab icon={<BellIcon />} active={activeTab === 'feed'} onClick={() => setActiveTab('feed')} badge={12} />
        <CircleTab
          icon={<CommentIcon />}
          active={activeTab === 'message'}
          onClick={() => setActiveTab('message')}
          badge={8}
        />
        <CircleTab
          icon={<AssistantIcon />}
          active={activeTab === 'assistant'}
          onClick={() => setActiveTab('assistant')}
        />
      </FlexBox>
    </FlexBox>
  )
}

export default ControlPanel
