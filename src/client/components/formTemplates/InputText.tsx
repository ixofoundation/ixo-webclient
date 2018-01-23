import * as React from 'react';

export namespace InputText {
  export interface Props {
    type: string;
    text?: string;
    id:string;
  }
}

export default class InputText extends React.Component<InputText.Props> {
    constructor(props?: InputText.Props, context?: any) {
        super(props, context);

    }

    handleChange=(e)=>{
        this.setState({text: e.target.value});
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
                    onChange={this.handleChange}/>
            </div>
        );
    }
}