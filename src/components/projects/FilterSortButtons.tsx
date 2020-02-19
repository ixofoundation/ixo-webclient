import * as React from 'react'
import styled from 'styled-components'
import '../../assets/filter_sort_buttons.css'
import DatePicker from './DatePicker'

const PositionController = styled.div`
  position: absolute;
  right: 5%;
  top: 35%;
  margin: 6px;
  font-weight: bold;
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

class FilterSortButtons extends React.Component<
  {},
  { showDatePicker: boolean }
> {
  constructor(props) {
    super(props)
    this.state = {
      showDatePicker: false,
    }
  }

  toggleShowDatePicker = (e): void => {
    e.preventDefault()
    this.setState({
      showDatePicker: !this.state.showDatePicker,
    })
  }

  render(): JSX.Element {
    return (
      <PositionController>
        <Button onClick={this.toggleShowDatePicker}>
          <i className="icon-calendar-sort"></i>
          Dates
        </Button>
        <Button>Beneficiary</Button>
        <Button>Field</Button>
        <Button>SDG</Button>
        <Button>Stage</Button>
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
