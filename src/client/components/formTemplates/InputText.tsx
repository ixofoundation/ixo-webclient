import * as React from 'react';
import styled from 'styled-components';

export namespace InputText {
  export interface Props {
    type: string;
    text?: string;
    id:string;

  }
  export interface Callbacks {
      onChange: (event) => void
  }

  export interface IProps extends Props, Callbacks {

  }
}


export default class InputText extends React.Component<InputText.IProps> {
    constructor(props?: InputText.IProps, context?: any) {
        super(props, context);

    }

    render() {
        return (
            <Input className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">{this.props.text}</span>
                </div>
                <input className="form-control"
                    id={this.props.id}
                    type={this.props.type}
                    placeholder={this.props.text}
                    onChange={this.props.onChange}
                    name={this.props.id}/>
            </Input>
        );
    }
}

const Input = styled.div`

    margin:15px 0;
    border-radius:0;
    text-transform:uppercase;

    & .input-group-text {
        background: ${props => props.theme.bgMain};
        border: 0;
        color: white;
        padding: 15px 10px;
        font-size:0.7em;
        border-radius: 0;
        width:140px;
        white-space: normal;
    }

    & input {
        border-radius:0;
        border-left:0;
    }
`;