import React, { useEffect } from 'react'
import { Button } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { FlexBox } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import { useLocation, useNavigate } from 'react-router-dom'
import { Typography } from 'components/Typography'

const SetupProperties = (): JSX.Element => {
  const navigate =useNavigate()
  const location = useLocation();
  
  // Assuming you are trying to reconstruct a base link from the current path
  const baseLink = location.pathname.split('/').slice(0, -1).join('/');

  const {
    entityType,
    profile,
    creator,
    administrator,
    ddoTags = [],
    page,
    service,
    linkedResource,
    claim,
    accordedRight,
    linkedEntity,
    daoGroups,
    updateCreator,
    updateAdministrator,
    updateDDOTags,
    updatePage,
    updateService,
    updateLinkedResource,
    updateClaim,
    updateAccordedRight,
    updateLinkedEntity,
    validateRequiredProperties,
  } = useCreateEntityState()

  const PropertiesFormProps = {
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
    daoGroups,
    updateCreator,
    updateAdministrator,
    updateDDOTags,
    updatePage,
    updateService,
    updateLinkedResource,
    updateClaim,
    updateAccordedRight,
    updateLinkedEntity,
  }

  useEffect(() => {
    if (ddoTags.length === 0) {
      updateDDOTags([
        {
          category: 'Entity',
          tags: ['Claim'],
          readonly: true,
        },
        {
          category: 'Claim Type',
          tags: [profile?.type || ''],
          readonly: true,
        },
        {
          category: 'Token Class',
          tags: ['Unspecified'],
          readonly: true,
        },
      ])
    } else {
      updateDDOTags(
        ddoTags.map((tag) =>
          tag.category === 'Entity' || tag.category === 'Claim Type' || tag.category === 'Token Class'
            ? { ...tag, readOnly: true }
            : tag,
        ),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePrev = (): void => {
    navigate(`${baseLink}/collection`)
  }
  const handleNext = (): void => {
    navigate(`${baseLink}/review`)
  }

  return (
    <FlexBox direction='column' gap={7.5} width={deviceWidth.tablet + 'px'}>
      <Typography variant='secondary' size='xl'>
        Configure the properties
      </Typography>

      <PropertiesForm {...PropertiesFormProps} />

      <FlexBox id='setup-property-actions' gap={5}>
        <Button variant='secondary' onClick={handlePrev}>
          Back
        </Button>
        <Button variant='primary' disabled={!validateRequiredProperties} onClick={handleNext}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupProperties
