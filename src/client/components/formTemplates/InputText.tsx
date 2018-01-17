import * as React from 'react';
import * as style from './style.css';

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
            <section>
                <input className="form-control"
                    id={this.props.id}
                    type={this.props.type}
                    placeholder={this.props.text}
                    onChange={this.handleChange}/>
            </section>
            
        );
    }
}