/* This is a client for the IXO Wallet App, using the WalletConnect protocol. It
 * is designed to be near API-compatible with the legacy IXO KeySafe browser
 * extension, to prevent major changes in the application logic. Otherwise this
 * has nothing to do with KeySafe. */

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

  requestSigning: async (
    data, // must be serialized i.e. a string
    walletType, // "secp" or "agent"
    cb,  // standard callback
  ) => {
    try {
        const response = await wc.sendCustomRequest({
            id: uuid(),
            jsonrpc: '2.0',
            method: 'ixo_signTransaction',
            params: [{data, walletType}],
        })

        log ('response:', response)

        cb(null, response)

    } catch (e) {
        log('error:', e)
        cb(e)
    }
  },
}
