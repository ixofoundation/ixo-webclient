// TODO: profile->@type
import { Box } from 'components/App/App.styles'
import React, { useEffect, useMemo } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../../Components'
import { LocalisationForm, InvestmentBasicInfoCardForm, EntityAdditionalInfoForm } from '../../../Forms'
import { PageWrapper } from './SetupMetadata.styles'
import { Typography } from 'components/Typography'
import { TInvestmentMetadataModel } from 'types/protocol'
import { v4 } from 'uuid'

const SetupMetadata: React.FC = (): JSX.Element => {
  const { metadata, profile, localisation, gotoStep, updateMetadata, updateProfile, updateLocalisation } =
    useCreateEntityState()

  const canSubmit = useMemo(
    () =>
      profile.id &&
      profile['@type'] &&
      profile.name &&
      profile.description &&
      profile.image &&
      profile.logo &&
      profile.brand &&
      profile.location &&
      profile.attributes.length > 0 &&
      profile.metrics.length > 0,
    [profile],
  )

  useEffect(() => {
    // generate project id
    if (!profile.id) {
      handleUpdateProfile('id', v4())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePrev = (): void => {
    gotoStep(-1)
  }
  const handleNext = (): void => {
    gotoStep(1)
  }

  /**
   * @deprecated
   * @param key
   * @param value
   */
  const handleUpdateMetadata = (key: string, value: any): void => {
    updateMetadata({
      ...metadata,
      [key]: value,
    })
  }

  const handleUpdateProfile = (key: string, value: any): void => {
    updateProfile({ ...profile, [key]: value })
  }

  return (
    <PageWrapper>
      <Box className='d-flex flex-column'>
        <Box className='d-flex align-items-center justify-content-between'>
          <Typography weight='medium' size='xl'>
            Localisation:
          </Typography>
          <LocalisationForm localisation={localisation} setLocalisation={updateLocalisation} />
        </Box>
        <Box className='mb-2' />
        <InvestmentBasicInfoCardForm
          image={profile?.image}
          setImage={(image: string): void => handleUpdateProfile('image', image)}
          logo={profile?.logo}
          setLogo={(logo: string): void => handleUpdateProfile('logo', logo)}
          name={profile?.name}
          setName={(name: string): void => handleUpdateProfile('name', name)}
          orgName={(metadata as TInvestmentMetadataModel)?.orgName}
          setOrgName={(orgName: string): void => handleUpdateMetadata('orgName', orgName)}
        />
      </Box>
      <Box className='d-flex flex-column' style={{ width: 400 }}>
        <EntityAdditionalInfoForm
          description={profile?.description}
          setDescription={(description): void => handleUpdateProfile('description', description)}
          brand={profile?.brand}
          setBrand={(brand): void => handleUpdateProfile('brand', brand)}
          location={profile?.location}
          setLocation={(location): void => handleUpdateProfile('location', location)}
          metrics={profile?.metrics}
          setMetrics={(metrics): void => handleUpdateProfile('metrics', metrics)}
          attributes={profile?.attributes}
          setAttributes={(attributes): void => handleUpdateProfile('attributes', attributes)}
          // autoGenerateZLottie={(metadata as TAssetMetadataModel)?.autoGenerateZLottie}
          // setAutoGenerateZLottie={(autoGenerateZLottie): void =>
          //   handleUpdateMetadata('autoGenerateZLottie', autoGenerateZLottie)
          // }
          // startDate={(metadata as TAssetMetadataModel)?.startDate ?? ''}
          // endDate={(metadata as TAssetMetadataModel)?.endDate ?? ''}
          // setStartEndDate={(startDate, endDate) => {
          //   updateMetadata({
          //     ...metadata,
          //     startDate,
          //     endDate,
          //   } as TAssetMetadataModel)
          // }}
        />

        <Box className='d-flex justify-content-end w-100' style={{ gap: 20 }}>
          <Button className='w-100' variant='secondary' onClick={handlePrev}>
            Back
          </Button>
          <Button className='w-100' variant={'primary'} disabled={!canSubmit} onClick={handleNext}>
            Continue
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default SetupMetadata
