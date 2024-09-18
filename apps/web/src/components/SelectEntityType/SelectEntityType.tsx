import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { Wrapper } from './SelectEntityType.styles'
import { Box } from 'components/CoreEntry/App.styles'

import { CateSelector } from 'screens/CreateEntity/Components'

const SelectEntityType = ({ setEntityType }: { setEntityType: (type: string) => void }): JSX.Element => {
  const options = [
    {
      type: 'investment',
      label: 'Investment',
      icon: <img src='/assets/images/icon-investment.svg' />,
      description: `A <b>Investment Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: false,
    },
    {
      type: 'project',
      label: 'Project',
      icon: <img src='/assets/images/icon-project.svg' />,
      description: `A <b>Project Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: false,
    },
    {
      type: 'asset-collection',
      label: 'Asset Collection',
      icon: <img src='/assets/images/icon-coins-solid.svg' />,
      description: `A <b>Asset Collection</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: false,
    },
    {
      type: 'asset-coin',
      label: 'Asset Coin',
      icon: <img src='/assets/images/icon-asset.svg' />,
      description: `A <b>Asset Coin</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: false,
    },
    {
      type: 'asset-impact_credit',
      label: 'Asset Impact Credit',
      icon: <img src='/assets/images/icon-asset.svg' />,
      description: `A <b>Asset Impact Credit</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: false,
    },
    {
      type: 'dao',
      label: 'Dao',
      icon: <img src='/assets/images/icon-dao.svg' />,
      description: `A <b>Verifiable Claim</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol',
      label: 'protocol',
      icon: <img src='/assets/images/icon-deed.svg' />,
      description: `A <b>Deed</b> defines a request, a group proposal or an offer to provide service as a contribution or evaluation agent.`,
      disabled: true,
    },
    {
      type: 'oracle',
      label: 'Oracle',
      icon: <img src='/assets/images/icon-oracle.svg' />,
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
