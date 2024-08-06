import React, { useMemo } from 'react'
import { ProfileFormFactory } from './ProfileFormFactory'
import { AdditionalEntityInformation } from './AdditionalEntityInformation'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'
import { Button } from 'screens/CreateEntity/Components'
import { useCreateEntityStateAsActionState } from 'hooks/entity/useCreateEntityStateAsAction'
import { Box, Flex } from '@mantine/core'

const SetupMetadata = ({ showNavigation = true }: { showNavigation?: boolean }): JSX.Element => {
  const { profile, entityType } = useCreateEntityStateAsActionState()
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
    <Flex justify='stretch' gap={12.5}>
      <Flex className='d-flex flex-column'>
        {/* <Box className='d-flex align-items-center justify-content-between'>
          <Typography weight='medium' size='xl'>
            Localisation:
          </Typography>
          <LocalisationForm localisation={localisation} setLocalisation={updateLocalisation} />
        </Box> */}
        <Box mb={2} />
        <ProfileFormFactory />
      </Flex>
      <Flex className='d-flex flex-column justify-content-between' style={{ width: 400 }}>
        <Flex>
          <AdditionalEntityInformation />
        </Flex>

        {showNavigation && (
          <Box className='d-flex justify-content-end w-100 mt-4' style={{ gap: 20 }}>
            <Button size='full' height={48} variant='secondary' onClick={handlePrev}>
              Back
            </Button>
            <Button size='full' height={48} variant={'primary'} disabled={!canSubmit} onClick={handleNext}>
              Continue
            </Button>
          </Box>
        )}
      </Flex>
    </Flex>
  )
}

export default SetupMetadata
