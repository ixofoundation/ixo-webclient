import { Box, theme, Typography } from 'components/App/App.styles'
import { v4 as uuidv4 } from 'uuid'
import React, { useState, useEffect, useMemo } from 'react'
import { PageWrapper, PageRow, Badge } from './SetupProperties.styles'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import { omitKey } from 'utils/objects'
import {
  EntityAccordedRightsConfig,
  EntityLinkedResourceConfig,
  EntitySettingsConfig,
  TEntityAccordedRightsModel,
  TEntityClaimModel,
  TEntityControllerModel,
  TEntityCreatorModel,
  TEntityLinkedResourceModel,
  TEntityLiquidityModel,
  TEntityPageModel,
  TEntityPaymentModel,
  TEntityServiceModel,
} from 'types/protocol'
import {
  CreatorSetupModal,
  CreatorSetupModal as ControllerSetupModal,
  ServiceSetupModal,
  TagsSetupModal,
  AddSettingsModal,
  LiquiditySetupModal,
  PaymentsSetupModal,
  ClaimSetupModal,
  AddLinkedResourceModal,
  LinkedResourceSetupModal,
  AddAccordedRightsModal,
} from 'components/Modals'
import { useCreateEntityState } from 'hooks/createEntity'
import SetupPage from './SetupPage'

