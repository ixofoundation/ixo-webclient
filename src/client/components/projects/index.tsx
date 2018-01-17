import * as React from 'react';
import * as style from './style.css';
import {InputText} from "../inputText";
import {connect} from "react-redux";
import {IPublicSiteStoreState} from "../../redux/public_site_reducer";

export namespace Projects {

    export interface Props {
        projects: any
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
export class Projects extends React.Component<Projects.IProps, Projects.State> {

    constructor(props?: Projects.IProps, context?: any) {
        super(props, context);
        this.state = {
        };
    }
    

    render() {
        return (
            <div id={style.projects} className=" container">
                <div className="row">
                    {this.props.projects.map((project,index)=>{
                        return <div className="col-md-4" key={index}>
                            <h3>{project.name}</h3>
                            <p>{project.overview}</p>
                        </div>
                    })}
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