import React, { useMemo, useState } from 'react'
import { Badge } from './SetupProperties.styles'
import { Button } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { SetupSettings } from './SetupSettings'
import { Typography } from 'components/Typography'
import { SetupClaim } from './SetupClaim'
import { SetupLinkedResource } from './SetupLinkedResource'
import { SetupAccordedRight } from './SetupAccordedRight'
import { SetupLinkedEntity } from './SetupLinkedEntity'
import { SetupService } from './SetupService'
import { FlexBox, theme } from 'components/App/App.styles'

const Properties = ['Services', 'Settings', 'Linked Resources', 'Claims', 'Accorded Rights', 'Linked Entities']

const SetupProperties: React.FC = (): JSX.Element => {
  const { entityType, creator, controller, ddoTags, page, service, gotoStep } = useCreateEntityState()
  const [propertyView, setPropertyView] = useState<string>('Settings')
  const activeProperties = entityType === 'Claim' ? Properties.filter((property) => property !== 'Claims') : Properties
  const canSubmit = useMemo(
    () => creator && controller && ddoTags.length > 0 && page && service.length > 0,
    [creator, controller, ddoTags, page, service],
  )

  return (
    <FlexBox direction='column' gap={7.5} width={theme.breakpoints.md + 'px'}>
      <FlexBox direction='column' id='setup-property-tabs' gap={12}>
        <Typography variant='secondary' size='xl'>
          Configure the properties
        </Typography>
        <FlexBox gap={2}>
          {activeProperties.map((key) => (
            <Badge key={key} active={key === propertyView} onClick={(): void => setPropertyView(key)}>
              <Typography size='lg' weight='medium' color='white'>
                {key}
              </Typography>
            </Badge>
          ))}
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' gap={7.5} width={'100%'}>
        {propertyView === 'Services' && <SetupService />}
        {propertyView === 'Settings' && <SetupSettings />}
        {propertyView === 'Linked Resources' && <SetupLinkedResource />}
        {propertyView === 'Claims' && <SetupClaim />}
        {propertyView === 'Accorded Rights' && <SetupAccordedRight />}
        {propertyView === 'Linked Entities' && <SetupLinkedEntity />}
      </FlexBox>

      <FlexBox id='setup-property-actions' gap={5}>
        <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
          Back
        </Button>
        <Button variant='primary' disabled={!canSubmit} onClick={(): void => gotoStep(1)}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupProperties
