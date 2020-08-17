export class Ixo {
  project

  constructor() {
    this.project = {
      createPublic: jest.fn(() => Promise.resolve({ result: 'somePublicDid' })),
    }
  }
}
