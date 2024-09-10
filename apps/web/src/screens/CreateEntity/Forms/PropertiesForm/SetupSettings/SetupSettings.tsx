import { Box, FlexBox } from 'components/App/App.styles'
import { PropertyBox } from 'screens/CreateEntity/Components'
import React, { useEffect, useState } from 'react'

import PlusIcon from 'assets/images/icon-plus.svg'
import {
  AddSettingsModal,
  CreatorSetupModal,
  CreatorSetupModal as AdministratorSetupModal,
  ServiceSetupModal,
  DDOTagsSetupModal,
} from 'components/Modals'
import { SetupPageContent } from '../SetupPageContent'
import {
  TEntityAdministratorModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageModel,
  TEntityServiceModel,
} from 'types/entities'
import { EntitySettingsConfig } from 'constants/entity'

interface Props {
  hidden: boolean
  entityType: string
  creator: TEntityCreatorModel
  administrator: TEntityCreatorModel
  ddoTags?: TEntityDDOTagModel[]
  page: TEntityPageModel
  service: TEntityServiceModel[]
  updateCreator?: (creator: TEntityCreatorModel) => void
  updateAdministrator: (administrator: TEntityAdministratorModel) => void
  updateDDOTags?: (ddoTags: TEntityDDOTagModel[]) => void
  updatePage: (page: TEntityPageModel) => void
  updateService: (service: TEntityServiceModel[]) => void
}

