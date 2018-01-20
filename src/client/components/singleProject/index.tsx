import * as React from 'react';
import * as style from './style.css';
import {connect} from "react-redux";
import {IPublicSiteStoreState} from "../../redux/public_site_reducer";

export namespace SingleProject {

    export interface Props {
        title:string
    }

    export interface State {

    }

    export interface Callbacks {
        onGetWeb3?: () => void;
    }

    export interface IProps extends Props, Callbacks {
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class SingleProject extends React.Component<SingleProject.IProps, SingleProject.State> {

    constructor(props?: SingleProject.IProps, context?: any) {
        super(props, context);

    }
    
    render() {
        return (
            <div id={style.projects} className=" container">
                <div className="row">
                    <h2>{this.props.title}</h2>
                    <button id="agents">View Agents</button>
                </div>
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