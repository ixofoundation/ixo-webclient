import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import configureStore from './common/redux/store'
import { AppConnected } from './modules/App/App'
import * as serviceWorker from './serviceWorker'
import { history } from '../src/common/redux/store'
import 'react-dates/lib/css/_datepicker.css'
const storeAndPersistor = configureStore()

ReactDOM.render(
  <Provider store={storeAndPersistor.store}>
    <PersistGate loading={null} persistor={storeAndPersistor.persistor}>
      <ConnectedRouter history={history}>
        <AppConnected />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
