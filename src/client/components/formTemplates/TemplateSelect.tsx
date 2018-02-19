import * as React from 'react';
import * as iso3311a2 from 'iso-3166-1-alpha-2';
import styled from 'styled-components';
import Select from './Select';

export namespace TemplateSelect {
    export interface Props {
        text?: string;
        id: string;
        options?: any
    }

    export interface State {
    }

    export interface Callbacks {
        onChange
    }

    export interface IProps extends Props, Callbacks {

    }
}

export default class TemplateSelect extends Select {
    constructor(props?: TemplateSelect.IProps, context?: any) {
        super(props, context);
    }

    generateSelect = () => {
        let selectOptions = [];

        //TODO: 
        // This should list all the templates for a type. The type ('project, claim; evaluation') 
        // should be passed in as a property

        // Push default as the only available template for now
        const templateList = {'default': 'default'};
        for (var code in templateList) {
            selectOptions.push(<option key={code} value={code}>{templateList[code]}</option>);
        }
        return selectOptions;

    }
}
