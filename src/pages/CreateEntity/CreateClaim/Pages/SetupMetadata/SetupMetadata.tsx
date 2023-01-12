import { Box } from 'components/App/App.styles'
import React, { useMemo, useState } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../../Components'
import {
  LocalisationForm,
  ClaimBasicInfoCardForm,
  ProtocolAttributesForm,
  ProtocolDescriptionForm,
  ProtocolMetricsForm,
} from '../../../Forms'
import { PageWrapper } from './SetupMetadata.styles'
import { Typography } from 'components/Typography'
import { EClaimType, TClaimMetadataModel } from 'types/protocol'

const SetupMetadata: React.FC = (): JSX.Element => {
  const { metadata, localisation, gotoStep, updateMetadata, updateLocalisation } = useCreateEntityState()

  const [metaView, setMetaView] = useState<'description' | 'metrics' | 'attributes'>('description')

  const canSubmit = useMemo(
    () =>
      (metadata as TClaimMetadataModel)?.type &&
      (metadata as TClaimMetadataModel)?.title &&
      (metadata as TClaimMetadataModel)?.description,
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
        <ClaimBasicInfoCardForm
          type={(metadata as TClaimMetadataModel)?.type}
          setType={(type: EClaimType): void => handleUpdateMetadata('type', type)}
          title={(metadata as TClaimMetadataModel)?.title}
          setTitle={(title: string): void => handleUpdateMetadata('title', title)}
          description={(metadata as TClaimMetadataModel)?.description}
          setDescription={(description: string): void => handleUpdateMetadata('description', description)}
        />
      </Box>
      <Box className='d-flex flex-column' style={{ width: 400 }}>
        {renderTabs()}
        <Box style={{ flex: '1 auto' }}>
          {metaView === 'description' && (
            <ProtocolDescriptionForm
              description={(metadata as TClaimMetadataModel)?.description}
              setDescription={(description): void => handleUpdateMetadata('description', description)}
              brandName={(metadata as TClaimMetadataModel)?.brandName}
              setBrandName={(brandName): void => handleUpdateMetadata('brandName', brandName)}
              country={(metadata as TClaimMetadataModel)?.country}
              setCountry={(country): void => handleUpdateMetadata('country', country)}
              autoGenerateZLottie={(metadata as TClaimMetadataModel)?.autoGenerateZLottie}
              setAutoGenerateZLottie={(autoGenerateZLottie): void =>
                handleUpdateMetadata('autoGenerateZLottie', autoGenerateZLottie)
              }
              startDate={(metadata as TClaimMetadataModel)?.startDate}
              endDate={(metadata as TClaimMetadataModel)?.endDate}
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
              metrics={(metadata as TClaimMetadataModel)?.metrics}
              setMetrics={(metrics): void => handleUpdateMetadata('metrics', metrics)}
            />
          )}
          {metaView === 'attributes' && (
            <ProtocolAttributesForm
              attributes={(metadata as TClaimMetadataModel)?.attributes ?? []}
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
