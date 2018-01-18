import * as React              from 'react';
import * as style              from './style.css';
import {connect}               from 'react-redux';
import {IPublicSiteStoreState} from '../../redux/public_site_reducer';
import {pingIxoServer}         from '../../redux/ping/ping_action_creators';
import {IPingResult}           from '../../../../types/models';
import {initIxo}               from '../../redux/ixo/ixo_action_creators';
import {initializeWeb3}        from '../../redux/web3/web3_action_creators';

const logoSrc = require('../../assets/images/logo.png');

export namespace Header {
    export interface Props {
        pingResult?: IPingResult
        responseDate?: IPingResult,
        pingError?: IPingResult,
        ixo?: any
    }

    export interface State {
        isServerConnected: boolean
        initialDate: Date,
        responseTime: number,
        selectedServer: string
    }

    export interface Callbacks {
        getPing?: (ixo: any) => void;
        onIxoInit?: (hostName: string) => void;
        onWeb3Init?: (ixo: any) => void;
    }

    export interface IProps extends Props, Callbacks {
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Header extends React.Component<Header.IProps, Header.State> {

    constructor(props?: Header.IProps, context?: any) {
        super(props, context);
        this.state = {
            isServerConnected: null,
            initialDate      : null,
            responseTime     : null,
            selectedServer   : 'https://ixo-node.herokuapp.com'
        };
    }

    ping = () => {
        this.setState({initialDate: new Date()});
        if (this.props.ixo) {
            this.props.getPing(this.props.ixo);
        }
    };

    componentDidMount() {
        this.props.onIxoInit(this.state.selectedServer);
        this.ping();
        setInterval(this.ping, 5000);
    }

    componentDidUpdate(prevProps: Header.IProps) {
        if (prevProps.ixo !== this.props.ixo) {
            this.props.onWeb3Init(this.props.ixo);
        }

        if (prevProps.pingResult !== this.props.pingResult) {
            if (this.props.pingResult === null) {
                this.setState({isServerConnected: false});
            }
            else if (this.props.pingResult.result === 'pong') {
                const responseTime = Math.abs(new Date().getTime() - this.state.initialDate.getTime());
                this.setState({
                    isServerConnected: true,
                    responseTime
                });
            }
        }
    }

    renderStatusIndicator() {
        if (this.state.isServerConnected && this.props.pingError === null) {
            return (
                <p className={style.ping}
                   data-tip={`Response time: ${this.state.responseTime} ms
--------
${this.state.selectedServer}`}>
                    Server Status:
                    <span className={style.ready}></span>
                </p>
            );
        }
        else if (this.props.pingError === null) {
            return (
                <p className={style.ping} data-tip="Waiting for server...">Server Status:
                    <span className={style.loading}></span>
                </p>
            );
        }
        else {
            return (
                <p className={style.ping} data-tip={`${this.state.selectedServer} not responding`}>Server Status:
                    <span className={style.error}></span>
                </p>
            );
        }
    }

    handleServerChange = (event) => {
        this.props.onIxoInit(event.target.value);
        this.setState({
            selectedServer   : event.target.value,
            isServerConnected: false
        });
    };

    render() {
        return (
            <header className="container-fluid bg-dark text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 d-flex align-items-center">
                            <img src={logoSrc} alt="IXO Logo"/>
                        </div>
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4 d-flex align-items-center justify-content-end">
                            <select value={this.state.selectedServer} onChange={this.handleServerChange}>
                                <option value="https://ixo-node.herokuapp.com">Production
                                    Server
                                </option>
                                <option value="http://localhost:5000">Development Server</option>
                            </select>
                            {this.renderStatusIndicator()}
                        </div>
                    </div>
                </div>

            </header>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        pingResult  : state.pingStore.pingResult,
        pingError   : state.pingStore.error,
        web3Instance: state.web3Store.web3Instance,
        ixo         : state.ixoStore.ixo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPing   : (ixo) => {
            dispatch(pingIxoServer(ixo));
        },
        onWeb3Init: (ixo: any) => {
            dispatch(initializeWeb3(ixo));
        },
        onIxoInit : (hostname: string) => {
            dispatch(initIxo(hostname));
        }
    };
}
