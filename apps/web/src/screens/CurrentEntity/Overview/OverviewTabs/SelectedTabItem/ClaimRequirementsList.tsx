import ActionCard from 'components/ActionCard/ActionCard'
import CardWithTitleAndAvatar from './CardWithTitleAndAvatar'

interface ClaimRequirementsListProps {
  requirements: {
    title: string
    description: string
    icon: string
  }[]

  hasMetRequirements?: boolean
}

function ClaimRequirementsList({ hasMetRequirements, requirements }: ClaimRequirementsListProps) {
  return (
    <ActionCard title='Requirements' icon={<ClaimRequirementsIcon />}>
      {requirements.map((requirement, index) => (
        <CardWithTitleAndAvatar key={index} {...requirement} />
      ))}
    </ActionCard>
  )
}

export default ClaimRequirementsList

const ClaimRequirementsIcon = () => (
  <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M1.85352 8.00012C1.85352 4.42103 4.75437 1.52018 8.33345 1.52018C11.9125 1.52018 14.8134 4.42103 14.8134 8.00012C14.8134 11.5792 11.9125 14.4801 8.33345 14.4801C4.75437 14.4801 1.85352 11.5792 1.85352 8.00012ZM13.6351 8.00012C13.6351 5.07658 11.257 2.69845 8.33345 2.69845C5.40992 2.69845 3.03178 5.07658 3.03178 8.00012C3.03178 10.9236 5.40992 13.3018 8.33345 13.3018C11.257 13.3018 13.6351 10.9236 13.6351 8.00012Z'
      fill='#00D2FF'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.33294 5.9C7.17314 5.9 6.23294 6.84021 6.23294 8C6.23294 9.1598 7.17314 10.1 8.33294 10.1C9.49274 10.1 10.4329 9.1598 10.4329 8C10.4329 6.84021 9.49274 5.9 8.33294 5.9ZM5.09961 8C5.09961 6.21428 6.54722 4.76667 8.33294 4.76667C10.1187 4.76667 11.5663 6.21428 11.5663 8C11.5663 9.78572 10.1187 11.2333 8.33294 11.2333C6.54722 11.2333 5.09961 9.78572 5.09961 8Z'
      fill='#00D2FF'
    />
  </svg>
)
