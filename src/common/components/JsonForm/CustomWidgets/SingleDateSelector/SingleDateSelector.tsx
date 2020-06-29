import React from 'react'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../../../lib/commonData'
import {
  MobileWrapper,
  MobileDateHeader,
  HeadingItem,
  ApplyButtonWrapper,
  ApplyButton,
} from './SingleDateSelector.styles'
import Back from '../../../../../assets/icons/Back'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
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
      <>
        <MediaQuery maxWidth={`${deviceWidth.desktop - 1}px`}>
          <MobileWrapper className={this.state.focused ? 'active' : ''}>
            {this.state.focused && (
              <MobileDateHeader>
                <HeadingItem onClick={(): void => console.log('clicked back')}>
                  <Back />
                </HeadingItem>
                <HeadingItem
                  onClick={(): void => {
                    console.log('clicked clear')
                  }}
                >
                  clear
                </HeadingItem>
              </MobileDateHeader>
            )}

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
              numberOfMonths={2}
              orientation="vertical"
              verticalHeight={625}
            />
            {this.state.focused && (
              <ApplyButtonWrapper>
                <ApplyButton onClick={(): void => console.log('clicked apply')}>
                  Apply
                </ApplyButton>
              </ApplyButtonWrapper>
            )}
          </MobileWrapper>
        </MediaQuery>
        <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
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
            numberOfMonths={2}
            orientation="horizontal"
          />
        </MediaQuery>
      </>
    )
  }
}
export default SingleDateSelector
