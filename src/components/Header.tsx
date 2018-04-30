import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PublicSiteStoreState } from '../redux/public_site_reducer';
import { pingIxoServer, resetPing } from '../redux/ping/ping_action_creators';
import { initIxo, resetIxo } from '../redux/ixo/ixo_action_creators';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const logoSrc = require('../assets/images/logo.png');

const ServerLabel = styled.div`
float: left;
`;

const TopBar = styled.header`
    position: fixed;
    padding:15px 0;
    z-index:99;
    background:black;
    top:0;

    && {
        width:100vw;
    }

    & img {
        height:40px;
    }

    & select {
        margin-right: 20px;
        background: none;
        color: white;
        border: 1px solid white;
        height: 35px;
        width: 180px;
    }
`;
const StatusMessage = styled.div`
    opacity:0; 
    background: rgba(0, 0, 0,0.7);
    position: absolute;
    color: white;
    top: 60px;
    right:0;
    width:220px;
    padding: 10px;
    line-height: 1.2;
    font-size: 0.8em;
    border-radius: 10px;
    pointer-events:none;
    transition:opacity 0.3s ease;
    z-index: 1;
    
    &:after {
        content: "";
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(0, 0, 0,0.7);
        position: absolute;
        top: -10px;
        right: 20px;
        pointer-events:none;
        transition:opacity 0.3s ease;
    }
`;

const Ping = styled.div`
    margin-bottom:0;
    position:relative;

    &:hover {
        cursor:pointer;
    }

    &:hover ${StatusMessage},
    &:hover ${StatusMessage}{
      opacity:1;
    }
`;

const Light = styled.span`
    margin-left: 5px;
    background:rgb(240, 0, 0);
    border-radius:50%;
    box-shadow: 0px 0px 10px 0px rgba(255,0,0,1);
    display:inline-block;
    width:10px;
    height:10px;
`;

const LightLoading = Light.extend`
    box-shadow: 0px 0px 10px 0px rgba(255,165,0,1);
    background:rgb(255, 165, 0);
    animation: flashing 1s infinite;

    @keyframes flashing {
        0% {
          box-shadow: 0px 0px 10px 0px rgba(255,165,0,1);
        }
        50% {
          box-shadow: 0px 0px 10px 1px rgba(255,200,0,1);
          background:rgb(255, 200, 0);
        }
        100% {
          box-shadow: 0px 0px 10px 0px rgba(255,165,0,1);
        }
      }
`;

const LightReady = Light.extend`
    background:rgb(162, 240, 45);
    box-shadow: 0px 0px 10px 0px rgb(0, 255, 64);
`;
export interface State {
    isServerConnected: number;
    initialDate: Date;
    responseTime: number;
    selectedServer: string;
    loginStatus: boolean;
}

export interface StateProps {
    pingResult?: string;
    pingError?: string;
    ixo?: any;
}

export interface DispatchProps {
    getPing: (ixo: any) => void;
    onIxoInit: (hostName: string) => void;
    onServerChange: () => void;
}

export interface Props extends StateProps, DispatchProps {
}

class Header extends React.Component<Props, State> {

    constructor(props: Props, context?: any) {
        super(props, context);
        this.state = {
            isServerConnected: 0,
            initialDate: new Date(),
            responseTime: 0,
            selectedServer: 'https://ixo-node.herokuapp.com',
            loginStatus: false
        };
    }

    ping = () => {
        this.setState({
            initialDate: new Date()
        });
        if (this.props.ixo) {

            this.props.getPing(this.props.ixo);

            this.props.ixo.credentialProvider.provider.eth.getAccounts((err, accounts) => {
                if (err != null) {
                    console.error('An error occurred: ' + err);
                } else if (accounts.length > 0) {
                    this.state.loginStatus === false &&
                    toast('You have sucessfully logged into MetaMask', {type: 'info', autoClose: 3000 });
                    this.setState({loginStatus: true});
                } else {
                    this.state.loginStatus === true &&
                        toast('You have sucessfully logged out of MetaMask', {type: 'warning', autoClose: 3000 });
                    this.setState({loginStatus: false});
                }
            });
            
        } else {
            this.props.onIxoInit(this.state.selectedServer);
        }
    }

    componentDidMount() {
        
        const cachedServer = localStorage.getItem('server');
        if (cachedServer) {
            this.setState({selectedServer: cachedServer});
            this.props.onIxoInit(cachedServer);
        } else {
            this.props.onIxoInit(this.state.selectedServer);
        }
        
        setInterval(this.ping, 5000);
    }

    componentDidUpdate(prevProps: Props) {

        if (prevProps.ixo !== this.props.ixo) {
            this.ping();
        }

        if (prevProps.pingResult !== this.props.pingResult) {
            if (this.props.pingResult === 'pong') {
                const responseTime = Math.abs(new Date().getTime() - this.state.initialDate.getTime());
                this.setState({
                    isServerConnected: 1,
                    responseTime
                });

            } else {
                this.setState({ isServerConnected: 0 });
            }
        }
    }

    renderStatusIndicator() {
        return (
            <Ping>
                <ServerLabel className="d-none d-sm-block">Server Status:</ServerLabel>
                {this.renderLightIndicator()}
                <div className="d-none d-sm-block">
                    {this.renderStatusMessage()}
                </div>
            </Ping>
        );
    }

    renderStatusMessage() {
        if (this.state.isServerConnected === 1) {
            return (
                <StatusMessage>
                    <p>Response time: {this.state.responseTime} ms</p>
                    <p>{this.state.selectedServer}</p>
                </StatusMessage>);
        } else if (this.props.pingError === null) {
            return (
                <StatusMessage>
                    <p>Waiting for server...</p>
                </StatusMessage>);
        } else {
            return (
                <StatusMessage>
                    <p>{this.state.selectedServer} <br/>not responding</p>
                </StatusMessage>);
        }
    }

    renderLightIndicator() {
        if (this.state.isServerConnected === 1) {
            return <LightReady />;
        } else if (this.props.pingError === null) {
            return <LightLoading />;
        } else {
            return <Light />;
        }
    }

    handleServerChange = (event) => {

        if (this.state.selectedServer !== event.target.value) {
            localStorage.setItem('server', event.target.value);
            this.setState({
                selectedServer: event.target.value,
                isServerConnected: 0
            });
            this.props.onServerChange();
            this.props.onIxoInit(event.target.value);    
        }
    }

    render() {
        return (
            <TopBar className="container-fluid text-white">
                <div className="row">
                    <div className="col-4 d-flex align-items-center">
                        <Link to="/"><img src={logoSrc} alt="IXO Logo" /></Link>
                    </div>
                    <div className="col-8 d-flex align-items-center justify-content-end">
                        <select value={this.state.selectedServer} onChange={this.handleServerChange}>
                            <option value="https://ixo-node.herokuapp.com">Production
                                Server
                                </option>
                            <option value="http://localhost:5000">Development Server</option>
                        </select>
                        {this.renderStatusIndicator()}
                    </div>
                </div>

            </TopBar>
        );
    }
}

function mapStateToProps(state: PublicSiteStoreState): StateProps {
    return {
        pingResult: state.pingStore.pingResult,
        pingError: state.pingStore.pingError,
        ixo: state.ixoStore.ixo
    };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        getPing: (ixo) => {
            dispatch(pingIxoServer(ixo));
        },
        onIxoInit: (hostname: string) => {
            dispatch(initIxo(hostname));
        },
        onServerChange: () => {
            dispatch(resetPing());
            dispatch(resetIxo());
        }
    };
}

export const HeaderConnected = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header) as any);