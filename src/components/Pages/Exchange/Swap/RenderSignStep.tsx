import SignStep, { TXStatus } from 'components/ControlPanel/Actions/components/SignStep'
import { useEffect } from 'react'
import IxoSwapAdapter from 'adapters/IxoSwapAdapter'
import { useAccount } from 'hooks/account'

type RenderSignStepProps = {
  inputAsset: any
  outputAsset: any
  slippage: any
  tokenBalances: any
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const RenderSignStep = ({ inputAsset, outputAsset, setCurrentStep }: RenderSignStepProps): JSX.Element => {
  const { connectedWallet } = useAccount()
  const { offlineSigner, address } = connectedWallet!

  useEffect(() => {
    const IxoSwap = new IxoSwapAdapter({ walletAddress: address, offlineSigner })
    IxoSwap.checkIfNeedToApprove().then((approveTrx) => {
      IxoSwap.generateSwapTransaction({ inputAsset, outputAsset }).then((swapTrx) => {
        const callback = () => {
          setCurrentStep((prevStep) => prevStep + 1)
        }

        IxoSwap.executeWasmTRX({ offlineSigner, swapTrxs: approveTrx ? [approveTrx, swapTrx] : [swapTrx], callback })
      })
    })
  }, [inputAsset, outputAsset, offlineSigner, setCurrentStep, address])

  return <SignStep status={TXStatus.PENDING} />
}

export default RenderSignStep
