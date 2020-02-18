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

  .search-input::placeholder {
    color: #e8edee;
  }
`

const ModalButton = styled.div`
  background: #e8edee;
  padding: 1rem;
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
  }
`

const SearchIconWrapper = styled.div`
  width: 64px;
  flex: initial;
  line-height: 64px;
  text-align: center;
  i {
    color: #83d9f2;
  }
`

export default class Search extends React.Component {
  state = {
    search: '',
  }

  handleChange = (event): void => {
    this.setState({
      search: event.target.value,
    })
  }

  clickModal = (): void => {
    alert('Open project filter modal')
  }

  handleSubmit = (e): void => {
    e.preventDefault()
    alert(`Search for: ${this.state.search}`)
  }

  render(): JSX.Element {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <SearchWrapper>
              <ModalButton onClick={(): void => this.clickModal()}>
                <i className="icon-world" />
                All IXO
                <i className="icon-down" />
              </ModalButton>
              <form
                onSubmit={(e): void => this.handleSubmit(e)}
                className="search-input-wrapper"
              >
                <InputText
                  formStyle={FormStyles.search}
                  id="name"
                  type="text"
                  text="Search"
                  key="search"
                  onChange={(): void => this.handleChange(event)}
                />
              </form>
              <SearchIconWrapper onClick={this.handleSubmit}>
                <i className="icon-search" />
              </SearchIconWrapper>
            </SearchWrapper>
          </div>
        </div>
      </div>
    )
  }
}
