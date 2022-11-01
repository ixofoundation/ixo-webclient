import { Box, theme, Typography } from 'modules/App/App.styles'
import React, { useState, useMemo } from 'react'
import { PageWrapper, PageRow, PropertyBox } from './SetupProperties.styles'
import { ReactComponent as CreatorIcon } from 'assets/images/icon-creator.svg'
import { ReactComponent as ControllerIcon } from 'assets/images/icon-controller.svg'
import { ReactComponent as LaptopIcon } from 'assets/images/icon-laptop.svg'
import { ReactComponent as GlobalIcon } from 'common/components/Filters/IconListFilter/assets/icons/global.svg'
import { ReactComponent as TagIcon } from 'common/components/Filters/IconListFilter/assets/icons/tag.svg'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { Button } from 'pages/CreateEntity/components'
import { useHistory } from 'react-router-dom'
import { TEntityCreatorModel, TEntityServiceModel } from 'types'
import {
  CreatorSetupModal,
  ServicesSetupModal,
  TagsSetupModal,
} from 'common/modals'

const SetupProperties: React.FC = (): JSX.Element => {
  const history = useHistory()
  const [creator, setCreator] = useState<TEntityCreatorModel>(undefined)
  const [services, setServices] = useState<TEntityServiceModel[]>([])
  const [tags, setTags] = useState<{ [name: string]: string[] }>({})
  const [openCreatorModal, setOpenCreatorModal] = useState(false)
  const [openServicesModal, setOpenServicesModal] = useState(false)
  const [openTagsModal, setOpenTagsModal] = useState(false)

  const canSubmit = useMemo(() => true, [])

  const handleAddController = (): void => {
    // TODO:
  }
  const handleAddPage = (): void => {
    // TODO:
  }
  const handleAddSettings = (): void => {
    // TODO:
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
          <Box className="d-flex" style={{ gap: 20 }}>
            <PropertyBox
              full={!!creator}
              onClick={(): void => setOpenCreatorModal(true)}
            >
              <CreatorIcon />
              <Typography
                fontWeight={700}
                fontSize="16px"
                lineHeight="19px"
                color={theme.ixoWhite}
              >
                Creator
              </Typography>
            </PropertyBox>

            <PropertyBox onClick={handleAddController}>
              <ControllerIcon />
              <Typography
                fontWeight={700}
                fontSize="16px"
                lineHeight="19px"
                color={theme.ixoWhite}
              >
                Controller
              </Typography>
            </PropertyBox>

            <PropertyBox onClick={handleAddPage}>
              <LaptopIcon />
              <Typography
                fontWeight={700}
                fontSize="16px"
                lineHeight="19px"
                color={theme.ixoWhite}
              >
                Page
              </Typography>
            </PropertyBox>

            <PropertyBox
              full={services.length > 0}
              onClick={(): void => setOpenServicesModal(true)}
            >
              <GlobalIcon />
              <Typography
                fontWeight={700}
                fontSize="16px"
                lineHeight="19px"
                color={theme.ixoWhite}
              >
                Services
              </Typography>
            </PropertyBox>

            <PropertyBox
              full={Object.values(tags).length > 0}
              onClick={(): void => setOpenTagsModal(true)}
            >
              <TagIcon />
              <Typography
                fontWeight={700}
                fontSize="16px"
                lineHeight="19px"
                color={theme.ixoWhite}
              >
                Tags
              </Typography>
            </PropertyBox>

            <PropertyBox plus onClick={handleAddSettings}>
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
          <Box className="d-flex" style={{ gap: 20 }}>
            <PropertyBox plus onClick={handleAddLinkedResources}>
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
          <Box className="d-flex" style={{ gap: 20 }}>
            <PropertyBox plus onClick={handleAddClaims}>
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
          <Box className="d-flex" style={{ gap: 20 }}>
            <PropertyBox plus onClick={handleAddAccordedRights}>
              <PlusIcon />
            </PropertyBox>
          </Box>
        </Box>
      </PageRow>

      <PageRow style={{ gap: 20 }}>
        <Button variant="secondary" onClick={(): void => history.goBack()}>
          Back
        </Button>
        <Button variant={'primary'} disabled={!canSubmit} onClick={handleNext}>
          Continue
        </Button>
      </PageRow>

      <CreatorSetupModal
        creator={creator}
        open={openCreatorModal}
        onClose={(): void => setOpenCreatorModal(false)}
        handleChange={setCreator}
      />
      <ServicesSetupModal
        services={services}
        open={openServicesModal}
        onClose={(): void => setOpenServicesModal(false)}
        handleChange={setServices}
      />
      <TagsSetupModal
        tags={tags}
        open={openTagsModal}
        onClose={(): void => setOpenTagsModal(false)}
        handleChange={setTags}
      />
    </PageWrapper>
  )
}

export default SetupProperties
