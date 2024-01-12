import { toBase64 } from '@cosmjs/encoding'
import { Uint8ArrayToJS, base64ToJson, strToArray } from './encoding'
import { createQueryClient } from '@ixo/impactxclient-sdk'

export const queryMultipleContracts = async (queries: any): Promise<any> => {
  try {
    const queryClient = await createQueryClient("https://devnet.ixo.earth/rpc/" as string)

    const msg = {
      aggregate: {
        queries: queries.map(({ address, data }: { address: string; data: any }) => ({
          address,
          data: toBase64(strToArray(JSON.stringify(data))),
        })),
      },
    }

    const multicallRes: any = await queryClient.cosmwasm.wasm.v1.smartContractState({
      address: "ixo19zpp643ax9sf7zxzjswcfy03kqk4hrxjr9yt0u4skyl879vzhvuqgegng0",
      queryData: strToArray(JSON.stringify(msg)),
    })

    if (multicallRes?.data) {
      const resParsed = JSON.parse(Uint8ArrayToJS(multicallRes.data))

      const decoded = resParsed.return_data.map((e: any) => {
        return base64ToJson(e.data)
      })

      return decoded
    }
  } catch (error) {
    console.error('Error, ', JSON.stringify(queries), error)
  }
}
