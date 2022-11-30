const keysafe = {
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

export default keysafe
