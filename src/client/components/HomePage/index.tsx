import * as React from 'react';
import * as style from './style.css';
import {InputText} from "../InputText";
import {connect} from "react-redux";
import {IPublicSiteStoreState} from "../../redux/public_site_reducer";

export namespace HomePage {

    export interface Props {
    }

    export interface State {
        username: string
    }

    export interface Callbacks {
        onGetWeb3?: () => void;
    }

    export interface IProps extends Props, Callbacks {
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class HomePage extends React.Component<HomePage.IProps, HomePage.State> {

    constructor(props?: HomePage.IProps, context?: any) {
        super(props, context);
        this.state = {
            username: ''
        };

        this.loginUser = this.loginUser.bind(this);
        this.setText = this.setText.bind(this);
    }

    private loginUser() {
        this.props.onGetWeb3();
        var username = this.state.username;
        console.log('Username: ' + username);
    }

    private setText(text: string) {
        this.setState({username: text});
    }

    render() {
        return (
            <div className={style.homepage}>
                <div className={style.text}>Username:</div>
                <InputText onTextChanges={this.setText} placeholder='Username'/>
                <button className={style.button} onClick={this.loginUser}>Login</button>
            </div>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        onGetWeb3: () => {
            console.log('Web3 Instance: ' + state.web3Store.web3Instance)
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}