import * as React from "react";
import { withRouter } from "react-router-dom";

import TextArea from "../TextArea/TextArea";
import InputText from "../InputText/InputText";
import Select from "../Select/Select";
import Radio from "../Radio/Radio";
import CountrySelect from "../CountrySelect/CountrySelect";
import TemplateSelect from "../TemplateSelect/TemplateSelect";
import InputImage from "../InputImage/InputImage";
import { FormStyles } from "../../../../types/models";

import { Button, ButtonTypes } from "../Buttons";
import {
  ButtonContainer,
  ReturnButton,
  SubmitButton,
  SubmitStatus,
} from "./DynamicForm.styles";
import ApprovedTick from "assets/icons/ApprovedTick";

export interface ParentProps {
  formSchema: any;
  formStyle: FormStyles;
  presetValues?: any[];
  submitText?: string;
  projectDID?: string;
}

export interface State {
  formData: any;
}

export interface Callbacks {
  handleSubmit: (formData: any) => void;
}

export interface Props extends ParentProps, Callbacks {
  history: any;
}

class DynamicForm extends React.Component<any, State> {
  state = {
    formData: {},
  };

  UNSAFE_componentWillMount(): void {
    let hiddenCount = 0;
    this.props.formSchema.forEach((field: any) => {
      if (field.hidden) {
        this.setFormState(
          field.name,
          this.props.presetValues ? this.props.presetValues[hiddenCount] : null
        );
        hiddenCount++;
      } else {
        this.setFormState(field.name, "");
      }
    });
  }

  handleSubmit = (): void => {
    this.props.handleSubmit(this.state.formData);
  };

  setFormState = (name: string, value: any): void => {
    const fields = name.split(".");
    let formData: any = this.state.formData;
    fields.forEach((field, index) => {
      if (index === fields.length - 1) {
        formData[field] = value;
      } else {
        if (!formData[field]) {
          formData[field] = {};
        }
        formData = formData[field];
      }
    });
    this.setState({ formData: formData });
  };

  onFormValueChanged = (name: string) => {
    return (event: any): void => {
      this.setFormState(name, event.target.value);
    };
  };

  handleRenderButtons = (): JSX.Element => {
    if (this.props.formStyle === FormStyles.modal) {
      return (
        <Button onClick={this.handleSubmit} type={ButtonTypes.gradient}>
          {this.props.submitText ? this.props.submitText : "Submit Form"}
        </Button>
      );
    } else {
      return (
        <ButtonContainer>
          <div className="row">
            <div className="col-md-6">
              <ReturnButton onClick={(): void => this.props.history.back()}>
                Back
              </ReturnButton>
            </div>
            <div className="col-md-6">
              <SubmitButton onClick={this.handleSubmit}>
                {this.props.submitText ? this.props.submitText : "Submit Form"}
                <ApprovedTick width="22" />
              </SubmitButton>
            </div>
          </div>
        </ButtonContainer>
      );
    }
  };

  render(): JSX.Element {
    return (
      <form>
        <div className="form-group">
          {this.props.formSchema.map((field: any, i: number) => {
            switch (field.type) {
              case "number":
              case "text":
              case "email":
                return (
                  <InputText
                    formStyle={this.props.formStyle}
                    id={field.name}
                    type={field.type}
                    text={field.label}
                    key={i}
                    onChange={this.onFormValueChanged(field.name)}
                    validation={field.validation}
                  />
                );
              case "image":
                return (
                  <InputImage
                    id={field.name}
                    text={field.label}
                    key={i}
                    imageWidth={570}
                    onChange={this.onFormValueChanged(field.name)}
                  />
                );
              case "textarea":
                return (
                  <TextArea
                    formStyle={this.props.formStyle}
                    id={field.name}
                    text={field.label}
                    key={i}
                    onChange={this.onFormValueChanged(field.name)}
                  />
                );
              case "select":
                return (
                  <Select
                    id={field.name}
                    options={field.options}
                    text={field.label}
                    key={i}
                    onChange={this.onFormValueChanged(field.name)}
                  />
                );
              case "country":
                return (
                  <CountrySelect
                    id={field.name}
                    text={field.label}
                    key={i}
                    onChange={this.onFormValueChanged(field.name)}
                  />
                );
              case "template":
                return (
                  <TemplateSelect
                    id={field.name}
                    text={field.label}
                    key={i}
                    onChange={this.onFormValueChanged(field.name)}
                  />
                );
              case "radio":
                return (
                  <Radio
                    id={field.name}
                    options={field.options}
                    text={field.label}
                    key={i}
                    onChange={this.onFormValueChanged(field.name)}
                  />
                );
              default:
                return <p>Type not found</p>;
            }
          })}
          {this.handleRenderButtons()}
          <SubmitStatus />
        </div>
      </form>
    );
  }
}

export default withRouter(DynamicForm);
