import * as React from 'react';
import * as style from './style.css';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {Header, MainSection} from '../../components';
import {IPublicSiteStoreState} from "../../redux/public_site_reducer";
require('dotenv').config();

console.log(process.env);

export namespace App {
    export interface Props extends RouteComponentProps<void> {
    }

    export interface State {
        /* empty */
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {
    
    render() {
        const {children} = this.props;
        return (
            <div className={style.normal}>
                <Header/>
                <MainSection/>
                {children}
            </div>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}
