import * as React from 'react'
import InputText from '../form/InputText'
import { FormStyles } from 'src/types/models'
import styled from 'styled-components'

const SearchWrapper = styled.div`
  background: white;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  border-radius: 4px;
  transform: translateY(-50%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Roboto, sans-serif;
  > * {
    flex: 1;
    border-radius: 4px;
  }
  .search-input-wrapper {
    flex: 3;
    > * {
      height: 100%;
    }
  }
`

const ModalButton = styled.div`
  background: #e8edee;
  padding: 0 1rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  > * {
    display: block;
  }
  .icon-world,
  .icon-down {
    width: 1rem;
    height: 1rem;
  }
  .icon-world {
    margin-right: 0.5rem;
  }
  .icon-down {
    margin-left: auto;
    transition: all 0.3s;
    transform-origin: center;
  }
`

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 50px;
  flex: initial;
  text-align: center;
  i {
    color: #83d9f2;
  }
`

const SearchModal = styled.div`
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  z-index: 10;
  background: white;
  width: 100%;
  padding: 1.5em 2.875em 4.5em;
`

const SearchHeading = styled.h3`
  font-weight: 600;
  font-size: 1.25rem;
  box-sizing: border-box;
  margin: 0.825rem 0 1.5rem;
`

const SearchButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -0.5rem;
`

const SearchFilterButton = styled.div`
  border: 1px solid #39c3e6;
  color: #39c3e6;
  text-align: center;
  width: calc(33.333% - 1rem);
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  i {
    color: #39c3e6;
  }
  > * {
    display: block;
    width: 100%;
  }
  &.active,
  &:hover:not(.disabled) {
    background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
    color: white;
    i {
      color: white;
    }
  }
  &.disabled {
    border-color: #a5adb0;
    color: #a5adb0;
    cursor: not-allowed;
    i {
      color: #a5adb0;
    }
  }
`

export default class Search extends React.Component {
  state = {
    search: '',
    isModalOpen: false,
    filterButtonText: 'All projects',
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

  handleSearchFilter = (filterButtonText: string): void => {
    const slug = filterButtonText
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
    this.setState({ filterButtonText })
    this.handleToggleModal()
    console.log(`filter the things: ${slug}`)
  }

  render(): JSX.Element {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <SearchWrapper>
              <ModalButton onClick={(): void => this.handleToggleModal()}>
                <i className="icon-world" />
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
                      this.handleSearchFilter('All projects')
                    }
                    className="active"
                  >
                    <i className="icon-claims" />
                    All projects
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void => this.handleSearchFilter('My projects')}
                  >
                    <i className="icon-claims2" />
                    My projects
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