const SetupProperties: React.FC = (): JSX.Element => {
  const {
    entityType,
    creator,
    controller,
    tags,
    service,
    payments,
    liquidity,
    claims,
    linkedResource,
    accordedRights,
    page,
    gotoStep,
    updateCreator,
    updateController,
    updateTags,
    updateService,
    updatePayments,
    updateLiquidity,
    updateClaims,
    updateLinkedResource,
    updateAccordedRights,
    updatePage,
  } = useCreateEntityState()
  const [entitySettings, setEntitySettings] = useState<{
    [key: string]: any
  }>(EntitySettingsConfig)
  const [entityClaims, setEntityClaims] = useState<{ [id: string]: any }>({})
  const [entityLinkedResource, setEntityLinkedResource] = useState<{
    [key: string]: TEntityLinkedResourceModel
  }>({})
  const [entityAccordedRights, setEntityAccordedRights] = useState<{ [key: string]: TEntityAccordedRightsModel }>({})

  console.log('entitySettings', entitySettings)
  console.log('entityClaims', entityClaims)
  console.log('entityLinkedResource', entityLinkedResource)

  const [openAddSettingsModal, setOpenAddSettingsModal] = useState(false)
  const [openAddLinkedResourceModal, setOpenAddLinkedResourceModal] = useState(false)
  const [openAddAccordedRightsModal, setOpenAddAccordedRightsModal] = useState(false)
  const [propertyView, setPropertyView] = useState<string>('Settings')
  const canSubmit = useMemo(
    () =>
      entitySettings.creator.data &&
      entitySettings.controller.data &&
      entitySettings.tags.data &&
      entitySettings.page.data &&
      entitySettings.service.data.length > 0,
    [entitySettings],
  )

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
  const handleOpenEntityClaimModal = (key: string, open: boolean): void => {
    setEntityClaims((pre) => ({
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

  // entity claims
  const handleAddEntityClaim = (): void => {
    const id = uuidv4()
    const templateId = uuidv4()
    setEntityClaims((pre) => ({
      ...pre,
      [id]: {
        id,
        template: { id: templateId },
        openModal: true,
      },
    }))
  }
  const handleUpdateEntityClaim = (id: string, claim: TEntityClaimModel): void => {
    setEntityClaims((pre) => ({ ...pre, [id]: claim }))
  }
  const handleRemoveEntityClaim = (id: string): void => {
    setEntityClaims((pre) => omitKey(pre, id))
  }

  // entity linked resources
  const handleAddEntityLinkedResource = (type: string): void => {
    const id = uuidv4()
    setEntityLinkedResource((pre) => ({
      ...pre,
      [id]: { id, type, ...EntityLinkedResourceConfig[type], openModal: true },
    }))
  }
  const handleUpdateEntityLinkedResource = (id: string, data: TEntityLinkedResourceModel): void => {
    setEntityLinkedResource((pre) => ({ ...pre, [id]: data }))
  }
  const handleRemoveEntityLinkedResource = (id: string): void => {
    setEntityLinkedResource((pre) => omitKey(pre, id))
  }

  // entity accorded rights
  const handleAddEntityAccordedRights = (key: string): void => {
    setEntityAccordedRights((pre) => ({
      ...pre,
      [key]: { ...EntityAccordedRightsConfig[key] },
    }))
  }
  const handleRemoveEntityAccordedRights = (id: string): void => {
    setEntityAccordedRights((pre) => omitKey(pre, id))
  }

  // hooks - creator
  useEffect(() => {
    if (creator) {
      handleUpdateEntitySetting('creator', creator)
    }
  }, [creator])
  useEffect(() => {
    if (entitySettings.creator?.data) {
      updateCreator(entitySettings.creator.data)
    } // eslint-disable-next-line
  }, [entitySettings.creator?.data])

  // hooks - controller
  useEffect(() => {
    if (controller) {
      handleUpdateEntitySetting('controller', controller)
    }
  }, [controller])
  useEffect(() => {
    if (entitySettings.controller?.data) {
      updateController(entitySettings.controller.data)
    } // eslint-disable-next-line
  }, [entitySettings.controller?.data])

  // hooks - tags
  useEffect(() => {
    if (tags) {
      handleUpdateEntitySetting('tags', tags)
    }
  }, [tags])
  useEffect(() => {
    if (entitySettings.tags?.data) {
      updateTags(entitySettings.tags.data)
    } // eslint-disable-next-line
  }, [entitySettings.tags?.data])

  // hooks - service
  useEffect(() => {
    if (service) {
      handleUpdateEntitySetting('service', service)
    }
  }, [service])
  useEffect(() => {
    if (entitySettings.service?.data) {
      updateService(entitySettings.service.data)
    } // eslint-disable-next-line
  }, [entitySettings.service?.data])

  // hooks - payments
  useEffect(() => {
    if (payments?.length > 0) {
      handleUpdateEntitySetting('payments', payments)
      handleAddEntitySetting('payments')
    }
  }, [payments])
  useEffect(() => {
    updatePayments(entitySettings.payments?.data ?? [])
    // eslint-disable-next-line
  }, [entitySettings.payments?.data])

  // hooks - liquidity
  useEffect(() => {
    if (liquidity?.length > 0) {
      handleUpdateEntitySetting('liquidity', liquidity)
      handleAddEntitySetting('liquidity')
    }
  }, [liquidity])
  useEffect(() => {
    updateLiquidity(entitySettings.liquidity?.data ?? [])
    // eslint-disable-next-line
  }, [entitySettings.liquidity?.data])

  // hooks - page
  useEffect(() => {
    if (page) {
      handleUpdateEntitySetting('page', page)
    }
  }, [page])
  useEffect(() => {
    if (entitySettings.page?.data) {
      updatePage(entitySettings.page.data)
    } // eslint-disable-next-line
  }, [entitySettings.page?.data])

  // hooks - claims
  useEffect(() => {
    if (Object.values(claims).length > 0) {
      setEntityClaims(claims)
    }
  }, [claims])
  useEffect(() => {
    updateClaims(entityClaims ?? {})
    // eslint-disable-next-line
  }, [entityClaims])

  // hooks - linkedResource
  useEffect(() => {
    if (Object.values(linkedResource).length > 0) {
      setEntityLinkedResource(linkedResource)
    }
  }, [linkedResource])
  useEffect(() => {
    updateLinkedResource(entityLinkedResource ?? {})
    // eslint-disable-next-line
  }, [entityLinkedResource])

  // hooks - accordedRights
  useEffect(() => {
    if (Object.values(accordedRights).length > 0) {
      setEntityAccordedRights(accordedRights)
    }
  }, [accordedRights])
  useEffect(() => {
    updateAccordedRights(entityAccordedRights ?? {})
    // eslint-disable-next-line
  }, [entityAccordedRights])

  // renders
  const renderPropertyHeading = (text: string): JSX.Element => (
    <Typography
      className='mb-3'
      fontFamily={theme.secondaryFontFamily}
      fontWeight={400}
      fontSize='24px'
      lineHeight='28px'
    >
      {text}
    </Typography>
  )
  const renderSettingsRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Settings')}
      <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
        {Object.entries(entitySettings)
          .filter(([, value]) => !!value.required || !!value.set)
          .map(([key, value]) => (
            <PropertyBox
              key={key}
              icon={<value.icon />}
              required={value.required}
              set={Array.isArray(value.data) ? value.data.length > 0 : !!value.data}
              label={value.text}
              handleRemove={(): void => handleRemoveEntitySetting(key)}
              handleClick={(): void => handleOpenEntitySettingModal(key, true)}
            />
          ))}

        <PropertyBox icon={<PlusIcon />} handleClick={(): void => setOpenAddSettingsModal(true)} />
      </Box>
    </Box>
  )
  const renderClaimsRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Claims')}
      <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
        {Object.entries(entityClaims)
          .filter(([, value]) => value?.template?.title)
          .map(([key, value]) => (
            <PropertyBox
              key={key}
              set={value?.template?.templatId}
              label={value?.template?.title}
              handleRemove={(): void => handleRemoveEntityClaim(key)}
              handleClick={(): void => handleOpenEntityClaimModal(key, true)}
            />
          ))}
        <PropertyBox icon={<PlusIcon />} handleClick={handleAddEntityClaim} />
      </Box>
    </Box>
  )
  const renderLinkedResourcesRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Linked Resources')}
      <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
        {Object.entries(entityLinkedResource).map(([key, value]) => {
          const Icon = EntityLinkedResourceConfig[value.type]?.icon
          return (
            <PropertyBox
              key={key}
              icon={Icon && <Icon />}
              label={value?.name ?? value?.text}
              set={!!value?.name}
              handleRemove={(): void => handleRemoveEntityLinkedResource(key)}
              handleClick={(): void => handleOpenEntityLinkedResourceModal(key, true)}
            />
          )
        })}
        <PropertyBox icon={<PlusIcon />} handleClick={(): void => setOpenAddLinkedResourceModal(true)} />
      </Box>
    </Box>
  )
  const renderAccordedRightsRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Accorded Rights')}
      <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
        {Object.entries(accordedRights).map(([key, value]) => {
          const Icon = EntityAccordedRightsConfig[key]?.icon
          const label = EntityAccordedRightsConfig[key]?.text
          return (
            <PropertyBox
              key={key}
              icon={Icon && <Icon />}
              label={label}
              handleRemove={(): void => handleRemoveEntityAccordedRights(key)}
              handleClick={(): void => {
                // TODO:
              }}
            />
          )
        })}
        <PropertyBox icon={<PlusIcon />} handleClick={(): void => setOpenAddAccordedRightsModal(true)} />
      </Box>
    </Box>
  )

  const renderLinkedEntitiesRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Linked Entities')}
      <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
        <PropertyBox icon={<PlusIcon />} handleClick={(): void => setOpenAddAccordedRightsModal(true)} />
      </Box>
    </Box>
  )

  if (entitySettings.page.openModal) {
    return (
      <SetupPage
        page={entitySettings.page.data}
        onChange={(page: TEntityPageModel): void => handleUpdateEntitySetting('page', page)}
        onClose={(): void => handleOpenEntitySettingModal('page', false)}
      />
    )
  }
  return (
    <PageWrapper>
      <PageRow>
        <Typography fontFamily={theme.secondaryFontFamily} fontWeight={400} fontSize='20px' lineHeight='23px'>
          Configure the properties of this Asset Class **
        </Typography>
      </PageRow>

      <PageRow style={{ gap: 8 }}>
        {['Settings', 'Linked Resources', 'Claims', 'Accorded Rights', 'Linked Entities'].map((key) => (
          <Badge key={key} active={key === propertyView} onClick={(): void => setPropertyView(key)}>
            <Typography fontSize='18px' lineHeight='18px' fontWeight={500} color={theme.ixoWhite}>
              {key}
            </Typography>
          </Badge>
        ))}
      </PageRow>

      <PageRow className='flex-column' style={{ gap: 30 }}>
        {propertyView === 'Settings' && renderSettingsRow()}
        {propertyView === 'Linked Resources' && renderLinkedResourcesRow()}
        {propertyView === 'Claims' && renderClaimsRow()}
        {propertyView === 'Accorded Rights' && renderAccordedRightsRow()}
        {propertyView === 'Linked Entities' && renderLinkedEntitiesRow()}
      </PageRow>

      <PageRow style={{ gap: 20 }}>
        <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
          Back
        </Button>
        <Button variant='primary' disabled={!canSubmit} onClick={(): void => gotoStep(1)}>
          Continue
        </Button>
      </PageRow>

      <CreatorSetupModal
        title='Creator'
        creator={entitySettings.creator.data}
        open={entitySettings.creator.openModal}
        onClose={(): void => handleOpenEntitySettingModal('creator', false)}
        handleChange={(creator: TEntityCreatorModel): void => handleUpdateEntitySetting('creator', creator)}
      />
      <ControllerSetupModal
        title='Controller'
        creator={entitySettings.controller.data}
        open={entitySettings.controller.openModal}
        onClose={(): void => handleOpenEntitySettingModal('controller', false)}
        handleChange={(controller: TEntityControllerModel): void => handleUpdateEntitySetting('controller', controller)}
      />
      <ServiceSetupModal
        service={entitySettings.service.data}
        open={entitySettings.service.openModal}
        onClose={(): void => handleOpenEntitySettingModal('service', false)}
        handleChange={(service: TEntityServiceModel[]): void => handleUpdateEntitySetting('service', service)}
      />
      <TagsSetupModal
        tags={entitySettings.tags.data}
        entityType={entityType}
        open={entitySettings.tags.openModal}
        onClose={(): void => handleOpenEntitySettingModal('tags', false)}
        handleChange={(tags: { [name: string]: string[] }): void => handleUpdateEntitySetting('tags', tags)}
      />
      <LiquiditySetupModal
        liquidity={entitySettings.liquidity.data}
        open={entitySettings.liquidity.openModal}
        onClose={(): void => handleOpenEntitySettingModal('liquidity', false)}
        handleChange={(liquidity: TEntityLiquidityModel[]): void => handleUpdateEntitySetting('liquidity', liquidity)}
      />
      <PaymentsSetupModal
        payments={entitySettings.payments.data}
        open={entitySettings.payments.openModal}
        onClose={(): void => handleOpenEntitySettingModal('payments', false)}
        handleChange={(payments: TEntityPaymentModel[]): void => handleUpdateEntitySetting('payments', payments)}
      />
      {Object.entries(entityClaims).map(([key, value]) => (
        <ClaimSetupModal
          key={key}
          claim={value}
          open={value.openModal}
          onClose={(): void => {
            handleOpenEntityClaimModal(key, false)
            if (!value?.template?.templateId) {
              handleRemoveEntityClaim(key)
            }
          }}
          handleChange={(claim: TEntityClaimModel): void => {
            handleUpdateEntityClaim(key, claim)
            handleOpenEntityClaimModal(key, false)
          }}
        />
      ))}
      {Object.entries(entityLinkedResource).map(([key, value]) => (
        <LinkedResourceSetupModal
          key={key}
          linkedResource={value}
          // @ts-ignore
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
      <AddAccordedRightsModal
        open={openAddAccordedRightsModal}
        onClose={(): void => setOpenAddAccordedRightsModal(false)}
        handleChange={handleAddEntityAccordedRights}
      />
    </PageWrapper>
  )
}

export default SetupProperties
