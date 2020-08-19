import * as React from "react";
import { Input, RadioButton } from "./Radio.styles";

export interface ParentProps {
  text?: string;
  id: string;
  options?: any;
}

export interface Callbacks {
  onChange: (event: any) => void;
}

export interface Props extends ParentProps, Callbacks {}

const Radio: React.FunctionComponent<Props> = (props) => {
  const generateButtons = (): JSX.Element => {
    return props.options.map((option: any, index: number) => {
      return (
        <RadioButton className="form-group" key={index}>
          <input
            key={index}
            name={props.id}
            value={option.value}
            className="with-gap"
            type="radio"
          />
          <label>{option.label}</label>
        </RadioButton>
      );
    });
  };

  return (
    <Input className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">{props.text}</span>
      </div>
      <div className="form-inline" onChange={props.onChange}>
        {generateButtons()}
      </div>
    </Input>
  );
};

export default Radio;
