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
} from './style'

export default class Search extends React.Component {
  state = {
    search: '',
    isModalOpen: false,
    filterButtonText: 'All projects',
    iconClass: 'claims',
    activeFilter: 'all-projects',
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

  handleSearchFilter = (filterButtonText: string, iconClass?: string): void => {
    const slug = filterButtonText
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
    this.setState({ filterButtonText, iconClass, activeFilter: slug })
    this.handleToggleModal()
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
                <i className={`filter-icon icon-${this.state.iconClass}`} />
                {this.state.filterButtonText}
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
                      this.handleSearchFilter('All projects', 'claims')
                    }
                    className={
                      this.state.activeFilter === 'all-projects' ? 'active' : ''
                    }
                  >
                    <i className="icon-claims" />
                    All projects
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter('My projects', 'claims2')
                    }
                    className={
                      this.state.activeFilter === 'my-projects' ? 'active' : ''
                    }
                  >
                    <i className="icon-claims2" />
                    My Projects
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <i className="icon-serviceproviders" />
                    People
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <i className="icon-eye" />
                    Impact Oracles
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <i className="icon-projects" />
                    Template
                  </SearchFilterButton>
                  <SearchFilterButton className="disabled">
                    <i className="icon-sdg-sustainablecities" />
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
