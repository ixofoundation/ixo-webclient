import { toBase64 } from '@cosmjs/encoding'
import { Uint8ArrayToJS, base64ToJson, strToArray } from './encoding'
import { MULTI_CALL_CONTRACT_ADDRESS } from 'constants/contracts'
import { getQueryClient } from 'lib/queryClient'

export type QueryRequest = {
  address: string
  data: any
}

type BufferItem = {
  queries: QueryRequest[]
  resolve: (value: any) => void
  reject: (reason?: any) => void
}

// can play with these values to find a good balance
const BUFFER_TIME_MS = 150
const MAX_BATCH_SIZE = 100

class QueryBuffer {
  private buffer: BufferItem[] = []
  private timeoutId: NodeJS.Timeout | null = null
  private bufferTime: number
  private readonly maxBatchSize: number

  constructor(bufferTime: number, maxBatchSize: number) {
    this.bufferTime = bufferTime
    this.maxBatchSize = maxBatchSize
  }

  private async sendBatch() {
    if (this.buffer.length === 0) return

    // Make a shallow copy of the buffer and reset the buffer
    const bufferItems = [...this.buffer]
    this.buffer = []
    this.clearTimeout()

    const queries = bufferItems.flatMap((item) => item.queries)
    // console.log('multicall queries length', queries.length)

    try {
      const queryClient = await getQueryClient()
      const msg = {
        aggregate: {
          queries: queries.map(({ address, data }) => ({
            address,
            data: toBase64(strToArray(JSON.stringify(data))),
          })),
        },
      }

      const multicallRes = await queryClient.cosmwasm.wasm.v1.smartContractState({
        address: MULTI_CALL_CONTRACT_ADDRESS,
        queryData: strToArray(JSON.stringify(msg)),
      })

      if (multicallRes?.data) {
        const resParsed = JSON.parse(Uint8ArrayToJS(multicallRes.data))
        const decoded = resParsed.return_data.map((e: any) => base64ToJson(e.data))

        // Distribute responses back to respective calls
        let responseIndex = 0
        for (const bufferItem of bufferItems) {
          const responseChunk = decoded.slice(responseIndex, responseIndex + bufferItem.queries.length)
          bufferItem.resolve(responseChunk)
          responseIndex += bufferItem.queries.length
        }
      }
    } catch (error) {
      bufferItems.forEach((item) => item.reject(error))
    }
  }

  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  public async addToBuffer(queries: QueryRequest[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.buffer.push({ queries, resolve, reject })

      // Immediately send the batch if the number of requests reaches maxBatchSize
      const currentBatchSize = this.buffer.reduce((sum, item) => sum + item.queries.length, 0)
      if (currentBatchSize >= this.maxBatchSize) {
        this.sendBatch()
        return
      }

      if (this.timeoutId === null) {
        this.timeoutId = setTimeout(() => {
          this.sendBatch()
        }, this.bufferTime)
      }
    })
  }
}

export const queryBuffer = new QueryBuffer(BUFFER_TIME_MS, MAX_BATCH_SIZE)

export const queryMultipleContracts = async (queries: QueryRequest[]): Promise<any> => {
  try {
    const response = await queryBuffer.addToBuffer(queries)
    return response
  } catch (error) {
    console.error('Error, ', JSON.stringify(queries), error)
  }
}

export const queryMultipleContractsOld = async (queries: any): Promise<any> => {
  try {
    const queryClient = await getQueryClient()

    const msg = {
      aggregate: {
        queries: queries.map(({ address, data }: { address: string; data: any }) => ({
          address,
          data: toBase64(strToArray(JSON.stringify(data))),
        })),
      },
    }

    const multicallRes: any = await queryClient.cosmwasm.wasm.v1.smartContractState({
      address: MULTI_CALL_CONTRACT_ADDRESS,
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
