import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createPublicSiteStore } from './common/redux/store'
import { AppConnected } from './modules/App/App'

const store = createPublicSiteStore() as any

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppConnected />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
