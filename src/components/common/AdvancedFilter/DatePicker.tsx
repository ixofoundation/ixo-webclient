import * as React from 'react'
import 'react-dates/initialize'
import { DayPickerRangeController } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment, { Moment } from 'moment'

interface Props {
  onChange: (startDate, endDate) => void
  onReset: () => void
  onApply: () => void
  initialOrientation: string
  initialStartDate: null
  initialEndDate: null
}

interface State {
  startDate: any
  endDate: any
  focusedInput: string
  onFocusChange: null
  onDatesChange: null
  renderControls: null
}

class DatePicker extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      startDate: this.props.initialStartDate,
      endDate: this.props.initialEndDate,
      focusedInput: 'startDate',
      onFocusChange: null,
      onDatesChange: null,
      renderControls: null,
    }
  }

  onChange = (startDate, endDate): void => {
    this.setState({
      startDate: startDate,
      endDate: endDate,
    })
    this.props.onChange(startDate, endDate)
  }

  onReset = (): void => {
    this.setState({
      startDate: null,
      endDate: null,
    })
    this.props.onReset()
  }

  render(): JSX.Element {
    return (
      <DayPickerRangeController
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onDatesChange={({ startDate, endDate }): void =>
          this.onChange(startDate, endDate)
        }
        focusedInput={this.state.focusedInput}
        onFocusChange={(focusedInput): void => this.setState({ focusedInput })}
        initialVisibleMonth={(): Moment => moment().add(2, 'M')}
        numberOfMonths={2}
        hideKeyboardShortcutsPanel
        orientation={this.props.initialOrientation}
        noNavButtons
      />
    )
  }
}

export default DatePicker
