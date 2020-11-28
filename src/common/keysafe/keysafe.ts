// TODO - use this instead of the redux keysafe for each component that has been refactored

// Initialize the IXO Keysafe browser extension client, if the extension is
// installed.

export default window['ixoKs'] && new window['ixoKs']()
