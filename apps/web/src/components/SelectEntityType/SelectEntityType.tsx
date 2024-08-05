import Image from 'next/image'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { Wrapper } from './SelectEntityType.styles'
import { Box } from 'components/App/App.styles'
import { CateSelector } from 'screens/CreateEntity/Components'
import { IconDAO } from 'components/IconPaths'
import { IconInvestment } from 'components/IconPaths'
import { IconDeed } from 'components/IconPaths'
import { IconOracle } from 'components/IconPaths'
import { IconProject } from 'components/IconPaths'


const SelectEntityType = ({ setEntityType }: { setEntityType: (type: string) => void }): JSX.Element => {
  const options = [
    {
      type: 'investment',
      label: 'Investment',
      icon: <Image src={IconInvestment} alt='Investment' width={5} height={5} color={theme.colors.blue[5]} />,
      description: `A <b>Investment Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: false,
    },
    {
      type: 'project',
      label: 'Project',
      icon: <Image src={IconProject} alt='Project' width={5} height={5} color={theme.colors.blue[5]} />,
      description: `A <b>Project Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: false,
    },
    {
      type: 'dao',
      label: 'Dao',
      icon: <Image src={IconDAO} alt='DAO' width={5} height={5} color={theme.colors.blue[5]} />,
      description: `A <b>Verifiable Claim</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol',
      label: 'protocol',
      icon: <Image src={IconDeed} alt='Deed' width={5} height={5} color={theme.colors.blue[5]} />,
      description: `A <b>Deed</b> defines a request, a group proposal or an offer to provide service as a contribution or evaluation agent.`,
      disabled: true,
    },
    {
      type: 'oracle',
      label: 'Oracle',
      icon: <Image src={IconOracle} alt='Oracle' width={5} height={5} color={theme.colors.blue[5]} />,
      description: `A <b>Asset Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
  ]

  const [hoveredItem, setHoveredItem] = useState<any>(undefined)

  const handleClick = (item: any): void => {
    setEntityType(item.type.toLowerCase())
  }

  return (
    <Wrapper>
      <Typography
        variant='secondary'
        style={{ maxWidth: 540, height: 50 }}
        dangerouslySetInnerHTML={{ __html: hoveredItem?.description ?? '' }}
      />

      <Box className='d-flex w-full justify-content-between'>
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
      </Box>
    </Wrapper>
  )
}

export default SelectEntityType
