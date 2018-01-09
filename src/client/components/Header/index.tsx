import * as React from 'react';
import {findDOMNode} from 'react-dom'
import * as style from './style.css';
const logoSrc = require("../../assets/images/logo.png");

import * as ReactTooltip from 'react-tooltip';

export namespace Header {
    export interface Props {
    }

    export interface State {
    }
}

export class Header extends React.Component<Header.Props, Header.State> {

    constructor(props?: Header.Props, context?: any) {
        super(props, context);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(text: string) {
        if (text.length) {
        }
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
