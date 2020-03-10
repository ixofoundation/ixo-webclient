export default jest.fn().mockImplementation(() => {
  return {
    signBuyTx: jest.fn(() =>
      Promise.resolve({
        raw_log: '{"someprop":"1","anotherprops":"2"}',
      }),
    ),
    signSellTx: jest.fn(() =>
      Promise.resolve({
        logs: [{ someprop: 'somevalue', success: true }],
      }),
    ),
    signSwapTx: jest.fn(() =>
      Promise.resolve({
        logs: [{ someprop: 'somevalue', success: true }],
      }),
    ),
  }
})
