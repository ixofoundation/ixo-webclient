export type ApiMethod = 'POST' | 'GET'

export type KeyValue<T, U> = {
  key: T
  value: U
}

export type ApiHeader = {
  key: string
  value: string
}

export type ApiResult = 'success' | 'failure'

export type ApiError = {
  ErrorCode: string
  Description: string
}

export type ApiResponse<T> = {
  Result: ApiResult
  Response: T | ApiError
}

export type KeySafeInfo = {
  username: string | undefined //username
  did: string | undefined //unique userid
  pubkey: string | undefined //public key of user
}
