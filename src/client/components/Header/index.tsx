import * as React from 'react';
import * as style from './style.css';
import * as ReactTooltip from 'react-tooltip';
import {connect} from "react-redux";
import {IPublicSiteStoreState} from "../../redux/public_site_reducer";
import {pingIxoServer} from "../../redux/ping/ping_action_creators";
import {IPingResult} from "../../../../types/models";
import {renderIf} from "../../utils/react_utils";

const logoSrc = require("../../assets/images/logo.png");

export namespace Header {
  export interface Props {
    pingResult?: IPingResult
  }

  export interface State {
    isServerConnected: boolean
  }

  export interface Callbacks {
    onLoad?: () => void;
  }

  export interface IProps extends Props, Callbacks {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Header extends React.Component<Header.IProps, Header.State> {

  constructor(props?: Header.IProps, context?: any) {
    super(props, context);
    this.state = {
      isServerConnected: false
    }
  }

  componentDidMount() {
    this.props.onLoad();
  }

  componentDidUpdate(prevProps: Header.IProps) {

    if (prevProps.pingResult !== this.props.pingResult) {
      if (this.props.pingResult.result === 'pong') {
        this.setState({isServerConnected: true})
      } else {
        this.setState({isServerConnected: false})
      }
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
              <p className={style.ping} data-tip="Response Time">Server Status:
                {
                  renderIf(this.state.isServerConnected, {
                    ifTrue : () => (
                      <span className={style.ready}></span>
                    ),
                    ifFalse: () => (
                      <span className={style.loading}></span>
                    )
                  })
                }
              </p>
              <ReactTooltip/>
            </div>
          </div>
        </div>

      </header>
    );
  }
}

function mapStateToProps(state: IPublicSiteStoreState) {
  return {
    pingResult: state.pingStore.pingResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(pingIxoServer('https://arcane-stream-64697.herokuapp.com/api/network'))
    }
  };
}
