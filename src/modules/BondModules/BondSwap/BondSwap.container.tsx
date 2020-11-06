import React from "react";
import { RootState } from "common/redux/types";
import { connect } from "react-redux";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import EnterSwapOrder from "./components/EnterSwapOrder";
import ConfirmSwapOrder from "./components/ConfirmSwapOrder";
import * as bondSwapSelectors from "./BondSwap.selectors";

interface Props {
  projectDID: string;
  bondDID: string;
  isSending: boolean;
  activeBondType: string;
}

const BondSwap: React.FunctionComponent<Props> = ({
  projectDID,
  bondDID,
  isSending,
  activeBondType,
}) => {
  return (
    <div className="BondsWrapper_panel__chrome">
      <div className="BondsWrapper_panel__content">
        <div className="centerAll">
          <BrowserRouter>
            <Route
              exact
              path={`/projects/${projectDID}/bonds/${bondDID}/exchange/swap`}
              render={(props: any): JSX.Element => {
                if (isSending) {
                  return (
                    <Redirect
                      from={`/projects/${projectDID}/bonds/${bondDID}/exchange/swap`}
                      exact
                      to={`/projects/${projectDID}/bonds/${bondDID}/exchange/swap/confirm`}
                    />
                  );
                } else if (activeBondType !== "swapper_function") {
                  return (
                    <Redirect
                      from={`/projects/${projectDID}/bonds/${bondDID}/exchange/swap`}
                      exact
                      to={`/projects/${projectDID}/bonds/${bondDID}/exchange/`}
                    />
                  );
                } else {
                  return <EnterSwapOrder {...props} />;
                }
              }}
            />
            <Route
              exact
              path={`/projects/${projectDID}/bonds/${bondDID}/exchange/swap/confirm`}
              render={(props: any): JSX.Element => (
                <ConfirmSwapOrder {...props} />
              )}
            />
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): any => ({
  isSending: bondSwapSelectors.selectBondSwapIsSending(state),
  activeBondType: state.activeBond.type,
});

export default connect(mapStateToProps)(BondSwap);
