import * as React from 'react';
import styled from 'styled-components';

export namespace Radio {
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

export default class Radio extends React.Component<Radio.IProps, Radio.State> {
    constructor(props?: Radio.IProps, context?: any) {
        super(props, context);

    }

    generateButtons = () => {
        let options = [
        ];
        this.props.options.map((option, index) => {
            var active = '';
            if(option.default){
                active = 'active'
            }
            options.push(
                <RadioButton className="form-group">
                    <input key={index} name={this.props.id} value={option.value} className="with-gap" type="radio"/>
                    <label>{option.label}</label>
                </RadioButton>
            );
        })
        return options;
    }

    render() {

        return (
            <Input className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">{this.props.text}</span>
                </div>

                <div className="form-inline" onChange={this.props.onChange}>
                    {this.generateButtons()}
                 </div>
            </Input>
        );
    }
}

const Input = styled.div`

    margin:15px 0;
    border-radius:0;
    text-transform:uppercase;

    & .input-group-text {
        white-space: normal;
        background: ${props => props.theme.bgMain};
        border: 0;
        color: white;
        padding: 15px 10px;
        font-size:0.7em;
        border-radius: 0;
        width:140px;
    }
`;

const RadioButton = styled.div`
    padding: 10px 0px 10px 40px;
    text-transform:none;
`;

