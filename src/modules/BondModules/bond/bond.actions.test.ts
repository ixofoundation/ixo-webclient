import mockAxios from "axios";
import mockStore from "../../../common/redux/mockStore";
import * as SUT from "./bond.actions";
import { BondActions } from "./types";
jest.mock("axios");

let store;

beforeEach(() => {
  store = mockStore({});
});

describe("Bond Actions", () => {
  describe("getBalances", () => {
    it("should return a data array on success", async () => {
      const alphaDate = new Date();

      const balances = {
        symbol: "sometoken",
        name: "somename",
        address: "someaddress",
        function_type: "somefunctiontype",
        current_supply: { denom: "a", amount: 1 },
        totalSupply: { denom: "a", amount: 100 },
        price: { denom: "a", amount: 200 },
        alpha: 0,
        alphaDate,
      };

      mockAxios.spread.mockReturnValue(() => {
        return {
          symbol: "sometoken",
          name: "somename",
          address: "someaddress",
          function_type: "somefunctiontype",
          current_supply: { denom: "a", amount: 1 },
          totalSupply: { denom: "a", amount: 100 },
          price: { denom: "a", amount: 200 },
          alpha: 0,
          alphaDate,
        };
      });

      // when ... we call the getBalances action creator with an address
      await store.dispatch(SUT.getBalances("some-symbol"));
      const actions = store.getActions();

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(4);
      expect(actions[0].type).toEqual(BondActions.ClearBond);
      expect(actions[1].type).toEqual(BondActions.GetBalancesPending);
      expect(actions[2].type).toEqual(BondActions.GetBalancesSuccess);
      expect(actions[2].payload).toEqual(balances);
    });

    it("should return an error on failure", async () => {
      const error = "some-error";
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          error,
        })
      );

      try {
        // when ... we call the getBalances action creator with an address
        await store.dispatch(SUT.getBalances("some-symbol"));
      } catch {
        const actions = store.getActions();

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(4);
        expect(actions[0].type).toEqual(BondActions.ClearBond);
        expect(actions[1].type).toEqual(BondActions.GetBalancesPending);
        expect(actions[2].type).toEqual(BondActions.GetBalancesFailure);
        expect(actions[2].payload.error).toEqual(error);
      }
    });
  });

  describe("getTransactions", () => {
    it("should return a data array on success", async () => {
      const trades = [{ someprop: "someval1" }, { someprop: "someval2" }];

      mockAxios.spread.mockReturnValue(() => {
        return { trades: [{ someprop: "someval1" }, { someprop: "someval2" }] };
      });

      // when ... we call the getTransactions action creator with an address
      await store.dispatch(SUT.getTransactions());
      const actions = store.getActions();

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3);
      expect(actions[0].type).toEqual(BondActions.GetTradesPending);
      expect(actions[1].type).toEqual(BondActions.GetTradesSuccess);
      expect(actions[1].payload.trades).toEqual(trades);
    });

    it("should return an error on failure", async () => {
      const error = "some-error";
      mockAxios.all.mockImplementationOnce(() =>
        Promise.reject({
          error,
        })
      );

      // when ... we call the getTransactions action creator with an address

      try {
        await store.dispatch(SUT.getTransactions());
      } catch {
        const actions = store.getActions();

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3);
        expect(actions[0].type).toEqual(BondActions.GetTradesPending);
        expect(actions[1].type).toEqual(BondActions.GetTradesFailure);
        expect(actions[1].payload.error).toEqual(error);
      }
    });
  });
});
