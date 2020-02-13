import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createPublicSiteStore } from './redux/store'
import { AppConnected } from './App'

const store = createPublicSiteStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppConnected />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
