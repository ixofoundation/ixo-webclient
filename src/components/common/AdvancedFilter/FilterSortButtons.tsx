import * as React from 'react'
import DatePicker from './DatePicker'
import filterData from '../../../lib/json/filterData.json'
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

const exampleButtons = [
  {
    title: 'Youth',
    color: '#DB6169',
    imgSrc: require('../../../assets/images/dropdown/cap.png'),
  },
  {
    title: 'Ethnic Minority',
    color: '#E0BB72',
    imgSrc: require('../../../assets/images/dropdown/pattern.png'),
  },
  {
    title: 'Low income',
    color: '#81B276',
    imgSrc: require('../../../assets/images/dropdown/growth.png'),
  },
  {
    title: 'Disabled People',
    color: '#7DCAE9',
    imgSrc: require('../../../assets/images/dropdown/wheelchair.png'),
  },
  {
    title: 'Elderly',
    color: '#E17161',
    imgSrc: require('../../../assets/images/dropdown/walking-stick.png'),
  },
]

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

  handleClose = (e, id): void => {
    const filterModal = e.target
      .closest('.button-wrapper')
      .querySelector('.filter-modal')
    if (filterModal.contains(e.target)) {
      return
    }
    this.setId(id)
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
              className={
                filterCategory['@id'] === this.state.checkId ? 'active' : ''
              }
              onClick={(e): void => this.handleClose(e, filterCategory['@id'])}
            >
              <Button onClick={(): void => this.setId(filterCategory['@id'])}>
                {filterCategory.title}
              </Button>
              <FilterModal
                className="filter-modal"
                style={{
                  display:
                    filterCategory['@id'] === this.state.checkId
                      ? 'block'
                      : 'none',
                }}
              >
                <ModalItems>
                  {exampleButtons.map(button => {
                    return (
                      <FilterSelectButton
                        key={button.title}
                        style={{ backgroundColor: button.color }}
                      >
                        {button.title}
                        <img
                          style={{ width: 52, height: 52, margin: 'auto' }}
                          alt={button.title}
                          src={button.imgSrc}
                        />
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
