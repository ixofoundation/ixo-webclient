import { Box } from 'components/App/App.styles'
import React from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../../Components'
import { TokenProfileForm, EntityAdditionalInfoForm } from '../../../Forms'
import { PageWrapper } from './SetupMetadata.styles'
import { TAssetMetadataModel } from 'types/entities'

const SetupMetadata: React.FC = (): JSX.Element => {
  const createEntityState = useCreateEntityState()
  const { entityType, startDate, endDate, gotoStep, updateProfile, updateStartEndDate } = createEntityState
  const profile: TAssetMetadataModel = createEntityState.profile as TAssetMetadataModel

  const canSubmit = true

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
        <TokenProfileForm
          image={profile?.image}
          setImage={(image): void => handleUpdateProfile('image', image)}
          type={profile?.type}
          setType={(type): void => handleUpdateProfile('type', type)}
          logo={profile?.logo}
          setLogo={(logo): void => handleUpdateProfile('logo', logo)}
          name={profile?.name}
          setName={(name): void => handleUpdateProfile('name', name)}
          maxSupply={profile?.maxSupply}
          setMaxSupply={(maxSupply): void => handleUpdateProfile('maxSupply', maxSupply)}
          decimals={profile?.decimals}
          setDecimals={(decimals): void => handleUpdateProfile('decimals', decimals)}
          denom={profile?.denom}
          setDenom={(denom): void => handleUpdateProfile('denom', denom)}
          tokenName={profile?.tokenName}
          setTokenName={(tokenName): void => handleUpdateProfile('tokenName', tokenName)}
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
          autoGenerateZLottie={profile?.autoGenerateZLottie}
          setAutoGenerateZLottie={(autoGenerateZLottie): void =>
            handleUpdateProfile('autoGenerateZLottie', autoGenerateZLottie)
          }
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
          <Button size='full' height={48} variant='primary' disabled={!canSubmit} onClick={handleNext}>
            Continue
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default SetupMetadata
