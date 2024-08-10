import { Text } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { theme } from 'components/App/App.styles'
import CardWithTitleAndAvatar from './CardWithTitleAndAvatar'
import { ReactNode } from 'react'

interface Reward {
  amount: {
    value: string
    currency: string
  }
  claimStatus: 'approved' | 'rejected' | 'pending' | 'disputed' | 'submitted'
  icon?: ReactNode
}
interface RewardsListProps {
  rewards: Reward[]
}

const RewardDescription = ({ claimStatus }: { claimStatus: Reward['claimStatus'] }) => {
  switch (claimStatus) {
    case 'approved':
      return (
        <Text fz={'xs'} c={theme.ixoGreen} mt={-4}>
          Approved Claims
        </Text>
      )
    case 'submitted':
      return (
        <Text fz={'xs'} c={theme.ixoNewBlue} mt={-4}>
          Submitted Claims
        </Text>
      )

    default:
      return (
        <Text fz={'xs'} c={'#9A9A9A'} mt={-4}>
          Rejected Claims
        </Text>
      )
  }
}

const shouldRenderAmount = (claimStatus: Reward['claimStatus']) => {
  return claimStatus === 'approved' || claimStatus === 'submitted'
}

function RewardsList({ rewards }: RewardsListProps) {
  return (
    <ActionCard title='Payments' icon={<RewardsIcon />}>
      {rewards.map((reward, i) => (
        <CardWithTitleAndAvatar
          key={reward.amount.value + i + reward.claimStatus + reward?.icon}
          title={shouldRenderAmount(reward.claimStatus) ? formatCurrency(reward.amount) : ''}
          description={<RewardDescription claimStatus={reward.claimStatus} />}
          icon={reward?.icon}
        />
      ))}
    </ActionCard>
  )
}

const RewardsIcon = () => (
  <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.16699 2V2.59473C9.09449 2.62098 9.02402 2.65306 8.95703 2.68945C8.82305 2.76225 8.70156 2.85428 8.5957 2.96191C8.48984 3.06955 8.39969 3.19232 8.33008 3.32715C8.22566 3.52938 8.16699 3.75813 8.16699 4C8.16699 4.1025 8.17805 4.20273 8.19824 4.2998C8.23863 4.49395 8.31727 4.6752 8.42578 4.83496C8.48004 4.91484 8.54125 4.98949 8.60938 5.05762C8.6775 5.12574 8.75215 5.18695 8.83203 5.24121C9.07168 5.40398 9.35949 5.5 9.66699 5.5C9.73824 5.5 9.805 5.51348 9.86523 5.53809C9.92547 5.5627 9.97875 5.59887 10.0234 5.64355C10.0681 5.68824 10.1043 5.74152 10.1289 5.80176C10.1535 5.86199 10.167 5.92875 10.167 6C10.167 6.21375 10.0459 6.38809 9.86523 6.46191C9.805 6.48652 9.73824 6.5 9.66699 6.5C9.59574 6.5 9.52898 6.48652 9.46875 6.46191C9.40852 6.4373 9.35523 6.40113 9.31055 6.35645C9.26586 6.31176 9.22969 6.25848 9.20508 6.19824C9.18047 6.13801 9.16699 6.07125 9.16699 6H8.16699C8.16699 6.08063 8.17391 6.16013 8.18652 6.2373C8.19914 6.31448 8.21699 6.38914 8.24121 6.46191C8.31387 6.68023 8.43691 6.87663 8.5957 7.03809C8.64863 7.0919 8.70516 7.14191 8.76562 7.1875C8.82609 7.23309 8.89004 7.27415 8.95703 7.31055C9.02402 7.34694 9.09449 7.37902 9.16699 7.40527V8H10.167V7.40527C10.747 7.19527 11.167 6.645 11.167 6C11.167 5.2825 10.6463 4.67262 9.9668 4.53125C9.86973 4.51105 9.76949 4.5 9.66699 4.5C9.59574 4.5 9.52898 4.48652 9.46875 4.46191C9.40852 4.4373 9.35523 4.40113 9.31055 4.35645C9.26586 4.31176 9.22969 4.25848 9.20508 4.19824C9.18047 4.13801 9.16699 4.07125 9.16699 4C9.16699 3.92875 9.18047 3.86199 9.20508 3.80176C9.22969 3.74152 9.26586 3.68824 9.31055 3.64355C9.39992 3.55418 9.52449 3.5 9.66699 3.5C9.95199 3.5 10.167 3.715 10.167 4H11.167C11.167 3.91937 11.1601 3.83987 11.1475 3.7627C11.1348 3.68552 11.117 3.61086 11.0928 3.53809C10.9475 3.10145 10.602 2.75223 10.167 2.59473V2H9.16699ZM5.9248 9C5.4093 9.002 5.0166 9.13281 5.0166 9.13281L5.00684 9.13672L2.1709 10.2246L3.16309 13.0098L5.62793 12.0645L9.19629 14.0293L15.3584 11.4766L14.9756 10.5547L9.25684 12.9219L5.70605 10.9668L3.76074 11.7109L3.44043 10.8086L5.33887 10.0801C5.34337 10.0781 5.5768 10 5.9248 10C6.2763 10 6.68613 10.078 7.03613 10.3945L7.04297 10.3984L7.04492 10.4004C7.56042 10.8479 7.94923 11.1606 8.49023 11.3301C9.03123 11.5001 9.64492 11.5196 10.6699 11.5156L10.665 10.5156C9.65904 10.5196 9.13354 10.484 8.79004 10.375C8.44604 10.2695 8.20205 10.0799 7.70605 9.65039L7.7002 9.64648C7.1217 9.12698 6.4343 8.998 5.9248 9Z'
      fill='#00D2FF'
    />
  </svg>
)

export default RewardsList

const formatCurrency = (amount: Reward['amount']) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: amount.currency,
  }).format(Number(amount.value))
}
