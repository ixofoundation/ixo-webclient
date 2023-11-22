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
  TEntityAdministratorModel,
  TEntityClaimModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageModel,
  TEntityServiceModel,
} from 'types/entities'
import { AccordedRight, LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'

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
  linkedResource: { [id: string]: LinkedResource }
  claim: { [id: string]: TEntityClaimModel }
  accordedRight: { [key: string]: AccordedRight }
  linkedEntity: { [key: string]: LinkedEntity }
  daoGroups?: { [id: string]: TDAOGroupModel }
  updateCreator?: (creator: TEntityCreatorModel) => void
  updateAdministrator: (administrator: TEntityAdministratorModel) => void
  updateDDOTags?: (ddoTags: TEntityDDOTagModel[]) => void
  updatePage: (page: TEntityPageModel) => void
  updateService: (service: TEntityServiceModel[]) => void
  updateLinkedResource: (linkedResource: { [id: string]: LinkedResource }) => void
  updateClaim: (claim: { [id: string]: TEntityClaimModel }) => void
  updateAccordedRight: (accordedRight: { [id: string]: AccordedRight }) => void
  updateLinkedEntity: (linkedEntity: { [id: string]: LinkedEntity }) => void
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
    if (entityType?.startsWith('protocol')) {
      return Properties.filter((property) => property !== 'Claims')
    } else if (entityType === 'deed') {
      return Properties.filter((property) => property !== 'Settings')
    }
    return Properties
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
    <FlexBox direction='column' gap={7.5} width={'100%'}>
      <FlexBox gap={2} flexWrap='wrap'>
        {activeProperties.map((key) => (
          <Badge key={key} active={key === propertyView} onClick={(): void => setPropertyView(key)}>
            <Typography size='lg' weight='medium' color='white' noWrap>
              {key}
            </Typography>
          </Badge>
        ))}
      </FlexBox>

      <SetupService hidden={propertyView !== 'Services'} />
      <SetupSettings hidden={propertyView !== 'Settings'} {...SettingsProps} />
      <SetupLinkedResource hidden={propertyView !== 'Linked Resources'} {...LinkedResourceProps} />
      <SetupClaim hidden={propertyView !== 'Claims'} {...ClaimProps} />
      <SetupAccordedRight hidden={propertyView !== 'Accorded Rights'} {...AccordedRightProps} />
      <SetupLinkedEntity hidden={propertyView !== 'Linked Entities'} {...LinkedEntityProps} />
    </FlexBox>
  )
}

export default PropertiesForm
