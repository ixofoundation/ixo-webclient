import * as React              from 'react';
import * as style              from './style.css';
import {HomePage}              from '../homePage';
import {Projects}              from '../projects';
import {SingleProject}         from '../singleProject';
import {connect}               from 'react-redux';
import {IPublicSiteStoreState} from '../../redux/public_site_reducer';
import {renderIf}              from '../../utils/react_utils';
import {Route} from 'react-router-dom';

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