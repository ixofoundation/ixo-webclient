import { Box, theme, Typography } from 'modules/App/App.styles'
import React, { useState, useMemo } from 'react'
import { PageWrapper, PageRow, PropertyBox } from './SetupProperties.styles'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { Button } from 'pages/CreateEntity/components'
import { useHistory } from 'react-router-dom'
import {
  EntitySettingsConfig,
  TEntityCreatorModel,
  TEntityServiceModel,
} from 'types'
import {
  CreatorSetupModal,
  ServicesSetupModal,
  TagsSetupModal,
} from 'common/modals'
import { AddSettingsModal } from 'common/modals/AddSettingsModal'

const SetupProperties: React.FC = (): JSX.Element => {
  const history = useHistory()
  const [entitySettings, setEntitySettings] = useState<{
    [name: string]: any
  }>(EntitySettingsConfig)
  const [openAddSettingsModal, setOpenAddSettingsModal] = useState(false)

  const canSubmit = useMemo(() => true, [])

  const handleOpenEntitySettingModal = (key: string, open: boolean): void => {
    setEntitySettings((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
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

  const handleAddEntitySetting = (key: string): void => {
    setEntitySettings((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        set: true,
      },
    }))
  }

  const handleAddLinkedResources = (): void => {
    // TODO:
  }
  const handleAddClaims = (): void => {
    // TODO:
  }
  const handleAddAccordedRights = (): void => {
    // TODO:
  }

  const handleNext = (): void => {
    // TODO:
  }

  return (
    <PageWrapper>
      <PageRow>
        <Typography
          fontFamily={theme.secondaryFontFamily}
          fontWeight={400}
          fontSize="20px"
          lineHeight="23px"
        >
          Configure the properties of this Asset Class **
        </Typography>
      </PageRow>

      <PageRow className="flex-column" style={{ gap: 30 }}>
        <Box className="d-flex flex-column">
          <Typography
            className="mb-2"
            fontFamily={theme.secondaryFontFamily}
            fontWeight={400}
            fontSize="24px"
            lineHeight="28px"
          >
            Settings
          </Typography>
          <Box className="d-flex flex-wrap" style={{ gap: 20 }}>
            {Object.entries(entitySettings).map(([key, value]) => (
              <PropertyBox
                key={key}
                show={value.required || value.set}
                full={!!value.data}
                onClick={(): void => handleOpenEntitySettingModal(key, true)}
              >
                <value.icon />
                <Typography
                  fontWeight={700}
                  fontSize="16px"
                  lineHeight="19px"
                  color={theme.ixoWhite}
                >
                  {value.text}
                </Typography>
              </PropertyBox>
            ))}
            <PropertyBox
              show
              grey
              onClick={(): void => setOpenAddSettingsModal(true)}
            >
              <PlusIcon />
            </PropertyBox>
          </Box>
        </Box>
        <Box className="d-flex flex-column">
          <Typography
            className="mb-2"
            fontFamily={theme.secondaryFontFamily}
            fontWeight={400}
            fontSize="24px"
            lineHeight="28px"
          >
            Linked Resources
          </Typography>
          <Box className="d-flex flex-wrap" style={{ gap: 20 }}>
            <PropertyBox grey show onClick={handleAddLinkedResources}>
              <PlusIcon />
            </PropertyBox>
          </Box>
        </Box>

        <Box className="d-flex flex-column">
          <Typography
            className="mb-2"
            fontFamily={theme.secondaryFontFamily}
            fontWeight={400}
            fontSize="24px"
            lineHeight="28px"
          >
            Claims
          </Typography>
          <Box className="d-flex flex-wrap" style={{ gap: 20 }}>
            <PropertyBox grey show onClick={handleAddClaims}>
              <PlusIcon />
            </PropertyBox>
          </Box>
        </Box>

        <Box className="d-flex flex-column">
          <Typography
            className="mb-2"
            fontFamily={theme.secondaryFontFamily}
            fontWeight={400}
            fontSize="24px"
            lineHeight="28px"
          >
            Accorded Rights
          </Typography>
          <Box className="d-flex flex-wrap" style={{ gap: 20 }}>
            <PropertyBox grey show onClick={handleAddAccordedRights}>
              <PlusIcon />
            </PropertyBox>
          </Box>
        </Box>
      </PageRow>

      <PageRow style={{ gap: 20 }}>
        <Button variant="secondary" onClick={(): void => history.goBack()}>
          Back
        </Button>
        <Button variant="primary" disabled={!canSubmit} onClick={handleNext}>
          Continue
        </Button>
      </PageRow>

      <CreatorSetupModal
        creator={entitySettings.creator.data}
        open={entitySettings.creator.openModal}
        onClose={(): void => handleOpenEntitySettingModal('creator', false)}
        handleChange={(creator: TEntityCreatorModel): void =>
          handleUpdateEntitySetting('creator', creator)
        }
      />
      <ServicesSetupModal
        services={entitySettings.services.data}
        open={entitySettings.services.openModal}
        onClose={(): void => handleOpenEntitySettingModal('services', false)}
        handleChange={(services: TEntityServiceModel[]): void =>
          handleUpdateEntitySetting('services', services)
        }
      />
      <TagsSetupModal
        tags={entitySettings.tags.data}
        open={entitySettings.tags.openModal}
        onClose={(): void => handleOpenEntitySettingModal('tags', false)}
        handleChange={(tags: { [name: string]: string[] }): void =>
          handleUpdateEntitySetting('tags', tags)
        }
      />
      <AddSettingsModal
        settings={entitySettings}
        open={openAddSettingsModal}
        onClose={(): void => setOpenAddSettingsModal(false)}
        handleChange={handleAddEntitySetting}
      />
    </PageWrapper>
  )
}

export default SetupProperties
