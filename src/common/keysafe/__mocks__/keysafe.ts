export default {
  getInfo: jest.fn(() => {
    return {
      didDoc: {
        did: 'string',
        pubKey: 'string',
      },
      name: 'test user',
    }
  }),
}
