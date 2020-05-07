import * as React from 'react'
import InputText from '../../../../common/components/Form/InputText/InputText'
import { FormStyles } from 'src/types/models'
import {
  SearchWrapper,
  ModalButton,
  SearchIconWrapper,
  SearchModal,
  SearchHeading,
  SearchButtonsWrapper,
  SearchFilterButton,
} from './Search.styles'
import Globe from '../../../../assets/icons/Globe'
import Funding from '../../../../assets/icons/Funding'
import Cells from '../../../../assets/icons/Cells'
import Oracle from '../../../../assets/icons/Oracle'
import Template from '../../../../assets/icons/Template'
import Data from '../../../../assets/icons/Data'
import SearchIcon from '../../../../assets/icons/Search'
import Down from 'src/assets/icons/Down'
import { EntityType, EntityTypeMap } from '../../types'

// TODO - search submitted

interface Props {
  entityType: EntityType
  filterChanged: (entityType: EntityType) => void
}

export default class Search extends React.Component<Props> {
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

  handleSearchFilter = (entityType: EntityType): void => {
    this.handleToggleModal()

    this.props.filterChanged(entityType)
  }

  renderFilterButtonIcon = (entityType: EntityType): JSX.Element => {
    switch (entityType) {
      case EntityType.Project:
        return <Globe fill="#000" />
      case EntityType.Fund:
        return <Funding fill="#000" />
      case EntityType.Cell:
        return <Cells fill="#000" />
      case EntityType.Oracle:
        return <Oracle fill="#000" />
      case EntityType.Template:
        return <Template fill="#000" />
      case EntityType.Data:
        return <Data fill="#000" />
      default:
        return null
    }
  }

  render(): JSX.Element {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-lg-8 offset-lg-2">
            <SearchWrapper>
              <ModalButton
                onClick={(): void => this.handleToggleModal()}
                className={this.state.isModalOpen ? 'modal-open' : ''}
              >
                {this.renderFilterButtonIcon(this.props.entityType)}
                {EntityTypeMap[this.props.entityType].plural}
                <span
                  className="down-icon"
                  style={{
                    transform: this.state.isModalOpen ? 'rotateX(180deg)' : '',
                  }}
                >
                  <Down fill="#000" />
                </span>
              </ModalButton>
              <form
                onSubmit={(e): void => this.handleSubmit(e)}
                className="search-input-wrapper"
              >
                <InputText
                  formStyle={FormStyles.search}
                  id="name"
                  type="text"
                  text={`Search all ${EntityTypeMap[
                    this.props.entityType
                  ].plural.toLowerCase()}`}
                  key="search"
                  onChange={(): void => this.handleChange(event)}
                />
              </form>
              <SearchIconWrapper onClick={this.handleSubmit}>
                <SearchIcon />
              </SearchIconWrapper>
              <SearchModal
                style={{ display: this.state.isModalOpen ? 'block' : 'none' }}
              >
                <SearchHeading>Explore</SearchHeading>
                <SearchButtonsWrapper>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Project)
                    }
                    className={
                      this.props.entityType === EntityType.Project
                        ? 'active'
                        : ''
                    }
                  >
                    <div>{this.renderFilterButtonIcon(EntityType.Project)}</div>
                    Projects
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon(EntityType.Fund)}</div>
                    Funds
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Cell)
                    }
                    className={
                      this.props.entityType === EntityType.Cell ? 'active' : ''
                    }
                  >
                    <div>{this.renderFilterButtonIcon(EntityType.Cell)}</div>
                    Cells
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon(EntityType.Oracle)}</div>
                    Oracles
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>
                      {this.renderFilterButtonIcon(EntityType.Template)}
                    </div>
                    Templates
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon(EntityType.Data)}</div>
                    Data Assets
                  </SearchFilterButton>
                </SearchButtonsWrapper>
              </SearchModal>
            </SearchWrapper>
          </div>
        </div>
      </div>
    )
  }
}
