import { Box, theme, Typography } from 'modules/App/App.styles'
import { v4 as uuidv4 } from 'uuid'
import React, { useState, useMemo } from 'react'
import { PageWrapper, PageRow, PropertyBox } from './SetupProperties.styles'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { Button } from 'pages/CreateEntity/components'
import { useHistory } from 'react-router-dom'
import * as reduxUtils from 'common/redux/utils'
import {
  EntityLinkedResourcesConfig,
  EntitySettingsConfig,
  TEntityClaimModel,
  TEntityCreatorModel,
  TEntityLiquidityModel,
  TEntityPaymentModel,
  TEntityServiceModel,
} from 'types'
import {
  CreatorSetupModal,
  ServicesSetupModal,
  TagsSetupModal,
  AddSettingsModal,
  LiquiditySetupModal,
  PaymentsSetupModal,
  ClaimSetupModal,
  AddLinkedResourcesModal,
} from 'common/modals'

const SetupProperties: React.FC = (): JSX.Element => {
  const history = useHistory()
  const [entitySettings, setEntitySettings] = useState<{
    [key: string]: any
  }>(EntitySettingsConfig)
  const [entityClaims, setEntityClaims] = useState<{ [id: string]: any }>({})
  const [entityLinkedResources, setEntityLinkedResources] = useState<{
    [key: string]: any
  }>(EntityLinkedResourcesConfig)

  const [openAddSettingsModal, setOpenAddSettingsModal] = useState(false)
  const [
    openAddLinkedResourcesModal,
    setOpenAddLinkedResourcesModal,
  ] = useState(false)
  const canSubmit = useMemo(() => true, [])

  const handleNext = (): void => {
    // TODO: submit
  }

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
  const handleOpenEntitLinkedResourceModal = (
    key: string,
    open: boolean,
  ): void => {
    setEntityLinkedResources((pre) => ({
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
  const handleUpdateEntityClaim = (
    id: string,
    claim: TEntityClaimModel,
  ): void => {
    setEntityClaims((pre) => ({
      ...pre,
      [id]: claim,
    }))
  }
  const handleRemoveEntityClaim = (id: string): void => {
    setEntityClaims((pre) => reduxUtils.omitKey(pre, id))
  }

  // entity linked resources
  const handleAddEntityLinkedResource = (key: string): void => {
    setEntityLinkedResources((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        set: true,
      },
    }))
  }

  // renders
  const renderPropertyHeading = (text: string): JSX.Element => (
    <Typography
      className="mb-2"
      fontFamily={theme.secondaryFontFamily}
      fontWeight={400}
      fontSize="24px"
      lineHeight="28px"
    >
      {text}
    </Typography>
  )
  const renderSettingsRow = (): JSX.Element => (
    <Box className="d-flex flex-column">
      {renderPropertyHeading('Settings')}
      <Box className="d-flex flex-wrap" style={{ gap: 20 }}>
        {Object.entries(entitySettings).map(([key, value]) => (
          <PropertyBox
            key={key}
            show={value.required || value.set}
            full={
              Array.isArray(value.data) ? value.data.length > 0 : !!value.data
            }
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
  )
  const renderClaimsRow = (): JSX.Element => (
    <Box className="d-flex flex-column">
      {renderPropertyHeading('Claims')}
      <Box className="d-flex flex-wrap" style={{ gap: 20 }}>
        {Object.entries(entityClaims).map(([key, value]) => (
          <PropertyBox
            key={key}
            show={!!value?.template?.title}
            full={!!value?.template?.templatId}
            onClick={(): void => handleOpenEntityClaimModal(key, true)}
          >
            <Typography
              fontWeight={700}
              fontSize="16px"
              lineHeight="19px"
              color={theme.ixoWhite}
            >
              {value?.template?.title}
            </Typography>
          </PropertyBox>
        ))}
        <PropertyBox grey show onClick={handleAddEntityClaim}>
          <PlusIcon />
        </PropertyBox>
      </Box>
    </Box>
  )
  const renderLinkedResourcesRow = (): JSX.Element => (
    <Box className="d-flex flex-column">
      {renderPropertyHeading('Linked Resources')}
      <Box className="d-flex flex-wrap" style={{ gap: 20 }}>
        {Object.entries(entityLinkedResources).map(([key, value]) => (
          <PropertyBox
            key={key}
            show={value.set}
            full={
              Array.isArray(value.data) ? value.data.length > 0 : !!value.data
            }
            onClick={(): void => handleOpenEntitLinkedResourceModal(key, true)}
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
          grey
          show
          onClick={(): void => setOpenAddLinkedResourcesModal(true)}
        >
          <PlusIcon />
        </PropertyBox>
      </Box>
    </Box>
  )
  const renderAccordedRightsRow = (): JSX.Element => {
    const handleAddAccordedRights = (): void => {
      // TODO:
    }
    return (
      <Box className="d-flex flex-column">
        {renderPropertyHeading('Accorded Rights')}
        <Box className="d-flex flex-wrap" style={{ gap: 20 }}>
          <PropertyBox grey show onClick={handleAddAccordedRights}>
            <PlusIcon />
          </PropertyBox>
        </Box>
      </Box>
    )
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
        {renderSettingsRow()}
        {renderClaimsRow()}
        {renderLinkedResourcesRow()}
        {renderAccordedRightsRow()}
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
      <LiquiditySetupModal
        liquidity={entitySettings.liquidity.data}
        open={entitySettings.liquidity.openModal}
        onClose={(): void => handleOpenEntitySettingModal('liquidity', false)}
        handleChange={(liquidity: TEntityLiquidityModel[]): void =>
          handleUpdateEntitySetting('liquidity', liquidity)
        }
      />
      <PaymentsSetupModal
        payments={entitySettings.payments.data}
        open={entitySettings.payments.openModal}
        onClose={(): void => handleOpenEntitySettingModal('payments', false)}
        handleChange={(payments: TEntityPaymentModel[]): void =>
          handleUpdateEntitySetting('payments', payments)
        }
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

      <AddSettingsModal
        settings={entitySettings}
        open={openAddSettingsModal}
        onClose={(): void => setOpenAddSettingsModal(false)}
        handleChange={handleAddEntitySetting}
      />
      <AddLinkedResourcesModal
        linkedResources={entityLinkedResources}
        open={openAddLinkedResourcesModal}
        onClose={(): void => setOpenAddLinkedResourcesModal(false)}
        handleChange={handleAddEntityLinkedResource}
      />
    </PageWrapper>
  )
}

export default SetupProperties
