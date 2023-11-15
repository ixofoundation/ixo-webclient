import SignStep, { TXStatus } from 'components/ControlPanel/Actions/components/SignStep'
import { useEffect } from 'react'
import IxoSwapAdapter from 'adapters/IxoSwapAdapter'
import { useAccount } from 'hooks/account'
import useSignX from 'hooks/signX'
import { ImpactXQRModal } from 'components/ImpactXQRModal'
import { WalletType } from 'types/wallet'

type RenderSignStepProps = {
  inputAsset: any
  outputAsset: any
  slippage: any
  tokenBalances: any
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const RenderSignStep = ({ inputAsset, outputAsset, setCurrentStep }: RenderSignStepProps): JSX.Element => {
  const { connectedWallet, selectedWallet, pubKey } = useAccount()
  const { offlineSigner, address, did } = connectedWallet!
  const { startTransaction: startIxoMobileTransaction, transactionQRData, transactionSuccess } = useSignX()

  useEffect(() => {
    const IxoSwap = new IxoSwapAdapter({ walletAddress: address, offlineSigner })
    IxoSwap.checkIfNeedToApprove().then((approveTrx) => {
      IxoSwap.generateSwapTransaction({ inputAsset, outputAsset }).then((swapTrx) => {
        const callback = () => {
          setCurrentStep((prevStep) => prevStep + 1)
        }

        if (selectedWallet === WalletType.Keplr) {
          IxoSwap.executeWasmTRX({ offlineSigner, swapTrxs: approveTrx ? [approveTrx, swapTrx] : [swapTrx], callback })
        }

        if (selectedWallet === WalletType.ImpactXMobile) {
          startIxoMobileTransaction({
            address,
            did,
            pubKey,
            msgs: approveTrx ? [approveTrx, swapTrx] : [swapTrx],
            memo: '',
          })
        }
      })
    })
  }, [inputAsset, outputAsset, offlineSigner, setCurrentStep, address])

  useEffect(() => {
    if (transactionSuccess) {
      setCurrentStep((prevStep) => prevStep + 1)
    }
  }, [transactionSuccess])

  return (
    <SignStep status={TXStatus.PENDING} noLottie={Boolean(transactionQRData)}>
      {transactionQRData && <ImpactXQRModal data={transactionQRData} />}
    </SignStep>
  )
}

export default RenderSignStep
