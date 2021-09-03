import * as React from 'react'
import {
  DropdownWrapper,
  ModalButton,
  DropdownModal,
  ButtonsWrapper,
  LaunchEntityButton,
  ButtonContent,
} from './EditEntityDropdown.styles'
import Investments from 'assets/icons/Investments'
import Cells from 'assets/icons/Cells'
import Oracle from 'assets/icons/Oracle'
import Template from 'assets/icons/Template'
import Down from 'assets/icons/Down'
import Projects from 'assets/icons/Projects'
import DataAssets from 'assets/icons/DataAssets'
import { EntityType } from '../../../../types'
import { entityTypeMap } from '../../../../strategy-map'

interface Props {
  entityType?: EntityType
}

export default class EditEntityDropDown extends React.Component<Props> {
  state = {
    search: '',
    isModalOpen: false,
  }

  handleToggleModal = (): void => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }

  render(): JSX.Element {
    return (
      <DropdownWrapper>
        <ModalButton
          onClick={(): void => this.handleToggleModal()}
          className={this.state.isModalOpen ? 'modal-open' : ''}
        >
          <span className="modal-text">EDIT</span>
          <span
            className="down-icon"
            style={{
              transform: this.state.isModalOpen ? 'rotateX(180deg)' : '',
            }}
          >
            <Down fill="#fff" />
          </span>
        </ModalButton>

        <DropdownModal
          style={{ display: this.state.isModalOpen ? 'block' : 'none' }}
        >
          <hr />
          <ButtonsWrapper>
            <LaunchEntityButton
              exact={true}
              to={`/${entityTypeMap[
                EntityType.Project
              ].title.toLowerCase()}/new/start`}
              className={`
                    ${EntityType.Project.toLowerCase()} ${
                this.props.entityType === EntityType.Project ? 'active' : ''
              }
                    `}
              onClick={this.handleToggleModal}
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
                this.props.entityType === EntityType.Oracle ? 'active' : ''
              }
                    `}
              onClick={this.handleToggleModal}
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
                this.props.entityType === EntityType.Investment ? 'active' : ''
              }
                    `}
              onClick={this.handleToggleModal}
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
                this.props.entityType === EntityType.Cell ? 'active' : ''
              }
                    `}
              onClick={this.handleToggleModal}
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
                this.props.entityType === EntityType.Template ? 'active' : ''
              }
                    `}
              onClick={this.handleToggleModal}
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
                this.props.entityType === EntityType.Asset ? 'active' : ''
              }
                    `}
              onClick={this.handleToggleModal}
            >
              <ButtonContent>
                <DataAssets fill="#000" width="18" />
                {entityTypeMap[EntityType.Asset].title}
              </ButtonContent>
            </LaunchEntityButton>
          </ButtonsWrapper>
        </DropdownModal>
      </DropdownWrapper>
    )
  }
}
