import { WasmMsg } from 'types/contracts'
import { toBase64, toUtf8 } from '@cosmjs/encoding'

// This function mutates its input message.
export const makeWasmMessage = (message: {
  wasm: any
}): {
  wasm: WasmMsg
} => {
  // We need to encode Wasm Execute, Instantiate, and Migrate messages.
  const msg = message
  if (message?.wasm?.execute) {
    msg.wasm.execute.msg = toBase64(toUtf8(JSON.stringify(message.wasm.execute.msg)))
  } else if (message?.wasm?.instantiate) {
    msg.wasm.instantiate.msg = toBase64(toUtf8(JSON.stringify(message.wasm.instantiate.msg)))
  } else if (message.wasm.migrate) {
    msg.wasm.migrate.msg = toBase64(toUtf8(JSON.stringify(message.wasm.migrate.msg)))
  }
  // Messages such as update or clear admin pass through without modification.
  return msg
}
