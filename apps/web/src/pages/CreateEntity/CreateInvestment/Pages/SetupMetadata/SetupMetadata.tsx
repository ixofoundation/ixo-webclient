import { Box } from 'components/App/App.styles'
import React, { useMemo } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../../Components'
import { InvestmentProfileForm, EntityAdditionalInfoForm } from '../../../Forms'
import { PageWrapper } from './SetupMetadata.styles'

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
    <PageWrapper>
      <Box className='d-flex flex-column'>
        {/* <Box className='d-flex align-items-center justify-content-between'>
          <Typography weight='medium' size='xl'>
            Localisation:
          </Typography>
          <LocalisationForm localisation={localisation} setLocalisation={updateLocalisation} />
        </Box> */}
        <Box className='mb-2' />
        <InvestmentProfileForm
          image={profile?.image}
          setImage={(image: string): void => handleUpdateProfile('image', image)}
          logo={profile?.logo}
          setLogo={(logo: string): void => handleUpdateProfile('logo', logo)}
          name={profile?.name}
          setName={(name: string): void => handleUpdateProfile('name', name)}
          orgName={profile?.orgName}
          setOrgName={(orgName: string): void => handleUpdateProfile('orgName', orgName)}
        />
      </Box>
      <Box className='d-flex flex-column' style={{ width: 400 }}>
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

        <Box className='d-flex justify-content-end w-100 mt-4' style={{ gap: 20 }}>
          <Button size='full' height={48} variant='secondary' onClick={handlePrev}>
            Back
          </Button>
          <Button size='full' height={48} variant={'primary'} disabled={!canSubmit} onClick={handleNext}>
            Continue
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default SetupMetadata
