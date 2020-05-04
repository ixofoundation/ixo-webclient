import * as React from 'react'
import InputText from '../Form/InputText/InputText'
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
import Globe from '../../../assets/icons/Globe'
import Funding from '../../../assets/icons/Funding'
import Cells from '../../../assets/icons/Cells'
import Oracle from '../../../assets/icons/Oracle'
import Template from '../../../assets/icons/Template'
import Data from '../../../assets/icons/Data'
import SearchIcon from '../../../assets/icons/Search'
import Down from 'src/assets/icons/Down'

interface Props {
  filterChanged: (filter: string) => void
  // TODO - search submitted
}

export default class Search extends React.Component<Props> {
  state = {
    search: '',
    isModalOpen: false,
    activeFilterButtonText: 'Projects',
    activeFilter: 'all-projects',
    activeFilterIcon: 'globe',
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

  handleSearchFilter = (
    activeFilterButtonText: string,
    filterIcon: string,
  ): void => {
    const slug = activeFilterButtonText
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
    this.setState({
      activeFilterButtonText,
      activeFilter: slug,
      activeFilterIcon: filterIcon,
    })
    this.handleToggleModal()

    this.props.filterChanged(slug)
  }

  renderFilterButtonIcon = (icon: string): JSX.Element => {
    switch (icon) {
      case 'globe':
        return <Globe fill="#000" />
      case 'funds':
        return <Funding fill="#000" />
      case 'cells':
        return <Cells fill="#000" />
      case 'oracle':
        return <Oracle fill="#000" />
      case 'templates':
        return <Template fill="#000" />
      case 'data':
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
                {this.renderFilterButtonIcon(this.state.activeFilterIcon)}
                {this.state.activeFilterButtonText}
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
                  text="Search all projects"
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
                      this.handleSearchFilter('Projects', 'globe')
                    }
                    className={
                      this.state.activeFilter === 'all-projects' ? 'active' : ''
                    }
                  >
                    <div>{this.renderFilterButtonIcon('globe')}</div>
                    Projects
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon('funds')}</div>
                    Funds
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon('cells')}</div>
                    Cells
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon('oracle')}</div>
                    Oracles
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon('templates')}</div>
                    Templates
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon('data')}</div>
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
