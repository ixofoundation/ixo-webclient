import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createPublicSiteStore } from './common/redux/store'
import { AppConnected } from './modules/App/App'
import * as serviceWorker from './serviceWorker'
import { history } from '../src/common/redux/store'
const store = createPublicSiteStore() as any

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppConnected />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
