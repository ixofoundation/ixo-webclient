import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { Wrapper } from './SelectEntityType.styles'
import { Box } from 'components/App/App.styles'
import { ReactComponent as InvestmentIcon } from 'assets/images/icon-investment.svg'
import { ReactComponent as ProjectIcon } from 'assets/images/icon-project.svg'
import { ReactComponent as OracleIcon } from 'assets/images/icon-oracle.svg'
import { ReactComponent as DAOIcon } from 'assets/images/icon-dao.svg'
import { ReactComponent as DeedIcon } from 'assets/images/icon-deed.svg'
import { CateSelector } from 'pages/CreateEntity/Components'

const SelectEntityType = ({ setEntityType }: { setEntityType: (type: string) => void }): JSX.Element => {
  const options = [
    {
      type: 'investment',
      label: 'Investment',
      icon: <InvestmentIcon />,
      description: `A <b>Investment Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: false,
    },
    {
      type: 'project',
      label: 'Project',
      icon: <ProjectIcon />,
      description: `A <b>Project Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: false,
    },
    {
      type: 'dao',
      label: 'Dao',
      icon: <DAOIcon />,
      description: `A <b>Verifiable Claim</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true
    },
    {
      type: 'protocol',
      label: 'protocol',
      icon: <DeedIcon />,
      description: `A <b>Deed</b> defines a request, a group proposal or an offer to provide service as a contribution or evaluation agent.`,
      disabled: true
    },
    {
      type: 'oracle',
      label: 'Oracle',
      icon: <OracleIcon />,
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
