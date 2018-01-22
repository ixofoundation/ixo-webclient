import * as React              from 'react';
import * as ReactDOM           from 'react-dom';
import {Provider}              from 'react-redux';
import {App}                   from './containers/App';
import {createPublicSiteStore} from "./redux/store";
import {BrowserRouter}         from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createPublicSiteStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
