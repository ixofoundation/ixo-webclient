import { Box, theme, Typography } from 'components/App/App.styles'
import { v4 as uuidv4 } from 'uuid'
import React, { useState, useEffect } from 'react'
import { PageWrapper, PageRow, Badge } from './SetupProperties.styles'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import { omitKey } from 'utils/objects'
import {
  EntityAccordedRightConfig,
  EntityLinkedEntityConfig,
  EntityLinkedResourceConfig,
  EntitySettingsConfig,
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
  AddAccordedRightModal,
  AddLinkedEntityModal,
  LinkedResourceSetupModal,
} from 'components/Modals'
import { useCreateEntityState } from 'hooks/createEntity'
import SetupPage from './SetupPage'

const SetupProperties: React.FC = (): JSX.Element => {
  const {
    entityType,
    service,
    creator,
    controller,
    tags,
    page,
    claim,
    linkedResource,
    accordedRight,
    linkedEntity,
    gotoStep,
    updateCreator,
    updateController,
    updateTags,
    updatePage,
    updateService,
    updateClaim,
    updateLinkedResource,
    updateAccordedRight,
    updateLinkedEntity,
  } = useCreateEntityState()
  const [entitySettings, setEntitySettings] = useState<{
    [key: string]: any
  }>(EntitySettingsConfig)
  const [entityClaim, setEntityClaim] = useState<{ [id: string]: any }>({})
  const [entityLinkedResource, setEntityLinkedResource] = useState<{
    [key: string]: any
  }>({})
  const [entityAccordedRight, setEntityAccordedRight] = useState<{ [key: string]: any }>({})
  const [entityLinkedEntity, setEntityLinkedEntity] = useState<{ [key: string]: any }>({})

  console.log('entitySettings', entitySettings)
  console.log('entityClaim', entityClaim)
  console.log('entityLinkedResource', entityLinkedResource)
  console.log('entityAccordedRight', entityAccordedRight)
  console.log('entityLinkedEntity', entityLinkedEntity)

  const [openAddSettingsModal, setOpenAddSettingsModal] = useState(false)
  const [openAddLinkedResourceModal, setOpenAddLinkedResourceModal] = useState(false)
  const [openAddAccordedRightModal, setOpenAddAccordedRightModal] = useState(false)
  const [openAddLinkedEntityModal, setOpenAddLinkedEntityModal] = useState(false)
  const [propertyView, setPropertyView] = useState<string>('Settings')
  const canSubmit = true

  // popups - settings modal
  const handleOpenEntitySettingModal = (key: string, open: boolean): void => {
    setEntitySettings((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }
  // popups - claim modal
  const handleOpenEntityClaimModal = (key: string, open: boolean): void => {
    setEntityClaim((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }
  // popups - linked resources modal
  const handleOpenEntityLinkedResourceModal = (key: string, open: boolean): void => {
    setEntityLinkedResource((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }
  // popups - accorded rights modal
  const handleOpenEntityAccordedRightModal = (key: string, open: boolean): void => {
    setEntityAccordedRight((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }
  // popups - linked entities modal
  const handleOpenEntityLinkedEntityModal = (key: string, open: boolean): void => {
    setEntityLinkedEntity((pre) => ({
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

  // entity claim
  const handleAddEntityClaim = (): void => {
    const id = uuidv4()
    const templateId = uuidv4()
    setEntityClaim((pre) => ({
      ...pre,
      [id]: {
        id,
        template: { id: templateId },
        openModal: true,
      },
    }))
  }
  const handleUpdateEntityClaim = (id: string, claim: TEntityClaimModel): void => {
    setEntityClaim((pre) => ({ ...pre, [id]: claim }))
  }
  const handleRemoveEntityClaim = (id: string): void => {
    setEntityClaim((pre) => omitKey(pre, id))
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
  const handleAddEntityAccordedRight = (key: string): void => {
    setEntityAccordedRight((pre) => ({
      ...pre,
      [key]: { ...EntityAccordedRightConfig[key] },
    }))
  }
  const handleUpdateEntityAccordedRight = (key: string, data: any): void => {
    setEntityAccordedRight((pre) => ({
      ...pre,
      [key]: { ...pre[key], data },
    }))
  }
  const handleRemoveEntityAccordedRight = (id: string): void => {
    setEntityAccordedRight((pre) => omitKey(pre, id))
  }

  // entity linked entities
  const handleAddEntityLinkedEntity = (key: string): void => {
    setEntityLinkedEntity((pre) => ({
      ...pre,
      [key]: { ...EntityLinkedEntityConfig[key] },
    }))
  }
  const handleUpdateEntityLinkedEntity = (key: string, data: any): void => {
    setEntityLinkedEntity((pre) => ({
      ...pre,
      [key]: { ...pre[key], data },
    }))
  }
  const handleRemoveEntityLinkedEntity = (id: string): void => {
    setEntityLinkedEntity((pre) => omitKey(pre, id))
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

  // hooks - claims
  useEffect(() => {
    if (Object.values(claim).length > 0) {
      setEntityClaim(claim)
    }
  }, [claim])
  useEffect(() => {
    updateClaim(entityClaim ?? {})
    // eslint-disable-next-line
  }, [entityClaim])

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

  // hooks - accordedRight
  useEffect(() => {
    if (Object.values(accordedRight).length > 0) {
      setEntityAccordedRight(accordedRight)
    }
  }, [accordedRight])
  useEffect(() => {
    updateAccordedRight(entityAccordedRight ?? {})
    // eslint-disable-next-line
  }, [entityAccordedRight])

  // hooks - linkedEntity
  useEffect(() => {
    if (Object.values(linkedEntity).length > 0) {
      setEntityLinkedEntity(linkedEntity)
    }
  }, [linkedEntity])
  useEffect(() => {
    updateLinkedEntity(entityLinkedEntity ?? {})
    // eslint-disable-next-line
  }, [entityLinkedEntity])

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
  const renderClaimRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Claims')}
      <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
        {Object.entries(entityClaim)
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
  const renderAccordedRightRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Accorded Rights')}
      <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
        {Object.entries(accordedRight).map(([key, value]) => {
          const Icon = EntityAccordedRightConfig[key]?.icon
          const label = EntityAccordedRightConfig[key]?.text
          return (
            <PropertyBox
              key={key}
              icon={Icon && <Icon />}
              label={label}
              set={!!(value as any)?.data}
              handleRemove={(): void => handleRemoveEntityAccordedRight(key)}
              handleClick={(): void => handleOpenEntityAccordedRightModal(key, true)}
            />
          )
        })}
        <PropertyBox icon={<PlusIcon />} handleClick={(): void => setOpenAddAccordedRightModal(true)} />
      </Box>
    </Box>
  )

  const renderLinkedEntityRow = (): JSX.Element => (
    <Box className='d-flex flex-column'>
      {renderPropertyHeading('Linked Entities')}
      <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
        {Object.entries(linkedEntity).map(([key, value]) => {
          const Icon = EntityLinkedEntityConfig[key]?.icon
          const label = EntityLinkedEntityConfig[key]?.text
          return (
            <PropertyBox
              key={key}
              icon={Icon && <Icon />}
              label={label}
              set={!!(value as any)?.data}
              handleRemove={(): void => handleRemoveEntityLinkedEntity(key)}
              handleClick={(): void => handleOpenEntityLinkedEntityModal(key, true)}
            />
          )
        })}
        <PropertyBox icon={<PlusIcon />} handleClick={(): void => setOpenAddLinkedEntityModal(true)} />
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
        {propertyView === 'Claims' && renderClaimRow()}
        {propertyView === 'Accorded Rights' && renderAccordedRightRow()}
        {propertyView === 'Linked Entities' && renderLinkedEntityRow()}
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
        onChange={(creator: TEntityCreatorModel): void => handleUpdateEntitySetting('creator', creator)}
      />
      <ControllerSetupModal
        title='Controller'
        creator={entitySettings.controller.data}
        open={entitySettings.controller.openModal}
        onClose={(): void => handleOpenEntitySettingModal('controller', false)}
        onChange={(controller: TEntityControllerModel): void => handleUpdateEntitySetting('controller', controller)}
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
        onChange={(tags: { [name: string]: string[] }): void => handleUpdateEntitySetting('tags', tags)}
      />
      <PaymentsSetupModal
        payments={entityAccordedRight?.payments?.data}
        open={entityAccordedRight?.payments?.openModal}
        onClose={(): void => handleOpenEntityAccordedRightModal('payments', false)}
        handleChange={(payments: TEntityPaymentModel[]): void => handleUpdateEntityAccordedRight('payments', payments)}
      />
      <LiquiditySetupModal
        liquidity={entityLinkedEntity?.liquidity?.data}
        open={entityLinkedEntity?.liquidity?.openModal}
        onClose={(): void => handleOpenEntityLinkedEntityModal('liquidity', false)}
        handleChange={(liquidity: TEntityLiquidityModel[]): void =>
          handleUpdateEntityLinkedEntity('liquidity', liquidity)
        }
      />
      {Object.entries(entityClaim).map(([key, value]) => (
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
      {/* TODO: setup extra linked resources like media, file, etc */}
      {Object.entries(entityLinkedResource)
        .filter(([, value]) => !value.required)
        .map(([key, value]) => (
          <LinkedResourceSetupModal
            key={key}
            linkedResource={value}
            open={!!value?.openModal}
            onClose={(): void => handleOpenEntityLinkedResourceModal(key, false)}
            handleChange={(linkedResource: any): void => handleUpdateEntityLinkedResource(key, linkedResource)}
          />
        ))}

      <AddSettingsModal
        open={openAddSettingsModal}
        onClose={(): void => setOpenAddSettingsModal(false)}
        handleChange={handleAddEntitySetting}
      />
      <AddLinkedResourceModal
        open={openAddLinkedResourceModal}
        onClose={(): void => setOpenAddLinkedResourceModal(false)}
        handleChange={handleAddEntityLinkedResource}
      />
      <AddAccordedRightModal
        open={openAddAccordedRightModal}
        onClose={(): void => setOpenAddAccordedRightModal(false)}
        handleChange={handleAddEntityAccordedRight}
      />
      <AddLinkedEntityModal
        open={openAddLinkedEntityModal}
        onClose={(): void => setOpenAddLinkedEntityModal(false)}
        handleChange={handleAddEntityLinkedEntity}
      />
    </PageWrapper>
  )
}

export default SetupProperties
