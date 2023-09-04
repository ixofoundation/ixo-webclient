import thunkMiddleware from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import promiseMiddleware from 'redux-promise-middleware'

export default configureMockStore([thunkMiddleware, promiseMiddleware])
