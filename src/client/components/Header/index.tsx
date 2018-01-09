import * as React from 'react';
import {findDOMNode} from 'react-dom'
import {AsyncGet} from '../../../lib/redux_utils/async_get';
import * as style from './style.css';
const logoSrc = require("../../assets/images/logo.png");

import * as ReactTooltip from 'react-tooltip';
import {connect} from "react-redux";
import {IPublicSiteStoreState} from "../../redux/public_site_reducer";
import {pingIxoServer} from "../../redux/ping/ping_action_creators";

export namespace Header {
  export interface Props {
  }

  export interface State {
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
    }

    componentDidMount(){
    }

    render() {
        return (
            <header className="container-fluid bg-dark text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 d-flex align-items-center">
                            <img  src={logoSrc} alt="IXO Logo"/>
                        </div>
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4 d-flex align-items-center justify-content-end">
                            <p className={style.ping} data-tip="Response Time">Server Status: <span className={style.loading}></span></p>
                            <ReactTooltip />
                        </div>
                    </div>
                </div>

            </header>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(pingIxoServer())
    }
  };
}
