import React from 'react'
import { SingleDatePicker as SingleDatePickerDateControl } from 'react-dates'
import { Moment } from 'moment'

interface Props {
  id: string
  value: Moment
  onChange: (value: Moment) => void
}

interface State {
  focused: boolean
}

class SingleDatePicker extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      focused: false,
    }
  }

  render(): JSX.Element {
    const { id, value, onChange } = this.props

    console.log(value)

    return (
      <SingleDatePickerDateControl
        date={value}
        onDateChange={(date: Moment): void => onChange(date)}
        focused={this.state.focused}
        onFocusChange={({ focused }): void => this.setState({ focused })}
        id={id}
      />
    )
  }
}

export default SingleDatePicker
