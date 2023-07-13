// TODO: review all below

import {
  AddLinkedResourceModal,
  AddSettingsModal,
  CreatorSetupModal,
  LinkedResourceSetupModal,
  LiquiditySetupModal,
  PaymentsSetupModal,
  ServiceSetupModal,
} from 'components/Modals'
import { omitKey } from 'utils/objects'
// import { v4 as uuidv4 } from 'uuid'
import { Box } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { useCreateEntityState } from 'hooks/createEntity'
import { TCreateEntityModel } from 'redux/createEntity/createEntity.types'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import {
  EntityLinkedResourceConfig,
  EntitySettingsConfig,
  TAssetMetadataModel,
  TEntityLiquidityModel,
  TEntityPaymentModel,
} from 'types/protocol'
import { EntityAttributesForm, TokenProfileForm, EntityDescriptionForm, EntityMetricsForm } from '../../../Forms'
import { Badge, PropertyBox, PropertyBoxWrapper } from '../../../Forms/PropertiesForm/PropertiesForm.styles'
import { Wrapper, Row } from './IndividualToken.styles'
import { SetupPageContent } from '../../../Forms/PropertiesForm/SetupPageContent'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'

interface Props {
  SN: number
  token: TCreateEntityModel
  goBack: () => void
}

const IndividualToken: React.FC<Props> = ({ SN, token, goBack }): JSX.Element => {
  const theme: any = useTheme()
  const { entityType, updateAssetInstance } = useCreateEntityState()
  const [profile, setProfile] = useState<TAssetMetadataModel>(token.profile as TAssetMetadataModel)
  const [entitySettings, setEntitySettings] = useState<{
    [key: string]: any
  }>(EntitySettingsConfig)
  const [entityLinkedResource, setEntityLinkedResource] = useState<{
    [key: string]: LinkedResource
  }>({})
  const [openAddSettingsModal, setOpenAddSettingsModal] = useState(false)
  const [openAddLinkedResourceModal, setOpenAddLinkedResourceModal] = useState(false)
  // const [claims, setClaims] = useState(token.claims)

  const [metaView, setMetaView] = useState<'description' | 'metrics' | 'attributes'>('description')
  const [propertyView, setPropertyView] = useState<string>('Settings')

  useEffect(() => {
    if (token.creator) {
      setEntitySettings((settings) => ({
        ...settings,
        creator: { ...settings.creator, data: token.creator },
      }))
    }
    if (token.administrator) {
      setEntitySettings((settings) => ({
        ...settings,
        administrator: { ...settings.administrator, data: token.administrator },
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
    // if (token.payments && token.payments.length > 0) {
    //   setEntitySettings((settings) => ({
    //     ...settings,
    //     payments: { ...settings.payments, data: token.payments, set: true },
    //   }))
    // }
    // if (token.liquidity && token.liquidity.length > 0) {
    //   setEntitySettings((settings) => ({
    //     ...settings,
    //     liquidity: { ...settings.liquidity, data: token.liquidity, set: true },
    //   }))
    // }
    if (Object.values(token.linkedResource).length > 0) {
      setEntityLinkedResource(
        Object.fromEntries(
          Object.values(token.linkedResource)
            .filter((v) => !!v)
            .map((v) => [v?.id, v]),
        ),
      )
    }
  }, [token])

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
  const handleOpenEntityLinkedResourceModal = (key: string, open: boolean): void => {
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
  const handleAddEntityLinkedResource = (): void => {
    // const id = uuidv4()
    // setEntityLinkedResource((pre) => ({
    //   ...pre,
    //   [id]: { id, type, path: '', name: '', description: '' },
    // }))
  }
  const handleUpdateEntityLinkedResource = (id: string, data: LinkedResource): void => {
    setEntityLinkedResource((pre) => ({ ...pre, [id]: data }))
  }
  const handleRemoveEntityLinkedResource = (id: string): void => {
    setEntityLinkedResource((pre) => omitKey(pre, id))
  }

  const handleUpdateProfile = (key: string, value: any): void => {
    setProfile({
      ...profile,
      [key]: value,
    })
  }

  const handleSubmit = (): void => {
    // TODO:
    const data = {
      ...token,
      profile,
      creator: entitySettings.creator?.data,
      administrator: entitySettings.administrator?.data,
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
    <Typography className='mb-3' variant='secondary' size='2xl'>
      {text}
    </Typography>
  )
  const renderTabs = (): JSX.Element => (
    <Box className='d-flex mb-2' style={{ gap: 20, cursor: 'pointer', height: 32 }}>
      <Typography
        weight='medium'
        size='xl'
        color={metaView === 'description' ? 'blue' : 'dark-blue'}
        onClick={(): void => setMetaView('description')}
      >
        Description
      </Typography>
      <Typography
        weight='medium'
        size='xl'
        color={metaView === 'metrics' ? 'blue' : 'dark-blue'}
        onClick={(): void => setMetaView('metrics')}
      >
        Metrics
      </Typography>
      <Typography
        weight='medium'
        size='xl'
        color={metaView === 'attributes' ? 'blue' : 'dark-blue'}
        onClick={(): void => setMetaView('attributes')}
      >
        Attributes
      </Typography>
    </Box>
  )
  const renderSettingsRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Settings')}
      <Box className='d-flex flex-wrap' style={{ gap: 10 }}>
        {Object.entries(entitySettings)
          .filter(([, value]) => !!value.required || !!value.set)
          .map(([key, value]) => (
            <PropertyBoxWrapper key={key}>
              {!value.required && value.set && (
                <Box className='remove' onClick={(): void => handleRemoveEntitySetting(key)}>
                  —
                </Box>
              )}
              <PropertyBox
                size={90}
                bgColor={
                  value.required
                    ? theme.ixoGrey700
                    : (Array.isArray(value.data) ? value.data.length > 0 : !!value.data)
                    ? theme.ixoNewBlue
                    : theme.ixoGrey700
                }
                onClick={(): void => handleOpenEntitySettingModal(key, true)}
              >
                <value.icon />
                <Typography weight='bold' size='md' color={'white'}>
                  {value.text}
                </Typography>
              </PropertyBox>
            </PropertyBoxWrapper>
          ))}
        <PropertyBox size={90} bgColor={theme.ixoGrey300} onClick={(): void => setOpenAddSettingsModal(true)}>
          <PlusIcon />
        </PropertyBox>
      </Box>
    </Box>
  )
  const renderLinkedResourcesRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Linked Resources')}
      <Box className='d-flex flex-wrap' style={{ gap: 10 }}>
        {Object.entries(entityLinkedResource).map(([key, value]) => {
          const Icon = EntityLinkedResourceConfig[value.type]?.icon
          return (
            <PropertyBoxWrapper key={key}>
              <Box className='remove' onClick={(): void => handleRemoveEntityLinkedResource(key)}>
                —
              </Box>
              <PropertyBox
                size={90}
                bgColor={(!!value.type && theme.ixoNewBlue) || undefined}
                onClick={(): void => handleOpenEntityLinkedResourceModal(key, true)}
              >
                {Icon && <Icon />}
                <Typography weight='bold' size='md' color={'white'}>
                  {value.type}
                </Typography>
              </PropertyBox>
            </PropertyBoxWrapper>
          )
        })}
        <PropertyBox size={90} bgColor={theme.ixoGrey300} onClick={(): void => setOpenAddLinkedResourceModal(true)}>
          <PlusIcon />
        </PropertyBox>
      </Box>
    </Box>
  )

  if (entitySettings.page.openModal) {
    return (
      <SetupPageContent
        entityType={entityType}
        page={entitySettings.page.data}
        onClose={(): void => handleOpenEntitySettingModal('page', false)}
      />
    )
  }
  return (
    <Wrapper>
      <Row>
        <Typography variant='secondary' size='xl'>
          Change the attributes of an individual token.
        </Typography>
      </Row>

      <Row style={{ gap: 50 }}>
        <Box className='d-flex flex-column'>
          {/* <Box className='d-flex align-items-center justify-content-between'>
            <Typography weight='medium' size='xl'>
              Localisation:
            </Typography>
            <LocalisationForm localisation={localisation} setLocalisation={setLocalisation} />
          </Box> */}
          <Box className='mb-2' />
          <TokenProfileForm
            image={profile?.image}
            setImage={(image): void => handleUpdateProfile('image', image)}
            denom={profile?.denom}
            type={profile?.type}
            logo={profile?.logo}
            setLogo={(logo): void => handleUpdateProfile('logo', logo)}
            tokenName={profile?.tokenName}
            setTokenName={(tokenName): void => handleUpdateProfile('tokenName', tokenName)}
            name={profile?.name}
            maxSupply={profile?.maxSupply}
            SN={SN}
          />
        </Box>
        <Box className='d-flex flex-column' style={{ width: 400 }}>
          {renderTabs()}
          <Box style={{ flex: '1 auto', marginBottom: 30 }}>
            {metaView === 'description' && (
              <EntityDescriptionForm
                entityType={entityType}
                description={profile?.description}
                setDescription={(description): void => handleUpdateProfile('description', description)}
                brand={profile?.brand}
                location={profile?.location}
                startDate={(profile as any)?.startDate}
                endDate={(profile as any)?.endDate}
              />
            )}
            {metaView === 'metrics' && (
              <EntityMetricsForm
                metrics={profile?.metrics}
                setMetrics={(metrics): void => handleUpdateProfile('metrics', metrics)}
              />
            )}
            {metaView === 'attributes' && (
              <EntityAttributesForm
                attributes={profile?.attributes}
                setAttributes={(attributes): void => handleUpdateProfile('attributes', attributes)}
                edit
              />
            )}
          </Box>
        </Box>
      </Row>

      <Row style={{ gap: 8 }}>
        {['Settings', 'Linked Resources', 'Claims', 'Accorded Rights', 'Linked Entities'].map((key) => (
          <Badge key={key} active={key === propertyView} onClick={(): void => setPropertyView(key)}>
            <Typography size='lg' weight='medium' color={'white'}>
              {key}
            </Typography>
          </Badge>
        ))}
      </Row>

      <Row>
        <Box className='d-flex flex-column' style={{ gap: 30 }}>
          {propertyView === 'Settings' && renderSettingsRow()}
          {propertyView === 'Linked Resources' && renderLinkedResourcesRow()}
        </Box>
      </Row>

      <Row className='d-flex' style={{ gap: 30 }}>
        <Button variant='secondary' onClick={goBack}>
          Back
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Continue
        </Button>
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
      <LiquiditySetupModal
        liquidity={entitySettings.liquidity?.data}
        open={entitySettings.liquidity?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('liquidity', false)}
        handleChange={(liquidity: TEntityLiquidityModel[]): void => handleUpdateEntitySetting('liquidity', liquidity)}
      />
      <PaymentsSetupModal
        payments={entitySettings.payments?.data}
        open={entitySettings.payments?.openModal}
        onClose={(): void => handleOpenEntitySettingModal('payments', false)}
        handleChange={(payments: TEntityPaymentModel[]): void => handleUpdateEntitySetting('payments', payments)}
      />
      {Object.entries(entityLinkedResource).map(([key, value]) => (
        <LinkedResourceSetupModal
          key={key}
          linkedResource={value}
          open={false}
          onClose={(): void => handleOpenEntityLinkedResourceModal(key, false)}
          onChange={(linkedResource: LinkedResource): void => handleUpdateEntityLinkedResource(key, linkedResource)}
        />
      ))}

      <AddSettingsModal
        open={openAddSettingsModal}
        onClose={(): void => setOpenAddSettingsModal(false)}
        onChange={handleAddEntitySetting}
        addedKeys={Object.keys(entitySettings)}
      />
      <AddLinkedResourceModal
        open={openAddLinkedResourceModal}
        onClose={(): void => setOpenAddLinkedResourceModal(false)}
        onAdd={handleAddEntityLinkedResource}
      />
    </Wrapper>
  )
}

export default IndividualToken
