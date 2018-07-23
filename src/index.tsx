import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { createPublicSiteStore } from './redux/store';
import { AppConnected } from './App';

const store = createPublicSiteStore();

ReactDOM.render(
	<Provider store={store}>
		<Router>
			{/* <React.StrictMode> */}
				<AppConnected/>
			{/* </React.StrictMode> */}
		</Router>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
