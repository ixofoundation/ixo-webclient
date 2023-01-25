import styled from 'styled-components'
import { ObjectFieldConfigureAlphaBondColumn } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FunctionComponent, useMemo, useState } from 'react'
import { customControls } from 'components/JsonForm/types'
import { FormCardProps } from 'redux/createEntityOld/createEntity.types'
import { AlphaBondInfo } from '../../../../../../redux/createTemplate/createTemplate.types'
import { useAppSelector } from 'redux/hooks'
import { FormValidation } from '@rjsf/core'
import CreateBondModal from 'components/ControlPanel/Actions/CreateBondModal'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { selectCreatedBondDid } from '../../../../../../redux/createTemplate/createTemplate.selectors'
import { useIxoConfigs } from 'hooks/configs'

const SubmitButton = styled.button`
  background-color: ${(props): string => props.theme.ixoNewBlue};
  border-radius: 8px;
  border: none;
  color: ${(props): string => props.theme.ixoWhite};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  height: 50px;
  padding: 8px 16px;
  text-transform: uppercase;
  cursor: pointer;

  &[disabled] {
    background-color: ${(props): string => props.theme.ixoLightGrey2};
    cursor: not-allowed;
  }
`
interface Props extends FormCardProps {
  formData: AlphaBondInfo | undefined
}

