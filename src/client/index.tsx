import * as React              from 'react';
import * as ReactDOM           from 'react-dom';
import {Provider}              from 'react-redux';
import {App}                   from './containers/App';
import {createPublicSiteStore} from "./redux/store";
import {HashRouter}         from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createPublicSiteStore();

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
