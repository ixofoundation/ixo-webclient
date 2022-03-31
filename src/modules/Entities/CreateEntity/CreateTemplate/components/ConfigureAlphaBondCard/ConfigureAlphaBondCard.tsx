import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import React, { FunctionComponent } from 'react'

// eslint-disable-next-line react/display-name
const ExistingEntityCard: FunctionComponent = () => {
  const formData = {
    alphaBond: true, //  default
    functionType: 'augmented_function', //  default

    sanityRate: 0, //  default ?
    sanityMarginPercentage: 0, //  default ?
    batchBlocks: '1', //  default ?

    token: 'edutest', //  Validate denom is available. Convert to CAPITALS
    name: 'Chimple Pilot DIB',
    controllerDid: 'did:sov:CYCc2xaJKrp8Yt947Nc6jd', //  Validate DID is on the chain
    reserveToken: 'xusd', //  dropdown (as set in config file)
    txFeePercentage: 10, //  validate percentage
    exitFeePercentage: 0, //  validate percentage
    feeAddress: 'ixo19ugeqzwz4rqrz4zp4q4vgvfchgmqma9akm2k9c',
    reserveWithdrawalAddress: 'ixo19ugeqzwz4rqrz4zp4q4vgvfchgmqma9akm2k9c', //  condition show allowReserveWithdrawals?
    maxSupply: 1000000, //  validate integer
    initialPrice: 1, //  validate integer     //  p0  //  will be multiplied a million
    initialFundingPool: 40, //  validate percentage (<= 100)  can be null   //  theta
    initialRaise: 1, //  validate integer     //  d0   //  will be multiplied a million
    baseCurveShape: 4.5, //  validate fraction   //  kappa
    orderQuantityLimits: 100000, //  condition show => allowSells?
    allowSells: true,
    allowReserveWithdrawals: false,
    outcomePayment: 68100, //  multiplied by a million
  }

  const schema = {
    type: 'object',
    properties: {
      sourceNet: {
        type: 'string',
        title: 'Select a Source Network',
      },
      existingEntityDid: { type: 'string', title: 'Use an Existing Entity' },
    },
  }

  const uiSchema = {
    sourceNet: {
      'ui:placeholder': 'Select Network',
    },
    entityDid: {
      'ui:widget': 'text',
      'ui:placeholder': 'Paste a DID',
    },
  }

  const handleCreateBond = (): void => {
    //  TODO: open a create a bond modal
  }

  const handleUpdateBondInfo = (formData: FormData): void => {
    console.log('handleUpdateBondInfo', formData)
  }

  return (
    <MultiControlForm
      formData={formData}
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={handleCreateBond}
      onFormDataChange={handleUpdateBondInfo}
      customObjectFieldTemplate={ObjectFieldTemplate2Column}
    >
      &nbsp;
    </MultiControlForm>
  )
}

export default ExistingEntityCard
