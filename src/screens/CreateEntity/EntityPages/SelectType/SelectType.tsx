import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { Wrapper } from './SelectType.styles'
import { Box } from 'components/CoreEntry/App.styles'
import { CateSelector } from '../../Components'

import { useNavigate } from 'react-router-dom'

const SelectType = ({ showNavigation = true }: { showNavigation?: boolean }): JSX.Element => {
  const options = [
    {
      type: 'protocol/claim',
      label: 'Verifiable Claim',
      icon: <img src='/assets/images/icon-claim.svg' />,
      description: `A <b>Verifiable Claim</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
    },
    {
      type: 'protocol/deed',
      label: 'Proposal',
      icon: <img src='/assets/images/icon-deed.svg' />,
      description: `A <b>Proposal</b> defines a request, a group proposal or an offer to provide service as a contribution or evaluation agent.`,
    },
    {
      type: 'protocol/request',
      label: 'Request Class',
      icon: <img src='/assets/images/icon-star.svg' />,
      description: `A <b>Request</b> defines a request, a group proposal or an offer to provide service as a contribution or evaluation agent.`,
    },
    {
      type: 'protocol/request',
      label: 'Credentials',
      icon: <img src='/assets/images/icon-deed.svg' />,
      description: ``,
      disabled: true,
    },
    {
      type: 'protocol/asset',
      label: 'Asset',
      icon: <img src='/assets/images/icon-impact-token.svg' />,
      description: `A <b>Asset</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/investment',
      label: 'Investment',
      icon: <img src='/assets/images/icon-investment.svg' />,
      description: `A <b>Investment</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/project',
      label: 'Project',
      icon: <img src='/assets/images/icon-project.svg' />,
      description: `A <b>Project</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/oracle',
      label: 'Oracle',
      icon: <img src='/assets/images/icon-oracle.svg' />,
      description: `A <b>Oracle</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/dao',
      label: 'DAO',
      icon: <img src='/assets/images/icon-dao.svg' />,
      description: `A <b>DAO</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
  ]

  const [hoveredItem, setHoveredItem] = useState<any>(undefined)
  const navigate = useNavigate()

  const handleClick = (item: any): void => {
    navigate(`/entity/create/${item.type.toLowerCase().replace('/', '-')}`)
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

export default SelectType