const SetupSettings: React.FC<Props> = ({
  hidden,
  entityType,
  creator,
  administrator,
  ddoTags,
  page,
  service,
  updateCreator,
  updateAdministrator,
  updateDDOTags,
  updatePage,
  updateService,
}): JSX.Element => {
  const [entitySettings, setEntitySettings] = useState<{ [key: string]: any }>(EntitySettingsConfig)
  const [openAddSettingsModal, setOpenAddSettingsModal] = useState(false)

  const handleOpenEntitySettingModal = (key: string, open: boolean): void => {
    setEntitySettings((pre: any) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }
  // entity settings
  const handleAddEntitySetting = (key: string): void => {
    setEntitySettings((pre: any) => ({
      ...pre,
      [key]: {
        ...pre[key],
        set: true,
      },
    }))
  }
  const handleUpdateEntitySetting = (key: string, data: any): void => {
    setEntitySettings((pre: any) => ({
      ...pre,
      [key]: {
        ...pre[key],
        data,
      },
    }))
  }
  const handleRemoveEntitySetting = (key: string): void => {
    setEntitySettings((pre: any) => ({
      ...pre,
      [key]: {
        ...pre[key],
        set: false,
        data: undefined,
      },
    }))
  }

  // hooks - creator
  useEffect(() => {
    if (creator) {
      handleUpdateEntitySetting('creator', creator)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(creator)])
  useEffect(() => {
    if (entitySettings.creator?.data) {
      updateCreator && updateCreator(entitySettings.creator.data)
    } // eslint-disable-next-line
  }, [JSON.stringify(entitySettings.creator?.data)])

  // hooks - administrator
  useEffect(() => {
    if (administrator) {
      handleUpdateEntitySetting('administrator', administrator)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(administrator)])
  useEffect(() => {
    if (entitySettings.administrator?.data) {
      updateAdministrator(entitySettings.administrator.data)
    } // eslint-disable-next-line
  }, [JSON.stringify(entitySettings.administrator?.data)])

  // hooks - ddoTags
  useEffect(() => {
    if (ddoTags) {
      handleUpdateEntitySetting('ddoTags', ddoTags)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ddoTags)])
  useEffect(() => {
    if (entitySettings.ddoTags?.data?.length) {
      updateDDOTags && updateDDOTags(entitySettings.ddoTags.data)
    } // eslint-disable-next-line
  }, [JSON.stringify(entitySettings.ddoTags?.data)])

  // hooks - service
  useEffect(() => {
    if (service) {
      handleUpdateEntitySetting('service', service)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(service)])
  useEffect(() => {
    if (entitySettings.service?.data?.length) {
      updateService(entitySettings.service.data)
    } // eslint-disable-next-line
  }, [JSON.stringify(entitySettings.service?.data)])

  useEffect(() => {
    if (page && !entitySettings.page.data) {
      handleAddEntitySetting('page')
      handleUpdateEntitySetting('page', page)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(page)])

  const persistPageToStore = (page: any): void => {
    updatePage(page)
  }

  if (entitySettings.page.openModal) {
    document.querySelector('#setup-property-tabs')?.setAttribute('style', 'display: none;')
    document.querySelector('#setup-property-actions')?.setAttribute('style', 'display: none;')

    return (
      <SetupPageContent
        entityType={entityType}
        page={page as any}
        onChange={(page: any): void => {
          handleUpdateEntitySetting('page', page)
          handleOpenEntitySettingModal('page', false)
          persistPageToStore(page)
        }}
        onClose={(): void => handleOpenEntitySettingModal('page', false)}
      />
    )
  } else {
    document.querySelector('#setup-property-tabs')?.setAttribute('style', 'display: flex;')
    document.querySelector('#setup-property-actions')?.setAttribute('style', 'display: flex;')
  }
  return (
    <>
      <FlexBox $direction='column' style={hidden ? { display: 'none' } : {}}>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(entitySettings)
            .filter(([, value]) => !!value.required || !!value.set)
            .map(([key, value]) => (
              <PropertyBox
                key={key}
                icon={<value.icon />}
                required={value.required}
                set={Array.isArray(value.data) ? value.data.length > 0 : Object.keys(value.data ?? {}).length > 0}
                label={value.text}
                handleRemove={(): void => handleRemoveEntitySetting(key)}
                handleClick={(): void => handleOpenEntitySettingModal(key, true)}
              />
            ))}

          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddSettingsModal(true)} />
        </Box>
      </FlexBox>
      <AddSettingsModal
        open={openAddSettingsModal}
        onClose={(): void => setOpenAddSettingsModal(false)}
        onChange={handleAddEntitySetting}
        addedKeys={Object.entries(entitySettings)
          .filter(([, value]) => !!value.required || !!value.set)
          .map(([key]) => key)}
      />
      <CreatorSetupModal
        title='Creator'
        creator={entitySettings.creator.data}
        open={entitySettings.creator.openModal}
        onClose={(): void => handleOpenEntitySettingModal('creator', false)}
        {...(updateCreator
          ? { onChange: (creator: TEntityCreatorModel): void => handleUpdateEntitySetting('creator', creator) }
          : [])}
      />
      <AdministratorSetupModal
        title='Administrator'
        creator={entitySettings.administrator.data}
        open={entitySettings.administrator.openModal}
        onClose={(): void => handleOpenEntitySettingModal('administrator', false)}
        onChange={(administrator: TEntityAdministratorModel): void =>
          handleUpdateEntitySetting('administrator', administrator)
        }
        onClone={(): void => handleUpdateEntitySetting('administrator', creator)}
      />
      <ServiceSetupModal
        service={entitySettings.service.data ?? []}
        open={entitySettings.service.openModal}
        onClose={(): void => handleOpenEntitySettingModal('service', false)}
        onChange={(service: TEntityServiceModel[]): void => handleUpdateEntitySetting('service', service)}
      />
      <DDOTagsSetupModal
        ddoTags={entitySettings.ddoTags.data}
        entityType={entityType}
        open={entitySettings.ddoTags.openModal}
        onClose={(): void => handleOpenEntitySettingModal('ddoTags', false)}
        onChange={(ddoTags: TEntityDDOTagModel[]): void => handleUpdateEntitySetting('ddoTags', ddoTags)}
      />
    </>
  )
}

export default SetupSettings
