import * as React from 'react';
import * as style from './style.css';
import {Footer} from '../Footer/index';
import {HomePage} from '../HomePage/index';

declare const Web3;

export namespace MainSection {
  export interface Props {
  }

  export interface State {
  }
}

export class MainSection extends React.Component<MainSection.Props, MainSection.State> {

  constructor(props?: MainSection.Props, context?: any) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    var loadjs = require('loadjs');
    loadjs('https://cdn.rawgit.com/ethereum/web3.js/develop/dist/web3.min.js', 'web3');

    loadjs.ready('web3', {
      success: function () {
        window.addEventListener('load', function (dispatch) {
          var web3 = window['web3'];
          // Checking if Web3 has been injected by the browser (Mist/MetaMask)
          if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider.
            new Web3(web3.currentProvider);
            console.log('Injected web3 detected.');
          } else {
            // Fallback to localhost if no web3 injection. We've configured this to
            // use the development console's port by default.
            var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
            new Web3(provider);
            console.log('No web3 instance injected, using Local web3.');
          }
        });
      },
      error  : function (depsNotFound) {
        console.error(depsNotFound);
      }
    });
  }

  renderFooter() {
    return (
      <Footer/>
    );
  }

  render() {
    return (
      <section className={style.main}>
        <ul className={style.normal}>
          <HomePage/>
        </ul>
        {this.renderFooter()}
      </section>
    );
  }
}
