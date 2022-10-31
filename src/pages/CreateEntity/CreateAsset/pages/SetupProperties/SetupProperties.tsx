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
import { TEntityCreatorModel } from 'types'
import { CreatorSetupModal } from 'common/modals'

const SetupProperties: React.FC = (): JSX.Element => {
  const history = useHistory()
  const [creator, setCreator] = useState<TEntityCreatorModel>(undefined)
  const [openCreatorModal, setOpenCreatorModal] = useState(false)

  const canSubmit = useMemo(() => true, [])

  const handleAddController = (): void => {
    // TODO:
  }

  const handleAddPage = (): void => {
    // TODO:
  }

  const handleAddServices = (): void => {
    // TODO:
  }

  const handleAddTags = (): void => {
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
            <PropertyBox onClick={(): void => setOpenCreatorModal(true)}>
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

            <PropertyBox onClick={handleAddServices}>
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

            <PropertyBox onClick={handleAddTags}>
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

            <PropertyBox second onClick={handleAddSettings}>
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
            <PropertyBox second onClick={handleAddLinkedResources}>
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
            <PropertyBox second onClick={handleAddClaims}>
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
            <PropertyBox second onClick={handleAddAccordedRights}>
              <PlusIcon />
            </PropertyBox>
          </Box>
        </Box>
      </PageRow>

      <PageRow style={{ gap: 20 }}>
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
          onClick={handleNext}
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
      </PageRow>

      <CreatorSetupModal
        creator={creator}
        open={openCreatorModal}
        onClose={(): void => setOpenCreatorModal(false)}
        handleChange={setCreator}
      />
    </PageWrapper>
  )
}

export default SetupProperties
