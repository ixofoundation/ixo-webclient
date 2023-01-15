import React, { useState } from 'react'
import { PageWrapper, PageRow, Badge } from './SetupProperties.styles'
import { Button } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { SetupSettings } from './SetupSettings'
import { Typography } from 'components/Typography'
import { SetupClaim } from './SetupClaim'
import { SetupLinkedResource } from './SetupLinkedResource'
import { SetupAccordedRight } from './SetupAccordedRight'
import { SetupLinkedEntity } from './SetupLinkedEntity'

const SetupProperties: React.FC = (): JSX.Element => {
  const { gotoStep } = useCreateEntityState()

  const [propertyView, setPropertyView] = useState<string>('Settings')
  const canSubmit = true

  return (
    <PageWrapper>
      <PageRow>
        <Typography variant='secondary' size='xl'>
          Configure the properties of this Asset Class **
        </Typography>
      </PageRow>

      <PageRow style={{ gap: 8 }}>
        {['Settings', 'Linked Resources', 'Claims', 'Accorded Rights', 'Linked Entities'].map((key) => (
          <Badge key={key} active={key === propertyView} onClick={(): void => setPropertyView(key)}>
            <Typography size='lg' weight='medium' color='white'>
              {key}
            </Typography>
          </Badge>
        ))}
      </PageRow>

      <PageRow className='flex-column' style={{ gap: 30 }}>
        {propertyView === 'Settings' && <SetupSettings />}
        {propertyView === 'Linked Resources' && <SetupLinkedResource />}
        {propertyView === 'Claims' && <SetupClaim />}
        {propertyView === 'Accorded Rights' && <SetupAccordedRight />}
        {propertyView === 'Linked Entities' && <SetupLinkedEntity />}
      </PageRow>

      <PageRow style={{ gap: 20 }}>
        <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
          Back
        </Button>
        <Button variant='primary' disabled={!canSubmit} onClick={(): void => gotoStep(1)}>
          Continue
        </Button>
      </PageRow>
    </PageWrapper>
  )
}

export default SetupProperties
