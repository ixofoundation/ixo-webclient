import React from "react";
import { DateRangePicker } from "react-dates";
import moment, { Moment } from "moment";
import {
  Container,
  MobileWrapper,
  MobileDateHeader,
  HeadingItem,
} from "./DateRangeSelector.styles";
import MediaQuery from "react-responsive";
import { deviceWidth } from "../../../../../lib/commonData";
import Back from "../../../../../assets/icons/Back";
import { DesktopWrapper } from "./DateRangeSelector.styles";

// TODO - validation with onfocus and onblur

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
  onBlur: (id: string, value: string) => void
  onFocus: (id: string, value: string) => void
}

interface State {
  focusedInput: "startDate" | "endDate" | null;
}

class DateRangeSelector extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      focusedInput: null,
    };
  }

  handleDatesChange = (
    startDate: Moment | null,
    endDate: Moment | null
  ): void => {
    // persist the dates in jsonforms as a pipe delimited string
    const value = `${startDate ? startDate.format("DD-MMM-YYYY") : ""}|${
      endDate ? endDate.format("DD-MMM-YYYY") : ""
    }`;
    this.props.onChange(value);
  };

  renderDateRangePicker = (
    numberOfMonths: number,
    orientation: "horizontal" | "vertical" | undefined
  ): JSX.Element => {
    const { id, value } = this.props;

    // extract start and end date from the piped value
    let startDate;
    let endDate;
    if (value) {
      startDate = value.split("|")[0];
      endDate = value.split("|")[1];
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
        numberOfMonths={numberOfMonths}
        orientation={orientation}
        showClearDates={true}
        hideKeyboardShortcutsPanel={true}
      />
    );
  };

  render(): JSX.Element {
    return (
      <Container>
        <MediaQuery maxWidth={`${deviceWidth.tablet - 1}px`}>
          <MobileWrapper className={this.state.focusedInput ? "active" : ""}>
            {this.state.focusedInput && (
              <MobileDateHeader>
                <HeadingItem onClick={(): void => console.log("back")}>
                  <Back />
                </HeadingItem>
              </MobileDateHeader>
            )}
            {this.renderDateRangePicker(4, "vertical")}
          </MobileWrapper>
        </MediaQuery>
        <MediaQuery minWidth={`${deviceWidth.tablet}px`}>
          <DesktopWrapper className={this.state.focusedInput ? "active" : ""}>
            {this.renderDateRangePicker(2, "horizontal")}
          </DesktopWrapper>
        </MediaQuery>
      </Container>
    );
  }
}

export default DateRangeSelector;
