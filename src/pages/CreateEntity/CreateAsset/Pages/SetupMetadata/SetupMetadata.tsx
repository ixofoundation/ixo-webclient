import { Box } from 'components/App/App.styles'
import React from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../../Components'
import { LocalisationForm, TokenProfileForm, EntityAdditionalInfoForm } from '../../../Forms'
import { PageWrapper } from './SetupMetadata.styles'
import { Typography } from 'components/Typography'
import { TAssetMetadataModel } from 'types/protocol'

const SetupMetadata: React.FC = (): JSX.Element => {
  const createEntityState = useCreateEntityState()
  const { localisation, gotoStep, updateMetadata, updateLocalisation } = createEntityState
  const metadata: TAssetMetadataModel = createEntityState.metadata as TAssetMetadataModel

  const canSubmit = true

  const handlePrev = (): void => {
    gotoStep(-1)
  }
  const handleNext = (): void => {
    gotoStep(1)
  }

  const handleUpdateMetadata = (key: string, value: any): void => {
    updateMetadata({
      ...metadata,
      [key]: value,
    })
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
        <TokenProfileForm
          image={metadata?.image}
          setImage={(image): void => handleUpdateMetadata('image', image)}
          type={metadata?.type}
          setType={(type): void => handleUpdateMetadata('type', type)}
          logo={metadata?.icon}
          setLogo={(logo): void => handleUpdateMetadata('icon', logo)}
          name={metadata?.name}
          setName={(name): void => handleUpdateMetadata('name', name)}
          maxSupply={metadata?.maxSupply}
          setMaxSupply={(maxSupply): void => handleUpdateMetadata('maxSupply', maxSupply)}
          decimals={metadata?.decimals}
          setDecimals={(decimals): void => handleUpdateMetadata('decimals', decimals)}
          denom={metadata?.denom}
          setDenom={(denom): void => handleUpdateMetadata('denom', denom)}
          tokenName={metadata?.tokenName}
          setTokenName={(tokenName): void => handleUpdateMetadata('tokenName', tokenName)}
        />
      </Box>
      <Box className='d-flex flex-column' style={{ width: 400 }}>
        <EntityAdditionalInfoForm
          description={metadata?.description ?? ''}
          setDescription={(description): void => handleUpdateMetadata('description', description)}
          brand={metadata?.brand ?? ''}
          setBrand={(brand): void => handleUpdateMetadata('brand', brand)}
          location={metadata?.location ?? ''}
          setLocation={(location): void => handleUpdateMetadata('location', location)}
          metrics={metadata?.metrics ?? []}
          setMetrics={(metrics): void => handleUpdateMetadata('metrics', metrics)}
          attributes={metadata?.attributes ?? []}
          setAttributes={(attributes): void => handleUpdateMetadata('attributes', attributes)}
          autoGenerateZLottie={metadata?.autoGenerateZLottie}
          setAutoGenerateZLottie={(autoGenerateZLottie): void =>
            handleUpdateMetadata('autoGenerateZLottie', autoGenerateZLottie)
          }
          startDate={metadata?.startDate ?? ''}
          endDate={metadata?.endDate ?? ''}
          setStartEndDate={(startDate, endDate) => {
            updateMetadata({
              ...metadata,
              startDate,
              endDate,
            })
          }}
        />

        <Box className='d-flex justify-content-end w-100 mt-4' style={{ gap: 20 }}>
          <Button variant='secondary' onClick={handlePrev}>
            Back
          </Button>
          <Button variant={'primary'} disabled={!canSubmit} onClick={handleNext}>
            Continue
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default SetupMetadata
