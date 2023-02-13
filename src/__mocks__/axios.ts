const axios = {
  get: jest.fn(() => Promise.resolve({ data: 'mockdata' })),
  post: jest.fn(() => Promise.resolve({ data: 'mockdata' })),
  all: jest.fn(() => Promise.resolve({ data: [] })),
  spread: jest.fn(() => [{ dsfsdf: '1' }]),
}

export default axios
