import * as React from 'react'
import styled from 'styled-components'
import '../../assets/filter_sort_buttons.css'
import DatePicker from './DatePicker'
import DropDown from './DropDown'
import filterData from '../../lib/json/filterData.json'

const PositionController = styled.div`
  position: absolute;
  right: 5%;
  top: 35%;
  margin: 6px;
  font-weight: bold;
  /* @media screen and (min-width: 520px) {
    transform: translate(0, 60%);
  } */
`
const Button = styled.button`
  background-color: white;
  border-color: grey;
  border-width: 1px;
  margin: 8px;
  font-weight: 500;
  font-style: normal;
  font-family: Roboto;
  font-size: 16px;
  padding: 4px 6px;
  border-radius: 4px;
  align-items: center;
  line-height: 19px;
  height: 40px;
  width: 100px;
  &:hover {
    border-color: blue;
  }
`
const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`
const FilterModal = styled.div`
  position: absolute;
  padding: 2.625rem;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  :after {
    content: '';
    position: absolute;
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-radius: 4px;
    border-style: solid;
    border-width: 0 1rem 1.1rem 1rem;
    border-color: transparent transparent white transparent;
  }
`

const ModalItems = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const FilterSelectButton = styled.div`
  width: 7rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  color: white;
  border-color: white;
`

const exampleButtons = [
  {
    title: 'Youth',
    color: '#DB6169',
    imgSrc: '../../assets/images/dropdown/cap.png',
  },
  {
    title: 'Ethnic Minority',
    color: '#E0BB72',
    imgSrc: '../../assets/images/dropdown/pattern.png',
  },
  {
    title: 'Low income',
    color: '#81B276',
    imgSrc: '../../assets/images/dropdown/growth.png',
  },
  {
    title: 'Disabled people',
    color: '#7DCAE9',
    imgSrc: '../../assets/images/dropdown/wheelchair.png',
  },
  {
    title: 'Elderly',
    color: '#E17161',
    imgSrc: '../../assets/images/dropdown/walking-stick.png',
  },
  {
    title: 'Youth',
    color: 'aqua',
    imgSrc: '../../assets/images/dropdown/cap.png',
  },
]

class FilterSortButtons extends React.Component<
  {},
  { showDatePicker: boolean; isModalOpen: boolean }
> {
  constructor(props) {
    super(props)
    this.state = {
      showDatePicker: false,
      isModalOpen: false,
    }
  }

  toggleShowDatePicker = (e): void => {
    e.preventDefault()
    this.setState({
      showDatePicker: !this.state.showDatePicker,
    })
  }

  toggleModal = (): void => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }

  render(): JSX.Element {
    return (
      <PositionController>
        <Button onClick={this.toggleShowDatePicker}>
          <i className="icon-calendar-sort"></i>
          Dates
        </Button>

        {filterData.categories.map(filterCategory => {
          return (
            // <Button key={filterCategory['@id']}>{filterCategory.title}</Button>
            <ButtonWrapper key={filterCategory['@id']}>
              <Button onClick={this.toggleModal}>{filterCategory.title}</Button>
              <FilterModal
                style={{ display: this.state.isModalOpen ? 'block' : 'none' }}
              >
                <ModalItems>
                  {exampleButtons.map(button => {
                    return (
                      <FilterSelectButton
                        key={button.title}
                        style={{ backgroundColor: button.color }}
                      >
                        {button.title}
                        <img alt={button.title} src={button.imgSrc} />
                      </FilterSelectButton>
                    )
                  })}
                </ModalItems>
              </FilterModal>
            </ButtonWrapper>
          )
        })}

        <DropDown />
        <Button>
          <i className="icon-reset"></i>
          Reset
        </Button>
        {this.state.showDatePicker ? <DatePicker /> : null}
      </PositionController>
    )
  }
}
export default FilterSortButtons
