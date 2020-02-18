import Keystation from './Keystation'

const cosmosjs = require('@cosmostation/cosmosjs')
const lcdUrl = process.env.REACT_APP_BLOCKCHAIN_NODE_URL
const cosmos = cosmosjs.network(lcdUrl, process.env.REACT_APP_CHAIN_ID)

const keystation = new Keystation()
keystation.client = process.env.REACT_APP_BLOCKCHAIN_NODE_URL
keystation.lcd = 'https://lcd-cosmos-free.cosmostation.io/'
keystation.path = '44/118/0/0/0'

const mnemonic =
  'soup until delay roof virus daring gasp box option ahead april mansion discover blast top pattern enroll wall glory impose final rate fan quantum'

export default class KeystationService {
  activate = () =>
    new Promise(function(resolve, reject) {
      const prefix = 'cosmos' // Cosmos prefix: cosmos, Iris prefix: iaa
      const popup = keystation.openWindow('signin', prefix)
      window.addEventListener(
        'message',
        function(e) {
          window.removeEventListener('message', this)
          if (e.origin != 'https://keystation.cosmostation.io') return
          if (e.error) {
            reject(e.error)
          } else {
            resolve(e.data)
          }
        },
        false,
      )
    })

  signBuyTx = (quote, tx, address) =>
    new Promise(function(resolve, reject) {
      cosmos.getAccounts(address).then(data => {
        const stdSignMsg = cosmos.newStdMsg({
          msgs: [
            {
              type: 'cosmos-sdk/MsgBuy',
              value: {
                buyer: address,
                amount: {
                  amount: quote.recieving.amount,
                  denom: quote.recieving.denom,
                },
                max_prices: quote.maxPrices,
              },
            },
          ],
          chain_id: process.env.REACT_APP_CHAIN_ID,
          fee: { amount: quote.txFees, gas: String(200000) },
          memo: '',
          account_number: String(data.result.value.account_number),
          sequence: String(data.result.value.sequence),
        })

        // console.log(stdSignMsg, data)

        // var popup = keystation.openWindow("transaction", JSON.stringify(stdSignMsg.json), '');
        // window.addEventListener("message", function (e) {
        //     console.log("event:", e)

        //     window.removeEventListener("message", this)
        //     if (e.origin != "https://keystation.cosmostation.io") return;
        //     if (e.error) {
        //         reject(e.error)
        //     } else {
        //         cosmos.broadcast(e.data).then(response => resolve(response));
        //     }
        // }, false);

        const ecpairPriv = cosmos.getECPairPriv(mnemonic)
        const signedTx = cosmos.sign(stdSignMsg, ecpairPriv)
        cosmos.broadcast(signedTx).then(response => resolve(response))
      })
    })

  signSellTx = (quote, tx, address) =>
    new Promise(function(resolve, reject) {
      cosmos.getAccounts(address).then(data => {
        const stdSignMsg = cosmos.newStdMsg({
          msgs: [
            {
              type: 'cosmos-sdk/MsgSell',
              value: {
                seller: address,
                amount: {
                  amount: quote.sending.amount,
                  denom: quote.sending.denom,
                },
              },
            },
          ],
          chain_id: process.env.REACT_APP_CHAIN_ID,
          fee: { amount: quote.txFees, gas: String(200000) },
          memo: '',
          account_number: String(data.result.value.account_number),
          sequence: String(data.result.value.sequence),
        })

        // var popup = keystation.openWindow("transaction", JSON.stringify(stdSignMsg.json), '');
        // window.addEventListener("message", function (e) {
        //     console.log("event:", e)

        //     window.removeEventListener("message", this)
        //     if (e.origin != "https://keystation.cosmostation.io") return;
        //     if (e.error) {
        //         reject(e.error)
        //     } else {
        //         cosmos.broadcast(e.data).then(response => resolve(response));
        //     }
        // }, false);

        const ecpairPriv = cosmos.getECPairPriv(mnemonic)
        const signedTx = cosmos.sign(stdSignMsg, ecpairPriv)
        cosmos.broadcast(signedTx).then(response => resolve(response))
      })
    })

  signSwapTx = (quote, tx, address) =>
    new Promise(function(resolve, reject) {
      cosmos.getAccounts(address).then(data => {
        const stdSignMsg = cosmos.newStdMsg({
          msgs: [
            {
              type: 'cosmos-sdk/MsgSwap',
              value: {
                swapper: address,
                bond_token: quote.bondToken,
                from: quote.sending,
                to_token: quote.recieving.denom,
              },
            },
          ],
          chain_id: process.env.REACT_APP_CHAIN_ID,
          fee: { amount: quote.txFees, gas: String(200000) },
          memo: '',
          account_number: String(data.result.value.account_number),
          sequence: String(data.result.value.sequence),
        })

        // console.log(stdSignMsg, data)

        // var popup = keystation.openWindow("transaction", JSON.stringify(stdSignMsg.json), '');
        // window.addEventListener("message", function (e) {
        //     console.log("event:", e)

        //     window.removeEventListener("message", this)
        //     if (e.origin != "https://keystation.cosmostation.io") return;
        //     if (e.error) {
        //         reject(e.error)
        //     } else {
        //         cosmos.broadcast(e.data).then(response => resolve(response));
        //     }
        // }, false);

        const ecpairPriv = cosmos.getECPairPriv(mnemonic)
        const signedTx = cosmos.sign(stdSignMsg, ecpairPriv)
        cosmos.broadcast(signedTx).then(response => resolve(response))
      })
    })
}

// let tx = response.data.value;
// tx.msg.fromAddress = state.address;
// // tx.msg.toAddress = state.activeBond.address;
// // tx.msgs = [tx.msg]
// // tx.fee.amount = state.activeQuote.totalFees;
// // tx.fee.gas = state.activeQuote.totalFees;
// let stdSignMsg = {
//     json: {
//         msgs:
//             tx.msg
//         ,
//         chain_id: process.env.REACT_APP_CHAIN_ID,
//         fee: { amount: state.activeQuote.totalFees, gas: String(200000) }, //TODO: slider
//         memo: "Buying " + currencyStr(state.activeQuote.recieving) + " for " + state.account,
//         sequence: 27
//     }
// };

// const address = cosmos.getAddress(state.address);
// const ecpairPriv = cosmos.getECPairPriv(address);

// let signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
// let signed = signedTx.tx;
// signed.msgs = signed.msg;

// console.log(signed);
