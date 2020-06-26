import React from 'react'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
  numberOfMonths: number
  initialOrientation: string
}

interface State {
  focused: boolean
}

class SingleDateSelector extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      focused: false,
    }
  }

  render(): JSX.Element {
    const { id, value, onChange } = this.props

    return (
      <SingleDatePicker
        date={value ? moment(value) : null}
        displayFormat="DD-MMM-YYYY"
        onDateChange={(date): void =>
          onChange(date ? date.format('DD-MMM-YYYY') : null)
        }
        focused={this.state.focused}
        onFocusChange={({ focused }): void => this.setState({ focused })}
        id={id}
        isOutsideRange={(): boolean => false}
        numberOfMonths={this.props.numberOfMonths}
        orientation={this.props.initialOrientation}
      />
    )
  }
}
export default SingleDateSelector
