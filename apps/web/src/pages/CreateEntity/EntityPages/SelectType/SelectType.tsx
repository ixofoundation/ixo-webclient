import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { Wrapper } from './SelectType.styles'
import { Box } from 'components/App/App.styles'
import { CateSelector } from '../../Components'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { ReactComponent as ImpactTokenIcon } from 'assets/images/icon-impact-token.svg'
import { ReactComponent as InvestmentIcon } from 'assets/images/icon-investment.svg'
import { ReactComponent as ProjectIcon } from 'assets/images/icon-project.svg'
import { ReactComponent as OracleIcon } from 'assets/images/icon-oracle.svg'
import { ReactComponent as DAOIcon } from 'assets/images/icon-dao.svg'
import { useCreateEntityState } from 'hooks/createEntity'
import { useAppSelector } from 'redux/hooks'
import { selectNextStep } from 'redux/entityMultiStepCreation/slice'
import useStepperNavigate from 'hooks/stepperNavigation'

const SelectType: React.FC = (): JSX.Element => {

  console.log("running select type")
  const options = [
    {
      type: 'protocol/claim',
      label: 'Verifiable Claim',
      icon: <ClaimIcon />,
      description: `A <b>Verifiable Claim</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
    },
    {
      type: 'protocol/asset',
      label: 'Asset Class',
      icon: <ImpactTokenIcon />,
      description: `A <b>Asset Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/investment',
      label: 'Investment Class',
      icon: <InvestmentIcon />,
      description: `A <b>Investment Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/project',
      label: 'Project Class',
      icon: <ProjectIcon />,
      description: `A <b>Project Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/oracle',
      label: 'Oracle Class',
      icon: <OracleIcon />,
      description: `A <b>Oracle Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
    {
      type: 'protocol/dao',
      label: 'DAO Class',
      icon: <DAOIcon />,
      description: `A <b>DAO Class</b> defines a data schema, data collection format, and evaluation methodology for any type of verifiable claim.`,
      disabled: true,
    },
  ]

  const navigate = useStepperNavigate()
  const [hoveredItem, setHoveredItem] = useState<any>(undefined)
  const nextStep = useAppSelector(selectNextStep)
  const { updateEntityType } = useCreateEntityState()

  const handleClick = (item: any): void => {
    updateEntityType(item.type.toLowerCase())
    if(nextStep?.number){
      navigate(nextStep)
    }
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
