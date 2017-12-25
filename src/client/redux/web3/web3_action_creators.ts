import {createAction} from "../../../lib/redux_utils/actions";
import {INIT__WEB3__FAILURE, INIT__WEB3__INIT, INIT__WEB3__SUCCESS} from "./web3_actions";

var loadjs = require('loadjs');
declare const Web3;

export function initializeWeb3() {
  return dispatch => {
    dispatch(createAction<INIT__WEB3__INIT>(INIT__WEB3__INIT.type, {}));

    loadjs('https://cdn.rawgit.com/ethereum/web3.js/develop/dist/web3.min.js', 'web3');
    loadjs.ready('web3', {
      success: function () {
        window.addEventListener('load', function () {
          var web3 = window['web3'];
          // Checking if Web3 has been injected by the browser (Mist/MetaMask)
          if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider.
            var web3Instance = new Web3(web3.currentProvider);
            dispatch(createAction<INIT__WEB3__SUCCESS>(INIT__WEB3__SUCCESS.type, {web3Instance: web3Instance}))
          } else {
            // Fallback to localhost if no web3 injection. We've configured this to
            // use the development console's port by default.
            var web3Instance = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'));
            dispatch(createAction<INIT__WEB3__SUCCESS>(INIT__WEB3__SUCCESS.type, {web3Instance: web3Instance}))
          }
        });
      },
      error  : function (depsNotFound) {
        console.error(depsNotFound);
        dispatch(createAction<INIT__WEB3__FAILURE>(INIT__WEB3__FAILURE.type, {error: depsNotFound}))
      }
    });

  }
}



