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
import {
  TDAOGroupModel,
  TEntityAccordedRightModel,
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityLinkedEntityModel,
  TEntityLinkedResourceModel,
  TEntityPageModel,
  TEntityServiceModel,
} from 'types/protocol'

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
  creator: TEntityCreatorModel
  administrator: TEntityCreatorModel
  ddoTags?: TEntityDDOTagModel[]
  page: TEntityPageModel
  service: TEntityServiceModel[]
  linkedResource: { [id: string]: TEntityLinkedResourceModel }
  claim: { [id: string]: TEntityClaimModel }
  accordedRight: { [key: string]: TEntityAccordedRightModel }
  linkedEntity: { [key: string]: TEntityLinkedEntityModel }
  daoGroups?: { [id: string]: TDAOGroupModel }
  updateCreator: (creator: TEntityCreatorModel) => void
  updateAdministrator: (administrator: TEntityAdministratorModel) => void
  updateDDOTags?: (ddoTags: TEntityDDOTagModel[]) => void
  updatePage: (page: TEntityPageModel) => void
  updateService: (service: TEntityServiceModel[]) => void
  updateLinkedResource: (linkedResource: { [id: string]: TEntityLinkedResourceModel }) => void
  updateClaim: (claim: { [id: string]: TEntityClaimModel }) => void
  updateAccordedRight: (accordedRight: { [id: string]: TEntityAccordedRightModel }) => void
  updateLinkedEntity: (linkedEntity: { [id: string]: TEntityLinkedEntityModel }) => void
}

const PropertiesForm: React.FC<Props> = ({
  entityType,
  creator,
  administrator,
  ddoTags,
  page,
  service,
  linkedResource,
  claim,
  accordedRight,
  linkedEntity,
  daoGroups = {},
  updateCreator,
  updateAdministrator,
  updateDDOTags,
  updatePage,
  updateService,
  updateLinkedResource,
  updateClaim,
  updateAccordedRight,
  updateLinkedEntity,
}): JSX.Element => {
  const [propertyView, setPropertyView] = useState<string>('')
  const activeProperties = useMemo(() => {
    switch (entityType) {
      case 'Protocol':
        return Properties.filter((property) => property !== 'Claims')
      case 'Proposal':
        return Properties.filter((property) => property !== 'Settings')
      default:
        return Properties
    }
  }, [entityType])

  const SettingsProps = {
    entityType,
    creator,
    administrator,
    ddoTags,
    page,
    service,
    updateCreator,
    updateAdministrator,
    updateDDOTags,
    updatePage,
    updateService,
  }

  const LinkedResourceProps = {
    linkedResource,
    updateLinkedResource,
  }

  const ClaimProps = {
    claim,
    updateClaim,
  }

  const AccordedRightProps = {
    accordedRight,
    updateAccordedRight,
  }

  const LinkedEntityProps = {
    linkedEntity,
    daoGroups,
    updateLinkedEntity,
  }

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
        {propertyView === 'Settings' && <SetupSettings {...SettingsProps} />}
        {propertyView === 'Linked Resources' && <SetupLinkedResource {...LinkedResourceProps} />}
        {propertyView === 'Claims' && <SetupClaim {...ClaimProps} />}
        {propertyView === 'Accorded Rights' && <SetupAccordedRight {...AccordedRightProps} />}
        {propertyView === 'Linked Entities' && <SetupLinkedEntity {...LinkedEntityProps} />}
      </FlexBox>
    </>
  )
}

export default PropertiesForm
