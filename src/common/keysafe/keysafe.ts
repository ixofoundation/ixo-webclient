// TODO - use this instead of the redux keysafe for each component that has been refactored
const initKeysafe = (): any => {
  let keysafe: Window | null

  if (!window['ixoKs']) {
    keysafe = null
  } else {
    const IxoInpageProvider = window['ixoKs']
    const ixoInpageProvider = new IxoInpageProvider()

    if (ixoInpageProvider) {
      keysafe = ixoInpageProvider
    } else {
      keysafe = null
    }
  }

  return keysafe
}

export default initKeysafe()
