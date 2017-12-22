import * as React from 'react';
import * as style from './style.css';
import {InputText} from "../InputText";

export namespace HomePage {
    export interface Props {
    }

    export interface State {
    }
}

export class HomePage extends React.Component<HomePage.Props, HomePage.State> {

    constructor(props?: HomePage.Props, context?: any) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div className={style.homepage}>
                <div className={style.text}>Username:</div>
                <InputText placeholder='Username'/>
                <div className={style.text}>Password:</div>
                <InputText placeholder='Password'/>
            </div>
        );
    }
}
