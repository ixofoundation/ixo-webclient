import { Box } from 'components/App/App.styles'
import { InvestmentBasicInfoCardForm } from 'pages/CreateEntity/Forms'
import React from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { TInvestmentMetadataModel } from 'types/protocol'

const InvestmentPreview: React.FC = (): JSX.Element => {
  const { metadata } = useCreateEntityState()
  return (
    <Box className='d-flex align-items-stretch' style={{ gap: 20 }}>
      <Box>
        <InvestmentBasicInfoCardForm
          image={(metadata as TInvestmentMetadataModel)?.image}
          orgName={(metadata as TInvestmentMetadataModel)?.orgName}
          icon={(metadata as TInvestmentMetadataModel)?.icon}
          name={(metadata as TInvestmentMetadataModel)?.name}
        />
      </Box>
      <Box></Box>
    </Box>
  )
}

export default InvestmentPreview
