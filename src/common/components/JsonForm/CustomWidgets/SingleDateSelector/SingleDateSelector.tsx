import React from 'react'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import MediaQuery from 'react-responsive'
import { deviceWidth } from 'lib/commonData'
import { Container, MobileWrapper, MobileDateHeader, HeadingItem, DesktopWrapper } from './SingleDateSelector.styles'
import Back from 'assets/icons/Back'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
}

interface State {
  focused: boolean | null
}

class SingleDateSelector extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      focused: false,
    }
  }

  renderSingleDatePicker = (
    orientation: 'horizontal' | 'vertical' | undefined,
    height: number,
    numberOfMonths: number,
  ): JSX.Element => {
    const { id, value, onChange } = this.props
    return (
      <SingleDatePicker
        date={value ? moment(value) : null}
        displayFormat='DD-MMM-YYYY'
        onDateChange={(date): void => onChange(date ? date.format('DD-MMM-YYYY') : '')}
        focused={!!this.state.focused}
        onFocusChange={({ focused }): void => this.setState({ focused })}
        id={id}
        isOutsideRange={(): boolean => false}
        numberOfMonths={numberOfMonths}
        orientation={orientation}
        verticalHeight={height}
        hideKeyboardShortcutsPanel={true}
        showClearDate={true}
      />
    )
  }

  render(): JSX.Element {
    return (
      <Container>
        <MediaQuery maxWidth={`${deviceWidth.tablet - 1}px`}>
          <MobileWrapper className={this.state.focused ? 'active' : ''}>
            {this.state.focused && (
              <MobileDateHeader>
                <HeadingItem onClick={(): void => console.log('back')}>
                  <Back />
                </HeadingItem>
              </MobileDateHeader>
            )}
            {this.renderSingleDatePicker('vertical', 685, 3)}
          </MobileWrapper>
        </MediaQuery>
        <MediaQuery minWidth={`${deviceWidth.tablet}px`}>
          <DesktopWrapper className={this.state.focused ? 'active' : ''}>
            {this.renderSingleDatePicker('horizontal', 0, 2)}
          </DesktopWrapper>
        </MediaQuery>
      </Container>
    )
  }
}
export default SingleDateSelector
