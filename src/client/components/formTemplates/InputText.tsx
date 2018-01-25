import * as React from 'react';

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
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">{this.props.text}</span>
                </div>
                <input className="form-control"
                    id={this.props.id}
                    type={this.props.type}
                    placeholder={this.props.text}
                    onChange={this.props.onChange}
                    name={this.props.id}/>
            </div>
        );
    }
}