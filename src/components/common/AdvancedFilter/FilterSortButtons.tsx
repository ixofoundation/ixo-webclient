import * as React from 'react'
import DatePicker from './DatePicker'
import filterData from '../../../lib/json/filterSchemaIDCC.json'
import {
  PositionController,
  Button,
  ButtonWrapper,
  FilterModal,
  ModalItems,
  FilterSelectButton,
  ResetButton,
  ApplyButton,
} from './Style'

class FilterSortButtons extends React.Component<
  {},
  { showDatePicker: boolean; checkId: string }
> {
  constructor(props) {
    super(props)
    this.state = {
      showDatePicker: false,
      checkId: ' ',
    }
  }

  toggleShowDatePicker = (e): void => {
    e.preventDefault()
    this.setState({
      showDatePicker: !this.state.showDatePicker,
      checkId: ' ',
    })
  }

  setId = (id): void => {
    this.setState({
      checkId: id,
      showDatePicker: false,
    })
    if (this.state.checkId === id) {
      this.setState({
        checkId: ' ',
      })
    }
  }

  render(): JSX.Element {
    return (
      <PositionController>
        <Button onClick={this.toggleShowDatePicker}>
          <i className="icon-calendar-sort" style={{ padding: 6 }}></i>
          Dates
        </Button>

        {filterData.categories.map(filterCategory => {
          return (
            <ButtonWrapper
              key={filterCategory['@id']}
              className={`button-wrapper ${
                filterCategory['@id'] === this.state.checkId ? 'active' : ''
              }`}
            >
              <Button onClick={(): void => this.setId(filterCategory['@id'])}>
                {filterCategory.title}
              </Button>
              <FilterModal
                style={{
                  display:
                    filterCategory['@id'] === this.state.checkId
                      ? 'block'
                      : 'none',
                }}
              >
                <ModalItems>
                  {filterCategory.tags.map(button => {
                    return (
                      <FilterSelectButton
                        key={button.title}
                        style={{ backgroundColor: 'firebrick' }}
                      >
                        {button.title}
                        {button.icon}
                        {/* <img
                          style={{ width: 52, height: 52, margin: 'auto' }}
                          alt={button.title}
                          src={require(button.icon)}
                          src={require(`./IDCC-icons/${button.icon}.svg`)}
                        /> */}
                      </FilterSelectButton>
                    )
                  })}
                </ModalItems>
                <ResetButton>Reset</ResetButton>
                <ApplyButton>Apply</ApplyButton>
              </FilterModal>
            </ButtonWrapper>
          )
        })}
        <Button>
          <i className="icon-reset" style={{ padding: 6 }}></i>
          Reset
        </Button>
        {this.state.showDatePicker ? <DatePicker /> : null}
      </PositionController>
    )
  }
}
export default FilterSortButtons
