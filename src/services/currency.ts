import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import Axios from 'axios'

export const ixoUSDRate = async () => {
    return Axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=ixo&vs_currencies=usd`,
      )
        .then((response) => response.data)
        .then((response) => response["ixo"]["usd"])
        .catch(() => 0)
}

export const coinsToUsd = async (coins: Coin[]) => {
    return coins.reduce(async (accPromise, coin) => {
        const acc = await accPromise; // Await the accumulated value
        if (coin.denom === "uixo") {
            const ixoUsd = await ixoUSDRate();
            const ixo = parseFloat(coin.amount) / 1000000;
            return acc + (ixo * ixoUsd);
        }
        return acc + parseFloat(coin.amount);
    }, Promise.resolve(0));
}
