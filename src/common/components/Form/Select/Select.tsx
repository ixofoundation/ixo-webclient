import * as React from "react";
import { Input } from "./Select.styles";

export interface ParentProps {
  text?: string;
  id: string;
  options?: any;
}

export interface Callbacks {
  onChange: (event: any) => void;
}

export interface Props extends ParentProps, Callbacks {}

export default class Select extends React.Component<Props> {
  generateSelect = (): Array<JSX.Element> => {
    return this.props.options.map((option: any, index: number) => {
      return (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      );
    });
  };

  render(): JSX.Element {
    return (
      <Input>
        <p>{this.props.text}</p>
        <select
          defaultValue="default"
          className="custom-select"
          id={this.props.id}
          onChange={this.props.onChange}
        >
          <option value="default" disabled={true}>
            {this.props.text}
          </option>
          {this.generateSelect()}
        </select>
      </Input>
    );
  }
}
