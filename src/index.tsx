import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { createPublicSiteStore } from './redux/store';

const store = createPublicSiteStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			{/* <React.StrictMode> */}
				<App/>
			{/* </React.StrictMode> */}
		</BrowserRouter>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
