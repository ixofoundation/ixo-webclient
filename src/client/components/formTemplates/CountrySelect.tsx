import * as React from 'react';
import * as iso3311a2 from 'iso-3166-1-alpha-2';
import styled from 'styled-components';
import Select from './Select';
//import {Select} from './Select';

export namespace CountrySelect {
    export interface Props {
        text?: string;
        id: string;
    }

    export interface State {
    }

    export interface Callbacks {
        onChange
    }

    export interface IProps extends Props, Callbacks {

    }
}
const countryList = iso3311a2.getData();

export default class CountrySelect extends Select {
    constructor(props?: CountrySelect.IProps, context?: any) {
        super(props, context);

    }

    generateSelect = () => {
        let selectOptions = [];

        for (var code in countryList) {
            if (countryList.hasOwnProperty(code)) {
                selectOptions.push(<option key={code} value={code}>{countryList[code]}</option>);
            }
        }

        return selectOptions;

    }

 }
