import { Box, FlexBox } from 'components/App/App.styles'
import React, { useMemo } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../../Components'
import { DAOProfileForm, EntityAdditionalInfoForm } from '../../../Forms'

const SetupMetadata: React.FC = (): JSX.Element => {
  const createEntityState = useCreateEntityState()
  const { entityType, startDate, endDate, gotoStep, updateProfile, updateStartEndDate } = createEntityState
  const profile = createEntityState.profile

  const canSubmit: boolean = useMemo(
    () => !!profile && !!profile.image && !!profile.logo && !!profile.orgName && !!profile.name,
    [profile],
  )

  const handlePrev = (): void => {
    gotoStep(-1)
  }
  const handleNext = (): void => {
    gotoStep(1)
  }

  const handleUpdateProfile = (key: string, value: any): void => {
    updateProfile({
      ...profile,
      [key]: value,
    })
  }

  return (
    <FlexBox justifyContent='stretch' gap={12.5}>
      <Box className='d-flex flex-column'>
        {/* <Box className='d-flex align-items-center justify-content-between'>
          <Typography weight='medium' size='xl'>
            Localisation:
          </Typography>
          <LocalisationForm localisation={localisation} setLocalisation={updateLocalisation} />
        </Box> */}
        <Box className='mb-2' />
        <DAOProfileForm
          image={profile?.image}
          setImage={(image): void => handleUpdateProfile('image', image)}
          logo={profile?.logo}
          setLogo={(logo): void => handleUpdateProfile('logo', logo)}
          orgName={profile?.orgName ?? ''}
          setOrgName={(orgName): void => handleUpdateProfile('orgName', orgName)}
          name={profile?.name ?? ''}
          setName={(name): void => handleUpdateProfile('name', name)}
        />
      </Box>
      <Box className='d-flex flex-column justify-content-between' style={{ width: 400 }}>
        <Box>
          <EntityAdditionalInfoForm
            entityType={entityType}
            description={profile?.description ?? ''}
            setDescription={(description): void => handleUpdateProfile('description', description)}
            brand={profile?.brand ?? ''}
            setBrand={(brand): void => handleUpdateProfile('brand', brand)}
            location={profile?.location ?? ''}
            setLocation={(location): void => handleUpdateProfile('location', location)}
            metrics={profile?.metrics ?? []}
            setMetrics={(metrics): void => handleUpdateProfile('metrics', metrics)}
            attributes={profile?.attributes ?? []}
            setAttributes={(attributes): void => handleUpdateProfile('attributes', attributes)}
            startDate={startDate}
            endDate={endDate}
            setStartEndDate={(startDate, endDate) => {
              updateStartEndDate({
                startDate,
                endDate,
              })
            }}
          />
        </Box>

        <Box className='d-flex justify-content-end w-100 mt-4' style={{ gap: 20 }}>
          <Button size='full' height={48} variant='secondary' onClick={handlePrev}>
            Back
          </Button>
          <Button size='full' height={48} variant={'primary'} disabled={!canSubmit} onClick={handleNext}>
            Continue
          </Button>
        </Box>
      </Box>
    </FlexBox>
  )
}

export default SetupMetadata
