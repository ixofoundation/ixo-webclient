import * as React from 'react'
import InputText from 'common/components/Form/InputText/InputText'
import { FormStyles } from 'types/models'
import {
  SearchWrapper,
  ModalButton,
  SearchIconWrapper,
  SearchModal,
  SearchHeading,
  SearchButtonsWrapper,
  SearchFilterButton,
  ButtonContent,
} from './Search.styles'
import Investments from 'assets/icons/Investments'
import Cells from 'assets/icons/Cells'
import Oracle from 'assets/icons/Oracle'
import Template from 'assets/icons/Template'
import SearchIcon from 'assets/icons/Search'
import Down from 'assets/icons/Down'
import Projects from 'assets/icons/Projects'
import DataAssets from 'assets/icons/DataAssets'
import { EntityType } from '../../../types'
import { entityTypeMap } from '../../../strategy-map'

// TODO - search submitted

interface Props {
  type: EntityType
  entityColor?: string
  filterChanged: (type: EntityType) => void
  queryChanged: (query: string) => void
}

export default class Search extends React.Component<Props> {
  state = {
    search: '',
    isModalOpen: false,
  }

  handleChange = (event): void => {
    const { queryChanged } = this.props
    this.setState({
      search: event.target.value,
    })

    queryChanged(event.target.value)
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

  handleSearchFilter = (type: EntityType): void => {
    this.handleToggleModal()
    this.props.filterChanged(type)
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
                {this.props.type === EntityType.Project && (
                  <Projects fill="#000" width="26" />
                )}
                {this.props.type === EntityType.Oracle && (
                  <Oracle fill="#000" width="26" />
                )}
                {this.props.type === EntityType.Investment && (
                  <Investments fill="#000" width="26" />
                )}
                {this.props.type === EntityType.Cell && (
                  <Cells fill="#000" width="26" />
                )}
                {this.props.type === EntityType.Template && (
                  <Template fill="#000" width="26" />
                )}
                {this.props.type === EntityType.Asset && (
                  <DataAssets fill="#000" width="26" />
                )}
                <span className="modal-text">
                  {entityTypeMap[this.props.type].plural}
                </span>
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
                  text={`Search all ${entityTypeMap[
                    this.props.type
                  ].plural.toLowerCase()}`}
                  key="search"
                  onChange={(event): void => this.handleChange(event)}
                />
              </form>
              <SearchIconWrapper onClick={this.handleSubmit}>
                <SearchIcon fill={this.props.entityColor || '#83d9f2'} />
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
                    className={`
                    ${EntityType.Project.toLowerCase()} ${
                      this.props.type === EntityType.Project ? 'active' : ''
                    }
                    `}
                  >
                    <ButtonContent>
                      <Projects fill="#000" width="26" />
                      {entityTypeMap[EntityType.Project].plural}
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Oracle)
                    }
                    className={`
                    ${EntityType.Oracle.toLowerCase()} ${
                      this.props.type === EntityType.Oracle ? 'active' : ''
                    }
                    `}
                  >
                    <ButtonContent>
                      <Oracle fill="#000" width="26" />
                      {entityTypeMap[EntityType.Oracle].plural}
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Investment)
                    }
                    className={`
                    ${EntityType.Investment.toLowerCase()} ${
                      this.props.type === EntityType.Investment ? 'active' : ''
                    }
                    `}
                  >
                    <ButtonContent>
                      <Investments fill="#000" width="26" />
                      {entityTypeMap[EntityType.Investment].plural}
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Cell)
                    }
                    className={`
                    ${EntityType.Cell.toLowerCase()} ${
                      this.props.type === EntityType.Cell ? 'active' : ''
                    }
                    `}
                  >
                    <ButtonContent>
                      <Cells fill="#000" width="26" />
                      {entityTypeMap[EntityType.Cell].plural}
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Template)
                    }
                    className={`
                    ${EntityType.Template.toLowerCase()} ${
                      this.props.type === EntityType.Template ? 'active' : ''
                    }
                    `}
                  >
                    <ButtonContent>
                      <Template fill="#000" width="26" />
                      {entityTypeMap[EntityType.Template].plural}
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Asset)
                    }
                    className={`
                    ${EntityType.Asset.toLowerCase()} ${
                      this.props.type === EntityType.Asset ? 'active' : ''
                    }
                    `}
                  >
                    <ButtonContent>
                      <DataAssets fill="#000" width="26" />
                      {entityTypeMap[EntityType.Asset].plural}
                    </ButtonContent>
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
