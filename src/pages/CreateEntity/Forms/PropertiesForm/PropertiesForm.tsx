import React, { useEffect, useMemo, useState } from 'react'
import { Badge } from './PropertiesForm.styles'
import { SetupSettings } from './SetupSettings'
import { Typography } from 'components/Typography'
import { SetupClaim } from './SetupClaim'
import { SetupLinkedResource } from './SetupLinkedResource'
import { SetupAccordedRight } from './SetupAccordedRight'
import { SetupLinkedEntity } from './SetupLinkedEntity'
import { SetupService } from './SetupService'
import { FlexBox } from 'components/App/App.styles'

const Properties = [
  // 'Services',
  'Settings',
  'Linked Resources',
  'Claims',
  'Accorded Rights',
  'Linked Entities',
]

interface Props {
  entityType: string
}

const PropertiesForm: React.FC<Props> = ({ entityType }): JSX.Element => {
  const [propertyView, setPropertyView] = useState<string>('')
  const activeProperties = useMemo(() => {
    switch (entityType) {
      case 'Claim':
        return Properties.filter((property) => property !== 'Claims')
      case 'Proposal':
        return Properties.filter((property) => property !== 'Settings')
      default:
        return Properties
    }
  }, [entityType])

  useEffect(() => {
    setPropertyView(activeProperties[0])
  }, [activeProperties])

  return (
    <>
      <FlexBox direction='column' id='setup-property-tabs' gap={12}>
        <Typography variant='secondary' size='xl'>
          Configure the properties
        </Typography>
        <FlexBox gap={2} flexWrap='wrap'>
          {activeProperties.map((key) => (
            <Badge key={key} active={key === propertyView} onClick={(): void => setPropertyView(key)}>
              <Typography size='lg' weight='medium' color='white' noWrap>
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
    </>
  )
}

export default PropertiesForm
