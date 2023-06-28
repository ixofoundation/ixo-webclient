import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { TEntityAttributeModel, TEntityMetricModel } from 'types/protocol'
import { EntityAttributesForm } from './EntityAttributesForm'
import { EntityDescriptionForm } from './EntityDescriptionForm'
import { EntityMetricsForm } from './EntityMetricsForm'

interface Props {
  entityType: string
  description: string
  setDescription: (description: string) => void
  brand: string
  setBrand: (brand: string) => void
  location: string
  setLocation: (location: string) => void
  metrics: TEntityMetricModel[]
  setMetrics: (metrics: TEntityMetricModel[]) => void
  attributes: TEntityAttributeModel[]
  setAttributes: (attributes: TEntityAttributeModel[]) => void
  autoGenerateZLottie?: boolean
  setAutoGenerateZLottie?: (autoGenerateZLottie: boolean) => void
  startDate?: string
  endDate?: string
  setStartEndDate?: (startDate: string, endDate: string) => void
}

const EntityAdditionalInfoForm: React.FC<Props> = ({
  entityType,
  description,
  setDescription,
  brand,
  setBrand,
  location,
  setLocation,
  metrics,
  setMetrics,
  attributes,
  setAttributes,
  autoGenerateZLottie,
  setAutoGenerateZLottie,
  startDate,
  endDate,
  setStartEndDate,
}): JSX.Element => {
  const [tab, setTab] = useState<'description' | 'metrics' | 'attributes'>('description')

  const renderTabs = (): JSX.Element => (
    <FlexBox className='mb-2' style={{ gap: 20, cursor: 'pointer', height: 32 }}>
      <Typography
        weight='medium'
        size='xl'
        color={tab === 'description' ? 'blue' : 'dark-blue'}
        onClick={(): void => setTab('description')}
      >
        Description
      </Typography>
      <Typography
        weight='medium'
        size='xl'
        color={tab === 'metrics' ? 'blue' : 'dark-blue'}
        onClick={(): void => setTab('metrics')}
      >
        Metrics
      </Typography>
      <Typography
        weight='medium'
        size='xl'
        color={tab === 'attributes' ? 'blue' : 'dark-blue'}
        onClick={(): void => setTab('attributes')}
      >
        Attributes
      </Typography>
    </FlexBox>
  )
  return (
    <>
      {renderTabs()}
      <FlexBox>
        {tab === 'description' && (
          <EntityDescriptionForm
            entityType={entityType}
            description={description}
            setDescription={setDescription}
            brand={brand}
            setBrand={setBrand}
            location={location}
            setLocation={setLocation}
            autoGenerateZLottie={autoGenerateZLottie}
            setAutoGenerateZLottie={setAutoGenerateZLottie}
            startDate={startDate}
            endDate={endDate}
            setStartEndDate={(val1, val2): void => setStartEndDate && setStartEndDate(val1, val2)}
          />
        )}
        {tab === 'metrics' && <EntityMetricsForm metrics={metrics} setMetrics={setMetrics} />}
        {tab === 'attributes' && <EntityAttributesForm attributes={attributes} setAttributes={setAttributes} />}
      </FlexBox>
    </>
  )
}

export default EntityAdditionalInfoForm
