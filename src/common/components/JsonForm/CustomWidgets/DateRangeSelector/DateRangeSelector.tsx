import React from 'react'
import { DateRangePicker } from 'react-dates'
import moment, { Moment } from 'moment'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
}

interface State {
  focusedInput: string
}

class SingleDateSelector extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      focusedInput: null,
    }
  }

  handleDatesChange = (startDate: Moment, endDate: Moment): void => {
    const value = `${startDate ? startDate.format('DD-MMM-YYYY') : ''}|${
      endDate ? endDate.format('DD-MMM-YYYY') : ''
    }`
    this.props.onChange(value)
  }

  render(): JSX.Element {
    const { id, value } = this.props

    let startDate
    let endDate
    if (value) {
      startDate = value.split('|')[0]
      endDate = value.split('|')[1]
    }

    return (
      <DateRangePicker
        startDate={startDate ? moment(startDate) : null}
        startDateId={`start_${id}`}
        endDate={endDate ? moment(endDate) : null}
        endDateId={`end_${id}`}
        displayFormat="DD-MMM-YYYY"
        onDatesChange={({ startDate, endDate }): void =>
          this.handleDatesChange(startDate, endDate)
        }
        focusedInput={this.state.focusedInput}
        onFocusChange={(focusedInput): void => this.setState({ focusedInput })}
      />
    )
  }
}

export default SingleDateSelector
