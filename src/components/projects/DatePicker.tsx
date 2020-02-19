import * as React from 'react'
import 'react-dates/initialize'
import { DayPickerRangeController } from 'react-dates' // DateRangePicker
import 'react-dates/lib/css/_datepicker.css'
import '../../assets/datepicker_overrides.css'
import moment, { Moment } from 'moment'

// const TestCustomCloseIcon = (): JSX.Element => (
//   <span
//     style={{
//       marginLeft: '10px',
//       border: '1px solid #dce0e0',
//       backgroundColor: '#fff',
//       color: '#484848',
//       padding: '3px',
//     }}
//   >
//     X
//   </span>
// )

class DatePicker extends React.Component<
  {},
  {
    startDate: null
    endDate: null
    focusedInput: string
    onFocusChange: null
    onDatesChange: null
    renderControls: null
  }
> {
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: 'startDate',
      onFocusChange: null,
      onDatesChange: null,
      renderControls: null,
    }
  }

  render(): JSX.Element {
    return (
      <div className="DatePicker">
        <DayPickerRangeController
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }): void =>
            this.setState({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput): void =>
            this.setState({ focusedInput })
          } // PropTypes.func.isRequired,
          initialVisibleMonth={(): Moment => moment().add(2, 'M')}
          numberOfMonths={2}
        />
      </div>
    )
  }
}

export default DatePicker
