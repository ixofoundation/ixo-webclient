import {
  AddLinkedResourceModal,
  AddSettingsModal,
  CreatorSetupModal,
  LinkedResourceSetupModal,
  LiquiditySetupModal,
  PaymentsSetupModal,
  ServiceSetupModal,
  TagsSetupModal,
} from 'common/modals'
import * as reduxUtils from 'common/redux/utils'
import { v4 as uuidv4 } from 'uuid'
import { Box, theme, Typography } from 'modules/App/App.styles'
import { Button } from 'pages/CreateEntity/components'
import React, { useEffect, useState } from 'react'
import { useCreateEntityState } from 'states/createEntity/createEntity.hooks'
import { TEntityModel } from 'states/createEntity/createEntity.types'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import {
  EntityLinkedResourceConfig,
  EntitySettingsConfig,
  TEntityLinkedResourceModel,
  TEntityLiquidityModel,
  TEntityPaymentModel,
} from 'types'
import {
  LocalisationForm,
  TokenAttributesForm,
  TokenBasicInfoCardForm,
  TokenDescriptionForm,
  TokenMetricsForm,
} from '../../forms'
import {
  PropertyBox,
  PropertyBoxWrapper,
} from '../SetupProperties/SetupProperties.styles'
import { Wrapper, Row } from './IndividualToken.styles'

interface Props {
  SN: number
  token: TEntityModel
  goBack: () => void
}

