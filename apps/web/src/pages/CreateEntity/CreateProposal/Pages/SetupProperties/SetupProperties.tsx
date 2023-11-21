import React from 'react'
import { Button } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { FlexBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Typography } from 'components/Typography'
import { useQuery } from 'hooks/window'

const SetupProperties: React.FC = (): JSX.Element => {
  const navigate =useNavigate()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const { getQuery } = useQuery()
  const join = getQuery('join')
  const {search} = useLocation()

  const {
    entityType,
    creator,
    administrator,
    page,
    service,
    linkedResource,
    claim,
    accordedRight,
    linkedEntity,
    daoGroups,
    updateCreator,
    updateAdministrator,
    updatePage,
    updateService,
    updateLinkedResource,
    updateClaim,
    updateAccordedRight,
    updateLinkedEntity,
  } = useCreateEntityState()

  const handleBack = () => {
    navigate(`/create/entity/deed/${entityId}/${coreAddress}/page${search}`)
  }

  const handleNext = () => {
    if (join === 'true') {
      navigate(`/create/entity/deed/${entityId}/${coreAddress}/review${search}`)
    } else {
      navigate(`/create/entity/deed/${entityId}/${coreAddress}/action${search}`)
    }
  }

  const PropertiesFormProps = {
    entityType,
    creator,
    administrator,
    page,
    service,
    linkedResource,
    claim,
    accordedRight,
    linkedEntity,
    daoGroups,
    updateCreator,
    updateAdministrator,
    updatePage,
    updateService,
    updateLinkedResource,
    updateClaim,
    updateAccordedRight,
    updateLinkedEntity,
  }

  return (
    <FlexBox direction='column' gap={7.5} width={deviceWidth.tablet + 'px'}>
      <Typography variant='secondary' size='xl'>
        Configure the properties
      </Typography>

      <PropertiesForm {...PropertiesFormProps} />

      <FlexBox id='setup-property-actions' gap={5}>
        <Button variant='secondary' onClick={handleBack}>
          Back
        </Button>
        <Button variant='primary' onClick={handleNext}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupProperties
