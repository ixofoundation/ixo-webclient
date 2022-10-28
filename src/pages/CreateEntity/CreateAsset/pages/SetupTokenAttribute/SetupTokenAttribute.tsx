import { Box, theme, Typography } from 'modules/App/App.styles'
import React, { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../../components'
import {
  LocalisationForm,
  TokenBasicInfoCardForm,
  TokenAttributesForm,
  TokenDescriptionForm,
  TokenMetricsForm,
} from '../../forms'
import { Localisations } from '../../forms/LocalisationForm'
import { PageWrapper } from './SetupTokenAttribute.styles'

const SetupTokenAttribute: React.FC = (): JSX.Element => {
  const history = useHistory()
  const [localisation, setLocalisation] = useState(Localisations.EN)
  const [formData, setFormData] = useState({
    denom: undefined,
    image: undefined,
    icon: undefined,
    assetType: undefined,
    assetName: undefined,
    className: undefined,
    maxAmount: undefined,
    decimals: undefined,
  })
  const [description, setDescription] = useState('')
  const [brandName, setBrandName] = useState('')
  const [country, setCountry] = useState('')
  const [attributes, setAttributes] = useState([{ key: '', value: '' }])
  const [metrics, setMetrics] = useState({
    prefix: '',
    metric: '',
    suffix: '',
    source: '',
  })

  const [metaView, setMetaView] = useState<
    'description' | 'metrics' | 'attributes'
  >('description')

  const canSubmit = useMemo(() => !!description, [description])

  const renderTabs = (): JSX.Element => (
    <Box
      className="d-flex mb-2"
      style={{ gap: 20, cursor: 'pointer', height: 32 }}
    >
      <Typography
        fontWeight={500}
        fontSize="20px"
        lineHeight="23px"
        color={metaView === 'description' ? theme.ixoNewBlue : theme.ixoColor1}
        onClick={(): void => setMetaView('description')}
      >
        Description
      </Typography>
      <Typography
        fontWeight={500}
        fontSize="20px"
        lineHeight="23px"
        color={metaView === 'metrics' ? theme.ixoNewBlue : theme.ixoColor1}
        onClick={(): void => setMetaView('metrics')}
      >
        Metrics
      </Typography>
      <Typography
        fontWeight={500}
        fontSize="20px"
        lineHeight="23px"
        color={metaView === 'attributes' ? theme.ixoNewBlue : theme.ixoColor1}
        onClick={(): void => setMetaView('attributes')}
      >
        Attributes
      </Typography>
    </Box>
  )

  return (
    <PageWrapper>
      <Box className="d-flex flex-column">
        <LocalisationForm
          localisation={localisation}
          setLocalisation={setLocalisation}
        />
        <Box className="mb-2" />
        <TokenBasicInfoCardForm formData={formData} setFormData={setFormData} />
      </Box>
      <Box className="d-flex flex-column">
        {renderTabs()}
        <Box style={{ flex: '1 auto' }}>
          {metaView === 'description' && (
            <TokenDescriptionForm
              description={description}
              setDescription={setDescription}
              brandName={brandName}
              setBrandName={setBrandName}
              country={country}
              setCountry={setCountry}
            />
          )}
          {metaView === 'metrics' && (
            <TokenMetricsForm metrics={metrics} setMetrics={setMetrics} />
          )}
          {metaView === 'attributes' && (
            <TokenAttributesForm
              attributes={attributes}
              setAttributes={setAttributes}
            />
          )}
        </Box>

        <Box className="d-flex justify-content-end w-100" style={{ gap: 20 }}>
          <Button
            variant="secondary"
            size="md"
            onClick={(): void => history.goBack()}
          >
            <Typography
              fontWeight={700}
              fontSize="20px"
              lineHeight="24px"
              style={{ letterSpacing: 0.3 }}
            >
              BACK
            </Typography>
          </Button>
          <Button
            variant={'primary'}
            size="md"
            disabled={!canSubmit}
            onClick={(): void => {
              //
            }}
          >
            <Typography
              fontWeight={700}
              fontSize="20px"
              lineHeight="24px"
              style={{ letterSpacing: 0.3 }}
              color={theme.ixoWhite}
            >
              CONTINUE
            </Typography>
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default SetupTokenAttribute
