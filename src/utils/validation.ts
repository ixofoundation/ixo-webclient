import JSON5 from 'json5'
import BigNumber from 'bignumber.js'
import Ajv from 'ajv'
import cosmosMsgSchema from 'constants/cosmos_msg.json'
import { makeWasmMessage } from './messages'

export const isEmail = (email?: string): boolean => {
  if (!email) {
    return false
  }

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email.toLowerCase())
}

export const isHttpsUrl = (url?: string): boolean => {
  if (!url) {
    return false
  }

  const regex = /^https:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&=]*)/
  return regex.test(url.toLowerCase())
}

export const isInteger = (str?: string): boolean => {
  if (str === undefined || str === null) return false
  return /^(0|[1-9]\d*)$/.test(str)
}

export const isFloat = (str?: string): boolean => {
  if (str === undefined || str === null) return false
  return /^\d+(\.\d+)?$/.test(str)
}

export const isAccountAddress = (address: string | undefined, prefix = 'ixo'): boolean => {
  if (!address) {
    return false
  }
  if (!address.startsWith(prefix)) {
    return false
  }
  const [, hash] = address.split(prefix)
  if (hash.length !== 39) {
    return false
  }
  return true
}

export const isContractAddress = (address: string | undefined, prefix = 'ixo'): boolean => {
  if (!address) {
    return false
  }
  if (!address.startsWith(prefix)) {
    return false
  }
  const [, hash] = address.split(prefix)
  if (hash.length !== 59) {
    return false
  }
  return true
}

export const isNonZeroBalance = (amount: string | undefined): boolean => {
  return !new BigNumber(amount ?? '0').isZero()
}

type Structure = {
  // Nest to match more keys or use an empty object ({}) to check existence.
  [key: string]: Structure | { [key: string | number | symbol]: never }
}

// Check if object contains the expected structure.
export const objectMatchesStructure = (
  object: any | undefined | null,
  structure: Structure,
  options: {
    // If true, will not verify that values are defined and non-null.
    ignoreNullUndefined?: boolean
  } = {
    ignoreNullUndefined: true,
  },
): boolean => {
  if (!object || typeof object !== 'object' || Array.isArray(object)) {
    return false
  }

  const objectKeys = new Set(Object.keys(object))
  const structureEntries = Object.entries(structure)

  // Ensure object contains all top-level keys of structure. If we proceed past
  // this block, all required keys exist and we should try to recurse on
  // available children.
  if (
    structureEntries.some(
      ([key]) =>
        // Fail if does not have key.
        !objectKeys.has(key) ||
        // Fail if undefined or null.
        (!options.ignoreNullUndefined && (object[key] === undefined || object[key] === null)),
    )
  ) {
    return false
  }

  return structureEntries.every(
    ([topLevelKey, structureOrEmptyObject]) =>
      // If schema is empty object ({}), nothing further to check. We already
      // verified it above.
      Object.keys(structureOrEmptyObject).length === 0 ||
      // Recurse, first verifying the value of the key in the object is an
      // object.
      (typeof object[topLevelKey] === 'object' &&
        !Array.isArray(object[topLevelKey]) &&
        // typeof null === 'object', so verify this is not null before checking
        // its internal keys.
        object[topLevelKey] !== null &&
        objectMatchesStructure(object[topLevelKey] as Record<string, unknown>, structureOrEmptyObject, options)),
  )
}

const ajv = new Ajv()
const _validateCosmosMsg = ajv.compile(cosmosMsgSchema)

export const validateCosmosMsg = (msg: any) => ({
  valid: _validateCosmosMsg(msg),
  errors: _validateCosmosMsg.errors,
})

export const validateTokenSymbol = (v: string) =>
  /^[a-zA-Z]{3,12}$/.test(v) ||
  'Invalid token symbol. Must be 3-12 characters long and contain only letters and hyphens.'

export const validateCustomMessage = (value: string) => {
  let msg
  try {
    msg = JSON5.parse(value)
  } catch (e: any) {
    return e.message as string
  }
  if (msg.wasm) msg = makeWasmMessage(msg)
  const validCosmos = validateCosmosMsg(msg)

  if (!validCosmos.valid) {
    return 'INVALID_COSMOS_MSG'
  } else {
    return true
  }
}

export const validateJSON = (value: string) => {
  try {
    const msg = JSON5.parse(value)
    return !!msg
  } catch (e: any) {
    return false
  }
}

export const validateEntityDid = (entityDid: string): boolean => {
  try {
    return entityDid.startsWith('did:ixo:entity:') && entityDid.length === 47
  } catch {
    return false
  }
}
