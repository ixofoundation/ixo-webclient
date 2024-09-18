import { InitAssistant } from './initAssistant'
import { InitCosmWasmClient } from './initCosmWasmClient'

const RootInit = () => {
  return (
    <>
      <InitCosmWasmClient />
      <InitAssistant />
    </>
  )
}

export default RootInit
