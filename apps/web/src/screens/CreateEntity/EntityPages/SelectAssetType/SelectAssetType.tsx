import Image from 'next/image'
import { Typography } from 'components/Typography'
import { useState } from 'react'
import { Wrapper } from './SelectAssetType.styles'
import { CateSelector } from '../../Components'
import { Flex, useMantineTheme } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { IconClaim } from 'components/IconPaths'
import { IconDeed } from 'components/IconPaths'

const SelectType = ({ showNavigation = true }: { showNavigation?: boolean }): JSX.Element => {
  const theme = useMantineTheme()
  const options = [
    {
      type: 'asset-device',
      label: 'Device',
      icon: <Image src={IconClaim} alt='Claim' width={5} height={5} color={theme.colors.blue[5]} />,
      description: `A <b>Device</b> is a physical device that can be used to collect data from the user.`,
      disabled: false,
    },
    {
      type: 'asset-learnership',
      label: 'Learnership',
      icon: <Image src={IconDeed} alt='Deed' width={5} height={5} color={theme.colors.blue[5]} />,
      description: `A <b>Learnership</b> is a type of asset that can be used to collect data from the user.`,
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
