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
import Down from 'assets/icons/Down'
import Projects from 'assets/icons/Projects'
import DataAssets from 'assets/icons/DataAssets'
import { EntityType } from '../../../types'
import { useSelector } from 'react-redux'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'

interface Props {
  entityType?: EntityType
}

const CreateEntityDropDown: React.FunctionComponent<Props> = ({
  entityType,
}) => {
  const entityTypeMap = useSelector(selectEntityConfig)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const isVisible = React.useMemo(() => {
    if (entityTypeMap && entityTypeMap.topMenu) {
      const { topMenu } = entityTypeMap
      const isCreateItem = topMenu.find((menu) => menu.item === 'create')
      if (isCreateItem) {
        const { visible } = isCreateItem
        return visible
      }
    }
    return false
  }, [entityTypeMap])

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen)
  }

  return isVisible ? (
    <DropdownWrapper>
      <ModalButton
        onClick={handleToggleModal}
        className={isModalOpen ? 'modal-open' : ''}
      >
        <span className="modal-text">CREATE</span>
        <span
          className="down-icon d-flex"
          style={{
            transform: isModalOpen ? 'rotateX(180deg)' : '',
          }}
        >
          <Down fill="#fff" />
        </span>
      </ModalButton>

      {entityTypeMap && (
        <DropdownModal style={{ display: isModalOpen ? 'block' : 'none' }}>
          <hr />
          <ButtonsWrapper>
            <LaunchEntityButton
              exact={true}
              to={`/${entityTypeMap[
                EntityType.Project
              ].title.toLowerCase()}/new/start`}
              className={`
                  ${EntityType.Project.toLowerCase()} ${
                entityType === EntityType.Project ? 'active' : ''
              }
                  `}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <Projects fill="#000" width="18" />
                {entityTypeMap[EntityType.Project].title}
              </ButtonContent>
            </LaunchEntityButton>
            <LaunchEntityButton
              exact={true}
              to={`/${entityTypeMap[
                EntityType.Oracle
              ].title.toLowerCase()}/new/start`}
              className={`
                  ${EntityType.Oracle.toLowerCase()} ${
                entityType === EntityType.Oracle ? 'active' : ''
              }
                  `}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <Oracle fill="#000" width="18" />
                {entityTypeMap[EntityType.Oracle].title}
              </ButtonContent>
            </LaunchEntityButton>
            <LaunchEntityButton
              exact={true}
              to={`/${entityTypeMap[
                EntityType.Investment
              ].title.toLowerCase()}/new/start`}
              className={`
                  ${EntityType.Investment.toLowerCase()} ${
                entityType === EntityType.Investment ? 'active' : ''
              }
                  `}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <Investments fill="#000" width="18" />
                {entityTypeMap[EntityType.Investment].title}
              </ButtonContent>
            </LaunchEntityButton>
            <LaunchEntityButton
              exact={true}
              to={`/${entityTypeMap[
                EntityType.Cell
              ].title.toLowerCase()}/new/start`}
              className={`
                  ${EntityType.Cell.toLowerCase()} ${
                entityType === EntityType.Cell ? 'active' : ''
              }
                  `}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <Cells fill="#000" width="18" />
                {entityTypeMap[EntityType.Cell].title}
              </ButtonContent>
            </LaunchEntityButton>
            <LaunchEntityButton
              exact={true}
              to={`/${entityTypeMap[
                EntityType.Template
              ].title.toLowerCase()}/new/start`}
              className={`
                  ${EntityType.Template.toLowerCase()} ${
                entityType === EntityType.Template ? 'active' : ''
              }
                  `}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <Template fill="#000" width="18" />
                {entityTypeMap[EntityType.Template].title}
              </ButtonContent>
            </LaunchEntityButton>
            <LaunchEntityButton
              exact={true}
              to={'/asset/new/start'}
              className={`
                  ${EntityType.Asset.toLowerCase()} ${
                entityType === EntityType.Asset ? 'active' : ''
              }
                  `}
              onClick={handleToggleModal}
            >
              <ButtonContent>
                <DataAssets fill="#000" width="18" />
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

export default CreateEntityDropDown
