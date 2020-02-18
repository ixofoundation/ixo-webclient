import * as React from 'react'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates' // SingleDatePicker, DayPickerRangeController
import 'react-dates/lib/css/_datepicker.css'
import '../../assets/datepicker_overrides.css'

const TestCustomCloseIcon = () => (
  <span
    style={{
      marginLeft: '10px',
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >'X'</span>
);

class DatePicker extends React.Component<{}, { startDate: null, endDate: null, focusedInput: null }>{
  constructor(props){
    super(props)
    this.state ={
      startDate: null,
      endDate: null,
      focusedInput: null
    }
  }

  render() {
    return (
      <div className="DatePicker">
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          showClearDates
          customCloseIcon={<TestCustomCloseIcon/>}
        />
        
      </div>
    );
  }
}

export default DatePicker;