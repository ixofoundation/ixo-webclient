import * as React from 'react'
import InputText from '../../form/InputText'
import { FormStyles } from 'src/types/models'
import {
  SearchWrapper,
  ModalButton,
  SearchIconWrapper,
  SearchModal,
  SearchHeading,
  SearchButtonsWrapper,
  SearchFilterButton,
} from './Style'
import Globe from '../../../assets/icons/Globe'
import Briefcase from '../../../assets/icons/Briefcase'
import People from '../../../assets/icons/People'
import Oracle from '../../../assets/icons/Oracle'
import Template from '../../../assets/icons/Template'
import Marketplace from '../../../assets/icons/Marketplace'

interface Props {
  filterChanged: (filter: string) => void
  // TODO - search submitted
}

export default class Search extends React.Component<Props> {
  state = {
    search: '',
    isModalOpen: false,
    activeFilterButtonText: 'All Projects',
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
      case 'briefcase':
        return <Briefcase fill="#000" />
      case 'people':
        return <People fill="#000" />
      case 'oracle':
        return <Oracle fill="#000" />
      case 'template':
        return <Template fill="#000" />
      case 'marketplace':
        return <Marketplace fill="#000" />
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
                <i
                  className="icon-down"
                  style={{
                    transform: this.state.isModalOpen ? 'rotateX(180deg)' : '',
                  }}
                />
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
                <i className="icon-search" />
              </SearchIconWrapper>
              <SearchModal
                style={{ display: this.state.isModalOpen ? 'block' : 'none' }}
              >
                <SearchHeading>Explore</SearchHeading>
                <SearchButtonsWrapper>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter('All Projects', 'globe')
                    }
                    className={
                      this.state.activeFilter === 'all-projects' ? 'active' : ''
                    }
                  >
                    <div>{this.renderFilterButtonIcon('globe')}</div>
                    All Projects
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter('My Projects', 'briefcase')
                    }
                    className={
                      this.state.activeFilter === 'my-projects' ? 'active' : ''
                    }
                  >
                    <div>{this.renderFilterButtonIcon('briefcase')}</div>
                    My Projects
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon('people')}</div>
                    People
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon('oracle')}</div>
                    Impact Oracles
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon('template')}</div>
                    Template
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <div>{this.renderFilterButtonIcon('marketplace')}</div>
                    Data Marketplace
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
