import * as React from "react";
import Select from "../Select/Select";

export interface ParentProps {
  text?: string;
  id: string;
  options?: any;
}

export interface Callbacks {
  onChange: (event: any) => void;
}

export interface Props extends ParentProps, Callbacks {}

export default class TemplateSelect extends Select {
  generateSelect = (): Array<JSX.Element> => {
    const selectOptions = [];

    // TODO:
    // This should list all the templates for a type. The type ('project, claim; evaluation')
    // should be passed in as a property

    // Push default as the only available template for now
    const templateList: any = { default: "default" };
    for (const code in templateList) {
      if (Object.hasOwnProperty.call(templateList, code)) {
        selectOptions.push(
          <option key={code} value={code}>
            {templateList[code]}
          </option>
        );
      }
    }
    return selectOptions;
  };
}
