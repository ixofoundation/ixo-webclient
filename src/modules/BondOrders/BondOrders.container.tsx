import React, { Dispatch } from 'react';
import 'react-virtualized/styles.css';
import { connect } from 'react-redux';
import { RootState } from '../../common/redux/types';
import { getTransactions } from '../bond/bond.actions';
import TransactionsTable from '../../common/components/Bonds/TransactionsTable/TransactionsTable';

interface Props {
  handleGetOrders: () => void
  orders: any[]
  tokenSymbol: string
}

class BondOrders extends React.Component<Props> {
  componentDidMount(): void {
    this.props.handleGetOrders();
  }

  render(): JSX.Element {
    return (
      <TransactionsTable
        txs={this.props.orders}
        selectedToken={this.props.tokenSymbol}
      />
    );
  }
}

const mapStateToProps = (state: RootState): any => ({
  orders: state.activeBond.trades,
  tokenSymbol: state.activeBond.symbol,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetOrders: (): void => dispatch(getTransactions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BondOrders);
