import * as React from 'react'
import 'react-dates/initialize'
import { DayPickerRangeController } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment, { Moment } from 'moment'
import {
  DatePickerModal,
  ResetButtonDatePicker,
  ApplyButtonDatePicker,
} from './Style'

class DatePicker extends React.Component<
  { onChange },
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

  onDatesChange({ startDate, endDate }): void {
    this.props.onChange(startDate, endDate)
    this.setState({
      startDate: startDate,
      endDate: endDate,
    })
  }

  onChange = (startDate, endDate): void => {
    this.setState({
      startDate: startDate,
      endDate: endDate,
    })
  }

  render(): JSX.Element {
    return (
      <DatePickerModal>
        <div className="DatePicker">
          <DayPickerRangeController
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }): void =>
              this.setState({ startDate, endDate })
            }
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput): void =>
              this.setState({ focusedInput })
            }
            initialVisibleMonth={(): Moment => moment().add(2, 'M')}
            numberOfMonths={2}
            hideKeyboardShortcutsPanel
          />
        </div>
        <ResetButtonDatePicker>Reset</ResetButtonDatePicker>
        <ApplyButtonDatePicker>Apply</ApplyButtonDatePicker>
      </DatePickerModal>
    )
  }
}

export default DatePicker
