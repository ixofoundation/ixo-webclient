import { Typography } from 'components/Typography'
import { useState } from 'react'
import { Wrapper } from './SelectAssetType.styles'
import { CateSelector } from '../../Components'




import { Flex } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const SelectType = ({ showNavigation = true }: { showNavigation?: boolean }): JSX.Element => {
  const options = [
    {
      type: 'asset-device',
      label: 'Device',
      icon: <img src="/assets/images/icon-claim.svg"  />,
      description: `A <b>Device</b> is a physical device that can be used to collect data from the user.`,
      disabled: false,
    },
    {
      type: 'asset-learnership',
      label: 'Learnership',
      icon: <img src="/assets/images/icon-deed.svg"  />,
      description: `A <b>Learnership</b> is a type of asset that can be used to collect data from the user.`,
      disabled: false,
    },
     {
      type: 'asset-impactCredit',
      label: 'Impact Credit',
      icon: <img src="/assets/images/icon-deed.svg"  />,
      description: `A <b>Impact Credit</b> is a type of asset representing a measurable positive impact on social or environmental outcomes.`,
      disabled: false,
    },
     {
      type: 'asset-coin',
      label: 'Coin',
      icon: <img src="/assets/images/icon-deed.svg"  />,
      description: `A <b>Coin</b> is a type of asset represents a digital currecy.`,
      disabled: false,
    },
      {
      type: 'asset-membership',
      label: 'Membership',
      icon: <img src="/assets/images/icon-deed.svg"  />,
      description: `A <b>Membership</b> is a type of asset represents a membership and associated benfits.`,
      disabled: false,
    },
  ]

  const [hoveredItem, setHoveredItem] = useState<any>(undefined)
  const navigate = useNavigate()

  const handleClick = (item: any): void => {
    navigate(`/entity/create/${item.type.toLowerCase()}`)
  }

  return (
    <Wrapper>
      <Typography
        variant='secondary'
        style={{ maxWidth: 540, height: 50 }}
        dangerouslySetInnerHTML={{ __html: hoveredItem?.description ?? '' }}
      />

      <Flex gap='lg'>
        {options.map((item) => (
          <CateSelector
            key={item.type}
            icon={item.icon}
            label={item.label}
            onClick={(): void => handleClick(item)}
            onMouseEnter={(): void => setHoveredItem(item)}
            onMouseLeave={(): void => setHoveredItem(undefined)}
            disabled={item.disabled}
          />
        ))}
      </Flex>
    </Wrapper>
  )
}

export default SelectType
