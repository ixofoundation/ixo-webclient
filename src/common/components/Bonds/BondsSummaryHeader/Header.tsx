import React, { Component } from "react";
import HeaderItem from "./SummaryCard/SummaryCard";
import { connect } from "react-redux";
import { RootState } from "../../../redux/types";
import { getAccount } from "../../../../modules/Account/Account.actions";
import { getBalances as getBondBalances } from "../../../../modules/bond/bond.actions";
import { tokenBalance } from "../../../../modules/Account/Account.utils";
import { deviceWidth } from "../../../../lib/commonData";

import styled from "styled-components";

const StyledHeader = styled.header`
  margin: 1.25rem 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  @media (min-width: ${deviceWidth.desktopLarge}px) {
    justify-content: flex-start;
  }
`;

const INTERVAL_LENGTH = 6000;

interface HeaderState {
  selected: number;
}

class Header extends Component<any, HeaderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: 0,
    };
    setInterval(() => {
      this.refreshAccount();
    }, INTERVAL_LENGTH);

    this.refreshAccount();
  }

  refreshAccount = (): void => {
    if (this.props.account.userInfo) {
      this.props.dispatch(getAccount(this.props.account.address));
      this.props.dispatch(getBondBalances(this.props.bondDID));
    }
  };

  setActiveHeaderItem = (order: number): void => {
    console.log("this.state.selected", this.state.selected);
    this.setState({ selected: order });
  };

  render(): JSX.Element {
    const { activeBond } = this.props;
    const balance = tokenBalance(
      this.props.account.balances,
      activeBond.symbol
    );
    const bondCapitalInfo = `${(
      (activeBond.collateral.amount / activeBond.totalSupply.amount || 0) * 100
    ).toFixed(4)}% of Bond cap`;
    const reserveInfo = `${(
      (activeBond.reserve.amount / activeBond.totalSupply.amount || 0) * 100
    ).toFixed(4)}% of Capital raise`;

    return (
      <StyledHeader>
        <HeaderItem
          tokenType={activeBond.price.denom}
          title="Price"
          value={activeBond.price.amount}
          additionalInfo="--"
          priceColor="#39C3E6"
          setActiveHeaderItem={(): void => this.setActiveHeaderItem(0)}
          selected={this.state.selected === 0}
        />
        <HeaderItem
          tokenType={activeBond.symbol}
          title="My Stake"
          value={balance.amount}
          additionalInfo="--"
          priceColor="#6FCF97"
          setActiveHeaderItem={(): void => this.setActiveHeaderItem(1)}
          selected={this.state.selected === 1}
        />
        <HeaderItem
          tokenType={activeBond.totalSupply.denom}
          title="Capital Raised"
          value={activeBond.collateral.amount}
          additionalInfo={bondCapitalInfo}
          priceColor="#39C3E6"
          setActiveHeaderItem={(): void => this.setActiveHeaderItem(2)}
          selected={this.state.selected === 2}
        />
        <HeaderItem
          tokenType={activeBond.reserve.denom}
          title="Reverse Funds"
          value={activeBond.reserve.amount}
          additionalInfo={reserveInfo}
          priceColor="#39C3E6"
          setActiveHeaderItem={(): void => this.setActiveHeaderItem(3)}
          selected={this.state.selected === 3}
        />
        <HeaderItem
          title="Alpha"
          value="--"
          additionalInfo="--"
          setActiveHeaderItem={(): void => this.setActiveHeaderItem(4)}
          selected={this.state.selected === 4}
        />
      </StyledHeader>
    );
  }
}

const mapStateToProps = function (state: RootState): RootState {
  return state;
};

export default connect(mapStateToProps)(Header);
