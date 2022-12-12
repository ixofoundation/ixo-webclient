import { Box } from 'components/App/App.styles'
import React, { useMemo, useState } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../../Components'
import {
  LocalisationForm,
  ClaimBasicInfoCardForm,
  ProtocolAttributesForm,
  ClaimAdditionalInfoForm,
} from '../../../Forms'
import { PageWrapper } from './SetupMetadata.styles'
import { Typography } from 'components/Typography'
import { EClaimType } from 'types/protocol'

const SetupMetadata: React.FC = (): JSX.Element => {
  const { metadata, localisation, gotoStep, updateMetadata, updateLocalisation } = useCreateEntityState()

  const [metaView, setMetaView] = useState<'additional' | 'keywords'>('additional')

  const canSubmit = useMemo(() => metadata?.type && metadata?.title && metadata?.description, [metadata])

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
        color={metaView === 'additional' ? 'blue' : 'color-1'}
        onClick={(): void => setMetaView('additional')}
      >
        Additional Information
      </Typography>
      <Typography
        weight='medium'
        size='xl'
        color={metaView === 'keywords' ? 'blue' : 'color-1'}
        onClick={(): void => setMetaView('keywords')}
      >
        Keywords
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
          type={metadata?.type}
          setType={(type: EClaimType): void => handleUpdateMetadata('type', type)}
          title={metadata?.title}
          setTitle={(title: string): void => handleUpdateMetadata('title', title)}
          description={metadata?.description}
          setDescription={(description: string): void => handleUpdateMetadata('description', description)}
        />
      </Box>
      <Box className='d-flex flex-column' style={{ width: 400 }}>
        {renderTabs()}
        <Box style={{ flex: '1 auto' }}>
          {metaView === 'additional' && (
            <ClaimAdditionalInfoForm
              feature={metadata?.feature}
              setFeature={(feature: string): void => handleUpdateMetadata('feature', feature)}
              reliability={metadata?.reliability}
              setReliability={(reliability: string): void => handleUpdateMetadata('reliability', reliability)}
              userGuide={metadata?.userGuide}
              setUserGuide={(userGuide: string): void => handleUpdateMetadata('userGuide', userGuide)}
            />
          )}
          {metaView === 'keywords' && (
            <ProtocolAttributesForm
              attributes={metadata?.keywords}
              setAttributes={(keywords: { key: string; value: string }[]): void =>
                handleUpdateMetadata('keywords', keywords)
              }
            />
          )}
        </Box>

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
