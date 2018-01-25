import * as React                  from 'react';
import {connect}                   from 'react-redux';
import {Link}                      from 'react-router-dom';
import {IPublicSiteStoreState}     from '../redux/public_site_reducer';
import {Route, Switch, withRouter} from 'react-router-dom';
import {Footer}                    from '../components/Footer';
import {Header}                    from '../components/Header';
import styled, {ThemeProvider}     from 'styled-components';
import {initIxo}                   from '../redux/ixo/ixo_action_creators';
import {initializeWeb3}            from '../redux/web3/web3_action_creators';
import {Sidebar}                   from '../components/SideBar';
import {Routes}                    from '../components/Routes';
import {IPingResult}               from '../../../types/models';

export namespace App {
    export interface Props {
        ixo?: any,
        web3Instance?: any
        pingError?: any
        pingResult?: IPingResult
    }

    export interface State {
        projectList: any,
    }

    export interface Callbacks {
        onGetPing?: (ixo: any) => void;
        onIxoInit?: (hostName: string) => void;
        onWeb3Init?: (ixo: any) => void;
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
            projectList: null
        };
    }

    componentDidUpdate(prevProps: App.Props) {
        if (prevProps.ixo !== this.props.ixo) {
            this.props.onWeb3Init(this.props.ixo);
        }

        if (prevProps.pingResult !== this.props.pingResult) {
            if (this.props.pingResult.result === 'pong') {
                if (!this.state.projectList) {
                    this.props.ixo.project.listProjects().then((response: any) => {
                        this.setState({projectList: response.result});
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            }
        }

        if (prevProps.pingError !== this.props.pingError) {
            if (this.props.pingError) {
                this.setState({projectList: null});
            }
        }
    }

    renderProjectContent() {
        if (this.props.ixo && this.state.projectList && !this.props.pingError) {
            return <div className="col-md-10">
                <Routes projectList={this.state.projectList}/>
            </div>;
        } else if (this.props.pingError) {
            return <p>Error connecting to ixo server... Retrying...</p>;
        } else {
            return <p>Loading...</p>;
        }
    }


    render() {
        return (
            <ThemeProvider theme={mainTheme}>
                <AppContainer>
                    <Header/>
                    <div className="container-fluid">
                        <div className="row">
                            <Sidebar/>
                            {this.renderProjectContent()}
                        </div>
                    </div>
                    <Footer/>
                </AppContainer>
            </ThemeProvider>
        );
    }
}


function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo         : state.ixoStore.ixo,
        web3Instance: state.web3Store.web3Instance,
        pingError   : state.pingStore.error,
        pingResult  : state.pingStore.pingResult
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onIxoInit : (hostname: string) => {
            dispatch(initIxo(hostname));
        },
        onWeb3Init: (ixo: any) => {
            dispatch(initializeWeb3(ixo));
        }
    };
}

const AppContainer = styled.div`
    font-family: 'Roboto', sans-serif;
`;

// Define what props.theme will look like
const mainTheme = {
    bgLightest: '#66e3ff',
    bgLighter : '#33daff',
    bgMain    : '#00d2ff',
    bgDarker  : '#00bde4',

    fontLighter: '#00677f',
    fontMain   : '#004d5e',
    fontDarker : '#00333f',
    fontDarkest: '#001b22'
};
  