import * as React              from 'react';
import * as style              from './style.css';
import {HomePage}              from '../homePage';
import {Projects}              from '../projects';
import {connect}               from 'react-redux';
import {IPublicSiteStoreState} from '../../redux/public_site_reducer';
import {renderIf}              from '../../utils/react_utils';


const projectList = [
    {
        thumbnail: '../assets/images/logo.png',
        name     : 'project1',
        overview : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        thumbnail: '../assets/images/logo.png',
        name     : 'project2',
        overview : 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        thumbnail: '../assets/images/logo.png',
        name     : 'project3',
        overview : 'Lorem ipsum dolor sit amet, labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        thumbnail: '../assets/images/logo.png',
        name     : 'project4',
        overview : 'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        thumbnail: '../assets/images/logo.png',
        name     : 'project5',
        overview : 'magna aliqua. Ut enim ad minim veniam, commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        thumbnail: '../assets/images/logo.png',
        name     : 'project6',
        overview : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        thumbnail: '../assets/images/logo.png',
        name     : 'project7',
        overview : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
    },
    {
        thumbnail: '../assets/images/logo.png',
        name     : 'project8',
        overview : 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
];
export namespace MainSection {
    interface Props {
        web3Instance?: any
    }

    export interface State {
        isWeb3AccountLoaded: boolean,
        generatedForm: any
    }

    interface Callbacks {
    }

    export interface IProps extends Props, Callbacks {
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class MainSection extends React.Component<MainSection.IProps, MainSection.State> {

    constructor(props?: MainSection.IProps, context?: any) {
        super(props, context);
        this.state = {
            isWeb3AccountLoaded: false,
            generatedForm      : []
        };
    }

    componentDidUpdate(prevProps: MainSection.IProps) {
        if (prevProps.web3Instance !== this.props.web3Instance) {
            if (this.props.web3Instance.eth.coinbase !== null) {
                this.setState({isWeb3AccountLoaded: true});
            } else {
                this.setState({isWeb3AccountLoaded: false});
            }
        }


    }

    render() {
        return (
            <section id={style.main} className="col-md-10">

                {renderIf(this.state.isWeb3AccountLoaded, {
                    ifTrue : () => (
                        <div>
                            <HomePage/>
                        </div>
                    ),
                    ifFalse: () => (
                        <div className="container">
                            PLEASE LOGIN TO YOUR CREDENTIAL PROVIDER
                            <Projects projects={projectList}/>
                        </div>
                    )
                })}
            </section>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        web3Instance: state.web3Store.web3Instance
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}