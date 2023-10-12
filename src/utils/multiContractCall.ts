import { toBase64 } from '@cosmjs/encoding'
import { Uint8ArrayToJS, base64ToJson, strToArray } from './encoding'
import { createQueryClient } from '@ixo/impactxclient-sdk'
import { RPC_ENDPOINT } from 'lib/protocol'

const contractAddress = 'ixo1rrra808ggl30g27zdmp9ecc00u7le2tn5gunv86p8aa99jrc84qqk8dttm'

export const queryMultipleContracts = async (queries: any): Promise<any> => {
  try {
    const queryClient = await createQueryClient(RPC_ENDPOINT as string)

    const msg = {
      aggregate: {
        queries: queries.map(({ address, data }: { address: string; data: any }) => ({
          address,
          data: toBase64(strToArray(JSON.stringify(data))),
        })),
      },
    }

    const multicallRes: any = await queryClient.cosmwasm.wasm.v1.smartContractState({
      address: contractAddress,
      queryData: strToArray(JSON.stringify(msg)),
    })

    if (multicallRes && multicallRes.data) {
      const resParsed = JSON.parse(Uint8ArrayToJS(multicallRes.data))

      const decoded = resParsed.return_data.map((e: any) => {
        console.log(e)
        return base64ToJson(e.data)
      })

      console.dir(decoded, { depth: null })

      return decoded
    }
  } catch (error) {
    console.error('Error, ', JSON.stringify(queries), error)
  }
}
