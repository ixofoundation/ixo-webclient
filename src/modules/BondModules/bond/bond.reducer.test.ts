import * as SUT from './bond.reducer'
import { BondActions, GetBondDetailSuccessAction } from './types'

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
      const balances = {
        bondDid: 'someBondDid',
        symbol: 'sometoken',
        reserveDenom: 'someDenom',
        name: 'somename',
        address: 'someaddress',
        type: 'somefunctiontype',
        collateral: { denom: 'a', amount: '1' },
        myStake: { denom: '', amount: '0' },
        capital: { denom: '', amount: '0' },
        maxSupply: { denom: '', amount: '0' },
        initialSupply: 0,
        state: 'HATCH',
        totalSupply: { denom: 'a', amount: '100' },
        lastPrice: 0,
        reserve: { denom: 'a', amount: '200' },
        allowSells: false,
        alphaDate: new Date('2000/01/01'),
        transactions: [],
        priceHistory: [],
        initialPrice: 0,
        initialRaised: 0,
        publicAlpha: 0,
        systemAlpha: 0,
        allowReserveWithdrawals: false,
        Outcomes: {
          Rewards: [],
          Targets: [],
        },
        withdrawHistory: [],
        alphaHistory: [],
      }

      // ... we create a getBalances action
      const action: GetBondDetailSuccessAction = {
        type: BondActions.GetBondDetailSuccess,
        payload: {
          bondDid: 'someBondDid',
          symbol: 'sometoken',
          reserveDenom: 'someDenom',
          name: 'somename',
          address: 'someaddress',
          type: 'somefunctiontype',
          collateral: { denom: 'a', amount: '1' },
          totalSupply: { denom: 'a', amount: '100' },
          reserve: { denom: 'a', amount: '200' },
          systemAlpha: 0,
          publicAlpha: 0,
          alphaDate: new Date('2000/01/01'),
        },
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer({ ...initialState }, action)

      // then the state should be set as expected
      expect(state).toEqual(balances)
    })

    it('should return a new copy of state, with the balances set and trades left untouched when am existing symbol is passed', () => {
      const balances = {
        bondDid: 'someBondDid',
        symbol: 'sometoken',
        reserveDenom: 'someDenom',
        name: 'somename',
        address: 'someaddress',
        type: 'somefunctiontype',
        collateral: { denom: 'a', amount: '1' },
        myStake: { denom: '', amount: '0' },
        capital: { denom: '', amount: '0' },
        maxSupply: { denom: '', amount: '0' },
        initialSupply: 0,
        state: 'HATCH',
        totalSupply: { denom: 'a', amount: '100' },
        lastPrice: 0,
        reserve: { denom: 'a', amount: '200' },
        systemAlpha: 0,
        publicAlpha: 0,
        allowSells: false,
        alphaDate: new Date('2000/01/01'),
        allowReserveWithdrawals: false,
        transactions: [],
        priceHistory: [],
        initialPrice: 0,
        initialRaised: 0,
        Outcomes: {
          Rewards: [],
          Targets: [],
        },
        withdrawHistory: [],
        alphaHistory: [],
      }

      // ... we create a getBalances action
      const action: GetBondDetailSuccessAction = {
        type: BondActions.GetBondDetailSuccess,
        payload: {
          bondDid: 'someBondDid',
          symbol: 'sometoken',
          reserveDenom: 'someDenom',
          name: 'somename',
          address: 'someaddress',
          type: 'somefunctiontype',
          collateral: { denom: 'a', amount: '1' },
          totalSupply: { denom: 'a', amount: '100' },
          reserve: { denom: 'a', amount: '200' },
          systemAlpha: 0,
          publicAlpha: 0,
          alphaDate: new Date('2000/01/01'),
        },
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(
        { ...initialState, symbol: 'sometoken' },
        action,
      )

      // then the state should be set as expected
      expect(state).toEqual(balances)
    })
  })
})
