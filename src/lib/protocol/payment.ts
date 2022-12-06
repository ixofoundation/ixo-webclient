import { Coin } from '@cosmjs/proto-signing'
import { cosmos, createQueryClient, ixo, SigningStargateClient } from '@ixo/impactxclient-sdk'
import { DistributionShare } from '@ixo/impactxclient-sdk/types/codegen/ixo/payments/v1/payments'
import {
  QueryPaymentTemplateRequest,
  QueryPaymentTemplateResponse,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/payments/v1/query'
import { fee, generateId, RPC_ENDPOINT } from './common'

export const CreatePaymentTemplate = async (
  client: SigningStargateClient,
  payload: {
    did: string
    address: string
    paymentAmount: Coin
    paymentMinimum: Coin
    paymentMaximum: Coin
  },
) => {
  try {
    const { did, address, paymentAmount, paymentMaximum, paymentMinimum } = payload
    const message = {
      typeUrl: '/ixo.payments.v1.MsgCreatePaymentTemplate',
      value: ixo.payments.v1.MsgCreatePaymentTemplate.fromPartial({
        creatorDid: did,
        creatorAddress: address,
        paymentTemplate: ixo.payments.v1.PaymentTemplate.fromPartial({
          id: `payment:template:${generateId(10)}`,
          paymentAmount: [cosmos.base.v1beta1.Coin.fromPartial(paymentAmount)],
          paymentMinimum: [cosmos.base.v1beta1.Coin.fromPartial(paymentMinimum)],
          paymentMaximum: [cosmos.base.v1beta1.Coin.fromPartial(paymentMaximum)],
          discounts: [
            ixo.payments.v1.Discount.fromPartial({
              id: `payment:contract:${generateId(10)}`,
              percent: '5000000000000000000', // TODO:
            }),
          ],
        }),
      }),
    }
    const response = await client.signAndBroadcast(address, [message], fee)
    console.info('CreatePaymentTemplate', response)
    return response
  } catch (e) {
    console.error('CreatePaymentTemplate', e)
    return undefined
  }
}

export const GetPaymentTemplate = async (
  request: QueryPaymentTemplateRequest,
): Promise<QueryPaymentTemplateResponse | undefined> => {
  try {
    const client = await createQueryClient(RPC_ENDPOINT!)
    const res: QueryPaymentTemplateResponse = await client.ixo.payments.v1.paymentTemplate(request)
    return res
  } catch (e) {
    console.error('GetPaymentTemplate', e)
    return undefined
  }
}

/**
 * Distribution shares must add up to 100, and inputs is to power 18
 */
export const CreatePaymentContract = async (
  client: SigningStargateClient,
  payload: { did: string; address: string; recipients: DistributionShare[] },
) => {
  try {
    const { address, did, recipients } = payload
    const message = {
      typeUrl: '/ixo.payments.v1.MsgCreatePaymentContract',
      value: ixo.payments.v1.MsgCreatePaymentContract.fromPartial({
        creatorDid: did,
        paymentTemplateId: `payment:template:${generateId(10)}`,
        paymentContractId: `payment:contract:${generateId(10)}`,
        payer: address,
        recipients: recipients.map((item) =>
          ixo.payments.v1.DistributionShare.fromPartial({
            address: item.address,
            percentage: item.percentage, // TODO:
          }),
        ),
        discountId: '1', // TODO:
        canDeauthorise: true,
        creatorAddress: address,
      }),
    }

    const response = await client.signAndBroadcast(address, [message], fee)
    console.info('CreatePaymentContract', response)
    return response
  } catch (e) {
    console.error('CreatePaymentContract', e)
    return undefined
  }
}
