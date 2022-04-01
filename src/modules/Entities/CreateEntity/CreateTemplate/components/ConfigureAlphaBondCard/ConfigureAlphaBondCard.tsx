import { ObjectFieldConfigureAlphaBondColumn } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import React, { FunctionComponent } from 'react'
import { customControls } from 'common/components/JsonForm/types'

// eslint-disable-next-line react/display-name
const ExistingEntityCard: FunctionComponent = () => {
  const formData = {
    alphaBond: true, //  default
    functionType: 'augmented_function', //  default
    sanityRate: 0, //  default
    sanityMarginPercentage: 0, //  default
    batchBlocks: '1', //  default

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
    initialSupply: 1, //  validate integer     //  d0   //  will be multiplied a million
    baseCurveShape: 4.5, //  validate fraction   //  kappa
    orderQuantityLimits: 100000, //  condition show => allowSells?
    allowSells: true,
    allowReserveWithdrawals: false,
    outcomePayment: 68100, //  multiplied by a million
  }

  const schema = {
    type: 'object',
    required: [],
    properties: {
      baseBondingCurve: {
        type: 'string',
        title: 'Base Bonding Curve',
      },
      token: {
        type: 'string',
        title: 'Bond Token',
      },
      name: {
        type: 'string',
        title: 'Bond Title',
      },
      controllerDid: {
        type: 'string',
        title: 'Bond Controller',
      },
      reserveToken: {
        type: 'string',
        title: 'Reserve Token',
      },
      txFeePercentage: {
        type: 'string',
        title: 'Transaction Fee',
      },
      exitFeePercentage: {
        type: 'string',
        title: 'Settlement Fee',
      },
      feeAddress: {
        type: 'string',
        title: 'Fee Payment Address',
      },
      reserveWithdrawalAddress: {
        type: 'string',
        title: 'Reserve Withdrawal Account',
      },
      maxSupply: {
        type: 'string',
        title: 'Maximum Token Supply',
      },
      initialPrice: {
        type: 'string',
        title: 'Initial Token Price',
      },
      initialFundingPool: {
        type: 'string',
        title: 'Initial Funding Allocated',
      },
      initialSupply: {
        type: 'string',
        title: 'Initial Token Supply',
      },
      baseCurveShape: {
        type: 'string',
        title: 'Base Curve Shape',
      },
      orderQuantityLimits: {
        type: 'string',
        title: 'Order Quantity Limits',
      },
      allowSells: {
        type: 'string',
        title: 'Allow Sells',
      },
      allowReserveWithdrawals: {
        type: 'string',
        title: 'Allow Reserve Withdrawals',
      },
      outcomePayment: {
        type: 'string',
        title: 'Outcome Payment',
      },
    },
  }

  const uiSchema = {
    baseBondingCurve: {
      'ui:widget': customControls['basebondingcurve'],
    },
    token: {
      'ui:widget': 'text',
      'ui:placeholder': 'Type a DENOM',
    },
    name: {
      'ui:widget': 'text',
      'ui:placeholder': 'Type a Name',
    },
    controllerDid: {
      'ui:widget': 'text',
      'ui:placeholder': 'Paste a valid DID',
    },
    reserveToken: {
      'ui:widget': 'text',
      'ui:placeholder': 'Select a Token',
    },
    txFeePercentage: {
      'ui:widget': 'text',
      'ui:placeholder': 'Percentage',
    },
    exitFeePercentage: {
      'ui:widget': 'text',
      'ui:placeholder': 'Percentage',
    },
    feeAddress: {
      'ui:widget': 'text',
      'ui:placeholder': 'Paste a valid Account Address',
    },
    reserveWithdrawalAddress: {
      'ui:widget': 'text',
      'ui:placeholder': 'Paste a valid Account Address',
    },
    maxSupply: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount',
    },
    initialPrice: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount/Token',
    },
    initialFundingPool: {
      'ui:widget': 'text',
      'ui:placeholder': 'Percentage',
    },
    initialSupply: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount',
    },
    baseCurveShape: {
      'ui:widget': 'text',
      'ui:placeholder': 'K-Value',
    },
    orderQuantityLimits: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount',
    },
    allowSells: {
      'ui:widget': 'text',
      'ui:placeholder': '',
    },
    allowReserveWithdrawals: {
      'ui:widget': 'text',
      'ui:placeholder': '',
    },
    outcomePayment: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount',
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
      customObjectFieldTemplate={ObjectFieldConfigureAlphaBondColumn}
    >
      &nbsp;
    </MultiControlForm>
  )
}

export default ExistingEntityCard
