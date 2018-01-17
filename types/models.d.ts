/** TodoMVC model definitions **/

export interface IDictionary<T> {
    [key: string]: T
}

export interface IPingResult {
  jsonrpc: string,
  id: number,
  result: string
}

export interface ICredentialProviderResult {
    provider: any,
    credentialProviderInstance: any,
}