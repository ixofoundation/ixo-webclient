import { Box } from 'components/App/App.styles'
import { InvestmentProfileForm } from 'pages/CreateEntity/Forms'
import React from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { TInvestmentMetadataModel } from 'types/protocol'

const InvestmentPreview: React.FC = (): JSX.Element => {
  const { metadata, profile } = useCreateEntityState()
  return (
    <Box className='d-flex align-items-stretch' style={{ gap: 20 }}>
      <Box>
        <InvestmentProfileForm
          image={profile?.image}
          orgName={(metadata as TInvestmentMetadataModel)?.orgName}
          logo={profile?.logo}
          name={profile?.name}
        />
      </Box>
      <Box></Box>
    </Box>
  )
}

export default InvestmentPreview
