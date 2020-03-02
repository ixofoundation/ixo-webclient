import * as cosmosjs from '@cosmostation/cosmosjs'
const lcdUrl = process.env.REACT_APP_BLOCKCHAIN_NODE_URL
const cosmos = cosmosjs.network(lcdUrl, process.env.REACT_APP_CHAIN_ID)

const mnemonic =
  'soup until delay roof virus daring gasp box option ahead april mansion discover blast top pattern enroll wall glory impose final rate fan quantum'

export default class KeystationService {
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
                  amount: quote.receiving.amount,
                  denom: quote.receiving.denom,
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
                to_token: quote.receiving.denom,
              },
            },
          ],
          chain_id: process.env.REACT_APP_CHAIN_ID,
          fee: { amount: quote.txFees, gas: String(200000) },
          memo: '',
          account_number: String(data.result.value.account_number),
          sequence: String(data.result.value.sequence),
        })

        const ecpairPriv = cosmos.getECPairPriv(mnemonic)
        const signedTx = cosmos.sign(stdSignMsg, ecpairPriv)
        cosmos.broadcast(signedTx).then(response => resolve(response))
      })
    })
}
