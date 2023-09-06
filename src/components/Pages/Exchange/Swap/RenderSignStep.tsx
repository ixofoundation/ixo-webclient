import SignStep, { TXStatus } from 'components/ControlPanel/Actions/components/SignStep'
import { useEffect } from 'react'
import { generateSwapTrx } from 'services/swap' // Adjust the import path as needed
import { TokenAmount, TokenSelect } from 'types/swap'
import { TRX_MSG } from 'types/transactions'
import {
  getInputTokenAmount,
  getOutputTokenAmount,
  getSwapContractAddress,
  getSwapFunds,
  getTokenSelectByDenom,
} from 'utils/swap'

type RenderSignStepProps = {
  inputToken: any
  outputToken: any
  inputAmount: any
  slippage: any
  outputAmount: any
}

const RenderSignStep = ({
  inputToken,
  outputToken,
  inputAmount,
  slippage,
  outputAmount,
}: RenderSignStepProps): JSX.Element => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      const contractAddress = getSwapContractAddress(inputToken.denom, outputToken.denom)
      const senderAddress = 'your-sender-address' // Replace with your sender address
      const inputTokenSelect: TokenSelect = getTokenSelectByDenom(inputToken.demom) // Select the input token (IXO in this case)
      const outputTokenSelect: TokenSelect = getTokenSelectByDenom(outputToken.demom) // Select the input token (IXO in this case)
      const inputTokenAmount: TokenAmount = getInputTokenAmount(inputToken, inputTokenSelect, inputAmount) // Replace with the amount of IXO tokens you want to swap
      const outputTokenAmount: TokenAmount = getOutputTokenAmount(outputTokenSelect, outputAmount, slippage) // The minimum amount of Carbon tokens you expect to receive
      const funds = getSwapFunds(inputToken.denom, inputAmount)

      // Generate the swap transaction
      const swapTrx: TRX_MSG = generateSwapTrx({
        contractAddress,
        senderAddress,
        inputTokenSelect,
        inputTokenAmount,
        outputTokenAmount,
        funds,
      })
    }, 3000)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  return <SignStep status={TXStatus.PENDING} />
}

export default RenderSignStep
