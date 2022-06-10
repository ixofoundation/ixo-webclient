export default {
  get: jest.fn(() => Promise.resolve({ data: 'mockdata' })),
  post: jest.fn(() => Promise.resolve({ data: 'mockdata' })),
  all: jest.fn(() => Promise.resolve({ data: [] })),
  spread: jest.fn(() => [{ dsfsdf: '1' }]),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
}