const ConfigureAlphaBondCard: FunctionComponent<Props> = ({ formData, handleUpdateContent, handleError }) => {
  const { getAssetPairs } = useIxoConfigs()
  const [createBondModalOpen, setCreateBondModalOpen] = useState(false)
  const currencies: any[] = getAssetPairs()
  const bondCreated = !!useAppSelector(selectCreatedBondDid)

  const canCreate = useMemo(
    () =>
      formData?.name &&
      formData?.token &&
      formData?.controllerDid &&
      formData?.reserveToken &&
      formData?.feeAddress &&
      formData?.reserveWithdrawalAddress &&
      formData?.maxSupply > 0 &&
      formData?.initialPrice > 0 &&
      formData?.initialSupply > 0 &&
      formData?.outcomePayment > 0 &&
      formData?.targetRaise > 0 &&
      formData?.minimumYield > 0 &&
      formData?.period > 0,
    [formData],
  )

  const schema = {
    type: 'object',
    required: [
      'token',
      'name',
      'controllerDid',
      'reserveToken',
      'txFeePercentage',
      'exitFeePercentage',
      'feeAddress',
      'reserveWithdrawalAddress',
      'maxSupply',
      'initialPrice',
      'initialSupply',
      'allowReserveWithdrawals',
      'outcomePayment',
      'minimumYield',
      'period',
      'targetRaise',
    ],
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
        title: 'Bond Administrator',
      },
      reserveToken: {
        type: 'string',
        title: 'Reserve Token',
        enum: currencies!.map((currency) => currency.display),
        enumNames: currencies!.map((currency) => currency.display?.toUpperCase()),
      },
      txFeePercentage: {
        type: 'number',
        title: 'Transaction Fee',
      },
      exitFeePercentage: {
        type: 'number',
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
        type: 'number',
        title: 'Maximum Token Supply',
      },
      initialPrice: {
        type: 'number',
        title: 'Initial Token Price',
      },
      initialSupply: {
        type: 'number',
        title: 'Initial Token Supply',
      },
      allowReserveWithdrawals: {
        type: 'boolean',
        label: 'Allow Reserve Withdrawals',
        title: ' ',
      },
      outcomePayment: {
        type: 'number',
        title: 'Outcome Payment Amount',
      },
      bondDid: {
        type: 'string',
        title: 'Bond ID',
      },
      minimumYield: {
        type: 'number',
        title: 'Minimum Yield(%)',
      },
      period: {
        type: 'number',
        title: 'Period (Months)',
      },
      targetRaise: {
        type: 'number',
        title: 'Target Amount to Raise',
      },
    },
  }

  const uiSchema = {
    baseBondingCurve: {
      'ui:widget': customControls['basebondingcurve'],
    },
    token: {
      'ui:widget': customControls['affixtext'],
      'ui:placeholder': 'DENOM',
      'ui:readonly': bondCreated,
      'ui:prefix': 'X',
    },
    name: {
      'ui:widget': 'text',
      'ui:placeholder': 'Type a Name',
      'ui:readonly': bondCreated,
    },
    controllerDid: {
      'ui:widget': 'text',
      'ui:placeholder': 'Paste a valid DID',
      'ui:readonly': bondCreated,
    },
    reserveToken: {
      'ui:placeholder': 'Select a Token',
      'ui:readonly': bondCreated,
    },
    txFeePercentage: {
      'ui:widget': 'text',
      'ui:placeholder': 'Percentage',
      'ui:readonly': bondCreated,
    },
    exitFeePercentage: {
      'ui:widget': 'text',
      'ui:placeholder': 'Percentage',
      'ui:readonly': bondCreated,
    },
    feeAddress: {
      'ui:widget': 'text',
      'ui:placeholder': 'Paste a valid Account Address',
      'ui:readonly': bondCreated,
    },
    reserveWithdrawalAddress: {
      'ui:widget': 'text',
      'ui:placeholder': 'Paste a valid Account Address',
      'ui:readonly': bondCreated,
    },
    maxSupply: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount',
      'ui:readonly': bondCreated,
    },
    initialPrice: {
      'ui:widget': customControls['affixtext'],
      'ui:placeholder': 'Amount/Token',
      'ui:readonly': bondCreated,
      'ui:suffix': formData?.reserveToken?.toUpperCase(),
    },
    initialSupply: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount',
      'ui:readonly': bondCreated,
    },
    allowReserveWithdrawals: {
      'ui:widget': customControls['inlineswitch'],
      'ui:options': {
        label: false,
      },
      'ui:disabled': bondCreated,
    },
    outcomePayment: {
      'ui:widget': customControls['affixtext'],
      'ui:placeholder': 'Amount',
      'ui:readonly': bondCreated,
      'ui:suffix': formData?.reserveToken?.toUpperCase(),
    },
    bondDid: {
      'ui:widget': 'text',
      'ui:readonly': bondCreated,
    },
    minimumYield: {
      'ui:widget': 'text',
      'ui:placeholder': 'Enter the minimum Yield',
      'ui:readonly': bondCreated,
    },
    period: {
      'ui:widget': 'text',
      'ui:placeholder': 'Enter the time period',
      'ui:readonly': bondCreated,
    },
    targetRaise: {
      'ui:widget': customControls['affixtext'],
      'ui:placeholder': 'Enter the Amount to Raise',
      'ui:readonly': bondCreated,
      'ui:suffix': formData?.reserveToken?.toUpperCase(),
    },
  }

  const validate = (formData: any, errors: FormValidation): FormValidation => {
    const { txFeePercentage, exitFeePercentage } = formData

    if (txFeePercentage && txFeePercentage > 100) {
      errors.txFeePercentage.addError('Invalid Percentage format!')
    }
    if (exitFeePercentage && exitFeePercentage > 100) {
      errors.exitFeePercentage.addError('Invalid Percentage format!')
    }

    return errors
  }

  return (
    <>
      <MultiControlForm
        formData={formData ?? {}}
        schema={schema}
        uiSchema={uiSchema}
        validate={validate}
        onSubmit={(): void => {
          setCreateBondModalOpen(true)
        }}
        onError={handleError}
        onFormDataChange={handleUpdateContent}
        customObjectFieldTemplate={ObjectFieldConfigureAlphaBondColumn}
      >
        <SubmitButton type='submit' disabled={bondCreated || !canCreate}>
          Sign to continue
        </SubmitButton>
      </MultiControlForm>
      <ModalWrapper
        isModalOpen={createBondModalOpen}
        header={{
          title: 'Create a Bond',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setCreateBondModalOpen(false)}
      >
        <CreateBondModal alphaBondInfo={formData} />
      </ModalWrapper>
    </>
  )
}

export default ConfigureAlphaBondCard
