import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { Wrapper } from './SelectType.styles'
import { Box } from 'components/App/App.styles'
import { CateSelector } from 'screens/CreateEntity/Components'














import { useCreateEntityStepState } from 'hooks/createEntityStepState'
import { useCreateEntityStateAsActionState } from 'hooks/entity/useCreateEntityStateAsAction'

const SelectType = ({ showNavigation = true }: { showNavigation?: boolean }): JSX.Element => {
  const options = [
    {
      type: 'protocol/claim',
      label: 'Verifiable Claim',
      icon: <img src="/assets/images/icon-claim.svg"  />,
      description: `A <b>Verifiable Claim</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
    },
    {
      type: 'protocol/deed',
      label: 'Deed Class',
      icon: <img src="/assets/images/icon-deed.svg"  />,
      description: `A <b>Deed</b> defines a request, a group proposal or an offer to provide service as a contribution or evaluation agent.`,
    },
    {
      type: 'protocol/asset',
      label: 'Asset Class',
      icon: <img src="/assets/images/icon-impact-token.svg"  />,
      description: `A <b>Asset Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/investment',
      label: 'Investment Class',
      icon: <img src="/assets/images/icon-investment.svg"  />,
      description: `A <b>Investment Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/project',
      label: 'Project Class',
      icon: <img src="/assets/images/icon-project.svg"  />,
      description: `A <b>Project Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/oracle',
      label: 'Oracle Class',
      icon: <img src="/assets/images/icon-oracle.svg"  />,
      description: `A <b>Oracle Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/dao',
      label: 'DAO Class',
      icon: <img src="/assets/images/icon-dao.svg"  />,
      description: `A <b>DAO Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
  ]

  const [hoveredItem, setHoveredItem] = useState<any>(undefined)
  const { updateEntityType } = useCreateEntityStateAsActionState()
  const { navigateToNextStep } = useCreateEntityStepState()

  const handleClick = (item: any): void => {
    updateEntityType(item.type.toLowerCase())
    navigateToNextStep()
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
