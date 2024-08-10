import { Flex } from '@mantine/core'
import ApplicationSubmissionCard, { SubmitClaim } from './ApplicationSubmissionCard'
import WithdrawEarningsCard from './WithdrawEarningsCard'
import { ActionCard } from 'components/ActionCard'
import { LiaDotCircle } from 'react-icons/lia'
import FundingAccountCard from 'components/ControlPanel/Actions/FundingAccountCard'
import RewardsList from 'pages/CurrentEntity/Overview/OverviewTabs/SelectedTabItem/RewardsList'
import { ReactComponent as IXOIcon } from 'assets/images/icon-ixo.svg'

const ClaimPanel = ({ data }: { data: any }) => {
  return (
    <Flex style={{ borderRadius: 12 }} direction={'column'} gap={10}>
      <ApplicationSubmissionCard data={data} />
      <WithdrawEarningsCard data={data} />
      <ActionCard title='Claims' icon={<LiaDotCircle />}>
        <SubmitClaim data={data} />
      </ActionCard>
      <FundingAccountCard />
      <RewardsList
        rewards={[
          {
            amount: {
              currency: 'IXO',
              value: '1000',
            },
            claimStatus: 'approved',
            icon: <IXOIcon height={20} width={20} />,
          },
        ]}
      />
    </Flex>
  )
}

export default ClaimPanel
