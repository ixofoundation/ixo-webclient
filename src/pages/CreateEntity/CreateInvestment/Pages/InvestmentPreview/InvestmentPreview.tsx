import { Box } from 'components/App/App.styles'
import { InvestmentBasicInfoCardForm } from 'pages/CreateEntity/Forms'
import React from 'react'
import { useCreateEntityState } from 'hooks/createEntity'

const InvestmentPreview: React.FC = (): JSX.Element => {
  const { metadata } = useCreateEntityState()
  return (
    <Box className='d-flex align-items-stretch' style={{ gap: 20 }}>
      <Box>
        <InvestmentBasicInfoCardForm
          image={metadata?.image}
          orgName={metadata?.orgName}
          icon={metadata?.icon}
          name={metadata?.name}
        />
      </Box>
      <Box></Box>
    </Box>
  )
}

export default InvestmentPreview
