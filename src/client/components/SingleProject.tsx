import * as React              from 'react';
import {connect}               from "react-redux";
import {IPublicSiteStoreState} from "../redux/public_site_reducer";

export namespace SingleProject {

    export interface Props {
        location?: any
    }
    export interface State {

    }

    export interface IProps extends Props {
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class SingleProject extends React.Component<SingleProject.IProps, SingleProject.State> {

    constructor(props?: SingleProject.IProps, context?: any) {
        super(props, context);

    }

    componentDidUpdate(prevProps:SingleProject.IProps){

        if(prevProps.location.state !== this.props.location.state){
            // console.log("HERE");
        }
        console.log(this.props.location.state);
    }
    
    
    render() {        
        console.log("rendering");
        const projectMeta = this.props.location.state;
        return (
            <div className=" container">
                <div>
                    <h2>{projectMeta.name}</h2>
                    <p>Country: {projectMeta.country}</p>
                    <p>Date created: {projectMeta.created}</p>
                    <p>Project ID: {projectMeta._id}</p>
                    <br/>
                    <p>Owner information:</p>
                    <p>Name: {projectMeta.owner.name}</p>
                    <p>Email: {projectMeta.owner.name}</p>
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