const IndividualToken: React.FC<Props> = ({
  SN,
  token,
  goBack,
}): JSX.Element => {
  const { entityType, updateAssetInstance } = useCreateEntityState()
  const [localisation, setLocalisation] = useState(token.localisation)
  const [metadata, setMetadata] = useState(token.metadata)
  const [entitySettings, setEntitySettings] = useState<{
    [key: string]: any
  }>(EntitySettingsConfig)
  const [entityLinkedResource, setEntityLinkedResource] = useState<{
    [key: string]: TEntityLinkedResourceModel
  }>({})
  const [openAddSettingsModal, setOpenAddSettingsModal] = useState(false)
  const [openAddLinkedResourceModal, setOpenAddLinkedResourceModal] = useState(
    false,
  )
  // const [claims, setClaims] = useState(token.claims)

  const [metaView, setMetaView] = useState<
    'description' | 'metrics' | 'attributes'
  >('description')

  useEffect(() => {
    if (token.creator) {
      setEntitySettings((settings) => ({
        ...settings,
        creator: { ...settings.creator, data: token.creator },
      }))
    }
    if (token.controller) {
      setEntitySettings((settings) => ({
        ...settings,
        controller: { ...settings.controller, data: token.controller },
      }))
    }
    if (token.tags) {
      setEntitySettings((settings) => ({
        ...settings,
        tags: { ...settings.tags, data: token.tags },
      }))
    }
    if (token.page) {
      setEntitySettings((settings) => ({
        ...settings,
        page: { ...settings.page, data: token.page },
      }))
    }
    if (token.service) {
      setEntitySettings((settings) => ({
        ...settings,
        service: { ...settings.service, data: token.service },
      }))
    }
    if (token.payments && token.payments.length > 0) {
      setEntitySettings((settings) => ({
        ...settings,
        payments: { ...settings.payments, data: token.payments, set: true },
      }))
    }
    if (token.liquidity && token.liquidity.length > 0) {
      setEntitySettings((settings) => ({
        ...settings,
        liquidity: { ...settings.liquidity, data: token.liquidity, set: true },
      }))
    }
    if (token.linkedResource) {
      setEntityLinkedResource(token.linkedResource)
    }
  }, [token])

  console.log(111, 'token', token, entitySettings)

  // popups
  const handleOpenEntitySettingModal = (key: string, open: boolean): void => {
    setEntitySettings((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }
  const handleOpenEntityLinkedResourceModal = (
    key: string,
    open: boolean,
  ): void => {
    setEntityLinkedResource((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }

  // entity settings
  const handleAddEntitySetting = (key: string): void => {
    setEntitySettings((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        set: true,
      },
    }))
  }
  const handleUpdateEntitySetting = (key: string, data: any): void => {
    setEntitySettings((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        data,
      },
    }))
  }
  const handleRemoveEntitySetting = (key: string): void => {
    setEntitySettings((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        set: false,
        data: undefined,
      },
    }))
  }
  // entity linked resources
  const handleAddEntityLinkedResource = (type: string): void => {
    const id = uuidv4()
    setEntityLinkedResource((pre) => ({
      ...pre,
      [id]: { id, type, ...EntityLinkedResourceConfig[type], openModal: true },
    }))
  }
  const handleUpdateEntityLinkedResource = (
    id: string,
    data: TEntityLinkedResourceModel,
  ): void => {
    setEntityLinkedResource((pre) => ({ ...pre, [id]: data }))
  }
  const handleRemoveEntityLinkedResource = (id: string): void => {
    setEntityLinkedResource((pre) => reduxUtils.omitKey(pre, id))
  }

  const handleUpdateMetadata = (key: string, value: any): void => {
    setMetadata({
      ...metadata,
      [key]: value,
    })
  }

  const handleSubmit = (): void => {
    // TODO:
    const data = {
      ...token,
      metadata,
      creator: entitySettings.creator?.data,
      controller: entitySettings.controller?.data,
      tags: entitySettings.tags?.data,
      page: entitySettings.page?.data,
      service: entitySettings.service?.data,
      payments: entitySettings.payments?.data,
      liquidity: entitySettings.liquidity?.data,
      linkedResource: entityLinkedResource,
    }
    updateAssetInstance(SN - 1, data)
    goBack()
  }

  const renderPropertyHeading = (text: string): JSX.Element => (
    <Typography
      className="mb-3"
      fontFamily={theme.secondaryFontFamily}
      fontWeight={400}
      fontSize="24px"
      lineHeight="28px"
    >
      {text}
    </Typography>
  )
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
  const renderSettingsRow = (): JSX.Element => (
    <Box className="d-flex flex-column">
      {renderPropertyHeading('Settings')}
      <Box className="d-flex flex-wrap" style={{ gap: 10 }}>
        {Object.entries(entitySettings)
          .filter(([, value]) => !!value.required || !!value.set)
          .map(([key, value]) => (
            <PropertyBoxWrapper key={key}>
              {!value.required && value.set && (
                <Box
                  className="remove"
                  onClick={(): void => handleRemoveEntitySetting(key)}
                >
                  —
                </Box>
              )}
              <PropertyBox
                size={90}
                full={
                  Array.isArray(value.data)
                    ? value.data.length > 0
                    : !!value.data
                }
                onClick={(): void => handleOpenEntitySettingModal(key, true)}
              >
                <value.icon />
                <Typography
                  fontWeight={700}
                  fontSize="13px"
                  lineHeight="15px"
                  color={theme.ixoWhite}
                >
                  {value.text}
                </Typography>
              </PropertyBox>
            </PropertyBoxWrapper>
          ))}
        <PropertyBox
          size={90}
          grey
          onClick={(): void => setOpenAddSettingsModal(true)}
        >
          <PlusIcon />
        </PropertyBox>
      </Box>
    </Box>
  )
  const renderLinkedResourcesRow = (): JSX.Element => (
    <Box className="d-flex flex-column">
      {renderPropertyHeading('Linked Resources')}
      <Box className="d-flex flex-wrap" style={{ gap: 10 }}>
        {Object.entries(entityLinkedResource).map(([key, value]) => (
          <PropertyBoxWrapper key={key}>
            <Box
              className="remove"
              onClick={(): void => handleRemoveEntityLinkedResource(key)}
            >
              —
            </Box>
            <PropertyBox
              size={90}
              full={!!value.name}
              onClick={(): void =>
                handleOpenEntityLinkedResourceModal(key, true)
              }
            >
              <value.icon />
              <Typography
                fontWeight={700}
                fontSize="13px"
                lineHeight="15px"
                color={theme.ixoWhite}
              >
                {value.name ?? value.text}
              </Typography>
            </PropertyBox>
          </PropertyBoxWrapper>
        ))}
        <PropertyBox
          size={90}
          grey
          onClick={(): void => setOpenAddLinkedResourceModal(true)}
        >
          <PlusIcon />
        </PropertyBox>
      </Box>
    </Box>
  )

  return (
    <Wrapper>
      <Row>
        <Typography
          fontFamily={theme.secondaryFontFamily}
          fontWeight={400}
          fontSize="20px"
          lineHeight="24px"
          letterSpacing="0.3"
        >
          Change the attributes of an individual token.
        </Typography>
      </Row>

      <Row style={{ gap: 50 }}>
        <Box className="d-flex flex-column">
          <Box className="d-flex align-items-center justify-content-between">
            <Typography fontWeight={500} fontSize="20px" lineHeight="28px">
              Localisation:
            </Typography>
            <LocalisationForm
              localisation={localisation}
              setLocalisation={setLocalisation}
            />
          </Box>
          <Box className="mb-2" />
          <Box style={{ marginBottom: 30 }}>
            <TokenBasicInfoCardForm
              image={metadata?.image}
              setImage={(image): void => handleUpdateMetadata('image', image)}
              denom={metadata?.denom}
              type={metadata?.type}
              icon={metadata?.icon}
              setIcon={(icon): void => handleUpdateMetadata('icon', icon)}
              tokenName={metadata?.tokenName}
              setTokenName={(tokenName): void =>
                handleUpdateMetadata('tokenName', tokenName)
              }
              name={metadata?.name}
              maxSupply={metadata?.maxSupply}
              SN={SN}
            />
          </Box>
          <Box className="d-flex" style={{ gap: 30 }}>
            <Button variant="secondary" onClick={goBack}>
              Back
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Continue
            </Button>
          </Box>
        </Box>
        <Box className="d-flex flex-column" style={{ width: 400 }}>
          {renderTabs()}
          <Box style={{ flex: '1 auto', marginBottom: 30 }}>
            {metaView === 'description' && (
              <TokenDescriptionForm
                description={metadata?.description}
                setDescription={(description): void =>
                  handleUpdateMetadata('description', description)
                }
              />
            )}
            {metaView === 'metrics' && (
              <TokenMetricsForm
                metrics={metadata?.metrics}
                setMetrics={(metrics): void =>
                  handleUpdateMetadata('metrics', metrics)
                }
              />
            )}
            {metaView === 'attributes' && (
              <TokenAttributesForm
                attributes={metadata?.attributes}
                setAttributes={(attributes): void =>
                  handleUpdateMetadata('attributes', attributes)
                }
                edit
              />
            )}
          </Box>
          <Box className="d-flex flex-column" style={{ gap: 30 }}>
            {renderSettingsRow()}
            {renderLinkedResourcesRow()}
          </Box>
        </Box>
      </Row>

      <CreatorSetupModal
        creator={entitySettings.creator?.data}
        open={entitySettings.creator?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('creator', false)}
      />
      <ServiceSetupModal
        service={entitySettings.service?.data}
        open={entitySettings.service?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('service', false)}
      />
      <TagsSetupModal
        tags={entitySettings.tags?.data}
        entityType={entityType}
        open={entitySettings.tags?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('tags', false)}
      />
      <LiquiditySetupModal
        liquidity={entitySettings.liquidity?.data}
        open={entitySettings.liquidity?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('liquidity', false)}
        handleChange={(liquidity: TEntityLiquidityModel[]): void =>
          handleUpdateEntitySetting('liquidity', liquidity)
        }
      />
      <PaymentsSetupModal
        payments={entitySettings.payments?.data}
        open={entitySettings.payments?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('payments', false)}
        handleChange={(payments: TEntityPaymentModel[]): void =>
          handleUpdateEntitySetting('payments', payments)
        }
      />
      {Object.entries(entityLinkedResource).map(([key, value]) => (
        <LinkedResourceSetupModal
          key={key}
          linkedResource={value}
          open={value?.openModal}
          onClose={(): void => handleOpenEntityLinkedResourceModal(key, false)}
          handleChange={(linkedResource: TEntityLinkedResourceModel): void =>
            handleUpdateEntityLinkedResource(key, linkedResource)
          }
        />
      ))}

      <AddSettingsModal
        settings={entitySettings}
        open={openAddSettingsModal}
        onClose={(): void => setOpenAddSettingsModal(false)}
        handleChange={handleAddEntitySetting}
      />
      <AddLinkedResourceModal
        linkedResource={EntityLinkedResourceConfig}
        open={openAddLinkedResourceModal}
        onClose={(): void => setOpenAddLinkedResourceModal(false)}
        handleChange={handleAddEntityLinkedResource}
      />
    </Wrapper>
  )
}

export default IndividualToken
