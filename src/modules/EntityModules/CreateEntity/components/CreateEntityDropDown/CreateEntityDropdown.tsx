import * as React from 'react'
import {
  SearchWrapper,
  ModalButton,
  SearchModal,
  SearchButtonsWrapper,
  SearchFilterButton,
  ButtonContent,
} from './CreateEntityDropDown.styles'
import Investments from 'assets/icons/Investments'
import Cells from 'assets/icons/Cells'
import Oracle from 'assets/icons/Oracle'
import Template from 'assets/icons/Template'
import Down from 'assets/icons/Down'
import Projects from 'assets/icons/Projects'
import DataAssets from 'assets/icons/DataAssets'
import { EntityType } from '../../../Entities/types'
import { entityTypeMap } from '../../../Entities/strategy-map'

interface Props {
  entityType: EntityType
  entityColor?: string
}

export default class CreateEntityDropDown extends React.Component<Props> {
  state = {
    search: '',
    isModalOpen: false,
  }

  handleChange = (event): void => {
    this.setState({
      search: event.target.value,
    })
  }

  handleSubmit = (e): void => {
    e.preventDefault()
    alert(`Search for: ${this.state.search}`)
  }

  handleToggleModal = (): void => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }

  handleSearchFilter = (): void => {
    this.handleToggleModal()
  }

  render(): JSX.Element {
    return (
      <SearchWrapper>
        <ModalButton
          onClick={(): void => this.handleToggleModal()}
          className={this.state.isModalOpen ? 'modal-open' : ''}
        >
          <span className="modal-text">LAUNCH</span>
          <span
            className="down-icon"
            style={{
              transform: this.state.isModalOpen ? 'rotateX(180deg)' : '',
            }}
          >
            <Down fill="#fff" />
          </span>
        </ModalButton>

        <SearchModal
          style={{ display: this.state.isModalOpen ? 'block' : 'none' }}
        >
          <hr />
          <SearchButtonsWrapper>
            <SearchFilterButton
              exact={true}
              to={`/${entityTypeMap[
                EntityType.Project
              ].title.toLowerCase()}/new`}
              className={`
                    ${EntityType.Project.toLowerCase()} ${
                this.props.entityType === EntityType.Project ? 'active' : ''
              }
                    `}
            >
              <ButtonContent>
                <Projects fill="#000" width="18" />
                {entityTypeMap[EntityType.Project].title}
              </ButtonContent>
            </SearchFilterButton>
            <SearchFilterButton
              exact={true}
              to={`/${entityTypeMap[
                EntityType.Oracle
              ].title.toLowerCase()}/new`}
              className={`
                    ${EntityType.Oracle.toLowerCase()} ${
                this.props.entityType === EntityType.Oracle ? 'active' : ''
              }
                    `}
            >
              <ButtonContent>
                <Oracle fill="#000" width="18" />
                {entityTypeMap[EntityType.Oracle].title}
              </ButtonContent>
            </SearchFilterButton>
            <SearchFilterButton
              exact={true}
              to={`/${entityTypeMap[
                EntityType.Investment
              ].title.toLowerCase()}/new`}
              className={`
                    ${EntityType.Investment.toLowerCase()} ${
                this.props.entityType === EntityType.Investment ? 'active' : ''
              }
                    `}
            >
              <ButtonContent>
                <Investments fill="#000" width="18" />
                {entityTypeMap[EntityType.Investment].title}
              </ButtonContent>
            </SearchFilterButton>
            <SearchFilterButton
              exact={true}
              to={`/${entityTypeMap[EntityType.Cell].title.toLowerCase()}/new`}
              className={`
                    ${EntityType.Cell.toLowerCase()} ${
                this.props.entityType === EntityType.Cell ? 'active' : ''
              }
                    `}
            >
              <ButtonContent>
                <Cells fill="#000" width="18" />
                {entityTypeMap[EntityType.Cell].title}
              </ButtonContent>
            </SearchFilterButton>
            <SearchFilterButton
              exact={true}
              to={`/${entityTypeMap[
                EntityType.Template
              ].title.toLowerCase()}/new`}
              className={`
                    ${EntityType.Template.toLowerCase()} ${
                this.props.entityType === EntityType.Template ? 'active' : ''
              }
                    `}
            >
              <ButtonContent>
                <Template fill="#000" width="18" />
                {entityTypeMap[EntityType.Template].title}
              </ButtonContent>
            </SearchFilterButton>
            <SearchFilterButton
              exact={true}
              to={`/${entityTypeMap[
                EntityType.Template
              ].title.toLowerCase()}/new`}
              className={`
                    ${EntityType.Data.toLowerCase()} ${
                this.props.entityType === EntityType.Data ? 'active' : ''
              }
                    `}
            >
              <ButtonContent>
                <DataAssets fill="#000" width="18" />
                {entityTypeMap[EntityType.Data].title}
              </ButtonContent>
            </SearchFilterButton>
          </SearchButtonsWrapper>
        </SearchModal>
      </SearchWrapper>
    )
  }
}
