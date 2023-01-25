import { Box } from 'components/App/App.styles'
import { InvestmentProfileForm } from 'pages/CreateEntity/Forms'
import React from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { TInvestmentMetadataModel } from 'types/protocol'

const InvestmentPreview: React.FC = (): JSX.Element => {
  const createEntityState = useCreateEntityState()
  const metadata: TInvestmentMetadataModel = createEntityState.metadata as TInvestmentMetadataModel
  return (
    <Box className='d-flex align-items-stretch' style={{ gap: 20 }}>
      <Box>
        <InvestmentProfileForm
          image={metadata?.image}
          orgName={metadata?.orgName}
          logo={metadata?.icon}
          name={metadata?.name}
        />
      </Box>
      <Box></Box>
    </Box>
  )
}

export default InvestmentPreview
