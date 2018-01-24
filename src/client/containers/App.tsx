import * as React              from 'react';
import {connect}               from 'react-redux';
import {Link}                  from 'react-router-dom';
import {IPublicSiteStoreState} from '../redux/public_site_reducer';
import {Route, Switch, withRouter}         from 'react-router-dom';
import {Routes}                from '../components/Routes';
import {Sidebar}               from '../components/SideBar';
import {Footer}                from '../components/Footer';
import {Header}                from '../components/Header';
import styled,{ThemeProvider}  from 'styled-components';
import {renderIf}              from '../utils/react_utils';

export namespace App {
    export interface Props {
        ixo?: any,
        web3Instance?: any
    }

    export interface State {
        projectList: any,
        myProjectList: any,
        projectSchema: any,
        isWeb3AccountLoaded: boolean,
        ixoLoaded:boolean
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
            projectList: [],
            myProjectList: [],
            projectSchema: [],
            isWeb3AccountLoaded: false,
            ixoLoaded: false
        };
    }

    componentDidUpdate(prevProps: App.Props) {

        this.setState({ixoLoaded:false});
        if (prevProps.web3Instance !== this.props.web3Instance) {
            if (this.props.web3Instance.eth.coinbase !== null) {
                this.setState({isWeb3AccountLoaded: true});
            } else {
                this.setState({isWeb3AccountLoaded: false});
            }
        }

        if (prevProps.ixo !== this.props.ixo && this.props !== null) {
            console.log("LOADING");
            let myProjectList = [];
            this.props.ixo.project.listProjects().then((response: any) => {
                const projectList = response.result;
                // const userDID = this.props.web3Instance.eth.accounts[0];
                // // const userDID = '0x92928b5135d8dbad88b1e772bf5b8f91bfe41a8d';
                // myProjectList = projectList.filter((project,index) => { 
                //     return project.owner.did === "0x92928b5135d8dbad88b1e772bf5b8f91bfe41a8d"
                // });

                // if (myProjectList !== this.state.myProjectList) {
                //     this.setState({myProjectList: myProjectList});
                // }
                if (projectList !== this.state.projectList) {
                    this.setState({projectList: projectList});
                }

            }).catch((result: Error) => {
                console.log(result);
            });
        }
    }

    render() {
        if(this.state.ixoLoaded === false){
            return <p>Loading...</p>;
        }
        else {return (
            <ThemeProvider theme={mainTheme}>
                <AppContainer>
                    <Header/>
                    <div className="container-fluid">
                        <div className="row">
                            <Sidebar/>
                                <Routes
                                    projectList={this.state.projectList}
                                    myProjectList={this.state.myProjectList}
                                />
                        </div>
                    </div>
                    <Footer/>
                </AppContainer>
            </ThemeProvider>
        );}
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo: state.ixoStore.ixo,
        web3Instance: state.web3Store.web3Instance
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

const AppContainer = styled.div`
    font-family: 'Roboto', sans-serif;
`;

// Define what props.theme will look like
const mainTheme = {
    bgLightest : '#66e3ff',
    bgLighter : '#33daff',
    bgMain : '#00d2ff',
    bgDarker: '#00bde4',

    fontLighter:'#00677f',
    fontMain: '#004d5e',
    fontDarker: '#00333f',
    fontDarkest: '#001b22'
};
  