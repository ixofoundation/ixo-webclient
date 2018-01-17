import * as React from 'react';
import * as style from './style.css';
import {connect} from "react-redux";
import {IPublicSiteStoreState} from "../../redux/public_site_reducer";
import {pingIxoServer} from "../../redux/ping/ping_action_creators";
import {IPingResult} from "../../../../types/models";
import {renderIf} from "../../utils/react_utils";

const logoSrc = require("../../assets/images/logo.png");

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
        getPing?: (hostName: string) => void;
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
            initialDate: null,
            responseTime: null,
            selectedServer: "http://localhost:5000/api/network"
        }
    }

    ping = () => {
        this.setState({initialDate: new Date()});
        if (this.props.ixo) {
            this.props.getPing(this.props.ixo);
        }
    };

    componentDidMount() {
        this.ping();
        const pingInterval = setInterval(this.ping, 5000);
    }

    componentDidUpdate(prevProps: Header.IProps) {
        if (prevProps.pingResult !== this.props.pingResult) {
            if (this.props.pingResult === null) {
                this.setState({isServerConnected: false})
            }
            else if (this.props.pingResult.result === 'pong') {
                const responseTime = Math.abs(new Date().getTime() - this.state.initialDate.getTime());
                this.setState({isServerConnected: true, responseTime});
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
        this.setState({
            selectedServer: event.target.value,
            isServerConnected: false
        });
    }

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
                                <option value="https://arcane-stream-64697.herokuapp.com/api/network">Production
                                    Server
                                </option>
                                <option value="http://localhost:5000/api/network">Development Server</option>
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
        pingResult: state.pingStore.pingResult,
        pingError: state.pingStore.error,
        ixo: state.ixoStore.ixo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPing: (ixo) => {
            dispatch(pingIxoServer(ixo))
        }
    };
}
