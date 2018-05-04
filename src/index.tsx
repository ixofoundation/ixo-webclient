import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { createPublicSiteStore } from './redux/store';

const store = createPublicSiteStore();

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App/>
		</HashRouter>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
