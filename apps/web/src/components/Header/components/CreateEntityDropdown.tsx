import * as React from 'react'
import {
  DropdownWrapper,
  ModalButton,
  DropdownModal,
  ButtonsWrapper,
  LaunchEntityButton,
  ButtonContent,
} from './CreateEntityDropdown.styles'
import Investments from 'assets/icons/Investments'
import Cells from 'assets/icons/Cells'
import Oracle from 'assets/icons/Oracle'
import Template from 'assets/icons/Template'
import Projects from 'assets/icons/Projects'
import DataAssets from 'assets/icons/DataAssets'
import { EntityType } from 'types/entities'
import { useAppSelector } from 'redux/hooks'
import { selectEntityHeaderButtonColorUIConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useMediaQuery } from '@mantine/hooks'
import { em } from '@mantine/core'

interface Props {
  entityType?: EntityType
}

const CreateEntityDropdown: React.FunctionComponent<Props> = ({ entityType }) => {
  const entityTypeMap = useAppSelector(selectEntityConfig)
  const buttonColor: string = useAppSelector(selectEntityHeaderButtonColorUIConfig)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const isMobile = useMediaQuery(`(max-width: ${em(710)})`)


  const isVisible = React.useMemo(() => {
    const isViewedFromApp = !!window.MobileContext
    if (isViewedFromApp) {
      return false
    }
    if (!entityTypeMap) {
      return false
    }
    const { UI } = entityTypeMap
    if (!UI) {
      return false
    }
    const { topMenu } = UI
    if (!topMenu) {
      return false
    }
    const isCreateItem = topMenu.find((menu) => menu.item === 'create')
    if (!isCreateItem) {
      return false
    }
    const { visible } = isCreateItem
    return visible
  }, [entityTypeMap])

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen)
  }

  return isVisible ? (
    <DropdownWrapper>
      <ModalButton onClick={handleToggleModal} className={isModalOpen ? 'modal-open' : ''} color={buttonColor}>
        <span className={`modal-text`} style={{ fontSize: isMobile ? "24px" : "inherit"}}>CREATE</span>
      </ModalButton>

      {entityTypeMap && (
        <DropdownModal style={{ display: isModalOpen ? 'block' : 'none' }}>
          <ButtonsWrapper>
            <LaunchEntityButton
              end={true}
              to={`/entity/create/${EntityType.Project.toLowerCase()}`}
              className={`
                  ${EntityType.Project.toLowerCase()} ${entityType === EntityType.Project ? 'active' : ''}
                  `}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <Projects fill='#000' width='18' />
                {entityTypeMap[EntityType.Project].title}
              </ButtonContent>
            </LaunchEntityButton>
            <LaunchEntityButton
              end={true}
              to={`/entity/create/${EntityType.Oracle.toLowerCase()}`}
              className={`
                  ${EntityType.Oracle.toLowerCase()} ${entityType === EntityType.Oracle ? 'active' : ''}
                  `}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <Oracle fill='#000' width='18' />
                {entityTypeMap[EntityType.Oracle].title}
              </ButtonContent>
            </LaunchEntityButton>
            <LaunchEntityButton
              end={true}
              to={`/entity/create/${EntityType.Investment.toLowerCase()}`}
              className={`
                  ${EntityType.Investment.toLowerCase()} ${entityType === EntityType.Investment ? 'active' : ''}
                  `}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <Investments fill='#000' width='18' />
                {entityTypeMap[EntityType.Investment].title}
              </ButtonContent>
            </LaunchEntityButton>
            <LaunchEntityButton
              end={true}
              to={`/entity/create/${EntityType.Dao.toLowerCase()}`}
              className={`
                  ${EntityType.Dao.toLowerCase()} ${entityType === EntityType.Dao ? 'active' : ''}
                  `}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <Cells fill='#000' width='18' />
                {entityTypeMap[EntityType.Dao].title}
              </ButtonContent>
            </LaunchEntityButton>
            <LaunchEntityButton
              end={true}
              to={`/entity/create/protocol`}
              className={`protocol`}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <Template fill='#000' width='18' />
                Protocol
              </ButtonContent>
            </LaunchEntityButton>
            <LaunchEntityButton
              end={true}
              to={`/entity/create/${EntityType.Asset.toLowerCase()}`}
              className={`
                  ${EntityType.Asset.toLowerCase()} ${entityType === EntityType.Asset ? 'active' : ''}
                  `}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <DataAssets fill='#000' width='18' />
                {entityTypeMap[EntityType.Asset].title}
              </ButtonContent>
            </LaunchEntityButton>
          </ButtonsWrapper>
        </DropdownModal>
      )}
    </DropdownWrapper>
  ) : (
    <></>
  )
}

export default CreateEntityDropdown
