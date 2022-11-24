import React from 'react'
import { DateRangePicker } from 'react-dates'
import moment, { Moment } from 'moment'
import { Container, MobileWrapper, MobileDateHeader, HeadingItem, DesktopWrapper } from './DateRangeSelector.styles'
import MediaQuery from 'react-responsive'
import { deviceWidth } from 'lib/commonData'
import Back from 'assets/icons/Back'

// TODO - validation with onfocus and onblur

interface Props {
  id: string
  value: string
  onChange: (value?: string) => void
  onBlur: (id: string, value: string) => void
  onFocus: (id: string, value: string) => void
}

interface State {
  startDate?: Moment | null
  endDate?: Moment | null
  focusedInput: 'startDate' | 'endDate' | null
}

class DateRangeSelector extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    let startDate
    let endDate

    if (props.value) {
      const dateParts = props.value.split('|')
      startDate = dateParts[0] ? moment(dateParts[0]) : null
      endDate = dateParts[1] ? moment(dateParts[1]) : null
    }

    this.state = {
      startDate,
      endDate,
      focusedInput: null,
    }
  }

  handleDatesChange = (startDate: Moment | null, endDate: Moment | null): void => {
    this.setState({ startDate, endDate })

    if (startDate && endDate) {
      const value = `${startDate.format('DD-MMM-YYYY')}|${endDate.format('DD-MMM-YYYY')}`

      this.props.onChange(value)
    } else {
      this.props.onChange(undefined)
    }
  }

  renderDateRangePicker = (numberOfMonths: number, orientation: 'horizontal' | 'vertical' | undefined): JSX.Element => {
    const { id } = this.props
    const { startDate, endDate } = this.state

    return (
      <DateRangePicker
        startDate={startDate ? startDate : null}
        startDateId={`start_${id}`}
        endDate={endDate ? endDate : null}
        endDateId={`end_${id}`}
        displayFormat='DD-MMM-YYYY'
        onDatesChange={({ startDate, endDate }): void => this.handleDatesChange(startDate, endDate)}
        focusedInput={this.state.focusedInput}
        onFocusChange={(focusedInput): void => this.setState({ focusedInput })}
        numberOfMonths={numberOfMonths}
        orientation={orientation}
        showClearDates={true}
        hideKeyboardShortcutsPanel={true}
        isOutsideRange={(): boolean => false}
      />
    )
  }

  render(): JSX.Element {
    return (
      <Container>
        <MediaQuery maxWidth={`${deviceWidth.tablet - 1}px`}>
          <MobileWrapper className={this.state.focusedInput ? 'active' : ''}>
            {this.state.focusedInput && (
              <MobileDateHeader>
                <HeadingItem onClick={(): void => console.log('back')}>
                  <Back />
                </HeadingItem>
              </MobileDateHeader>
            )}
            {this.renderDateRangePicker(4, 'vertical')}
          </MobileWrapper>
        </MediaQuery>
        <MediaQuery minWidth={`${deviceWidth.tablet}px`}>
          <DesktopWrapper className={this.state.focusedInput ? 'active' : ''}>
            {this.renderDateRangePicker(2, 'horizontal')}
          </DesktopWrapper>
        </MediaQuery>
      </Container>
    )
  }
}

export default DateRangeSelector
