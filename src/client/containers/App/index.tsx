import * as React from 'react';
import * as style from './style.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Header, MainSection, Sidebar, Footer, SingleProject, Projects} from '../../components';
import {IPublicSiteStoreState} from "../../redux/public_site_reducer";
import {Route, Switch} from 'react-router-dom';
import {initIxo}               from '../../redux/ixo/ixo_action_creators';
import {withRouter} from 'react-router-dom';

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
export class App extends React.Component<App.IProps,App.State> {

    constructor(props?: App.Props, context?: any) {
        super(props, context);
        this.state = {
            projectList : []
        }
    }
    componentDidUpdate(prevProps: App.Props){
        
        if (prevProps.ixo !== this.props.ixo) {
            this.props.ixo.project.listProjects().then((response: any) => {
                const projectList = response.result;
                
                if(projectList !== this.state.projectList){
                    this.setState({projectList:projectList});
                }
                
            }).catch((result: Error) => {
                console.log(result);
            });
        }
    }

    render() {
        return (
            <div className={style.normal}>
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar/>
                        <Switch>
                            <Route path='/project' component={SingleProject} />
                            <Route exact path="/"
                            render={(routeProps) => (
                                <Projects {...routeProps} {...this.props} projectList={this.state.projectList} />
                            )}
                            />
                        </Switch>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo         : state.ixoStore.ixo
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}
