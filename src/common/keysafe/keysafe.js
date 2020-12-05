/* This is a client for the IXO Wallet App, using the WalletConnect protocol. It
 * is designed to be API-compatible with the legacy IXO KeySafe client, to
 * prevent changes in the application logic. The API could've been designed
 * differently if there was no such goal. */

import {callbackify} from 'util'
import {v4 as uuid} from 'uuid'
import {get} from 'lodash'
import WalletConnect from '@walletconnect/client'
import WalletConnectQRModal from '@walletconnect/qrcode-modal'


const defaultConnectionOpts = {
  bridge: process.env.REACT_APP_WALLETCONNECT_BRIDGE,
  qrcodeModal: WalletConnectQRModal,
}

const log = (...args) => console.log('walletconnect:', ...args)

let wc
let account

const init = (...connectionOpts) => {
  wc = new WalletConnect({...defaultConnectionOpts, ...connectionOpts})

  log('init', wc.session)

  ;['connect', 'session_update', 'disconnect']
    .forEach(eventName =>
      wc.on(eventName, handleWCEvent))

  if (wc.connected)
    account = wc.accounts[0]
  else
    wc.createSession()
}

const handleWCEvent = (err, payload) => {
  log(payload || err)
  if (err) throw err
  account = get(payload, 'params.0.accounts.0')
}

const wcSession = JSON.parse(localStorage.getItem('walletconnect'))

if (wcSession)
  init({session: wcSession})


export default {
  popupKeysafe: init,

  disconnect: () => wc.killSession(),

  getInfo: cb => cb(null, account),

  getDidDoc: cb => cb(null, account.didDoc),

  requestSigning: (data, cb, enc='hex') =>
    // callbackifying for compatibility with the legacy KeySafe API:
    callbackify(wc.sendCustomRequest.bind(wc))({
      id: uuid(),
      jsonrpc: '2.0',
      method: 'ixo_signTransaction',
      params: [{data, enc}],
    }, cb),
}
