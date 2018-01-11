import * as React from 'react';
import * as style from './style.css';
// import * as ReactTooltip from 'react-tooltip';
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
    pingError?: IPingResult
  }

  export interface State {
    isServerConnected: boolean
    initialDate: Date,
    responseTime: number
  }

  export interface Callbacks {
    getPing?: () => void;
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
      responseTime: null
    }
  }

  ping = () => {
    this.setState({initialDate : new Date()});
    this.props.getPing();
  }

  componentDidMount() {
    this.ping();
    console.log(process.env.API_URL);
    setInterval(this.ping,5000);
  }

  componentDidUpdate(prevProps: Header.IProps) {
    if (prevProps.pingResult !== this.props.pingResult) {
      console.log("has changed");
      if(this.props.pingResult === null){
        this.setState({isServerConnected: false})
      }
      else if (this.props.pingResult.result === 'pong') {
        const responseTime = Math.abs(new Date().getTime() - this.state.initialDate.getTime());
        this.setState({isServerConnected: true, responseTime});  
      }
    }
  }

  renderStatusIndicator(){
    if(this.state.isServerConnected && this.props.pingError === null){
      return (
      <p className={style.ping} data-tip={`Response time: ${this.state.responseTime} ms`}>Server Status:
        <span className={style.ready}></span>
      </p>
      );
    }
    else if(this.props.pingError === null){
      return (
      <p className={style.ping} data-tip="Waiting for server...">Server Status:
        <span className={style.loading}></span>
      </p>
      );
    }
    else{
      return (
      <p className={style.ping} data-tip="Server not responding">Server Status:
        <span className={style.error}></span>
      </p>
      );
    }
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
              {this.renderStatusIndicator()}
              {/* <ReactTooltip/> */}
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
    pingError: state.pingStore.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPing: () => {
      // dispatch(pingIxoServer('https://arcane-stream-64697.herokuapp.com/api/network'))
      dispatch(pingIxoServer('http://localhost:5000/api/network'))
      // dispatch(pingIxoServer('process.env.API_URL))
    }
  };
}
