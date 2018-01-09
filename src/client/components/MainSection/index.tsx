import * as React from 'react';
import * as style from './style.css';
import {Footer} from '../Footer/index';
import {HomePage} from '../HomePage/index';
import {Register} from '../Register/index';
import {connect} from "react-redux";
import {IPublicSiteStoreState} from "../../redux/public_site_reducer";
import {initializeWeb3} from "../../redux/web3/web3_action_creators";
import {renderIf} from "../../utils/react_utils";

export namespace MainSection {
    interface Props {
        web3Instance?: any
    }

    export interface State {
        isWeb3AccountLoaded: boolean
    }

    interface Callbacks {
        onWeb3Init?: () => void
    }

    export interface IProps extends Props, Callbacks {
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class MainSection extends React.Component<MainSection.IProps, MainSection.State> {

    constructor(props?: MainSection.IProps, context?: any) {
        super(props, context);
        this.state = {
            isWeb3AccountLoaded: false
        }
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

    componentDidMount() {
        this.props.onWeb3Init();
    }

    render() {
        return (
            <section className={style.main}>
                <ul className={style.normal}>
                    {renderIf(this.state.isWeb3AccountLoaded, {
                        ifTrue : () => (
                            <div>
                                <HomePage/>
                            </div>
                        ),
                        ifFalse: () => (
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <Register/>
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ul>
                <Footer/>
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
    return {
        onWeb3Init: () => {
            dispatch(initializeWeb3());
        }
    };
}