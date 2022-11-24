import React from 'react'
import 'react-dates/initialize'
import { DayPickerRangeController, DayPickerRangeControllerShape, ScrollableOrientationShape } from 'react-dates'
import moment, { Moment } from 'moment'

interface Props {
  onChange: (startDate: Moment | null, endDate: Moment | null) => void
  onReset: () => void
  onApply: () => void
  numberOfMonths: number
  initialOrientation: ScrollableOrientationShape
  initialStartDate: Moment | null
  initialEndDate: Moment | null
}

interface State extends Omit<DayPickerRangeControllerShape, 'onFocusChange' | 'onDatesChange'> {
  renderControls: null
}

class DatePicker extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    // @ts-ignore
    this.state = {
      startDate: this.props.initialStartDate,
      endDate: this.props.initialEndDate,
      focusedInput: 'startDate',
      renderControls: null,
    }
  }

  onChange = (startDate: moment.Moment | null, endDate: moment.Moment | null): void => {
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
        onDatesChange={({ startDate, endDate }): void => this.onChange(startDate, endDate)}
        focusedInput={this.state.focusedInput}
        onFocusChange={(focusedInput: any): void => this.setState({ focusedInput })}
        initialVisibleMonth={(): moment.Moment => moment()}
        numberOfMonths={this.props.numberOfMonths}
        hideKeyboardShortcutsPanel
        orientation={this.props.initialOrientation}
      />
    )
  }
}

export default DatePicker
