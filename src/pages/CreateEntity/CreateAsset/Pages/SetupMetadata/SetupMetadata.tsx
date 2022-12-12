import { Box } from 'components/App/App.styles'
import React, { useMemo, useState } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../../Components'
import {
  LocalisationForm,
  TokenBasicInfoCardForm,
  ProtocolAttributesForm,
  ProtocolDescriptionForm,
  ProtocolMetricsForm,
} from '../../../Forms'
import { PageWrapper } from './SetupMetadata.styles'
import { Typography } from 'components/Typography'

const SetupMetadata: React.FC = (): JSX.Element => {
  const { metadata, localisation, gotoStep, updateMetadata, updateLocalisation } = useCreateEntityState()

  const [metaView, setMetaView] = useState<'description' | 'metrics' | 'attributes'>('description')

  const canSubmit = useMemo(
    () =>
      metadata?.image &&
      metadata?.denom &&
      metadata?.type &&
      metadata?.icon &&
      metadata?.tokenName &&
      metadata?.name &&
      metadata?.decimals,
    [metadata],
  )

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

  const renderTabs = (): JSX.Element => (
    <Box className='d-flex mb-2' style={{ gap: 20, cursor: 'pointer', height: 32 }}>
      <Typography
        weight='medium'
        size='xl'
        color={metaView === 'description' ? 'blue' : 'color-1'}
        onClick={(): void => setMetaView('description')}
      >
        Description
      </Typography>
      <Typography
        weight='medium'
        size='xl'
        color={metaView === 'metrics' ? 'blue' : 'color-1'}
        onClick={(): void => setMetaView('metrics')}
      >
        Metrics
      </Typography>
      <Typography
        weight='medium'
        size='xl'
        color={metaView === 'attributes' ? 'blue' : 'color-1'}
        onClick={(): void => setMetaView('attributes')}
      >
        Attributes
      </Typography>
    </Box>
  )
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
        <TokenBasicInfoCardForm
          image={metadata?.image}
          setImage={(image): void => handleUpdateMetadata('image', image)}
          denom={metadata?.denom}
          setDenom={(denom): void => handleUpdateMetadata('denom', denom)}
          type={metadata?.type}
          setType={(type): void => handleUpdateMetadata('type', type)}
          icon={metadata?.icon}
          setIcon={(icon): void => handleUpdateMetadata('icon', icon)}
          tokenName={metadata?.tokenName}
          setTokenName={(tokenName): void => handleUpdateMetadata('tokenName', tokenName)}
          name={metadata?.name}
          setName={(name): void => handleUpdateMetadata('name', name)}
          maxSupply={metadata?.maxSupply}
          setMaxSupply={(maxSupply): void => handleUpdateMetadata('maxSupply', maxSupply)}
          decimals={metadata?.decimals}
          setDecimals={(decimals): void => handleUpdateMetadata('decimals', decimals)}
        />
      </Box>
      <Box className='d-flex flex-column' style={{ width: 400 }}>
        {renderTabs()}
        <Box style={{ flex: '1 auto' }}>
          {metaView === 'description' && (
            <ProtocolDescriptionForm
              description={metadata?.description}
              setDescription={(description): void => handleUpdateMetadata('description', description)}
              brandName={metadata?.brandName}
              setBrandName={(brandName): void => handleUpdateMetadata('brandName', brandName)}
              country={metadata?.country}
              setCountry={(country): void => handleUpdateMetadata('country', country)}
              autoGenerateZLottie={metadata?.autoGenerateZLottie}
              setAutoGenerateZLottie={(autoGenerateZLottie): void =>
                handleUpdateMetadata('autoGenerateZLottie', autoGenerateZLottie)
              }
              startDate={metadata?.startDate}
              endDate={metadata?.endDate}
              setStartEndDate={(startDate, endDate) => {
                updateMetadata({
                  ...metadata,
                  startDate,
                  endDate,
                })
              }}
            />
          )}
          {metaView === 'metrics' && (
            <ProtocolMetricsForm
              metrics={metadata?.metrics}
              setMetrics={(metrics): void => handleUpdateMetadata('metrics', metrics)}
            />
          )}
          {metaView === 'attributes' && (
            <ProtocolAttributesForm
              attributes={metadata?.attributes}
              setAttributes={(attributes): void => handleUpdateMetadata('attributes', attributes)}
            />
          )}
        </Box>

        <Box className='d-flex justify-content-end w-100' style={{ gap: 20 }}>
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
