import * as SUT from './bond.reducer'
import {
  BondActions,
  GetBalancesSuccessAction,
  GetTradesSuccessAction,
} from './types'

const initialState = SUT.initialState

describe('Bond Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('GetBalancesSuccess Action', () => {
    it('should return a new copy of state, with the balances set and trades set to a new array when a new symbol is passed', () => {
      const trades = [
        { someprop1: 1, someprop2: 2 },
        { someprop1: 3, someprop: 4 },
      ]

      const balances = {
        bondDid: 'someBondDid',
        symbol: 'sometoken',
        reserveDenom: 'someDenom',
        name: 'somename',
        address: 'someaddress',
        type: 'somefunctiontype',
        collateral: { denom: 'a', amount: 1 },
        totalSupply: { denom: 'a', amount: 100 },
        price: { denom: 'a', amount: 200 },
        reserve: { denom: 'a', amount: 200 },
        alpha: 0,
        alphaDate: new Date('2000/01/01'),
        trades: [],
        transactions: [],
        priceHistory: [],
      }

      // ... we create a getBalances action
      const action: GetBalancesSuccessAction = {
        type: BondActions.GetBalancesSuccess,
        payload: {
          bondDid: 'someBondDid',
          symbol: 'sometoken',
          reserveDenom: 'someDenom',
          name: 'somename',
          address: 'someaddress',
          type: 'somefunctiontype',
          collateral: { denom: 'a', amount: 1 },
          totalSupply: { denom: 'a', amount: 100 },
          price: { denom: 'a', amount: 200 },
          reserve: { denom: 'a', amount: 200 },
          alpha: 0,
          alphaDate: new Date('2000/01/01'),
        },
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer({ ...initialState, trades }, action)

      // then the state should be set as expected
      expect(state).toEqual(balances)
    })

    it('should return a new copy of state, with the balances set and trades left untouched when am existing symbol is passed', () => {
      const trades = [
        { someprop1: 1, someprop2: 2 },
        { someprop1: 3, someprop: 4 },
      ]

      const balances = {
        bondDid: 'someBondDid',
        symbol: 'sometoken',
        reserveDenom: 'someDenom',
        name: 'somename',
        address: 'someaddress',
        type: 'somefunctiontype',
        collateral: { denom: 'a', amount: 1 },
        totalSupply: { denom: 'a', amount: 100 },
        price: { denom: 'a', amount: 200 },
        reserve: { denom: 'a', amount: 200 },
        alpha: 0,
        alphaDate: new Date('2000/01/01'),
        trades: [
          { someprop1: 1, someprop2: 2 },
          { someprop1: 3, someprop: 4 },
        ],
        transactions: [],
        priceHistory: [],
      }

      // ... we create a getBalances action
      const action: GetBalancesSuccessAction = {
        type: BondActions.GetBalancesSuccess,
        payload: {
          bondDid: 'someBondDid',
          symbol: 'sometoken',
          reserveDenom: 'someDenom',
          name: 'somename',
          address: 'someaddress',
          type: 'somefunctiontype',
          collateral: { denom: 'a', amount: 1 },
          totalSupply: { denom: 'a', amount: 100 },
          price: { denom: 'a', amount: 200 },
          reserve: { denom: 'a', amount: 200 },
          alpha: 0,
          alphaDate: new Date('2000/01/01'),
        },
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(
        { ...initialState, trades, symbol: 'sometoken' },
        action,
      )

      // then the state should be set as expected
      expect(state).toEqual(balances)
    })
  })

  describe('GetTransactionsSuccess Action', () => {
    it('should return a new copy of state, with the trades set', () => {
      const trades = [
        { id: 1, prop1: 'value1' },
        { id: 2, prop1: 'value2' },
        { id: 3, prop1: 'value3' },
        { id: 4, prop1: 'value1' },
        { id: 5, prop1: 'value2' },
        { id: 6, prop1: 'value3' },
        { id: 7, prop1: 'value1' },
        { id: 8, prop1: 'value2' },
        { id: 9, prop1: 'value3' },
      ]

      // ... we create a getBalances action
      const action: GetTradesSuccessAction = {
        type: BondActions.GetTradesSuccess,
        payload: {
          trades,
        },
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(state).toEqual({
        ...initialState,
        trades,
      })
    })
  })
})
