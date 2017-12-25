import * as React from 'react';
import * as style from './style.css';

export namespace InputText {
    export interface Props {
        text?: string;
        placeholder?: string;
        newTodo?: boolean;
        editing?: boolean;
        onTextChanges: (text: string) => void;
    }

    export interface State {
        text: string;
    }
}

export class InputText extends React.Component<InputText.Props, InputText.State> {
    constructor(props?: InputText.Props, context?: any) {
        super(props, context);
        this.state = {

            text: this.props.text || ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({text: e.target.value});
        this.props.onTextChanges(e.target.value);
    }

    render() {
        return (
            <input className={style.inputText}
                   type="text"
                   autoFocus
                   placeholder={this.props.placeholder}
                   value={this.state.text}
                   onChange={this.handleChange}/>
        );
    }
}
