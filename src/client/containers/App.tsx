import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IPublicSiteStoreState } from '../redux/public_site_reducer';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import styled, { ThemeProvider } from 'styled-components';
import { Sidebar } from '../components/SideBar';
import { Routes } from '../components/Routes';
import { IPingResult } from '../../../types/models';
import { ToastContainer } from 'react-toastify';

export namespace App {
    export interface Props {
        ixo?: any,
        pingError?: String,
        pingResult?: String
    }

    export interface State {
        projectList: any,
        myProjectList: any,
        serviceAgentProjectList: any,
        did: string
    }

    export interface Callbacks {
        onGetPing?: (ixo: any) => void;
    }

    export interface IProps extends Props, Callbacks {
    }
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.IProps, App.State> {

    constructor(props?: App.Props, context?: any) {
        super(props, context);
        this.state = {
            projectList: [],
            myProjectList: [],
            serviceAgentProjectList: [],
            did: null
        };
    }

    //Check metamask account change
    metamaskAccountChecker = () => {
        if (this.state.did !== this.props.ixo.credentialProvider.getDid()) {
            this.setState({ did: this.props.ixo.credentialProvider.getDid() });
            this.refreshProjectList();
        }
    }

    componentDidMount() {
        setInterval(this.metamaskAccountChecker.bind(this), 1000);
    }

    componentDidUpdate(prevProps: App.Props) {
        if (prevProps.pingResult !== this.props.pingResult) {
            if (this.props.pingResult === 'pong') {
                if (!(this.state.projectList.length > 0)) {
                    this.refreshProjects();
                }
                if (this.props.ixo.credentialProvider.getDid() && (this.state.did !== this.props.ixo.credentialProvider.getDid())) {
                    this.setState({ did: this.props.ixo.credentialProvider.getDid() })
                    this.refreshMyProjects();
                    this.refreshServiceAgentProjectList();
                }

                if (!this.props.ixo.credentialProvider.getDid()) {
                    this.setState({ myProjectList: [], serviceAgentProjectList: [], did: null });
                }

            } else {
                this.setState({ projectList: [], myProjectList: [], serviceAgentProjectList: [] });
            }

            if (prevProps.pingError !== this.props.pingError) {
                if (this.props.pingError) {
                    this.setState({ projectList: [], myProjectList: [], serviceAgentProjectList: [] });
                }
            }
        }
    }

    refreshProjects = () => {
        this.props.ixo.project.listProjects().then((response: any) => {
            this.setState({ projectList: response.result });
        }).catch((error) => {
            console.error(error);
        });
    }

    refreshMyProjects = () => {
        this.props.ixo.project.listProjectsByDid(this.props.ixo.credentialProvider.getDid()).then((response: any) => {
            this.setState({ myProjectList: response.result });
        }).catch((error) => {
            console.error(error);
        });
    }

    refreshServiceAgentProjectList = () => {
        this.props.ixo.project.listProjectsByDidAndRole(this.props.ixo.credentialProvider.getDid(), 'SA').then((response: any) => {
            this.setState({ serviceAgentProjectList: response.result });
        }).catch((error) => {
            console.error(error);
        });
    }

    refreshProjectList = () => {
        this.refreshProjects();
        this.refreshMyProjects();
        this.refreshServiceAgentProjectList();
    }

    renderProjectContent() {
        if (this.props.ixo && !this.props.pingError) {
            return <div className="col-12">
                <Routes projectList={this.state.projectList} myProjectList={this.state.myProjectList} serviceAgentProjectList={this.state.serviceAgentProjectList} />
            </div>
        } else if (this.props.pingError) {
            return <Unsuccessful className="col-md-12"><p>Error connecting to ixo server... Retrying...</p></Unsuccessful>;
        } else {
            return <Loading className="col-md-12"><p>Loading...</p></Loading>;
        }
    }

    render() {
        return (
            <ThemeProvider theme={mainTheme}>
                <AppContainer>
                    <Header />
                    <BodyContainer className="container-fluid">
                        <ToastContainer autoClose={4000} />
                        <NavRow className="row">
                            <Sidebar refreshProjects={this.refreshProjectList} />
                        </NavRow>
                        <div className="row">
                            {this.renderProjectContent()}
                        </div>
                    </BodyContainer>
                    <Footer />
                </AppContainer>
            </ThemeProvider>
        );
    }
}


function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo: state.ixoStore.ixo,
        pingError: state.pingStore.pingError,
        pingResult: state.pingStore.pingResult
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

const AppContainer = styled.div`
    font-family: 'Roboto', sans-serif;
`;

// Define what props.theme will look like
const mainTheme = {
    bgLightest: '#66e3ff',
    bgLighter: '#33daff',
    bgMain: '#00d2ff',
    bgDarker: '#00bde4',
    bgDarkest: '#00687b',

    fontLighter: '#00677f',
    fontMain: '#004d5e',
    fontDarker: '#00333f',
    fontDarkest: '#001b22',

    projectColors: [
        '#66e3ff'
    ],

    randomColor: function (colorArray) {
        var idx = Math.floor(Math.random() * colorArray.length);
        return colorArray[idx];
    }
};

const BodyContainer = styled.div`
    margin-top:70px;
    background:#dcebf1;
`;

const NavRow = styled.div`
`;

const Loading = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:calc(100vh - 140px);
`;

const Unsuccessful = Loading;