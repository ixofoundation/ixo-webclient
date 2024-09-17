import { Flex } from '@mantine/core'
import ApplicationSubmissionCard, { SubmitClaim } from './ApplicationSubmissionCard'
import WithdrawEarningsCard from './WithdrawEarningsCard'
import FundingAccountCard from 'components/ControlPanel/Actions/FundingAccountCard'
import RewardsList from 'screens/CurrentEntity/Overview/OverviewTabs/SelectedTabItem/RewardsList'

const ClaimPanel = ({ data }: { data: any }) => {
  return (
    <Flex style={{ borderRadius: 12 }} direction={'column'} gap={10}>
      <ApplicationSubmissionCard data={data} />
      <WithdrawEarningsCard data={data} />

      <FundingAccountCard />
      <RewardsList data={data} />
    </Flex>
  )
}

export default ClaimPanel
