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
import styled,{ThemeProvider}  from 'styled-components';

export namespace App {
    export interface Props {
        ixo?: any
    }

    export interface State {
        projectList: any,
        projectSchema: any
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
            projectSchema: []
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
            this.props.ixo.project.getProjectTemplate('default').then((response: any) => {
                console.log(response);
                const projectSchema = response.result.form.fields;

                if (projectSchema !== this.state.projectSchema) {
                    this.setState({projectSchema: projectSchema});
                }
            }).catch((result: Error) => {
                console.log(result);
            });
        }
    }

    render() {
        return (
            <ThemeProvider theme={mainTheme}>
                <AppContainer>
                    <Header/>
                    <div className="container-fluid">
                        <div className="row">
                            <Sidebar projectSchema={this.state.projectSchema}/>
                            <Routes
                                projectList={this.state.projectList}
                            />
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
        ixo: state.ixoStore.ixo
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
    bgDarker: '#01b6dd',

    fontLighter:'#00677f',
    fontMain: '#004d5e',
    fontDarker: '#00333f',
    fontDarkest: '#001b22'
};
  