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
  DesktopWrapper,
  ResetButtonDesktop,
  ApplyButtonDesktop,
  ButtonContainer,
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
        <MediaQuery maxWidth={`${deviceWidth.tablet - 1}px`}>
          <MobileWrapper className={this.state.focused ? 'active' : ''}>
            {this.state.focused && (
              <MobileDateHeader>
                <HeadingItem onClick={(): void => console.log('back')}>
                  <Back />
                </HeadingItem>
                <HeadingItem
                  onClick={(): void => {
                    console.log('clear')
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
              numberOfMonths={4}
              orientation="vertical"
              verticalHeight={625}
            />
            {this.state.focused && (
              <ApplyButtonWrapper>
                <ApplyButton onClick={(): void => console.log('apply')}>
                  Apply
                </ApplyButton>
              </ApplyButtonWrapper>
            )}
          </MobileWrapper>
        </MediaQuery>
        <MediaQuery minWidth={`${deviceWidth.tablet}px`}>
          <DesktopWrapper className={this.state.focused ? 'active' : null}>
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
            {this.state.focused && (
              <ButtonContainer>
                <ResetButtonDesktop onClick={(): void => console.log('reset')}>
                  Reset
                </ResetButtonDesktop>
                <ApplyButtonDesktop onClick={(): void => console.log('apply')}>
                  Apply
                </ApplyButtonDesktop>
              </ButtonContainer>
            )}
          </DesktopWrapper>
        </MediaQuery>
      </>
    )
  }
}
export default SingleDateSelector
