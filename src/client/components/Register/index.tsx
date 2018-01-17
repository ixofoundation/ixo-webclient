import * as React from 'react';
import {InputText} from "../inputText";
import './style.css';

export namespace Register {
    export interface Props {
    }

    export interface State {
    }
}

export class Register extends React.Component<Register.Props, Register.State> {

    constructor(props?: Register.Props, context?: any) {
        super(props, context);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(text: string) {
        if (text.length) {
        }
    }

    private registerUser() {
        //registration call to meta mask goes here
    }

    private setName(text:string){
        //this.setState({username:text});
        //need to finish this with redux
    }

    private setEmail(text:string){
        //this.setState({email:text});
    }

    render() {
        return (
            <form>
                <h2>Register</h2>
                <div className="form-group">
                    <InputText onTextChanges={this.setName} placeholder='Name'/>
                </div>
                <div className="form-group">
                    <InputText onTextChanges={this.setEmail} placeholder="Email"/>
                </div>

                <button type="submit" className="btn btn-primary" onClick={this.registerUser}>Submit</button>
            </form>
        );
    }
}
