import { useEffect, useMemo, useState } from 'react'
import * as Modal from 'react-modal'

import { CloseButton, ModalStyles, ModalTitle, ModalWrapper } from '../styles'
import { AlphaBondInfo } from 'types/bond'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { Button, Dropdown, TextArea } from 'screens/CreateEntity/Components'
import { InputWithLabel } from 'components/Form/InputWithLabel'
import { useTheme } from 'styled-components'
import { generateBondDid } from 'utils/bond'
import { CreateBondMessage } from 'lib/protocol'
import { useAccount } from 'hooks/account'
import { cosmos, ixo } from '@ixo/impactxclient-sdk'
import { errorToast, successToast } from 'utils/toast'
import { useIxoConfigs } from 'hooks/configs'
import { convertCoinToDecCoin } from 'utils/currency'
import { useGetBondDid } from 'graphql/bonds'
import { useWallet } from 'wallet-connector'
import { DeliverTxResponse } from '@cosmjs/stargate'

interface Props {
  open: boolean
  bondDid: string
  onSubmit: (bondDid: string) => void
  onClose: () => void
}

const CreateBondModal: React.FC<Props> = ({ open, bondDid, onSubmit, onClose }): JSX.Element => {
  const theme: any = useTheme()
  const { signer } = useAccount()
  const { getAssetPairs, convertToMinimalDenom, convertToDenom } = useIxoConfigs()
  const { data: bondDetailFromApi } = useGetBondDid(bondDid)
  const coins = getAssetPairs()
  const { execute, close } = useWallet()
  const [alphaBondInfo, setAlphaBondInfo] = useState<Partial<AlphaBondInfo>>({
    reserveToken: coins[0].display!,
  })
  const reserveTokenMicroDenom = useMemo(
    () => coins.find((v) => v.display === alphaBondInfo.reserveToken)?.base,
    [coins, alphaBondInfo.reserveToken],
  )
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (bondDetailFromApi) {
      // setAlphaBondInfo(bondDetailFromApi)
      setAlphaBondInfo({
        token: bondDetailFromApi.token,
        name: bondDetailFromApi.name,
        description: bondDetailFromApi.description,
        controllerDid: bondDetailFromApi.controllerDid,
        reserveToken: convertToDenom({ denom: bondDetailFromApi.reserveTokens[0], amount: '0' })?.denom,
        txFeePercentage: Number(bondDetailFromApi.txFeePercentage),
        exitFeePercentage: Number(bondDetailFromApi.exitFeePercentage),
        feeAddress: bondDetailFromApi.feeAddress,
        reserveWithdrawalAddress: bondDetailFromApi.reserveWithdrawalAddress,
        maxSupply: bondDetailFromApi.maxSupply.amount,
        initialPrice: Number(bondDetailFromApi.functionParameters.find((v: any) => v.param === 'p0')?.value).toString(),
        initialSupply: Number(
          bondDetailFromApi.functionParameters.find((v: any) => v.param === 'd0')?.value,
        ).toString(),
        baseCurveShape: 2, // TODO:
        outcomePayment: bondDetailFromApi.outcomePayment,
        allowReserveWithdrawals: bondDetailFromApi.allowReserveWithdrawals,
        bondDid: bondDetailFromApi.bondDid,
        // new
        minimumYield: 0, // TODO:
        period: 0, //  TODO:
        targetRaise: 0, //  TODO:
      })
    } else {
      setAlphaBondInfo({ reserveToken: coins[0].display! })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bondDetailFromApi])

  const handleFormChange = (key: string) => (value: string) => {
    setAlphaBondInfo((v) => ({ ...v, [key]: value }))
  }

  const handleSign = async () => {
    try {
      setSubmitting(true)
      if (
        !alphaBondInfo.token ||
        !alphaBondInfo.name ||
        !alphaBondInfo.description ||
        !alphaBondInfo.reserveToken ||
        !alphaBondInfo.initialPrice ||
        !alphaBondInfo.initialSupply ||
        !alphaBondInfo.outcomePayment ||
        !reserveTokenMicroDenom
      ) {
        // eslint-disable-next-line no-throw-literal
        throw 'Missing or Invalid inputs'
      }
      const did = signer.did

      const bondDid = generateBondDid()
      const microInitialPrice = convertCoinToDecCoin(
        convertToMinimalDenom(
          cosmos.base.v1beta1.Coin.fromPartial({
            amount: alphaBondInfo.initialPrice,
            denom: alphaBondInfo.reserveToken,
          }),
        )!,
      )?.amount
      const microInitialSupply = convertCoinToDecCoin(
        cosmos.base.v1beta1.Coin.fromPartial({
          amount: alphaBondInfo.initialSupply,
          denom: alphaBondInfo.token,
        }),
      ).amount

      const payload = {
        bondDid,
        token: alphaBondInfo.token,
        name: alphaBondInfo.name,
        description: alphaBondInfo.description,
        creatorDid: did,
        controllerDid: did,
        functionType: 'augmented_function',
        functionParameters: [
          ixo.bonds.v1beta1.FunctionParam.fromPartial({
            param: 'p0',
            // value: '1000000000000000000', // 1 * 10^18
            value: microInitialPrice,
          }),
          ixo.bonds.v1beta1.FunctionParam.fromPartial({
            param: 'theta',
            value: '0',
          }),
          ixo.bonds.v1beta1.FunctionParam.fromPartial({
            param: 'kappa',
            value: '3000000000000000000', // 3 * 10^18
          }),
          ixo.bonds.v1beta1.FunctionParam.fromPartial({
            param: 'd0',
            // value: '1000000000000000000000000', // 1mil
            value: microInitialSupply,
          }),
        ],
        reserveTokens: [reserveTokenMicroDenom],
        txFeePercentage: '0',
        exitFeePercentage: '0',
        feeAddress: signer.address,
        reserveWithdrawalAddress: signer.address,
        maxSupply: cosmos.base.v1beta1.Coin.fromPartial({
          denom: alphaBondInfo.token,
          amount: alphaBondInfo.maxSupply,
        }),
        orderQuantityLimits: [],
        sanityRate: '0',
        sanityMarginPercentage: '0',
        allowSells: false,
        allowReserveWithdrawals: true,
        alphaBond: true,
        batchBlocks: '1',
        outcomePayment: alphaBondInfo.outcomePayment,
        creatorAddress: signer.address,
        oracleDid: did,
      }
      const createBondData = CreateBondMessage(payload)
      const response = (await execute({
        data: createBondData,
        transactionConfig: { sequence: 1 },
      })) as unknown as DeliverTxResponse

      if (response.code !== 0) {
        throw response.rawLog
      }
      close()
      successToast('Bond', 'Successfully bond created')
      onSubmit(bondDid)
    } catch (e) {
      console.error('CreateBond', e)
      errorToast('Error at Signing', typeof e === 'string' && e)
    } finally {
      setSubmitting(false)
      onClose()
    }
  }

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <img src='/assets/images/icon-close.svg' />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>{'Create an AlphaBond'}</ModalTitle>
        <FlexBox $direction='column' width='934px' $gap={15}>
          <FlexBox width='100%' $gap={12.5}>
            <FlexBox width='320px' height='320px' background={theme.ixoGrey100} $borderRadius={'8px'}></FlexBox>
            <FlexBox $direction='column' $gap={5} style={{ flex: '1' }}>
              <FlexBox $gap={3} width='100%'>
                <InputWithLabel
                  name='name'
                  label='Bond Name'
                  inputValue={alphaBondInfo.name}
                  handleChange={handleFormChange('name')}
                />
                <InputWithLabel
                  name='token'
                  label='Bond DENOM'
                  inputValue={alphaBondInfo.token}
                  handleChange={handleFormChange('token')}
                />
              </FlexBox>

              <FlexBox $gap={3} width='100%'>
                <TextArea
                  name='description'
                  label='Description'
                  height='72px'
                  inputValue={alphaBondInfo.description || ''}
                  handleChange={handleFormChange('description')}
                />
              </FlexBox>

              <FlexBox $gap={3} width='100%'>
                <InputWithLabel
                  name='targetRaise'
                  label='Target to Raise'
                  inputValue={alphaBondInfo.targetRaise}
                  handleChange={handleFormChange('targetRaise')}
                />
                <Dropdown
                  options={coins.map((v) => ({ text: v.display.toUpperCase(), value: v.base }))}
                  value={alphaBondInfo.reserveToken}
                  onChange={(e) => handleFormChange('reserveToken')(e.target.value)}
                  wrapperStyle={{ width: 100 }}
                  style={{ textAlign: 'center' }}
                />
              </FlexBox>

              <FlexBox $gap={3} width='100%'>
                <InputWithLabel
                  name='minimumYield'
                  label='Minimum Yield'
                  inputValue={alphaBondInfo.minimumYield}
                  handleChange={handleFormChange('minimumYield')}
                />
                <InputWithLabel
                  name='period'
                  label='Period (Months)'
                  inputValue={alphaBondInfo.period}
                  handleChange={handleFormChange('period')}
                />
              </FlexBox>

              <FlexBox $gap={3} width='100%'>
                <InputWithLabel
                  name='maxSupply'
                  label='Maximum Supply'
                  inputValue={alphaBondInfo.maxSupply}
                  handleChange={handleFormChange('maxSupply')}
                />
                <InputWithLabel
                  name='initialSupply'
                  label='Hatch Supply'
                  inputValue={alphaBondInfo.initialSupply}
                  handleChange={handleFormChange('initialSupply')}
                />
              </FlexBox>

              <FlexBox $gap={3} width='100%'>
                <InputWithLabel
                  name='initialPrice'
                  label={`Hatch Price`}
                  inputValue={alphaBondInfo.initialPrice}
                  handleChange={handleFormChange('initialPrice')}
                />
                <InputWithLabel
                  name='reserveToken'
                  inputValue={alphaBondInfo.reserveToken?.toUpperCase()}
                  readOnly
                  width='100px'
                  style={{ textAlign: 'center' }}
                />
              </FlexBox>

              <FlexBox $gap={3} width='100%'>
                <InputWithLabel
                  name='outcomePayment'
                  label='Outcome Payment Amount'
                  inputValue={alphaBondInfo.outcomePayment}
                  handleChange={handleFormChange('outcomePayment')}
                />
                <InputWithLabel
                  name='reserveToken'
                  inputValue={alphaBondInfo.token?.toUpperCase()}
                  readOnly
                  width='100px'
                  style={{ textAlign: 'center' }}
                />
              </FlexBox>
            </FlexBox>
          </FlexBox>

          <FlexBox width='100%' $justifyContent='flex-end'>
            <Button size={'flex'} onClick={handleSign} loading={submitting}>
              Sign to Continue
            </Button>
          </FlexBox>
        </FlexBox>
      </ModalWrapper>
    </Modal>
  )
}

export default CreateBondModal
