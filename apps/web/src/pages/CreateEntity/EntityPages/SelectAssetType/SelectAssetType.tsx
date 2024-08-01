import { Typography } from 'components/Typography'
import { useState } from 'react'
import { Wrapper } from './SelectAssetType.styles'
import { CateSelector } from '../../Components'
import ClaimIcon from 'assets/images/icon-claim.svg'
import DeedIcon from 'assets/images/icon-deed.svg'
import { Flex } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const SelectType= ({ showNavigation = true }: { showNavigation?: boolean }): JSX.Element => {
  const options = [
    {
      type: 'asset-device',
      label: 'Device',
      icon: <ClaimIcon />,
      description: `A <b>Device</b> is a physical device that can be used to collect data from the user.`,
      disabled: false,
    },
    {
      type: 'asset-learnership',
      label: 'Learnership',
      icon: <DeedIcon />,
      description: `A <b>Learnership</b> is a type of asset that can be used to collect data from the user.`,
      disabled: false,
    }
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
