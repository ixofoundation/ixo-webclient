import * as React              from 'react';
import {connect}               from 'react-redux';
import {Link}                  from 'react-router-dom';
import {IPublicSiteStoreState} from '../redux/public_site_reducer';
import {Route, Switch}         from 'react-router-dom';
import {withRouter}            from 'react-router-dom';
import {Routes}                from '../components/Routes';
import {Sidebar}               from '../components/SideBar';
import {Footer}                from '../components/Footer';
import {Header}                from '../components/Header';

export namespace App {
    export interface Props {
        ixo?: any
    }

    export interface State {
        projectList: any
    }

    export interface IProps extends Props {
    }
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.IProps, App.State> {

    constructor(props?: App.Props, context?: any) {
        super(props, context);
        this.state = {
            projectList: []
        };
    }

    componentDidUpdate(prevProps: App.Props) {
        if (prevProps.ixo !== this.props.ixo) {
            this.props.ixo.project.listProjects().then((response: any) => {
                const projectList = response.result;

                if (projectList !== this.state.projectList) {
                    this.setState({projectList: projectList});
                }

            }).catch((result: Error) => {
                console.log(result);
            });
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar/>
                        <Routes
                            projectList={this.state.projectList}
                        />
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo: state.ixoStore.ixo
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}
