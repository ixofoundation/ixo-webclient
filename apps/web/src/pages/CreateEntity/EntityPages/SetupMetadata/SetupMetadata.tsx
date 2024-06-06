import { Box, FlexBox } from 'components/App/App.styles'
import React, { useMemo } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../Components'
import { ProfileFormFactory } from './ProfileFormFactory'
import { AdditionalEntityInformation } from './AdditionalEntityInformation'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'

const SetupMetadata = ({ showNavigation = true }: { showNavigation?: boolean }): JSX.Element => {
  const { profile, entityType } = useCreateEntityState()
  const { navigateToNextStep, navigateToPreviousStep } = useCreateEntityStepState()

  const canSubmit: boolean = useMemo(() => {
    switch (entityType) {
      case 'dao':
      case 'investment':
      case 'asset':
      case 'oracle':
        return !!profile && !!profile.image && !!profile.logo && !!profile.orgName && !!profile.name
      case 'protocol/claim':
        return !!profile && !!profile.category && !!profile.name && !!profile.description
      case 'protocol/deed':
        return !!profile && !!profile.category && !!profile.name && !!profile.description
      default:
        return !!profile && !!profile.image && !!profile.logo && !!profile.orgName && !!profile.name
    }
  }, [profile, entityType])

  const handlePrev = (): void => {
    navigateToPreviousStep()
  }
  const handleNext = (): void => {
    navigateToNextStep()
  }

  return (
    <FlexBox $justifyContent='stretch' $gap={12.5}>
      <Box className='d-flex flex-column'>
        {/* <Box className='d-flex align-items-center justify-content-between'>
          <Typography weight='medium' size='xl'>
            Localisation:
          </Typography>
          <LocalisationForm localisation={localisation} setLocalisation={updateLocalisation} />
        </Box> */}
        <Box className='mb-2' />
        <ProfileFormFactory />
      </Box>
      <Box className='d-flex flex-column justify-content-between' style={{ width: 400 }}>
        <Box>
          <AdditionalEntityInformation />
        </Box>

        {showNavigation && <Box className='d-flex justify-content-end w-100 mt-4' style={{ gap: 20 }}>
          <Button size='full' height={48} variant='secondary' onClick={handlePrev}>
            Back
          </Button>
          <Button size='full' height={48} variant={'primary'} disabled={!canSubmit} onClick={handleNext}>
            Continue
          </Button>
        </Box>}
      </Box>
    </FlexBox>
  )
}

export default SetupMetadata
