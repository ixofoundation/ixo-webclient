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
  ButtonContent,
} from './Search.styles'
import Globe from '../../../assets/icons/Globe'
import Investments from '../../../assets/icons/Investments'
import Cells from '../../../assets/icons/Cells'
import Oracle from '../../../assets/icons/Oracle'
import Template from '../../../assets/icons/Template'
import SearchIcon from '../../../assets/icons/Search'
import Down from 'src/assets/icons/Down'
import Projects from '../../../assets/icons/Projects'
import DataAssets from 'src/assets/icons/DataAssets'

interface Props {
  filterChanged: (filter: string) => void
  // TODO - search submitted
}

export default class Search extends React.Component<Props> {
  state = {
    search: '',
    isModalOpen: false,
    activeFilterButtonText: 'Projects',
    activeFilter: 'projects',
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
      case 'investments':
        return <Investments fill="#000" width="32" />
      case 'cells':
        return <Cells fill="#000" width="32" />
      case 'oracle':
        return <Oracle fill="#000" width="32" />
      case 'templates':
        return <Template fill="#000" width="32" />
      case 'data':
        return <DataAssets fill="#000" width="32" />
      case 'projects':
        return <Projects fill="#000" width="32" />
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
                      this.handleSearchFilter('Projects', 'projects')
                    }
                    className={`
                      ${
                        this.state.activeFilter === 'projects' ? 'active' : ''
                      } projects
                    `}
                  >
                    <ButtonContent>
                      {this.renderFilterButtonIcon('projects')}
                      Projects
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter('Oracles', 'oracle')
                    }
                    className={`
                    ${
                      this.state.activeFilter === 'oracles' ? 'active' : ''
                    } oracles
                  `}
                  >
                    <ButtonContent>
                      {this.renderFilterButtonIcon('oracle')}
                      Oracles
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter('Investments', 'investments')
                    }
                    className={`
                  ${
                    this.state.activeFilter === 'investments' ? 'active' : ''
                  } investments
                `}
                  >
                    <ButtonContent>
                      {this.renderFilterButtonIcon('investments')}
                      Investments
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter('Cells', 'cells')
                    }
                    className={`
                  ${
                    this.state.activeFilter === 'cells' ? 'active' : ''
                  } cells disabled
                `}
                  >
                    <ButtonContent>
                      {this.renderFilterButtonIcon('cells')}
                      Cells
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter('Templates', 'templates')
                    }
                    className={`
                  ${
                    this.state.activeFilter === 'templates' ? 'active' : ''
                  } templates disabled
                `}
                  >
                    <ButtonContent>
                      {this.renderFilterButtonIcon('templates')}
                      Templates
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter('Data', 'data')
                    }
                    className={`
                  ${
                    this.state.activeFilter === 'templates' ? 'data' : ''
                  } data disabled
                `}
                  >
                    <ButtonContent>
                      {this.renderFilterButtonIcon('data')}
                      Data Assets
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
