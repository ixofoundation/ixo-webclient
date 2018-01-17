import * as React from 'react';
import * as style from './style.css';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {Header, MainSection, Sidebar, Footer} from '../../components';
import {IPublicSiteStoreState} from "../../redux/public_site_reducer";

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
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar/>
                        <MainSection/>
                    </div>
                </div>
                <Footer/>
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
