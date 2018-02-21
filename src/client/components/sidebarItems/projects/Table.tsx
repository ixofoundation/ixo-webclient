import * as React from 'react';
import { connect } from "react-redux";
import { IPublicSiteStoreState } from '../../../redux/public_site_reducer';

export namespace Table {

    export interface Props {
        ixo?: any,
    }
    export interface State {
    }

    export interface IProps extends Props {
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Table extends React.Component<Table.IProps, Table.State> {
    constructor(props?: Table.IProps, context?: any) {
        super(props, context);
        this.state = {
        }
    }


    render() {
        return (<div>

        </div>);

    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo: state.ixoStore.ixo,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}