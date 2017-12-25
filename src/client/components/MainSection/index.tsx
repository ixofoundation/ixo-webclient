import * as React from 'react';
import * as style from './style.css';
import {Footer} from '../Footer/index';
import {HomePage} from '../HomePage/index';
import {connect} from "react-redux";
import {IPublicSiteStoreState} from "../../redux/public_site_reducer";
import {initializeWeb3} from "../../redux/web3/web3_action_creators";

export namespace MainSection {
    interface Props {
    }

    export interface State {
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
    }

    componentDidMount(): void {
        this.props.onWeb3Init();
    }

    renderFooter() {
        return (
            <Footer/>
        );
    }

    render() {
        return (
            <section className={style.main}>
                <ul className={style.normal}>
                    <HomePage/>
                </ul>
                {this.renderFooter()}
            </section>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        onWeb3Init: () => {
            dispatch(initializeWeb3());
        }
    };
}