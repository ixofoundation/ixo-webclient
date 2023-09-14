import SignStep, { TXStatus } from 'components/ControlPanel/Actions/components/SignStep'
import { useEffect } from 'react'
import { useAppSelector } from 'redux/hooks'
import IxoSwapAdapter from 'adapters/IxoSwapAdapter'

type RenderSignStepProps = {
  inputAsset: any
  outputAsset: any
  slippage: any
  tokenBalances: any
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const RenderSignStep = ({ inputAsset, outputAsset, setCurrentStep }: RenderSignStepProps): JSX.Element => {
  const { offlineSigner, address } = useAppSelector((state) => state.account.keplrWallet)

  const IxoSwap = new IxoSwapAdapter({ walletAddress: address, offlineSigner })

  useEffect(() => {
    IxoSwap.checkIfNeedToApprove().then((approveTrx) => {
      IxoSwap.generateSwapTransaction({ inputAsset, outputAsset }).then((swapTrx) => {
        const callback = () => {
          setCurrentStep((prevStep) => prevStep + 1)
        }

        IxoSwap.executeWasmTRX({ offlineSigner, swapTrxs: approveTrx ? [approveTrx, swapTrx] : [swapTrx], callback })
      })
    })
  }, [])

  return <SignStep status={TXStatus.PENDING} />
}

export default RenderSignStep
