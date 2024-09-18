import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigFloat: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  Datetime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type BigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type BigIntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigInt']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigInt']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type Bond = Node & {
  __typename?: 'Bond';
  allowReserveWithdrawals: Scalars['Boolean']['output'];
  allowSells: Scalars['Boolean']['output'];
  alphaBond: Scalars['Boolean']['output'];
  availableReserve: Scalars['JSON']['output'];
  batchBlocks: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `BondAlpha`. */
  bondAlphasByBondDid: BondAlphasConnection;
  /** Reads and enables pagination through a set of `BondBuy`. */
  bondBuysByBondDid: BondBuysConnection;
  bondDid: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `BondSell`. */
  bondSellsByBondDid: BondSellsConnection;
  /** Reads and enables pagination through a set of `BondSwap`. */
  bondSwapsByBondDid: BondSwapsConnection;
  controllerDid: Scalars['String']['output'];
  creatorDid: Scalars['String']['output'];
  currentOutcomePaymentReserve: Scalars['JSON']['output'];
  currentReserve: Scalars['JSON']['output'];
  currentSupply?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  exitFeePercentage: Scalars['String']['output'];
  feeAddress: Scalars['String']['output'];
  functionParameters: Scalars['JSON']['output'];
  functionType: Scalars['String']['output'];
  maxSupply?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  oracleDid: Scalars['String']['output'];
  orderQuantityLimits: Scalars['JSON']['output'];
  outcomePayment: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `OutcomePayment`. */
  outcomePaymentsByBondDid: OutcomePaymentsConnection;
  reserveTokens?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  reserveWithdrawalAddress: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `ReserveWithdrawal`. */
  reserveWithdrawalsByBondDid: ReserveWithdrawalsConnection;
  sanityMarginPercentage: Scalars['String']['output'];
  sanityRate: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `ShareWithdrawal`. */
  shareWithdrawalsByBondDid: ShareWithdrawalsConnection;
  state: Scalars['String']['output'];
  token: Scalars['String']['output'];
  txFeePercentage: Scalars['String']['output'];
};


export type BondBondAlphasByBondDidArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BondAlphaCondition>;
  filter?: InputMaybe<BondAlphaFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BondAlphasOrderBy>>;
};


export type BondBondBuysByBondDidArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BondBuyCondition>;
  filter?: InputMaybe<BondBuyFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BondBuysOrderBy>>;
};


export type BondBondSellsByBondDidArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BondSellCondition>;
  filter?: InputMaybe<BondSellFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BondSellsOrderBy>>;
};


export type BondBondSwapsByBondDidArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BondSwapCondition>;
  filter?: InputMaybe<BondSwapFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BondSwapsOrderBy>>;
};


export type BondOutcomePaymentsByBondDidArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<OutcomePaymentCondition>;
  filter?: InputMaybe<OutcomePaymentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OutcomePaymentsOrderBy>>;
};


export type BondReserveWithdrawalsByBondDidArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReserveWithdrawalCondition>;
  filter?: InputMaybe<ReserveWithdrawalFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReserveWithdrawalsOrderBy>>;
};


export type BondShareWithdrawalsByBondDidArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ShareWithdrawalCondition>;
  filter?: InputMaybe<ShareWithdrawalFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShareWithdrawalsOrderBy>>;
};

export type BondAlpha = Node & {
  __typename?: 'BondAlpha';
  alpha: Scalars['String']['output'];
  /** Reads a single `Bond` that is related to this `BondAlpha`. */
  bondByBondDid?: Maybe<Bond>;
  bondDid: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  oracleDid: Scalars['String']['output'];
  timestamp: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `BondAlpha` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type BondAlphaCondition = {
  /** Checks for equality with the object’s `alpha` field. */
  alpha?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `bondDid` field. */
  bondDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `height` field. */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `oracleDid` field. */
  oracleDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against `BondAlpha` object types. All fields are combined with a logical ‘and.’ */
export type BondAlphaFilter = {
  /** Filter by the object’s `alpha` field. */
  alpha?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BondAlphaFilter>>;
  /** Filter by the object’s `bondByBondDid` relation. */
  bondByBondDid?: InputMaybe<BondFilter>;
  /** Filter by the object’s `bondDid` field. */
  bondDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `height` field. */
  height?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BondAlphaFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BondAlphaFilter>>;
  /** Filter by the object’s `oracleDid` field. */
  oracleDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: InputMaybe<DatetimeFilter>;
};

/** A connection to a list of `BondAlpha` values. */
export type BondAlphasConnection = {
  __typename?: 'BondAlphasConnection';
  /** A list of edges which contains the `BondAlpha` and cursor to aid in pagination. */
  edges: Array<BondAlphasEdge>;
  /** A list of `BondAlpha` objects. */
  nodes: Array<BondAlpha>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BondAlpha` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `BondAlpha` edge in the connection. */
export type BondAlphasEdge = {
  __typename?: 'BondAlphasEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `BondAlpha` at the end of the edge. */
  node: BondAlpha;
};

/** Methods to use when ordering `BondAlpha`. */
export enum BondAlphasOrderBy {
  AlphaAsc = 'ALPHA_ASC',
  AlphaDesc = 'ALPHA_DESC',
  BondDidAsc = 'BOND_DID_ASC',
  BondDidDesc = 'BOND_DID_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  OracleDidAsc = 'ORACLE_DID_ASC',
  OracleDidDesc = 'ORACLE_DID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC'
}

export type BondBuy = Node & {
  __typename?: 'BondBuy';
  accountDid: Scalars['String']['output'];
  amount: Scalars['JSON']['output'];
  /** Reads a single `Bond` that is related to this `BondBuy`. */
  bondByBondDid?: Maybe<Bond>;
  bondDid: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  maxPrices: Scalars['JSON']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  timestamp: Scalars['Datetime']['output'];
};

/** A condition to be used against `BondBuy` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BondBuyCondition = {
  /** Checks for equality with the object’s `accountDid` field. */
  accountDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `bondDid` field. */
  bondDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `height` field. */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `maxPrices` field. */
  maxPrices?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against `BondBuy` object types. All fields are combined with a logical ‘and.’ */
export type BondBuyFilter = {
  /** Filter by the object’s `accountDid` field. */
  accountDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BondBuyFilter>>;
  /** Filter by the object’s `bondByBondDid` relation. */
  bondByBondDid?: InputMaybe<BondFilter>;
  /** Filter by the object’s `bondDid` field. */
  bondDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `height` field. */
  height?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Filter by the object’s `maxPrices` field. */
  maxPrices?: InputMaybe<JsonFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BondBuyFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BondBuyFilter>>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: InputMaybe<DatetimeFilter>;
};

/** A connection to a list of `BondBuy` values. */
export type BondBuysConnection = {
  __typename?: 'BondBuysConnection';
  /** A list of edges which contains the `BondBuy` and cursor to aid in pagination. */
  edges: Array<BondBuysEdge>;
  /** A list of `BondBuy` objects. */
  nodes: Array<BondBuy>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BondBuy` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `BondBuy` edge in the connection. */
export type BondBuysEdge = {
  __typename?: 'BondBuysEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `BondBuy` at the end of the edge. */
  node: BondBuy;
};

/** Methods to use when ordering `BondBuy`. */
export enum BondBuysOrderBy {
  AccountDidAsc = 'ACCOUNT_DID_ASC',
  AccountDidDesc = 'ACCOUNT_DID_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  BondDidAsc = 'BOND_DID_ASC',
  BondDidDesc = 'BOND_DID_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MaxPricesAsc = 'MAX_PRICES_ASC',
  MaxPricesDesc = 'MAX_PRICES_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC'
}

/** A condition to be used against `Bond` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BondCondition = {
  /** Checks for equality with the object’s `allowReserveWithdrawals` field. */
  allowReserveWithdrawals?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `allowSells` field. */
  allowSells?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `alphaBond` field. */
  alphaBond?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `availableReserve` field. */
  availableReserve?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `batchBlocks` field. */
  batchBlocks?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `bondDid` field. */
  bondDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `controllerDid` field. */
  controllerDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `creatorDid` field. */
  creatorDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `currentOutcomePaymentReserve` field. */
  currentOutcomePaymentReserve?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `currentReserve` field. */
  currentReserve?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `currentSupply` field. */
  currentSupply?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `exitFeePercentage` field. */
  exitFeePercentage?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `feeAddress` field. */
  feeAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `functionParameters` field. */
  functionParameters?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `functionType` field. */
  functionType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `maxSupply` field. */
  maxSupply?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `oracleDid` field. */
  oracleDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `orderQuantityLimits` field. */
  orderQuantityLimits?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `outcomePayment` field. */
  outcomePayment?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `reserveTokens` field. */
  reserveTokens?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `reserveWithdrawalAddress` field. */
  reserveWithdrawalAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `sanityMarginPercentage` field. */
  sanityMarginPercentage?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `sanityRate` field. */
  sanityRate?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `state` field. */
  state?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `token` field. */
  token?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `txFeePercentage` field. */
  txFeePercentage?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `Bond` object types. All fields are combined with a logical ‘and.’ */
export type BondFilter = {
  /** Filter by the object’s `allowReserveWithdrawals` field. */
  allowReserveWithdrawals?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `allowSells` field. */
  allowSells?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `alphaBond` field. */
  alphaBond?: InputMaybe<BooleanFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BondFilter>>;
  /** Filter by the object’s `availableReserve` field. */
  availableReserve?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `batchBlocks` field. */
  batchBlocks?: InputMaybe<StringFilter>;
  /** Filter by the object’s `bondAlphasByBondDid` relation. */
  bondAlphasByBondDid?: InputMaybe<BondToManyBondAlphaFilter>;
  /** Some related `bondAlphasByBondDid` exist. */
  bondAlphasByBondDidExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `bondBuysByBondDid` relation. */
  bondBuysByBondDid?: InputMaybe<BondToManyBondBuyFilter>;
  /** Some related `bondBuysByBondDid` exist. */
  bondBuysByBondDidExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `bondDid` field. */
  bondDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `bondSellsByBondDid` relation. */
  bondSellsByBondDid?: InputMaybe<BondToManyBondSellFilter>;
  /** Some related `bondSellsByBondDid` exist. */
  bondSellsByBondDidExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `bondSwapsByBondDid` relation. */
  bondSwapsByBondDid?: InputMaybe<BondToManyBondSwapFilter>;
  /** Some related `bondSwapsByBondDid` exist. */
  bondSwapsByBondDidExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `controllerDid` field. */
  controllerDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `creatorDid` field. */
  creatorDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `currentOutcomePaymentReserve` field. */
  currentOutcomePaymentReserve?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `currentReserve` field. */
  currentReserve?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `currentSupply` field. */
  currentSupply?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `exitFeePercentage` field. */
  exitFeePercentage?: InputMaybe<StringFilter>;
  /** Filter by the object’s `feeAddress` field. */
  feeAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `functionParameters` field. */
  functionParameters?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `functionType` field. */
  functionType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `maxSupply` field. */
  maxSupply?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BondFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BondFilter>>;
  /** Filter by the object’s `oracleDid` field. */
  oracleDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `orderQuantityLimits` field. */
  orderQuantityLimits?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `outcomePayment` field. */
  outcomePayment?: InputMaybe<StringFilter>;
  /** Filter by the object’s `outcomePaymentsByBondDid` relation. */
  outcomePaymentsByBondDid?: InputMaybe<BondToManyOutcomePaymentFilter>;
  /** Some related `outcomePaymentsByBondDid` exist. */
  outcomePaymentsByBondDidExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `reserveTokens` field. */
  reserveTokens?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `reserveWithdrawalAddress` field. */
  reserveWithdrawalAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `reserveWithdrawalsByBondDid` relation. */
  reserveWithdrawalsByBondDid?: InputMaybe<BondToManyReserveWithdrawalFilter>;
  /** Some related `reserveWithdrawalsByBondDid` exist. */
  reserveWithdrawalsByBondDidExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `sanityMarginPercentage` field. */
  sanityMarginPercentage?: InputMaybe<StringFilter>;
  /** Filter by the object’s `sanityRate` field. */
  sanityRate?: InputMaybe<StringFilter>;
  /** Filter by the object’s `shareWithdrawalsByBondDid` relation. */
  shareWithdrawalsByBondDid?: InputMaybe<BondToManyShareWithdrawalFilter>;
  /** Some related `shareWithdrawalsByBondDid` exist. */
  shareWithdrawalsByBondDidExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `state` field. */
  state?: InputMaybe<StringFilter>;
  /** Filter by the object’s `token` field. */
  token?: InputMaybe<StringFilter>;
  /** Filter by the object’s `txFeePercentage` field. */
  txFeePercentage?: InputMaybe<StringFilter>;
};

export type BondSell = Node & {
  __typename?: 'BondSell';
  accountDid: Scalars['String']['output'];
  amount: Scalars['JSON']['output'];
  /** Reads a single `Bond` that is related to this `BondSell`. */
  bondByBondDid?: Maybe<Bond>;
  bondDid: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  timestamp: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `BondSell` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type BondSellCondition = {
  /** Checks for equality with the object’s `accountDid` field. */
  accountDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `bondDid` field. */
  bondDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `height` field. */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against `BondSell` object types. All fields are combined with a logical ‘and.’ */
export type BondSellFilter = {
  /** Filter by the object’s `accountDid` field. */
  accountDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BondSellFilter>>;
  /** Filter by the object’s `bondByBondDid` relation. */
  bondByBondDid?: InputMaybe<BondFilter>;
  /** Filter by the object’s `bondDid` field. */
  bondDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `height` field. */
  height?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BondSellFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BondSellFilter>>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: InputMaybe<DatetimeFilter>;
};

/** A connection to a list of `BondSell` values. */
export type BondSellsConnection = {
  __typename?: 'BondSellsConnection';
  /** A list of edges which contains the `BondSell` and cursor to aid in pagination. */
  edges: Array<BondSellsEdge>;
  /** A list of `BondSell` objects. */
  nodes: Array<BondSell>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BondSell` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `BondSell` edge in the connection. */
export type BondSellsEdge = {
  __typename?: 'BondSellsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `BondSell` at the end of the edge. */
  node: BondSell;
};

/** Methods to use when ordering `BondSell`. */
export enum BondSellsOrderBy {
  AccountDidAsc = 'ACCOUNT_DID_ASC',
  AccountDidDesc = 'ACCOUNT_DID_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  BondDidAsc = 'BOND_DID_ASC',
  BondDidDesc = 'BOND_DID_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC'
}

export type BondSwap = Node & {
  __typename?: 'BondSwap';
  accountDid: Scalars['String']['output'];
  amount: Scalars['JSON']['output'];
  /** Reads a single `Bond` that is related to this `BondSwap`. */
  bondByBondDid?: Maybe<Bond>;
  bondDid: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  timestamp: Scalars['Datetime']['output'];
  toToken: Scalars['String']['output'];
};

/**
 * A condition to be used against `BondSwap` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type BondSwapCondition = {
  /** Checks for equality with the object’s `accountDid` field. */
  accountDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `bondDid` field. */
  bondDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `height` field. */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `toToken` field. */
  toToken?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `BondSwap` object types. All fields are combined with a logical ‘and.’ */
export type BondSwapFilter = {
  /** Filter by the object’s `accountDid` field. */
  accountDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BondSwapFilter>>;
  /** Filter by the object’s `bondByBondDid` relation. */
  bondByBondDid?: InputMaybe<BondFilter>;
  /** Filter by the object’s `bondDid` field. */
  bondDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `height` field. */
  height?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BondSwapFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BondSwapFilter>>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `toToken` field. */
  toToken?: InputMaybe<StringFilter>;
};

/** A connection to a list of `BondSwap` values. */
export type BondSwapsConnection = {
  __typename?: 'BondSwapsConnection';
  /** A list of edges which contains the `BondSwap` and cursor to aid in pagination. */
  edges: Array<BondSwapsEdge>;
  /** A list of `BondSwap` objects. */
  nodes: Array<BondSwap>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BondSwap` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `BondSwap` edge in the connection. */
export type BondSwapsEdge = {
  __typename?: 'BondSwapsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `BondSwap` at the end of the edge. */
  node: BondSwap;
};

/** Methods to use when ordering `BondSwap`. */
export enum BondSwapsOrderBy {
  AccountDidAsc = 'ACCOUNT_DID_ASC',
  AccountDidDesc = 'ACCOUNT_DID_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  BondDidAsc = 'BOND_DID_ASC',
  BondDidDesc = 'BOND_DID_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  ToTokenAsc = 'TO_TOKEN_ASC',
  ToTokenDesc = 'TO_TOKEN_DESC'
}

/** A filter to be used against many `BondAlpha` object types. All fields are combined with a logical ‘and.’ */
export type BondToManyBondAlphaFilter = {
  /** Every related `BondAlpha` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BondAlphaFilter>;
  /** No related `BondAlpha` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BondAlphaFilter>;
  /** Some related `BondAlpha` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BondAlphaFilter>;
};

/** A filter to be used against many `BondBuy` object types. All fields are combined with a logical ‘and.’ */
export type BondToManyBondBuyFilter = {
  /** Every related `BondBuy` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BondBuyFilter>;
  /** No related `BondBuy` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BondBuyFilter>;
  /** Some related `BondBuy` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BondBuyFilter>;
};

/** A filter to be used against many `BondSell` object types. All fields are combined with a logical ‘and.’ */
export type BondToManyBondSellFilter = {
  /** Every related `BondSell` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BondSellFilter>;
  /** No related `BondSell` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BondSellFilter>;
  /** Some related `BondSell` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BondSellFilter>;
};

/** A filter to be used against many `BondSwap` object types. All fields are combined with a logical ‘and.’ */
export type BondToManyBondSwapFilter = {
  /** Every related `BondSwap` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<BondSwapFilter>;
  /** No related `BondSwap` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<BondSwapFilter>;
  /** Some related `BondSwap` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<BondSwapFilter>;
};

/** A filter to be used against many `OutcomePayment` object types. All fields are combined with a logical ‘and.’ */
export type BondToManyOutcomePaymentFilter = {
  /** Every related `OutcomePayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<OutcomePaymentFilter>;
  /** No related `OutcomePayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<OutcomePaymentFilter>;
  /** Some related `OutcomePayment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<OutcomePaymentFilter>;
};

/** A filter to be used against many `ReserveWithdrawal` object types. All fields are combined with a logical ‘and.’ */
export type BondToManyReserveWithdrawalFilter = {
  /** Every related `ReserveWithdrawal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ReserveWithdrawalFilter>;
  /** No related `ReserveWithdrawal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ReserveWithdrawalFilter>;
  /** Some related `ReserveWithdrawal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ReserveWithdrawalFilter>;
};

/** A filter to be used against many `ShareWithdrawal` object types. All fields are combined with a logical ‘and.’ */
export type BondToManyShareWithdrawalFilter = {
  /** Every related `ShareWithdrawal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ShareWithdrawalFilter>;
  /** No related `ShareWithdrawal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ShareWithdrawalFilter>;
  /** Some related `ShareWithdrawal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ShareWithdrawalFilter>;
};

/** A connection to a list of `Bond` values. */
export type BondsConnection = {
  __typename?: 'BondsConnection';
  /** A list of edges which contains the `Bond` and cursor to aid in pagination. */
  edges: Array<BondsEdge>;
  /** A list of `Bond` objects. */
  nodes: Array<Bond>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Bond` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Bond` edge in the connection. */
export type BondsEdge = {
  __typename?: 'BondsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Bond` at the end of the edge. */
  node: Bond;
};

/** Methods to use when ordering `Bond`. */
export enum BondsOrderBy {
  AllowReserveWithdrawalsAsc = 'ALLOW_RESERVE_WITHDRAWALS_ASC',
  AllowReserveWithdrawalsDesc = 'ALLOW_RESERVE_WITHDRAWALS_DESC',
  AllowSellsAsc = 'ALLOW_SELLS_ASC',
  AllowSellsDesc = 'ALLOW_SELLS_DESC',
  AlphaBondAsc = 'ALPHA_BOND_ASC',
  AlphaBondDesc = 'ALPHA_BOND_DESC',
  AvailableReserveAsc = 'AVAILABLE_RESERVE_ASC',
  AvailableReserveDesc = 'AVAILABLE_RESERVE_DESC',
  BatchBlocksAsc = 'BATCH_BLOCKS_ASC',
  BatchBlocksDesc = 'BATCH_BLOCKS_DESC',
  BondDidAsc = 'BOND_DID_ASC',
  BondDidDesc = 'BOND_DID_DESC',
  ControllerDidAsc = 'CONTROLLER_DID_ASC',
  ControllerDidDesc = 'CONTROLLER_DID_DESC',
  CreatorDidAsc = 'CREATOR_DID_ASC',
  CreatorDidDesc = 'CREATOR_DID_DESC',
  CurrentOutcomePaymentReserveAsc = 'CURRENT_OUTCOME_PAYMENT_RESERVE_ASC',
  CurrentOutcomePaymentReserveDesc = 'CURRENT_OUTCOME_PAYMENT_RESERVE_DESC',
  CurrentReserveAsc = 'CURRENT_RESERVE_ASC',
  CurrentReserveDesc = 'CURRENT_RESERVE_DESC',
  CurrentSupplyAsc = 'CURRENT_SUPPLY_ASC',
  CurrentSupplyDesc = 'CURRENT_SUPPLY_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  ExitFeePercentageAsc = 'EXIT_FEE_PERCENTAGE_ASC',
  ExitFeePercentageDesc = 'EXIT_FEE_PERCENTAGE_DESC',
  FeeAddressAsc = 'FEE_ADDRESS_ASC',
  FeeAddressDesc = 'FEE_ADDRESS_DESC',
  FunctionParametersAsc = 'FUNCTION_PARAMETERS_ASC',
  FunctionParametersDesc = 'FUNCTION_PARAMETERS_DESC',
  FunctionTypeAsc = 'FUNCTION_TYPE_ASC',
  FunctionTypeDesc = 'FUNCTION_TYPE_DESC',
  MaxSupplyAsc = 'MAX_SUPPLY_ASC',
  MaxSupplyDesc = 'MAX_SUPPLY_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OracleDidAsc = 'ORACLE_DID_ASC',
  OracleDidDesc = 'ORACLE_DID_DESC',
  OrderQuantityLimitsAsc = 'ORDER_QUANTITY_LIMITS_ASC',
  OrderQuantityLimitsDesc = 'ORDER_QUANTITY_LIMITS_DESC',
  OutcomePaymentAsc = 'OUTCOME_PAYMENT_ASC',
  OutcomePaymentDesc = 'OUTCOME_PAYMENT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReserveTokensAsc = 'RESERVE_TOKENS_ASC',
  ReserveTokensDesc = 'RESERVE_TOKENS_DESC',
  ReserveWithdrawalAddressAsc = 'RESERVE_WITHDRAWAL_ADDRESS_ASC',
  ReserveWithdrawalAddressDesc = 'RESERVE_WITHDRAWAL_ADDRESS_DESC',
  SanityMarginPercentageAsc = 'SANITY_MARGIN_PERCENTAGE_ASC',
  SanityMarginPercentageDesc = 'SANITY_MARGIN_PERCENTAGE_DESC',
  SanityRateAsc = 'SANITY_RATE_ASC',
  SanityRateDesc = 'SANITY_RATE_DESC',
  StateAsc = 'STATE_ASC',
  StateDesc = 'STATE_DESC',
  TokenAsc = 'TOKEN_ASC',
  TokenDesc = 'TOKEN_DESC',
  TxFeePercentageAsc = 'TX_FEE_PERCENTAGE_ASC',
  TxFeePercentageDesc = 'TX_FEE_PERCENTAGE_DESC'
}

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type Chain = Node & {
  __typename?: 'Chain';
  blockHeight: Scalars['Int']['output'];
  chainId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** A condition to be used against `Chain` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ChainCondition = {
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `chainId` field. */
  chainId?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `Chain` object types. All fields are combined with a logical ‘and.’ */
export type ChainFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ChainFilter>>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: InputMaybe<IntFilter>;
  /** Filter by the object’s `chainId` field. */
  chainId?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ChainFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ChainFilter>>;
};

/** A connection to a list of `Chain` values. */
export type ChainsConnection = {
  __typename?: 'ChainsConnection';
  /** A list of edges which contains the `Chain` and cursor to aid in pagination. */
  edges: Array<ChainsEdge>;
  /** A list of `Chain` objects. */
  nodes: Array<Chain>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Chain` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Chain` edge in the connection. */
export type ChainsEdge = {
  __typename?: 'ChainsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Chain` at the end of the edge. */
  node: Chain;
};

/** Methods to use when ordering `Chain`. */
export enum ChainsOrderBy {
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  ChainIdAsc = 'CHAIN_ID_ASC',
  ChainIdDesc = 'CHAIN_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Claim = Node & {
  __typename?: 'Claim';
  agentAddress: Scalars['String']['output'];
  agentDid: Scalars['String']['output'];
  claimId: Scalars['String']['output'];
  /** Reads a single `ClaimCollection` that is related to this `Claim`. */
  collection?: Maybe<ClaimCollection>;
  collectionId: Scalars['String']['output'];
  /** Reads a single `Evaluation` that is related to this `Claim`. */
  evaluationByClaimId?: Maybe<Evaluation>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  paymentsStatus: Scalars['JSON']['output'];
  schemaType?: Maybe<Scalars['String']['output']>;
  submissionDate: Scalars['Datetime']['output'];
};

export type ClaimCollection = Node & {
  __typename?: 'ClaimCollection';
  admin: Scalars['String']['output'];
  approved: Scalars['Int']['output'];
  /** Checks if there are any claims with null schemaType */
  claimSchemaTypesLoaded: Scalars['Boolean']['output'];
  /** Reads and enables pagination through a set of `Claim`. */
  claimsByCollectionId: ClaimsConnection;
  count: Scalars['Int']['output'];
  disputed: Scalars['Int']['output'];
  endDate?: Maybe<Scalars['Datetime']['output']>;
  entity: Scalars['String']['output'];
  evaluated: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  invalidated: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  payments: Scalars['JSON']['output'];
  protocol: Scalars['String']['output'];
  quota: Scalars['Int']['output'];
  rejected: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['Datetime']['output']>;
  state: Scalars['Int']['output'];
};


export type ClaimCollectionClaimsByCollectionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ClaimCondition>;
  filter?: InputMaybe<ClaimFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClaimsOrderBy>>;
};

/**
 * A condition to be used against `ClaimCollection` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ClaimCollectionCondition = {
  /** Checks for equality with the object’s `admin` field. */
  admin?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `approved` field. */
  approved?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `count` field. */
  count?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `disputed` field. */
  disputed?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `endDate` field. */
  endDate?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `entity` field. */
  entity?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `evaluated` field. */
  evaluated?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `invalidated` field. */
  invalidated?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `payments` field. */
  payments?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `protocol` field. */
  protocol?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `quota` field. */
  quota?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `rejected` field. */
  rejected?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `startDate` field. */
  startDate?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `state` field. */
  state?: InputMaybe<Scalars['Int']['input']>;
};

/** A filter to be used against `ClaimCollection` object types. All fields are combined with a logical ‘and.’ */
export type ClaimCollectionFilter = {
  /** Filter by the object’s `admin` field. */
  admin?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ClaimCollectionFilter>>;
  /** Filter by the object’s `approved` field. */
  approved?: InputMaybe<IntFilter>;
  /** Filter by the object’s `claimsByCollectionId` relation. */
  claimsByCollectionId?: InputMaybe<ClaimCollectionToManyClaimFilter>;
  /** Some related `claimsByCollectionId` exist. */
  claimsByCollectionIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `count` field. */
  count?: InputMaybe<IntFilter>;
  /** Filter by the object’s `disputed` field. */
  disputed?: InputMaybe<IntFilter>;
  /** Filter by the object’s `endDate` field. */
  endDate?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `entity` field. */
  entity?: InputMaybe<StringFilter>;
  /** Filter by the object’s `evaluated` field. */
  evaluated?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Filter by the object’s `invalidated` field. */
  invalidated?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ClaimCollectionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ClaimCollectionFilter>>;
  /** Filter by the object’s `payments` field. */
  payments?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `protocol` field. */
  protocol?: InputMaybe<StringFilter>;
  /** Filter by the object’s `quota` field. */
  quota?: InputMaybe<IntFilter>;
  /** Filter by the object’s `rejected` field. */
  rejected?: InputMaybe<IntFilter>;
  /** Filter by the object’s `startDate` field. */
  startDate?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `state` field. */
  state?: InputMaybe<IntFilter>;
};

/** A filter to be used against many `Claim` object types. All fields are combined with a logical ‘and.’ */
export type ClaimCollectionToManyClaimFilter = {
  /** Every related `Claim` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ClaimFilter>;
  /** No related `Claim` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ClaimFilter>;
  /** Some related `Claim` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ClaimFilter>;
};

/** A connection to a list of `ClaimCollection` values. */
export type ClaimCollectionsConnection = {
  __typename?: 'ClaimCollectionsConnection';
  /** A list of edges which contains the `ClaimCollection` and cursor to aid in pagination. */
  edges: Array<ClaimCollectionsEdge>;
  /** A list of `ClaimCollection` objects. */
  nodes: Array<ClaimCollection>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ClaimCollection` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ClaimCollection` edge in the connection. */
export type ClaimCollectionsEdge = {
  __typename?: 'ClaimCollectionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ClaimCollection` at the end of the edge. */
  node: ClaimCollection;
};

/** Methods to use when ordering `ClaimCollection`. */
export enum ClaimCollectionsOrderBy {
  AdminAsc = 'ADMIN_ASC',
  AdminDesc = 'ADMIN_DESC',
  ApprovedAsc = 'APPROVED_ASC',
  ApprovedDesc = 'APPROVED_DESC',
  CountAsc = 'COUNT_ASC',
  CountDesc = 'COUNT_DESC',
  DisputedAsc = 'DISPUTED_ASC',
  DisputedDesc = 'DISPUTED_DESC',
  EndDateAsc = 'END_DATE_ASC',
  EndDateDesc = 'END_DATE_DESC',
  EntityAsc = 'ENTITY_ASC',
  EntityDesc = 'ENTITY_DESC',
  EvaluatedAsc = 'EVALUATED_ASC',
  EvaluatedDesc = 'EVALUATED_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  InvalidatedAsc = 'INVALIDATED_ASC',
  InvalidatedDesc = 'INVALIDATED_DESC',
  Natural = 'NATURAL',
  PaymentsAsc = 'PAYMENTS_ASC',
  PaymentsDesc = 'PAYMENTS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProtocolAsc = 'PROTOCOL_ASC',
  ProtocolDesc = 'PROTOCOL_DESC',
  QuotaAsc = 'QUOTA_ASC',
  QuotaDesc = 'QUOTA_DESC',
  RejectedAsc = 'REJECTED_ASC',
  RejectedDesc = 'REJECTED_DESC',
  StartDateAsc = 'START_DATE_ASC',
  StartDateDesc = 'START_DATE_DESC',
  StateAsc = 'STATE_ASC',
  StateDesc = 'STATE_DESC'
}

/** A condition to be used against `Claim` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ClaimCondition = {
  /** Checks for equality with the object’s `agentAddress` field. */
  agentAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `agentDid` field. */
  agentDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `claimId` field. */
  claimId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `collectionId` field. */
  collectionId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `paymentsStatus` field. */
  paymentsStatus?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `schemaType` field. */
  schemaType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `submissionDate` field. */
  submissionDate?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against `Claim` object types. All fields are combined with a logical ‘and.’ */
export type ClaimFilter = {
  /** Filter by the object’s `agentAddress` field. */
  agentAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `agentDid` field. */
  agentDid?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ClaimFilter>>;
  /** Filter by the object’s `claimId` field. */
  claimId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `collection` relation. */
  collection?: InputMaybe<ClaimCollectionFilter>;
  /** Filter by the object’s `collectionId` field. */
  collectionId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `evaluationByClaimId` relation. */
  evaluationByClaimId?: InputMaybe<EvaluationFilter>;
  /** A related `evaluationByClaimId` exists. */
  evaluationByClaimIdExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<ClaimFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ClaimFilter>>;
  /** Filter by the object’s `paymentsStatus` field. */
  paymentsStatus?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `schemaType` field. */
  schemaType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `submissionDate` field. */
  submissionDate?: InputMaybe<DatetimeFilter>;
};

/** A connection to a list of `Claim` values. */
export type ClaimsConnection = {
  __typename?: 'ClaimsConnection';
  /** A list of edges which contains the `Claim` and cursor to aid in pagination. */
  edges: Array<ClaimsEdge>;
  /** A list of `Claim` objects. */
  nodes: Array<Claim>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Claim` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Claim` edge in the connection. */
export type ClaimsEdge = {
  __typename?: 'ClaimsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Claim` at the end of the edge. */
  node: Claim;
};

/** Methods to use when ordering `Claim`. */
export enum ClaimsOrderBy {
  AgentAddressAsc = 'AGENT_ADDRESS_ASC',
  AgentAddressDesc = 'AGENT_ADDRESS_DESC',
  AgentDidAsc = 'AGENT_DID_ASC',
  AgentDidDesc = 'AGENT_DID_DESC',
  ClaimIdAsc = 'CLAIM_ID_ASC',
  ClaimIdDesc = 'CLAIM_ID_DESC',
  CollectionIdAsc = 'COLLECTION_ID_ASC',
  CollectionIdDesc = 'COLLECTION_ID_DESC',
  Natural = 'NATURAL',
  PaymentsStatusAsc = 'PAYMENTS_STATUS_ASC',
  PaymentsStatusDesc = 'PAYMENTS_STATUS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SchemaTypeAsc = 'SCHEMA_TYPE_ASC',
  SchemaTypeDesc = 'SCHEMA_TYPE_DESC',
  SubmissionDateAsc = 'SUBMISSION_DATE_ASC',
  SubmissionDateDesc = 'SUBMISSION_DATE_DESC'
}

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export type Dispute = Node & {
  __typename?: 'Dispute';
  data: Scalars['JSON']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  proof: Scalars['String']['output'];
  subjectId: Scalars['String']['output'];
  type: Scalars['Int']['output'];
};

/** A condition to be used against `Dispute` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type DisputeCondition = {
  /** Checks for equality with the object’s `data` field. */
  data?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `proof` field. */
  proof?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `subjectId` field. */
  subjectId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['Int']['input']>;
};

/** A filter to be used against `Dispute` object types. All fields are combined with a logical ‘and.’ */
export type DisputeFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<DisputeFilter>>;
  /** Filter by the object’s `data` field. */
  data?: InputMaybe<JsonFilter>;
  /** Negates the expression. */
  not?: InputMaybe<DisputeFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<DisputeFilter>>;
  /** Filter by the object’s `proof` field. */
  proof?: InputMaybe<StringFilter>;
  /** Filter by the object’s `subjectId` field. */
  subjectId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<IntFilter>;
};

/** A connection to a list of `Dispute` values. */
export type DisputesConnection = {
  __typename?: 'DisputesConnection';
  /** A list of edges which contains the `Dispute` and cursor to aid in pagination. */
  edges: Array<DisputesEdge>;
  /** A list of `Dispute` objects. */
  nodes: Array<Dispute>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Dispute` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Dispute` edge in the connection. */
export type DisputesEdge = {
  __typename?: 'DisputesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Dispute` at the end of the edge. */
  node: Dispute;
};

/** Methods to use when ordering `Dispute`. */
export enum DisputesOrderBy {
  DataAsc = 'DATA_ASC',
  DataDesc = 'DATA_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProofAsc = 'PROOF_ASC',
  ProofDesc = 'PROOF_DESC',
  SubjectIdAsc = 'SUBJECT_ID_ASC',
  SubjectIdDesc = 'SUBJECT_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

/** A connection to a list of `Entity` values. */
export type EntitiesConnection = {
  __typename?: 'EntitiesConnection';
  /** A list of edges which contains the `Entity` and cursor to aid in pagination. */
  edges: Array<EntitiesEdge>;
  /** A list of `Entity` objects. */
  nodes: Array<Entity>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Entity` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Entity` edge in the connection. */
export type EntitiesEdge = {
  __typename?: 'EntitiesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Entity` at the end of the edge. */
  node: Entity;
};

/** Methods to use when ordering `Entity`. */
export enum EntitiesOrderBy {
  AccountsAsc = 'ACCOUNTS_ASC',
  AccountsDesc = 'ACCOUNTS_DESC',
  CredentialsAsc = 'CREDENTIALS_ASC',
  CredentialsDesc = 'CREDENTIALS_DESC',
  EndDateAsc = 'END_DATE_ASC',
  EndDateDesc = 'END_DATE_DESC',
  EntityVerifiedAsc = 'ENTITY_VERIFIED_ASC',
  EntityVerifiedDesc = 'ENTITY_VERIFIED_DESC',
  ExternalIdAsc = 'EXTERNAL_ID_ASC',
  ExternalIdDesc = 'EXTERNAL_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  Natural = 'NATURAL',
  OwnerAsc = 'OWNER_ASC',
  OwnerDesc = 'OWNER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RelayerNodeAsc = 'RELAYER_NODE_ASC',
  RelayerNodeDesc = 'RELAYER_NODE_DESC',
  StartDateAsc = 'START_DATE_ASC',
  StartDateDesc = 'START_DATE_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

export type Entity = Node & {
  __typename?: 'Entity';
  accordedRight: Scalars['JSON']['output'];
  accounts: Scalars['JSON']['output'];
  alsoKnownAs: Scalars['String']['output'];
  assertionMethod: Array<Scalars['String']['output']>;
  authentication: Array<Scalars['String']['output']>;
  capabilityDelegation: Array<Scalars['String']['output']>;
  capabilityInvocation: Array<Scalars['String']['output']>;
  context: Scalars['JSON']['output'];
  controller: Array<Scalars['String']['output']>;
  credentials?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  endDate?: Maybe<Scalars['Datetime']['output']>;
  entityVerified: Scalars['Boolean']['output'];
  externalId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** Reads a single `Iid` that is related to this `Entity`. */
  iidById?: Maybe<Iid>;
  keyAgreement: Array<Scalars['String']['output']>;
  linkedClaim: Scalars['JSON']['output'];
  linkedEntity: Scalars['JSON']['output'];
  linkedResource: Scalars['JSON']['output'];
  metadata: Scalars['JSON']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  relayerNode: Scalars['String']['output'];
  service: Scalars['JSON']['output'];
  settings: Scalars['JSON']['output'];
  startDate?: Maybe<Scalars['Datetime']['output']>;
  status: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `TokenClass`. */
  tokenClassesByClass: TokenClassesConnection;
  /** Reads and enables pagination through a set of `Token`. */
  tokensByCollection: TokensConnection;
  type: Scalars['String']['output'];
  verificationMethod: Scalars['JSON']['output'];
};


export type EntityTokenClassesByClassArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenClassCondition>;
  filter?: InputMaybe<TokenClassFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenClassesOrderBy>>;
};


export type EntityTokensByCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenCondition>;
  filter?: InputMaybe<TokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokensOrderBy>>;
};

/** A condition to be used against `Entity` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EntityCondition = {
  /** Checks for equality with the object’s `accounts` field. */
  accounts?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `credentials` field. */
  credentials?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `endDate` field. */
  endDate?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `entityVerified` field. */
  entityVerified?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `externalId` field. */
  externalId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `owner` field. */
  owner?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `relayerNode` field. */
  relayerNode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `startDate` field. */
  startDate?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `Entity` object types. All fields are combined with a logical ‘and.’ */
export type EntityFilter = {
  /** Filter by the object’s `accounts` field. */
  accounts?: InputMaybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EntityFilter>>;
  /** Filter by the object’s `credentials` field. */
  credentials?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `endDate` field. */
  endDate?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `entityVerified` field. */
  entityVerified?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `externalId` field. */
  externalId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iidById` relation. */
  iidById?: InputMaybe<IidFilter>;
  /** Filter by the object’s `metadata` field. */
  metadata?: InputMaybe<JsonFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EntityFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EntityFilter>>;
  /** Filter by the object’s `owner` field. */
  owner?: InputMaybe<StringFilter>;
  /** Filter by the object’s `relayerNode` field. */
  relayerNode?: InputMaybe<StringFilter>;
  /** Filter by the object’s `startDate` field. */
  startDate?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<IntFilter>;
  /** Filter by the object’s `tokenClassesByClass` relation. */
  tokenClassesByClass?: InputMaybe<EntityToManyTokenClassFilter>;
  /** Some related `tokenClassesByClass` exist. */
  tokenClassesByClassExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `tokensByCollection` relation. */
  tokensByCollection?: InputMaybe<EntityToManyTokenFilter>;
  /** Some related `tokensByCollection` exist. */
  tokensByCollectionExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
};

/** A filter to be used against many `TokenClass` object types. All fields are combined with a logical ‘and.’ */
export type EntityToManyTokenClassFilter = {
  /** Every related `TokenClass` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TokenClassFilter>;
  /** No related `TokenClass` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TokenClassFilter>;
  /** Some related `TokenClass` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TokenClassFilter>;
};

/** A filter to be used against many `Token` object types. All fields are combined with a logical ‘and.’ */
export type EntityToManyTokenFilter = {
  /** Every related `Token` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TokenFilter>;
  /** No related `Token` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TokenFilter>;
  /** Some related `Token` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TokenFilter>;
};

export type Evaluation = Node & {
  __typename?: 'Evaluation';
  agentAddress: Scalars['String']['output'];
  agentDid: Scalars['String']['output'];
  amount: Scalars['JSON']['output'];
  /** Reads a single `Claim` that is related to this `Evaluation`. */
  claim?: Maybe<Claim>;
  claimId: Scalars['String']['output'];
  collectionId: Scalars['String']['output'];
  evaluationDate: Scalars['Datetime']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  oracle: Scalars['String']['output'];
  reason: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  verificationProof?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `Evaluation` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EvaluationCondition = {
  /** Checks for equality with the object’s `agentAddress` field. */
  agentAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `agentDid` field. */
  agentDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `claimId` field. */
  claimId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `collectionId` field. */
  collectionId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `evaluationDate` field. */
  evaluationDate?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `oracle` field. */
  oracle?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `reason` field. */
  reason?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `verificationProof` field. */
  verificationProof?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `Evaluation` object types. All fields are combined with a logical ‘and.’ */
export type EvaluationFilter = {
  /** Filter by the object’s `agentAddress` field. */
  agentAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `agentDid` field. */
  agentDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EvaluationFilter>>;
  /** Filter by the object’s `claim` relation. */
  claim?: InputMaybe<ClaimFilter>;
  /** Filter by the object’s `claimId` field. */
  claimId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `collectionId` field. */
  collectionId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `evaluationDate` field. */
  evaluationDate?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EvaluationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EvaluationFilter>>;
  /** Filter by the object’s `oracle` field. */
  oracle?: InputMaybe<StringFilter>;
  /** Filter by the object’s `reason` field. */
  reason?: InputMaybe<IntFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<IntFilter>;
  /** Filter by the object’s `verificationProof` field. */
  verificationProof?: InputMaybe<StringFilter>;
};

/** A connection to a list of `Evaluation` values. */
export type EvaluationsConnection = {
  __typename?: 'EvaluationsConnection';
  /** A list of edges which contains the `Evaluation` and cursor to aid in pagination. */
  edges: Array<EvaluationsEdge>;
  /** A list of `Evaluation` objects. */
  nodes: Array<Evaluation>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Evaluation` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Evaluation` edge in the connection. */
export type EvaluationsEdge = {
  __typename?: 'EvaluationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Evaluation` at the end of the edge. */
  node: Evaluation;
};

/** Methods to use when ordering `Evaluation`. */
export enum EvaluationsOrderBy {
  AgentAddressAsc = 'AGENT_ADDRESS_ASC',
  AgentAddressDesc = 'AGENT_ADDRESS_DESC',
  AgentDidAsc = 'AGENT_DID_ASC',
  AgentDidDesc = 'AGENT_DID_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  ClaimIdAsc = 'CLAIM_ID_ASC',
  ClaimIdDesc = 'CLAIM_ID_DESC',
  CollectionIdAsc = 'COLLECTION_ID_ASC',
  CollectionIdDesc = 'COLLECTION_ID_DESC',
  EvaluationDateAsc = 'EVALUATION_DATE_ASC',
  EvaluationDateDesc = 'EVALUATION_DATE_DESC',
  Natural = 'NATURAL',
  OracleAsc = 'ORACLE_ASC',
  OracleDesc = 'ORACLE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReasonAsc = 'REASON_ASC',
  ReasonDesc = 'REASON_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  VerificationProofAsc = 'VERIFICATION_PROOF_ASC',
  VerificationProofDesc = 'VERIFICATION_PROOF_DESC'
}

export type HavingBigintFilter = {
  equalTo?: InputMaybe<Scalars['BigInt']['input']>;
  greaterThan?: InputMaybe<Scalars['BigInt']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  lessThan?: InputMaybe<Scalars['BigInt']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  notEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
};

export type HavingIntFilter = {
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
};

export type Iid = Node & {
  __typename?: 'Iid';
  accordedRight: Scalars['JSON']['output'];
  alsoKnownAs: Scalars['String']['output'];
  assertionMethod?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  authentication?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  capabilityDelegation?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  capabilityInvocation?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  context: Scalars['JSON']['output'];
  controller?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Reads a single `Entity` that is related to this `Iid`. */
  entityById?: Maybe<Entity>;
  id: Scalars['String']['output'];
  keyAgreement?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  linkedClaim: Scalars['JSON']['output'];
  linkedEntity: Scalars['JSON']['output'];
  linkedResource: Scalars['JSON']['output'];
  metadata: Scalars['JSON']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  service: Scalars['JSON']['output'];
  verificationMethod: Scalars['JSON']['output'];
};

/** A condition to be used against `Iid` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type IidCondition = {
  /** Checks for equality with the object’s `accordedRight` field. */
  accordedRight?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `alsoKnownAs` field. */
  alsoKnownAs?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `assertionMethod` field. */
  assertionMethod?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `authentication` field. */
  authentication?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `capabilityDelegation` field. */
  capabilityDelegation?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `capabilityInvocation` field. */
  capabilityInvocation?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `context` field. */
  context?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `controller` field. */
  controller?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `keyAgreement` field. */
  keyAgreement?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `linkedClaim` field. */
  linkedClaim?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `linkedEntity` field. */
  linkedEntity?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `linkedResource` field. */
  linkedResource?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `service` field. */
  service?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `verificationMethod` field. */
  verificationMethod?: InputMaybe<Scalars['JSON']['input']>;
};

/** A filter to be used against `Iid` object types. All fields are combined with a logical ‘and.’ */
export type IidFilter = {
  /** Filter by the object’s `accordedRight` field. */
  accordedRight?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `alsoKnownAs` field. */
  alsoKnownAs?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<IidFilter>>;
  /** Filter by the object’s `assertionMethod` field. */
  assertionMethod?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `authentication` field. */
  authentication?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `capabilityDelegation` field. */
  capabilityDelegation?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `capabilityInvocation` field. */
  capabilityInvocation?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `context` field. */
  context?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `controller` field. */
  controller?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `entityById` relation. */
  entityById?: InputMaybe<EntityFilter>;
  /** A related `entityById` exists. */
  entityByIdExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Filter by the object’s `keyAgreement` field. */
  keyAgreement?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `linkedClaim` field. */
  linkedClaim?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `linkedEntity` field. */
  linkedEntity?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `linkedResource` field. */
  linkedResource?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `metadata` field. */
  metadata?: InputMaybe<JsonFilter>;
  /** Negates the expression. */
  not?: InputMaybe<IidFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<IidFilter>>;
  /** Filter by the object’s `service` field. */
  service?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `verificationMethod` field. */
  verificationMethod?: InputMaybe<JsonFilter>;
};

/** A connection to a list of `Iid` values. */
export type IidsConnection = {
  __typename?: 'IidsConnection';
  /** A list of edges which contains the `Iid` and cursor to aid in pagination. */
  edges: Array<IidsEdge>;
  /** A list of `Iid` objects. */
  nodes: Array<Iid>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Iid` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Iid` edge in the connection. */
export type IidsEdge = {
  __typename?: 'IidsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Iid` at the end of the edge. */
  node: Iid;
};

/** Methods to use when ordering `Iid`. */
export enum IidsOrderBy {
  AccordedRightAsc = 'ACCORDED_RIGHT_ASC',
  AccordedRightDesc = 'ACCORDED_RIGHT_DESC',
  AlsoKnownAsAsc = 'ALSO_KNOWN_AS_ASC',
  AlsoKnownAsDesc = 'ALSO_KNOWN_AS_DESC',
  AssertionMethodAsc = 'ASSERTION_METHOD_ASC',
  AssertionMethodDesc = 'ASSERTION_METHOD_DESC',
  AuthenticationAsc = 'AUTHENTICATION_ASC',
  AuthenticationDesc = 'AUTHENTICATION_DESC',
  CapabilityDelegationAsc = 'CAPABILITY_DELEGATION_ASC',
  CapabilityDelegationDesc = 'CAPABILITY_DELEGATION_DESC',
  CapabilityInvocationAsc = 'CAPABILITY_INVOCATION_ASC',
  CapabilityInvocationDesc = 'CAPABILITY_INVOCATION_DESC',
  ContextAsc = 'CONTEXT_ASC',
  ContextDesc = 'CONTEXT_DESC',
  ControllerAsc = 'CONTROLLER_ASC',
  ControllerDesc = 'CONTROLLER_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  KeyAgreementAsc = 'KEY_AGREEMENT_ASC',
  KeyAgreementDesc = 'KEY_AGREEMENT_DESC',
  LinkedClaimAsc = 'LINKED_CLAIM_ASC',
  LinkedClaimDesc = 'LINKED_CLAIM_DESC',
  LinkedEntityAsc = 'LINKED_ENTITY_ASC',
  LinkedEntityDesc = 'LINKED_ENTITY_DESC',
  LinkedResourceAsc = 'LINKED_RESOURCE_ASC',
  LinkedResourceDesc = 'LINKED_RESOURCE_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ServiceAsc = 'SERVICE_ASC',
  ServiceDesc = 'SERVICE_DESC',
  VerificationMethodAsc = 'VERIFICATION_METHOD_ASC',
  VerificationMethodDesc = 'VERIFICATION_METHOD_DESC'
}

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Ipf = Node & {
  __typename?: 'Ipf';
  cid: Scalars['String']['output'];
  contentType: Scalars['String']['output'];
  data: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** A condition to be used against `Ipf` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type IpfCondition = {
  /** Checks for equality with the object’s `cid` field. */
  cid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `contentType` field. */
  contentType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `data` field. */
  data?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `Ipf` object types. All fields are combined with a logical ‘and.’ */
export type IpfFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<IpfFilter>>;
  /** Filter by the object’s `cid` field. */
  cid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `contentType` field. */
  contentType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `data` field. */
  data?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<IpfFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<IpfFilter>>;
};

/** A connection to a list of `Ipf` values. */
export type IpfsConnection = {
  __typename?: 'IpfsConnection';
  /** A list of edges which contains the `Ipf` and cursor to aid in pagination. */
  edges: Array<IpfsEdge>;
  /** A list of `Ipf` objects. */
  nodes: Array<Ipf>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Ipf` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Ipf` edge in the connection. */
export type IpfsEdge = {
  __typename?: 'IpfsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Ipf` at the end of the edge. */
  node: Ipf;
};

/** Methods to use when ordering `Ipf`. */
export enum IpfsOrderBy {
  CidAsc = 'CID_ASC',
  CidDesc = 'CID_DESC',
  ContentTypeAsc = 'CONTENT_TYPE_ASC',
  ContentTypeDesc = 'CONTENT_TYPE_DESC',
  DataAsc = 'DATA_ASC',
  DataDesc = 'DATA_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type IxoSwap = Node & {
  __typename?: 'IxoSwap';
  address: Scalars['String']['output'];
  frozen: Scalars['Boolean']['output'];
  /** Reads and enables pagination through a set of `IxoSwapPriceHistory`. */
  ixoSwapPriceHistoriesByAddress: IxoSwapPriceHistoriesConnection;
  lpAddress: Scalars['String']['output'];
  lpFeePercent: Scalars['String']['output'];
  maxSlippagePercent: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  owner: Scalars['String']['output'];
  pendingOwner?: Maybe<Scalars['String']['output']>;
  protocolFeePercent: Scalars['String']['output'];
  protocolFeeRecipient: Scalars['String']['output'];
  token2Denom: Scalars['String']['output'];
  token2Reserve: Scalars['BigInt']['output'];
  token1155Denom: Scalars['String']['output'];
  token1155Reserve: Scalars['BigInt']['output'];
};


export type IxoSwapIxoSwapPriceHistoriesByAddressArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<IxoSwapPriceHistoryCondition>;
  filter?: InputMaybe<IxoSwapPriceHistoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IxoSwapPriceHistoriesOrderBy>>;
};

/** A condition to be used against `IxoSwap` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type IxoSwapCondition = {
  /** Checks for equality with the object’s `address` field. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `frozen` field. */
  frozen?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `lpAddress` field. */
  lpAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `lpFeePercent` field. */
  lpFeePercent?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `maxSlippagePercent` field. */
  maxSlippagePercent?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `owner` field. */
  owner?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `pendingOwner` field. */
  pendingOwner?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `protocolFeePercent` field. */
  protocolFeePercent?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `protocolFeeRecipient` field. */
  protocolFeeRecipient?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `token2Denom` field. */
  token2Denom?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `token2Reserve` field. */
  token2Reserve?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `token1155Denom` field. */
  token1155Denom?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `token1155Reserve` field. */
  token1155Reserve?: InputMaybe<Scalars['BigInt']['input']>;
};

/** A filter to be used against `IxoSwap` object types. All fields are combined with a logical ‘and.’ */
export type IxoSwapFilter = {
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<IxoSwapFilter>>;
  /** Filter by the object’s `frozen` field. */
  frozen?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `ixoSwapPriceHistoriesByAddress` relation. */
  ixoSwapPriceHistoriesByAddress?: InputMaybe<IxoSwapToManyIxoSwapPriceHistoryFilter>;
  /** Some related `ixoSwapPriceHistoriesByAddress` exist. */
  ixoSwapPriceHistoriesByAddressExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `lpAddress` field. */
  lpAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lpFeePercent` field. */
  lpFeePercent?: InputMaybe<StringFilter>;
  /** Filter by the object’s `maxSlippagePercent` field. */
  maxSlippagePercent?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<IxoSwapFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<IxoSwapFilter>>;
  /** Filter by the object’s `owner` field. */
  owner?: InputMaybe<StringFilter>;
  /** Filter by the object’s `pendingOwner` field. */
  pendingOwner?: InputMaybe<StringFilter>;
  /** Filter by the object’s `protocolFeePercent` field. */
  protocolFeePercent?: InputMaybe<StringFilter>;
  /** Filter by the object’s `protocolFeeRecipient` field. */
  protocolFeeRecipient?: InputMaybe<StringFilter>;
  /** Filter by the object’s `token2Denom` field. */
  token2Denom?: InputMaybe<StringFilter>;
  /** Filter by the object’s `token2Reserve` field. */
  token2Reserve?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `token1155Denom` field. */
  token1155Denom?: InputMaybe<StringFilter>;
  /** Filter by the object’s `token1155Reserve` field. */
  token1155Reserve?: InputMaybe<BigIntFilter>;
};

/** A connection to a list of `IxoSwapPriceHistory` values. */
export type IxoSwapPriceHistoriesConnection = {
  __typename?: 'IxoSwapPriceHistoriesConnection';
  /** A list of edges which contains the `IxoSwapPriceHistory` and cursor to aid in pagination. */
  edges: Array<IxoSwapPriceHistoriesEdge>;
  /** A list of `IxoSwapPriceHistory` objects. */
  nodes: Array<IxoSwapPriceHistory>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `IxoSwapPriceHistory` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `IxoSwapPriceHistory` edge in the connection. */
export type IxoSwapPriceHistoriesEdge = {
  __typename?: 'IxoSwapPriceHistoriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `IxoSwapPriceHistory` at the end of the edge. */
  node: IxoSwapPriceHistory;
};

/** Methods to use when ordering `IxoSwapPriceHistory`. */
export enum IxoSwapPriceHistoriesOrderBy {
  AddressAsc = 'ADDRESS_ASC',
  AddressDesc = 'ADDRESS_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  Token_2PriceAsc = 'TOKEN_2_PRICE_ASC',
  Token_2PriceDesc = 'TOKEN_2_PRICE_DESC',
  Token_1155PriceAsc = 'TOKEN_1155_PRICE_ASC',
  Token_1155PriceDesc = 'TOKEN_1155_PRICE_DESC'
}

export type IxoSwapPriceHistory = Node & {
  __typename?: 'IxoSwapPriceHistory';
  address: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  /** Reads a single `IxoSwap` that is related to this `IxoSwapPriceHistory`. */
  ixoSwapByAddress?: Maybe<IxoSwap>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  timestamp: Scalars['Datetime']['output'];
  token2Price: Scalars['BigFloat']['output'];
  token1155Price: Scalars['BigFloat']['output'];
};

/**
 * A condition to be used against `IxoSwapPriceHistory` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type IxoSwapPriceHistoryCondition = {
  /** Checks for equality with the object’s `address` field. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `token2Price` field. */
  token2Price?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Checks for equality with the object’s `token1155Price` field. */
  token1155Price?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** A filter to be used against `IxoSwapPriceHistory` object types. All fields are combined with a logical ‘and.’ */
export type IxoSwapPriceHistoryFilter = {
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<IxoSwapPriceHistoryFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Filter by the object’s `ixoSwapByAddress` relation. */
  ixoSwapByAddress?: InputMaybe<IxoSwapFilter>;
  /** Negates the expression. */
  not?: InputMaybe<IxoSwapPriceHistoryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<IxoSwapPriceHistoryFilter>>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `token2Price` field. */
  token2Price?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `token1155Price` field. */
  token1155Price?: InputMaybe<BigFloatFilter>;
};

/** A filter to be used against many `IxoSwapPriceHistory` object types. All fields are combined with a logical ‘and.’ */
export type IxoSwapToManyIxoSwapPriceHistoryFilter = {
  /** Every related `IxoSwapPriceHistory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<IxoSwapPriceHistoryFilter>;
  /** No related `IxoSwapPriceHistory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<IxoSwapPriceHistoryFilter>;
  /** Some related `IxoSwapPriceHistory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<IxoSwapPriceHistoryFilter>;
};

/** A connection to a list of `IxoSwap` values. */
export type IxoSwapsConnection = {
  __typename?: 'IxoSwapsConnection';
  /** A list of edges which contains the `IxoSwap` and cursor to aid in pagination. */
  edges: Array<IxoSwapsEdge>;
  /** A list of `IxoSwap` objects. */
  nodes: Array<IxoSwap>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `IxoSwap` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `IxoSwap` edge in the connection. */
export type IxoSwapsEdge = {
  __typename?: 'IxoSwapsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `IxoSwap` at the end of the edge. */
  node: IxoSwap;
};

/** Methods to use when ordering `IxoSwap`. */
export enum IxoSwapsOrderBy {
  AddressAsc = 'ADDRESS_ASC',
  AddressDesc = 'ADDRESS_DESC',
  FrozenAsc = 'FROZEN_ASC',
  FrozenDesc = 'FROZEN_DESC',
  LpAddressAsc = 'LP_ADDRESS_ASC',
  LpAddressDesc = 'LP_ADDRESS_DESC',
  LpFeePercentAsc = 'LP_FEE_PERCENT_ASC',
  LpFeePercentDesc = 'LP_FEE_PERCENT_DESC',
  MaxSlippagePercentAsc = 'MAX_SLIPPAGE_PERCENT_ASC',
  MaxSlippagePercentDesc = 'MAX_SLIPPAGE_PERCENT_DESC',
  Natural = 'NATURAL',
  OwnerAsc = 'OWNER_ASC',
  OwnerDesc = 'OWNER_DESC',
  PendingOwnerAsc = 'PENDING_OWNER_ASC',
  PendingOwnerDesc = 'PENDING_OWNER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProtocolFeePercentAsc = 'PROTOCOL_FEE_PERCENT_ASC',
  ProtocolFeePercentDesc = 'PROTOCOL_FEE_PERCENT_DESC',
  ProtocolFeeRecipientAsc = 'PROTOCOL_FEE_RECIPIENT_ASC',
  ProtocolFeeRecipientDesc = 'PROTOCOL_FEE_RECIPIENT_DESC',
  Token_2DenomAsc = 'TOKEN_2_DENOM_ASC',
  Token_2DenomDesc = 'TOKEN_2_DENOM_DESC',
  Token_2ReserveAsc = 'TOKEN_2_RESERVE_ASC',
  Token_2ReserveDesc = 'TOKEN_2_RESERVE_DESC',
  Token_1155DenomAsc = 'TOKEN_1155_DENOM_ASC',
  Token_1155DenomDesc = 'TOKEN_1155_DENOM_DESC',
  Token_1155ReserveAsc = 'TOKEN_1155_RESERVE_ASC',
  Token_1155ReserveDesc = 'TOKEN_1155_RESERVE_DESC'
}

/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type JsonFilter = {
  /** Contained by the specified JSON. */
  containedBy?: InputMaybe<Scalars['JSON']['input']>;
  /** Contains the specified JSON. */
  contains?: InputMaybe<Scalars['JSON']['input']>;
  /** Contains all of the specified keys. */
  containsAllKeys?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains any of the specified keys. */
  containsAnyKeys?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified key. */
  containsKey?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['JSON']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['JSON']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['JSON']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['JSON']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['JSON']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['JSON']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['JSON']['input']>>;
};

export type Message = Node & {
  __typename?: 'Message';
  denoms?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  from?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  to?: Maybe<Scalars['String']['output']>;
  tokenNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Reads a single `Transaction` that is related to this `Message`. */
  transactionByTransactionHash?: Maybe<Transaction>;
  transactionHash: Scalars['String']['output'];
  typeUrl: Scalars['String']['output'];
  value: Scalars['JSON']['output'];
};

/** A condition to be used against `Message` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MessageCondition = {
  /** Checks for equality with the object’s `denoms` field. */
  denoms?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `from` field. */
  from?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `to` field. */
  to?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tokenNames` field. */
  tokenNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `transactionHash` field. */
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `typeUrl` field. */
  typeUrl?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `value` field. */
  value?: InputMaybe<Scalars['JSON']['input']>;
};

/** A filter to be used against `Message` object types. All fields are combined with a logical ‘and.’ */
export type MessageFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MessageFilter>>;
  /** Filter by the object’s `denoms` field. */
  denoms?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `from` field. */
  from?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MessageFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MessageFilter>>;
  /** Filter by the object’s `to` field. */
  to?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tokenNames` field. */
  tokenNames?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `transactionByTransactionHash` relation. */
  transactionByTransactionHash?: InputMaybe<TransactionFilter>;
  /** Filter by the object’s `transactionHash` field. */
  transactionHash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `typeUrl` field. */
  typeUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `value` field. */
  value?: InputMaybe<JsonFilter>;
};

/** A connection to a list of `Message` values. */
export type MessagesConnection = {
  __typename?: 'MessagesConnection';
  /** A list of edges which contains the `Message` and cursor to aid in pagination. */
  edges: Array<MessagesEdge>;
  /** A list of `Message` objects. */
  nodes: Array<Message>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Message` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Message` edge in the connection. */
export type MessagesEdge = {
  __typename?: 'MessagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Message` at the end of the edge. */
  node: Message;
};

/** Methods to use when ordering `Message`. */
export enum MessagesOrderBy {
  DenomsAsc = 'DENOMS_ASC',
  DenomsDesc = 'DENOMS_DESC',
  FromAsc = 'FROM_ASC',
  FromDesc = 'FROM_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TokenNamesAsc = 'TOKEN_NAMES_ASC',
  TokenNamesDesc = 'TOKEN_NAMES_DESC',
  ToAsc = 'TO_ASC',
  ToDesc = 'TO_DESC',
  TransactionHashAsc = 'TRANSACTION_HASH_ASC',
  TransactionHashDesc = 'TRANSACTION_HASH_DESC',
  TypeUrlAsc = 'TYPE_URL_ASC',
  TypeUrlDesc = 'TYPE_URL_DESC',
  ValueAsc = 'VALUE_ASC',
  ValueDesc = 'VALUE_DESC'
}

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

export type OutcomePayment = Node & {
  __typename?: 'OutcomePayment';
  amount: Scalars['JSON']['output'];
  /** Reads a single `Bond` that is related to this `OutcomePayment`. */
  bondByBondDid?: Maybe<Bond>;
  bondDid: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  senderAddress: Scalars['String']['output'];
  senderDid: Scalars['String']['output'];
  timestamp: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `OutcomePayment` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type OutcomePaymentCondition = {
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `bondDid` field. */
  bondDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `height` field. */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `senderAddress` field. */
  senderAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `senderDid` field. */
  senderDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against `OutcomePayment` object types. All fields are combined with a logical ‘and.’ */
export type OutcomePaymentFilter = {
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<OutcomePaymentFilter>>;
  /** Filter by the object’s `bondByBondDid` relation. */
  bondByBondDid?: InputMaybe<BondFilter>;
  /** Filter by the object’s `bondDid` field. */
  bondDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `height` field. */
  height?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<OutcomePaymentFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OutcomePaymentFilter>>;
  /** Filter by the object’s `senderAddress` field. */
  senderAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `senderDid` field. */
  senderDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: InputMaybe<DatetimeFilter>;
};

/** A connection to a list of `OutcomePayment` values. */
export type OutcomePaymentsConnection = {
  __typename?: 'OutcomePaymentsConnection';
  /** A list of edges which contains the `OutcomePayment` and cursor to aid in pagination. */
  edges: Array<OutcomePaymentsEdge>;
  /** A list of `OutcomePayment` objects. */
  nodes: Array<OutcomePayment>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `OutcomePayment` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `OutcomePayment` edge in the connection. */
export type OutcomePaymentsEdge = {
  __typename?: 'OutcomePaymentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `OutcomePayment` at the end of the edge. */
  node: OutcomePayment;
};

/** Methods to use when ordering `OutcomePayment`. */
export enum OutcomePaymentsOrderBy {
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  BondDidAsc = 'BOND_DID_ASC',
  BondDidDesc = 'BOND_DID_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SenderAddressAsc = 'SENDER_ADDRESS_ASC',
  SenderAddressDesc = 'SENDER_ADDRESS_DESC',
  SenderDidAsc = 'SENDER_DID_ASC',
  SenderDidDesc = 'SENDER_DID_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type Pgmigration = Node & {
  __typename?: 'Pgmigration';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  runOn: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `Pgmigration` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PgmigrationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `runOn` field. */
  runOn?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against `Pgmigration` object types. All fields are combined with a logical ‘and.’ */
export type PgmigrationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PgmigrationFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PgmigrationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PgmigrationFilter>>;
  /** Filter by the object’s `runOn` field. */
  runOn?: InputMaybe<DatetimeFilter>;
};

/** A connection to a list of `Pgmigration` values. */
export type PgmigrationsConnection = {
  __typename?: 'PgmigrationsConnection';
  /** A list of edges which contains the `Pgmigration` and cursor to aid in pagination. */
  edges: Array<PgmigrationsEdge>;
  /** A list of `Pgmigration` objects. */
  nodes: Array<Pgmigration>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Pgmigration` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Pgmigration` edge in the connection. */
export type PgmigrationsEdge = {
  __typename?: 'PgmigrationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Pgmigration` at the end of the edge. */
  node: Pgmigration;
};

/** Methods to use when ordering `Pgmigration`. */
export enum PgmigrationsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RunOnAsc = 'RUN_ON_ASC',
  RunOnDesc = 'RUN_ON_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  bond?: Maybe<Bond>;
  bondAlpha?: Maybe<BondAlpha>;
  /** Reads a single `BondAlpha` using its globally unique `ID`. */
  bondAlphaByNodeId?: Maybe<BondAlpha>;
  /** Reads and enables pagination through a set of `BondAlpha`. */
  bondAlphas?: Maybe<BondAlphasConnection>;
  bondBuy?: Maybe<BondBuy>;
  /** Reads a single `BondBuy` using its globally unique `ID`. */
  bondBuyByNodeId?: Maybe<BondBuy>;
  /** Reads and enables pagination through a set of `BondBuy`. */
  bondBuys?: Maybe<BondBuysConnection>;
  /** Reads a single `Bond` using its globally unique `ID`. */
  bondByNodeId?: Maybe<Bond>;
  bondSell?: Maybe<BondSell>;
  /** Reads a single `BondSell` using its globally unique `ID`. */
  bondSellByNodeId?: Maybe<BondSell>;
  /** Reads and enables pagination through a set of `BondSell`. */
  bondSells?: Maybe<BondSellsConnection>;
  bondSwap?: Maybe<BondSwap>;
  /** Reads a single `BondSwap` using its globally unique `ID`. */
  bondSwapByNodeId?: Maybe<BondSwap>;
  /** Reads and enables pagination through a set of `BondSwap`. */
  bondSwaps?: Maybe<BondSwapsConnection>;
  /** Reads and enables pagination through a set of `Bond`. */
  bonds?: Maybe<BondsConnection>;
  chain?: Maybe<Chain>;
  /** Reads a single `Chain` using its globally unique `ID`. */
  chainByNodeId?: Maybe<Chain>;
  /** Reads and enables pagination through a set of `Chain`. */
  chains?: Maybe<ChainsConnection>;
  claim?: Maybe<Claim>;
  /** Reads a single `Claim` using its globally unique `ID`. */
  claimByNodeId?: Maybe<Claim>;
  claimCollection?: Maybe<ClaimCollection>;
  /** Reads a single `ClaimCollection` using its globally unique `ID`. */
  claimCollectionByNodeId?: Maybe<ClaimCollection>;
  /** Reads and enables pagination through a set of `ClaimCollection`. */
  claimCollections?: Maybe<ClaimCollectionsConnection>;
  /** Reads and enables pagination through a set of `Claim`. */
  claims?: Maybe<ClaimsConnection>;
  deviceExternalIdsLoaded: Scalars['Boolean']['output'];
  dispute?: Maybe<Dispute>;
  /** Reads a single `Dispute` using its globally unique `ID`. */
  disputeByNodeId?: Maybe<Dispute>;
  /** Reads and enables pagination through a set of `Dispute`. */
  disputes?: Maybe<DisputesConnection>;
  /** Reads and enables pagination through a set of `Entity`. */
  entities?: Maybe<EntitiesConnection>;
  entity?: Maybe<Entity>;
  /** Reads a single `Entity` using its globally unique `ID`. */
  entityByNodeId?: Maybe<Entity>;
  evaluation?: Maybe<Evaluation>;
  /** Reads a single `Evaluation` using its globally unique `ID`. */
  evaluationByNodeId?: Maybe<Evaluation>;
  /** Reads and enables pagination through a set of `Evaluation`. */
  evaluations?: Maybe<EvaluationsConnection>;
  getAccountTokens: Scalars['JSON']['output'];
  getTokensTotalByAddress: Scalars['JSON']['output'];
  getTokensTotalForCollection: Scalars['JSON']['output'];
  getTokensTotalForCollectionAmounts: Scalars['JSON']['output'];
  getTokensTotalForEntities: Scalars['JSON']['output'];
  iid?: Maybe<Iid>;
  /** Reads a single `Iid` using its globally unique `ID`. */
  iidByNodeId?: Maybe<Iid>;
  /** Reads and enables pagination through a set of `Iid`. */
  iids?: Maybe<IidsConnection>;
  ipf?: Maybe<Ipf>;
  /** Reads a single `Ipf` using its globally unique `ID`. */
  ipfByNodeId?: Maybe<Ipf>;
  /** Reads and enables pagination through a set of `Ipf`. */
  ipfs?: Maybe<IpfsConnection>;
  ixoSwap?: Maybe<IxoSwap>;
  /** Reads a single `IxoSwap` using its globally unique `ID`. */
  ixoSwapByNodeId?: Maybe<IxoSwap>;
  /** Reads and enables pagination through a set of `IxoSwapPriceHistory`. */
  ixoSwapPriceHistories?: Maybe<IxoSwapPriceHistoriesConnection>;
  ixoSwapPriceHistory?: Maybe<IxoSwapPriceHistory>;
  /** Reads a single `IxoSwapPriceHistory` using its globally unique `ID`. */
  ixoSwapPriceHistoryByNodeId?: Maybe<IxoSwapPriceHistory>;
  ixoSwapPriceHistoryByTimestampAndAddress?: Maybe<IxoSwapPriceHistory>;
  /** Reads and enables pagination through a set of `IxoSwap`. */
  ixoSwaps?: Maybe<IxoSwapsConnection>;
  message?: Maybe<Message>;
  /** Reads a single `Message` using its globally unique `ID`. */
  messageByNodeId?: Maybe<Message>;
  /** Reads and enables pagination through a set of `Message`. */
  messages?: Maybe<MessagesConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  outcomePayment?: Maybe<OutcomePayment>;
  /** Reads a single `OutcomePayment` using its globally unique `ID`. */
  outcomePaymentByNodeId?: Maybe<OutcomePayment>;
  /** Reads and enables pagination through a set of `OutcomePayment`. */
  outcomePayments?: Maybe<OutcomePaymentsConnection>;
  pgmigration?: Maybe<Pgmigration>;
  /** Reads a single `Pgmigration` using its globally unique `ID`. */
  pgmigrationByNodeId?: Maybe<Pgmigration>;
  /** Reads and enables pagination through a set of `Pgmigration`. */
  pgmigrations?: Maybe<PgmigrationsConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  reserveWithdrawal?: Maybe<ReserveWithdrawal>;
  /** Reads a single `ReserveWithdrawal` using its globally unique `ID`. */
  reserveWithdrawalByNodeId?: Maybe<ReserveWithdrawal>;
  /** Reads and enables pagination through a set of `ReserveWithdrawal`. */
  reserveWithdrawals?: Maybe<ReserveWithdrawalsConnection>;
  shareWithdrawal?: Maybe<ShareWithdrawal>;
  /** Reads a single `ShareWithdrawal` using its globally unique `ID`. */
  shareWithdrawalByNodeId?: Maybe<ShareWithdrawal>;
  /** Reads and enables pagination through a set of `ShareWithdrawal`. */
  shareWithdrawals?: Maybe<ShareWithdrawalsConnection>;
  token?: Maybe<Token>;
  /** Reads a single `Token` using its globally unique `ID`. */
  tokenByNodeId?: Maybe<Token>;
  tokenCancelled?: Maybe<TokenCancelled>;
  /** Reads a single `TokenCancelled` using its globally unique `ID`. */
  tokenCancelledByNodeId?: Maybe<TokenCancelled>;
  /** Reads and enables pagination through a set of `TokenCancelled`. */
  tokenCancelleds?: Maybe<TokenCancelledsConnection>;
  tokenClass?: Maybe<TokenClass>;
  /** Reads a single `TokenClass` using its globally unique `ID`. */
  tokenClassByNodeId?: Maybe<TokenClass>;
  /** Reads and enables pagination through a set of `TokenClass`. */
  tokenClasses?: Maybe<TokenClassesConnection>;
  /** Reads and enables pagination through a set of `TokenDatum`. */
  tokenData?: Maybe<TokenDataConnection>;
  tokenDatum?: Maybe<TokenDatum>;
  /** Reads a single `TokenDatum` using its globally unique `ID`. */
  tokenDatumByNodeId?: Maybe<TokenDatum>;
  tokenRetired?: Maybe<TokenRetired>;
  /** Reads a single `TokenRetired` using its globally unique `ID`. */
  tokenRetiredByNodeId?: Maybe<TokenRetired>;
  /** Reads and enables pagination through a set of `TokenRetired`. */
  tokenRetireds?: Maybe<TokenRetiredsConnection>;
  tokenTransaction?: Maybe<TokenTransaction>;
  /** Reads a single `TokenTransaction` using its globally unique `ID`. */
  tokenTransactionByNodeId?: Maybe<TokenTransaction>;
  /** Reads and enables pagination through a set of `TokenTransaction`. */
  tokenTransactions?: Maybe<TokenTransactionsConnection>;
  tokenomicsAccount?: Maybe<TokenomicsAccount>;
  /** Reads a single `TokenomicsAccount` using its globally unique `ID`. */
  tokenomicsAccountByNodeId?: Maybe<TokenomicsAccount>;
  /** Reads and enables pagination through a set of `TokenomicsAccount`. */
  tokenomicsAccounts?: Maybe<TokenomicsAccountsConnection>;
  tokenomicsInflation: Scalars['JSON']['output'];
  tokenomicsSupplyCommunityPool: Scalars['JSON']['output'];
  tokenomicsSupplyIBC: Scalars['JSON']['output'];
  tokenomicsSupplyStaked: Scalars['JSON']['output'];
  tokenomicsSupplyTotal: Scalars['JSON']['output'];
  /** Reads and enables pagination through a set of `Token`. */
  tokens?: Maybe<TokensConnection>;
  transaction?: Maybe<Transaction>;
  /** Reads a single `Transaction` using its globally unique `ID`. */
  transactionByNodeId?: Maybe<Transaction>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactions?: Maybe<TransactionsConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBondArgs = {
  bondDid: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBondAlphaArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBondAlphaByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBondAlphasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BondAlphaCondition>;
  filter?: InputMaybe<BondAlphaFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BondAlphasOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBondBuyArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBondBuyByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBondBuysArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BondBuyCondition>;
  filter?: InputMaybe<BondBuyFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BondBuysOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBondByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBondSellArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBondSellByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBondSellsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BondSellCondition>;
  filter?: InputMaybe<BondSellFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BondSellsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBondSwapArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBondSwapByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBondSwapsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BondSwapCondition>;
  filter?: InputMaybe<BondSwapFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BondSwapsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBondsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BondCondition>;
  filter?: InputMaybe<BondFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BondsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryChainArgs = {
  chainId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChainByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChainsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ChainCondition>;
  filter?: InputMaybe<ChainFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChainsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryClaimArgs = {
  claimId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryClaimByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryClaimCollectionArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryClaimCollectionByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryClaimCollectionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ClaimCollectionCondition>;
  filter?: InputMaybe<ClaimCollectionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClaimCollectionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryClaimsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ClaimCondition>;
  filter?: InputMaybe<ClaimFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClaimsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDisputeArgs = {
  proof: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDisputeByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDisputesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DisputeCondition>;
  filter?: InputMaybe<DisputeFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DisputesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EntityCondition>;
  filter?: InputMaybe<EntityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EntitiesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEntityArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEntityByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEvaluationArgs = {
  claimId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEvaluationByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEvaluationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EvaluationCondition>;
  filter?: InputMaybe<EvaluationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvaluationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetAccountTokensArgs = {
  address: Scalars['String']['input'];
  allEntityRetired?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetTokensTotalByAddressArgs = {
  address: Scalars['String']['input'];
  allEntityRetired?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetTokensTotalForCollectionArgs = {
  allEntityRetired?: InputMaybe<Scalars['Boolean']['input']>;
  did: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetTokensTotalForCollectionAmountsArgs = {
  allEntityRetired?: InputMaybe<Scalars['Boolean']['input']>;
  did: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetTokensTotalForEntitiesArgs = {
  address: Scalars['String']['input'];
  allEntityRetired?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryIidArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIidByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIidsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<IidCondition>;
  filter?: InputMaybe<IidFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IidsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryIpfArgs = {
  cid: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIpfByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIpfsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<IpfCondition>;
  filter?: InputMaybe<IpfFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IpfsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryIxoSwapArgs = {
  address: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIxoSwapByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIxoSwapPriceHistoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<IxoSwapPriceHistoryCondition>;
  filter?: InputMaybe<IxoSwapPriceHistoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IxoSwapPriceHistoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryIxoSwapPriceHistoryArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIxoSwapPriceHistoryByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIxoSwapPriceHistoryByTimestampAndAddressArgs = {
  address: Scalars['String']['input'];
  timestamp: Scalars['Datetime']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIxoSwapsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<IxoSwapCondition>;
  filter?: InputMaybe<IxoSwapFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IxoSwapsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMessageArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessageByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MessageCondition>;
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOutcomePaymentArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOutcomePaymentByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOutcomePaymentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<OutcomePaymentCondition>;
  filter?: InputMaybe<OutcomePaymentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OutcomePaymentsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPgmigrationArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPgmigrationByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPgmigrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PgmigrationCondition>;
  filter?: InputMaybe<PgmigrationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PgmigrationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryReserveWithdrawalArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReserveWithdrawalByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReserveWithdrawalsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReserveWithdrawalCondition>;
  filter?: InputMaybe<ReserveWithdrawalFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReserveWithdrawalsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryShareWithdrawalArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryShareWithdrawalByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryShareWithdrawalsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ShareWithdrawalCondition>;
  filter?: InputMaybe<ShareWithdrawalFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShareWithdrawalsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenArgs = {
  id: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenCancelledArgs = {
  aid: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenCancelledByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenCancelledsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenCancelledCondition>;
  filter?: InputMaybe<TokenCancelledFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenCancelledsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenClassArgs = {
  contractAddress: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenClassByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenClassesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenClassCondition>;
  filter?: InputMaybe<TokenClassFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenClassesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenDataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenDatumCondition>;
  filter?: InputMaybe<TokenDatumFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenDataOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenDatumArgs = {
  aid: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenDatumByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenRetiredArgs = {
  aid: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenRetiredByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenRetiredsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenRetiredCondition>;
  filter?: InputMaybe<TokenRetiredFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenRetiredsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenTransactionArgs = {
  aid: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenTransactionByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenTransactionCondition>;
  filter?: InputMaybe<TokenTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenTransactionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenomicsAccountArgs = {
  address: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenomicsAccountByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTokenomicsAccountsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenomicsAccountCondition>;
  filter?: InputMaybe<TokenomicsAccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenomicsAccountsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTokensArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenCondition>;
  filter?: InputMaybe<TokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokensOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTransactionArgs = {
  hash: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTransactionByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TransactionCondition>;
  filter?: InputMaybe<TransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransactionsOrderBy>>;
};

export type ReserveWithdrawal = Node & {
  __typename?: 'ReserveWithdrawal';
  amount: Scalars['JSON']['output'];
  /** Reads a single `Bond` that is related to this `ReserveWithdrawal`. */
  bondByBondDid?: Maybe<Bond>;
  bondDid: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  reserveWithdrawalAddress: Scalars['String']['output'];
  timestamp: Scalars['Datetime']['output'];
  withdrawerAddress: Scalars['String']['output'];
  withdrawerDid: Scalars['String']['output'];
};

/**
 * A condition to be used against `ReserveWithdrawal` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ReserveWithdrawalCondition = {
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `bondDid` field. */
  bondDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `height` field. */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `reserveWithdrawalAddress` field. */
  reserveWithdrawalAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `withdrawerAddress` field. */
  withdrawerAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `withdrawerDid` field. */
  withdrawerDid?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `ReserveWithdrawal` object types. All fields are combined with a logical ‘and.’ */
export type ReserveWithdrawalFilter = {
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ReserveWithdrawalFilter>>;
  /** Filter by the object’s `bondByBondDid` relation. */
  bondByBondDid?: InputMaybe<BondFilter>;
  /** Filter by the object’s `bondDid` field. */
  bondDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `height` field. */
  height?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ReserveWithdrawalFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ReserveWithdrawalFilter>>;
  /** Filter by the object’s `reserveWithdrawalAddress` field. */
  reserveWithdrawalAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `withdrawerAddress` field. */
  withdrawerAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `withdrawerDid` field. */
  withdrawerDid?: InputMaybe<StringFilter>;
};

/** A connection to a list of `ReserveWithdrawal` values. */
export type ReserveWithdrawalsConnection = {
  __typename?: 'ReserveWithdrawalsConnection';
  /** A list of edges which contains the `ReserveWithdrawal` and cursor to aid in pagination. */
  edges: Array<ReserveWithdrawalsEdge>;
  /** A list of `ReserveWithdrawal` objects. */
  nodes: Array<ReserveWithdrawal>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ReserveWithdrawal` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ReserveWithdrawal` edge in the connection. */
export type ReserveWithdrawalsEdge = {
  __typename?: 'ReserveWithdrawalsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ReserveWithdrawal` at the end of the edge. */
  node: ReserveWithdrawal;
};

/** Methods to use when ordering `ReserveWithdrawal`. */
export enum ReserveWithdrawalsOrderBy {
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  BondDidAsc = 'BOND_DID_ASC',
  BondDidDesc = 'BOND_DID_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReserveWithdrawalAddressAsc = 'RESERVE_WITHDRAWAL_ADDRESS_ASC',
  ReserveWithdrawalAddressDesc = 'RESERVE_WITHDRAWAL_ADDRESS_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  WithdrawerAddressAsc = 'WITHDRAWER_ADDRESS_ASC',
  WithdrawerAddressDesc = 'WITHDRAWER_ADDRESS_DESC',
  WithdrawerDidAsc = 'WITHDRAWER_DID_ASC',
  WithdrawerDidDesc = 'WITHDRAWER_DID_DESC'
}

export type ShareWithdrawal = Node & {
  __typename?: 'ShareWithdrawal';
  amount: Scalars['JSON']['output'];
  /** Reads a single `Bond` that is related to this `ShareWithdrawal`. */
  bondByBondDid?: Maybe<Bond>;
  bondDid: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  recipientAddress: Scalars['String']['output'];
  recipientDid: Scalars['String']['output'];
  timestamp: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `ShareWithdrawal` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ShareWithdrawalCondition = {
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `bondDid` field. */
  bondDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `height` field. */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `recipientAddress` field. */
  recipientAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `recipientDid` field. */
  recipientDid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against `ShareWithdrawal` object types. All fields are combined with a logical ‘and.’ */
export type ShareWithdrawalFilter = {
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ShareWithdrawalFilter>>;
  /** Filter by the object’s `bondByBondDid` relation. */
  bondByBondDid?: InputMaybe<BondFilter>;
  /** Filter by the object’s `bondDid` field. */
  bondDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `height` field. */
  height?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ShareWithdrawalFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ShareWithdrawalFilter>>;
  /** Filter by the object’s `recipientAddress` field. */
  recipientAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `recipientDid` field. */
  recipientDid?: InputMaybe<StringFilter>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: InputMaybe<DatetimeFilter>;
};

/** A connection to a list of `ShareWithdrawal` values. */
export type ShareWithdrawalsConnection = {
  __typename?: 'ShareWithdrawalsConnection';
  /** A list of edges which contains the `ShareWithdrawal` and cursor to aid in pagination. */
  edges: Array<ShareWithdrawalsEdge>;
  /** A list of `ShareWithdrawal` objects. */
  nodes: Array<ShareWithdrawal>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ShareWithdrawal` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ShareWithdrawal` edge in the connection. */
export type ShareWithdrawalsEdge = {
  __typename?: 'ShareWithdrawalsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ShareWithdrawal` at the end of the edge. */
  node: ShareWithdrawal;
};

/** Methods to use when ordering `ShareWithdrawal`. */
export enum ShareWithdrawalsOrderBy {
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  BondDidAsc = 'BOND_DID_ASC',
  BondDidDesc = 'BOND_DID_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RecipientAddressAsc = 'RECIPIENT_ADDRESS_ASC',
  RecipientAddressDesc = 'RECIPIENT_ADDRESS_DESC',
  RecipientDidAsc = 'RECIPIENT_DID_ASC',
  RecipientDidDesc = 'RECIPIENT_DID_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC'
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against String List fields. All fields are combined with a logical ‘and.’ */
export type StringListFilter = {
  /** Any array item is equal to the specified value. */
  anyEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Any array item is greater than the specified value. */
  anyGreaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Any array item is greater than or equal to the specified value. */
  anyGreaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Any array item is less than the specified value. */
  anyLessThan?: InputMaybe<Scalars['String']['input']>;
  /** Any array item is less than or equal to the specified value. */
  anyLessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Any array item is not equal to the specified value. */
  anyNotEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Contained by the specified list of values. */
  containedBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Contains the specified list of values. */
  contains?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Overlaps the specified list of values. */
  overlaps?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Token = Node & {
  __typename?: 'Token';
  collection: Scalars['String']['output'];
  /** Reads a single `Entity` that is related to this `Token`. */
  entityByCollection?: Maybe<Entity>;
  id: Scalars['String']['output'];
  index: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `TokenClass` that is related to this `Token`. */
  tokenClassByName?: Maybe<TokenClass>;
  /** Reads and enables pagination through a set of `TokenDatum`. */
  tokenDataByTokenId: TokenDataConnection;
  /** Reads and enables pagination through a set of `TokenRetired`. */
  tokenRetiredsById: TokenRetiredsConnection;
  /** Reads and enables pagination through a set of `TokenTransaction`. */
  tokenTransactionsByTokenId: TokenTransactionsConnection;
};


export type TokenTokenDataByTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenDatumCondition>;
  filter?: InputMaybe<TokenDatumFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenDataOrderBy>>;
};


export type TokenTokenRetiredsByIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenRetiredCondition>;
  filter?: InputMaybe<TokenRetiredFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenRetiredsOrderBy>>;
};


export type TokenTokenTransactionsByTokenIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenTransactionCondition>;
  filter?: InputMaybe<TokenTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenTransactionsOrderBy>>;
};

export type TokenCancelled = Node & {
  __typename?: 'TokenCancelled';
  aid: Scalars['Int']['output'];
  amount: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  owner: Scalars['String']['output'];
  reason: Scalars['String']['output'];
  /** Reads a single `TokenClass` that is related to this `TokenCancelled`. */
  tokenClassByName?: Maybe<TokenClass>;
};

export type TokenCancelledAggregates = {
  __typename?: 'TokenCancelledAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<TokenCancelledAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<TokenCancelledDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<TokenCancelledMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<TokenCancelledMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<TokenCancelledStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<TokenCancelledStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<TokenCancelledSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<TokenCancelledVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<TokenCancelledVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `TokenCancelled` object types. */
export type TokenCancelledAggregatesFilter = {
  /** Mean average aggregate over matching `TokenCancelled` objects. */
  average?: InputMaybe<TokenCancelledAverageAggregateFilter>;
  /** Distinct count aggregate over matching `TokenCancelled` objects. */
  distinctCount?: InputMaybe<TokenCancelledDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `TokenCancelled` object to be included within the aggregate. */
  filter?: InputMaybe<TokenCancelledFilter>;
  /** Maximum aggregate over matching `TokenCancelled` objects. */
  max?: InputMaybe<TokenCancelledMaxAggregateFilter>;
  /** Minimum aggregate over matching `TokenCancelled` objects. */
  min?: InputMaybe<TokenCancelledMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `TokenCancelled` objects. */
  stddevPopulation?: InputMaybe<TokenCancelledStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `TokenCancelled` objects. */
  stddevSample?: InputMaybe<TokenCancelledStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `TokenCancelled` objects. */
  sum?: InputMaybe<TokenCancelledSumAggregateFilter>;
  /** Population variance aggregate over matching `TokenCancelled` objects. */
  variancePopulation?: InputMaybe<TokenCancelledVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `TokenCancelled` objects. */
  varianceSample?: InputMaybe<TokenCancelledVarianceSampleAggregateFilter>;
};

export type TokenCancelledAverageAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenCancelledAverageAggregates = {
  __typename?: 'TokenCancelledAverageAggregates';
  /** Mean average of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `TokenCancelled` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TokenCancelledCondition = {
  /** Checks for equality with the object’s `aid` field. */
  aid?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `owner` field. */
  owner?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `reason` field. */
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type TokenCancelledDistinctCountAggregateFilter = {
  aid?: InputMaybe<BigIntFilter>;
  amount?: InputMaybe<BigIntFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<BigIntFilter>;
  owner?: InputMaybe<BigIntFilter>;
  reason?: InputMaybe<BigIntFilter>;
};

export type TokenCancelledDistinctCountAggregates = {
  __typename?: 'TokenCancelledDistinctCountAggregates';
  /** Distinct count of aid across the matching connection */
  aid?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of owner across the matching connection */
  owner?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of reason across the matching connection */
  reason?: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `TokenCancelled` object types. All fields are combined with a logical ‘and.’ */
export type TokenCancelledFilter = {
  /** Filter by the object’s `aid` field. */
  aid?: InputMaybe<IntFilter>;
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<BigIntFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TokenCancelledFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TokenCancelledFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TokenCancelledFilter>>;
  /** Filter by the object’s `owner` field. */
  owner?: InputMaybe<StringFilter>;
  /** Filter by the object’s `reason` field. */
  reason?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tokenClassByName` relation. */
  tokenClassByName?: InputMaybe<TokenClassFilter>;
};

/** Grouping methods for `TokenCancelled` for usage during aggregation. */
export enum TokenCancelledGroupBy {
  Amount = 'AMOUNT',
  Id = 'ID',
  Name = 'NAME',
  Owner = 'OWNER',
  Reason = 'REASON'
}

export type TokenCancelledHavingAverageInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenCancelledHavingDistinctCountInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

/** Conditions for `TokenCancelled` aggregates. */
export type TokenCancelledHavingInput = {
  AND?: InputMaybe<Array<TokenCancelledHavingInput>>;
  OR?: InputMaybe<Array<TokenCancelledHavingInput>>;
  average?: InputMaybe<TokenCancelledHavingAverageInput>;
  distinctCount?: InputMaybe<TokenCancelledHavingDistinctCountInput>;
  max?: InputMaybe<TokenCancelledHavingMaxInput>;
  min?: InputMaybe<TokenCancelledHavingMinInput>;
  stddevPopulation?: InputMaybe<TokenCancelledHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<TokenCancelledHavingStddevSampleInput>;
  sum?: InputMaybe<TokenCancelledHavingSumInput>;
  variancePopulation?: InputMaybe<TokenCancelledHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<TokenCancelledHavingVarianceSampleInput>;
};

export type TokenCancelledHavingMaxInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenCancelledHavingMinInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenCancelledHavingStddevPopulationInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenCancelledHavingStddevSampleInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenCancelledHavingSumInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenCancelledHavingVariancePopulationInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenCancelledHavingVarianceSampleInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenCancelledMaxAggregateFilter = {
  aid?: InputMaybe<IntFilter>;
  amount?: InputMaybe<BigIntFilter>;
};

export type TokenCancelledMaxAggregates = {
  __typename?: 'TokenCancelledMaxAggregates';
  /** Maximum of aid across the matching connection */
  aid?: Maybe<Scalars['Int']['output']>;
  /** Maximum of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']['output']>;
};

export type TokenCancelledMinAggregateFilter = {
  aid?: InputMaybe<IntFilter>;
  amount?: InputMaybe<BigIntFilter>;
};

export type TokenCancelledMinAggregates = {
  __typename?: 'TokenCancelledMinAggregates';
  /** Minimum of aid across the matching connection */
  aid?: Maybe<Scalars['Int']['output']>;
  /** Minimum of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']['output']>;
};

export type TokenCancelledStddevPopulationAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenCancelledStddevPopulationAggregates = {
  __typename?: 'TokenCancelledStddevPopulationAggregates';
  /** Population standard deviation of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

export type TokenCancelledStddevSampleAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenCancelledStddevSampleAggregates = {
  __typename?: 'TokenCancelledStddevSampleAggregates';
  /** Sample standard deviation of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

export type TokenCancelledSumAggregateFilter = {
  aid?: InputMaybe<BigIntFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenCancelledSumAggregates = {
  __typename?: 'TokenCancelledSumAggregates';
  /** Sum of aid across the matching connection */
  aid: Scalars['BigInt']['output'];
  /** Sum of amount across the matching connection */
  amount: Scalars['BigFloat']['output'];
};

export type TokenCancelledVariancePopulationAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenCancelledVariancePopulationAggregates = {
  __typename?: 'TokenCancelledVariancePopulationAggregates';
  /** Population variance of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

export type TokenCancelledVarianceSampleAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenCancelledVarianceSampleAggregates = {
  __typename?: 'TokenCancelledVarianceSampleAggregates';
  /** Sample variance of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `TokenCancelled` values. */
export type TokenCancelledsConnection = {
  __typename?: 'TokenCancelledsConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<TokenCancelledAggregates>;
  /** A list of edges which contains the `TokenCancelled` and cursor to aid in pagination. */
  edges: Array<TokenCancelledsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<TokenCancelledAggregates>>;
  /** A list of `TokenCancelled` objects. */
  nodes: Array<TokenCancelled>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TokenCancelled` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `TokenCancelled` values. */
export type TokenCancelledsConnectionGroupedAggregatesArgs = {
  groupBy: Array<TokenCancelledGroupBy>;
  having?: InputMaybe<TokenCancelledHavingInput>;
};

/** A `TokenCancelled` edge in the connection. */
export type TokenCancelledsEdge = {
  __typename?: 'TokenCancelledsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenCancelled` at the end of the edge. */
  node: TokenCancelled;
};

/** Methods to use when ordering `TokenCancelled`. */
export enum TokenCancelledsOrderBy {
  AidAsc = 'AID_ASC',
  AidDesc = 'AID_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OwnerAsc = 'OWNER_ASC',
  OwnerDesc = 'OWNER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReasonAsc = 'REASON_ASC',
  ReasonDesc = 'REASON_DESC'
}

export type TokenClass = Node & {
  __typename?: 'TokenClass';
  cap: Scalars['BigInt']['output'];
  class: Scalars['String']['output'];
  contractAddress: Scalars['String']['output'];
  description: Scalars['String']['output'];
  /** Reads a single `Entity` that is related to this `TokenClass`. */
  entityByClass?: Maybe<Entity>;
  image: Scalars['String']['output'];
  minter: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  paused: Scalars['Boolean']['output'];
  stopped: Scalars['Boolean']['output'];
  supply: Scalars['BigInt']['output'];
  /** Reads and enables pagination through a set of `TokenCancelled`. */
  tokenCancelledsByName: TokenCancelledsConnection;
  /** Reads and enables pagination through a set of `TokenRetired`. */
  tokenRetiredsByName: TokenRetiredsConnection;
  /** Reads and enables pagination through a set of `Token`. */
  tokensByName: TokensConnection;
  type: Scalars['String']['output'];
};


export type TokenClassTokenCancelledsByNameArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenCancelledCondition>;
  filter?: InputMaybe<TokenCancelledFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenCancelledsOrderBy>>;
};


export type TokenClassTokenRetiredsByNameArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenRetiredCondition>;
  filter?: InputMaybe<TokenRetiredFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenRetiredsOrderBy>>;
};


export type TokenClassTokensByNameArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TokenCondition>;
  filter?: InputMaybe<TokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokensOrderBy>>;
};

/**
 * A condition to be used against `TokenClass` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TokenClassCondition = {
  /** Checks for equality with the object’s `cap` field. */
  cap?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `class` field. */
  class?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `contractAddress` field. */
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `image` field. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `minter` field. */
  minter?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `paused` field. */
  paused?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `stopped` field. */
  stopped?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `supply` field. */
  supply?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `TokenClass` object types. All fields are combined with a logical ‘and.’ */
export type TokenClassFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TokenClassFilter>>;
  /** Filter by the object’s `cap` field. */
  cap?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `class` field. */
  class?: InputMaybe<StringFilter>;
  /** Filter by the object’s `contractAddress` field. */
  contractAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `entityByClass` relation. */
  entityByClass?: InputMaybe<EntityFilter>;
  /** Filter by the object’s `image` field. */
  image?: InputMaybe<StringFilter>;
  /** Filter by the object’s `minter` field. */
  minter?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TokenClassFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TokenClassFilter>>;
  /** Filter by the object’s `paused` field. */
  paused?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `stopped` field. */
  stopped?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `supply` field. */
  supply?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `tokenCancelledsByName` relation. */
  tokenCancelledsByName?: InputMaybe<TokenClassToManyTokenCancelledFilter>;
  /** Some related `tokenCancelledsByName` exist. */
  tokenCancelledsByNameExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `tokenRetiredsByName` relation. */
  tokenRetiredsByName?: InputMaybe<TokenClassToManyTokenRetiredFilter>;
  /** Some related `tokenRetiredsByName` exist. */
  tokenRetiredsByNameExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `tokensByName` relation. */
  tokensByName?: InputMaybe<TokenClassToManyTokenFilter>;
  /** Some related `tokensByName` exist. */
  tokensByNameExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
};

/** A filter to be used against many `TokenCancelled` object types. All fields are combined with a logical ‘and.’ */
export type TokenClassToManyTokenCancelledFilter = {
  /** Aggregates across related `TokenCancelled` match the filter criteria. */
  aggregates?: InputMaybe<TokenCancelledAggregatesFilter>;
  /** Every related `TokenCancelled` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TokenCancelledFilter>;
  /** No related `TokenCancelled` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TokenCancelledFilter>;
  /** Some related `TokenCancelled` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TokenCancelledFilter>;
};

/** A filter to be used against many `Token` object types. All fields are combined with a logical ‘and.’ */
export type TokenClassToManyTokenFilter = {
  /** Every related `Token` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TokenFilter>;
  /** No related `Token` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TokenFilter>;
  /** Some related `Token` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TokenFilter>;
};

/** A filter to be used against many `TokenRetired` object types. All fields are combined with a logical ‘and.’ */
export type TokenClassToManyTokenRetiredFilter = {
  /** Aggregates across related `TokenRetired` match the filter criteria. */
  aggregates?: InputMaybe<TokenRetiredAggregatesFilter>;
  /** Every related `TokenRetired` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TokenRetiredFilter>;
  /** No related `TokenRetired` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TokenRetiredFilter>;
  /** Some related `TokenRetired` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TokenRetiredFilter>;
};

/** A connection to a list of `TokenClass` values. */
export type TokenClassesConnection = {
  __typename?: 'TokenClassesConnection';
  /** A list of edges which contains the `TokenClass` and cursor to aid in pagination. */
  edges: Array<TokenClassesEdge>;
  /** A list of `TokenClass` objects. */
  nodes: Array<TokenClass>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TokenClass` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TokenClass` edge in the connection. */
export type TokenClassesEdge = {
  __typename?: 'TokenClassesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenClass` at the end of the edge. */
  node: TokenClass;
};

/** Methods to use when ordering `TokenClass`. */
export enum TokenClassesOrderBy {
  CapAsc = 'CAP_ASC',
  CapDesc = 'CAP_DESC',
  ClassAsc = 'CLASS_ASC',
  ClassDesc = 'CLASS_DESC',
  ContractAddressAsc = 'CONTRACT_ADDRESS_ASC',
  ContractAddressDesc = 'CONTRACT_ADDRESS_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  ImageAsc = 'IMAGE_ASC',
  ImageDesc = 'IMAGE_DESC',
  MinterAsc = 'MINTER_ASC',
  MinterDesc = 'MINTER_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PausedAsc = 'PAUSED_ASC',
  PausedDesc = 'PAUSED_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StoppedAsc = 'STOPPED_ASC',
  StoppedDesc = 'STOPPED_DESC',
  SupplyAsc = 'SUPPLY_ASC',
  SupplyDesc = 'SUPPLY_DESC',
  TokenCancelledsByNameAverageAidAsc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_AID_ASC',
  TokenCancelledsByNameAverageAidDesc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_AID_DESC',
  TokenCancelledsByNameAverageAmountAsc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_AMOUNT_ASC',
  TokenCancelledsByNameAverageAmountDesc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_AMOUNT_DESC',
  TokenCancelledsByNameAverageIdAsc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_ID_ASC',
  TokenCancelledsByNameAverageIdDesc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_ID_DESC',
  TokenCancelledsByNameAverageNameAsc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_NAME_ASC',
  TokenCancelledsByNameAverageNameDesc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_NAME_DESC',
  TokenCancelledsByNameAverageOwnerAsc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_OWNER_ASC',
  TokenCancelledsByNameAverageOwnerDesc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_OWNER_DESC',
  TokenCancelledsByNameAverageReasonAsc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_REASON_ASC',
  TokenCancelledsByNameAverageReasonDesc = 'TOKEN_CANCELLEDS_BY_NAME_AVERAGE_REASON_DESC',
  TokenCancelledsByNameCountAsc = 'TOKEN_CANCELLEDS_BY_NAME_COUNT_ASC',
  TokenCancelledsByNameCountDesc = 'TOKEN_CANCELLEDS_BY_NAME_COUNT_DESC',
  TokenCancelledsByNameDistinctCountAidAsc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_AID_ASC',
  TokenCancelledsByNameDistinctCountAidDesc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_AID_DESC',
  TokenCancelledsByNameDistinctCountAmountAsc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_AMOUNT_ASC',
  TokenCancelledsByNameDistinctCountAmountDesc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_AMOUNT_DESC',
  TokenCancelledsByNameDistinctCountIdAsc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_ID_ASC',
  TokenCancelledsByNameDistinctCountIdDesc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_ID_DESC',
  TokenCancelledsByNameDistinctCountNameAsc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_NAME_ASC',
  TokenCancelledsByNameDistinctCountNameDesc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_NAME_DESC',
  TokenCancelledsByNameDistinctCountOwnerAsc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_OWNER_ASC',
  TokenCancelledsByNameDistinctCountOwnerDesc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_OWNER_DESC',
  TokenCancelledsByNameDistinctCountReasonAsc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_REASON_ASC',
  TokenCancelledsByNameDistinctCountReasonDesc = 'TOKEN_CANCELLEDS_BY_NAME_DISTINCT_COUNT_REASON_DESC',
  TokenCancelledsByNameMaxAidAsc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_AID_ASC',
  TokenCancelledsByNameMaxAidDesc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_AID_DESC',
  TokenCancelledsByNameMaxAmountAsc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_AMOUNT_ASC',
  TokenCancelledsByNameMaxAmountDesc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_AMOUNT_DESC',
  TokenCancelledsByNameMaxIdAsc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_ID_ASC',
  TokenCancelledsByNameMaxIdDesc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_ID_DESC',
  TokenCancelledsByNameMaxNameAsc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_NAME_ASC',
  TokenCancelledsByNameMaxNameDesc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_NAME_DESC',
  TokenCancelledsByNameMaxOwnerAsc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_OWNER_ASC',
  TokenCancelledsByNameMaxOwnerDesc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_OWNER_DESC',
  TokenCancelledsByNameMaxReasonAsc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_REASON_ASC',
  TokenCancelledsByNameMaxReasonDesc = 'TOKEN_CANCELLEDS_BY_NAME_MAX_REASON_DESC',
  TokenCancelledsByNameMinAidAsc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_AID_ASC',
  TokenCancelledsByNameMinAidDesc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_AID_DESC',
  TokenCancelledsByNameMinAmountAsc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_AMOUNT_ASC',
  TokenCancelledsByNameMinAmountDesc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_AMOUNT_DESC',
  TokenCancelledsByNameMinIdAsc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_ID_ASC',
  TokenCancelledsByNameMinIdDesc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_ID_DESC',
  TokenCancelledsByNameMinNameAsc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_NAME_ASC',
  TokenCancelledsByNameMinNameDesc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_NAME_DESC',
  TokenCancelledsByNameMinOwnerAsc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_OWNER_ASC',
  TokenCancelledsByNameMinOwnerDesc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_OWNER_DESC',
  TokenCancelledsByNameMinReasonAsc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_REASON_ASC',
  TokenCancelledsByNameMinReasonDesc = 'TOKEN_CANCELLEDS_BY_NAME_MIN_REASON_DESC',
  TokenCancelledsByNameStddevPopulationAidAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_AID_ASC',
  TokenCancelledsByNameStddevPopulationAidDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_AID_DESC',
  TokenCancelledsByNameStddevPopulationAmountAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_AMOUNT_ASC',
  TokenCancelledsByNameStddevPopulationAmountDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_AMOUNT_DESC',
  TokenCancelledsByNameStddevPopulationIdAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_ID_ASC',
  TokenCancelledsByNameStddevPopulationIdDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_ID_DESC',
  TokenCancelledsByNameStddevPopulationNameAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_NAME_ASC',
  TokenCancelledsByNameStddevPopulationNameDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_NAME_DESC',
  TokenCancelledsByNameStddevPopulationOwnerAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_OWNER_ASC',
  TokenCancelledsByNameStddevPopulationOwnerDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_OWNER_DESC',
  TokenCancelledsByNameStddevPopulationReasonAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_REASON_ASC',
  TokenCancelledsByNameStddevPopulationReasonDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_POPULATION_REASON_DESC',
  TokenCancelledsByNameStddevSampleAidAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_AID_ASC',
  TokenCancelledsByNameStddevSampleAidDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_AID_DESC',
  TokenCancelledsByNameStddevSampleAmountAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_AMOUNT_ASC',
  TokenCancelledsByNameStddevSampleAmountDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_AMOUNT_DESC',
  TokenCancelledsByNameStddevSampleIdAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_ID_ASC',
  TokenCancelledsByNameStddevSampleIdDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_ID_DESC',
  TokenCancelledsByNameStddevSampleNameAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_NAME_ASC',
  TokenCancelledsByNameStddevSampleNameDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_NAME_DESC',
  TokenCancelledsByNameStddevSampleOwnerAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_OWNER_ASC',
  TokenCancelledsByNameStddevSampleOwnerDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_OWNER_DESC',
  TokenCancelledsByNameStddevSampleReasonAsc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_REASON_ASC',
  TokenCancelledsByNameStddevSampleReasonDesc = 'TOKEN_CANCELLEDS_BY_NAME_STDDEV_SAMPLE_REASON_DESC',
  TokenCancelledsByNameSumAidAsc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_AID_ASC',
  TokenCancelledsByNameSumAidDesc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_AID_DESC',
  TokenCancelledsByNameSumAmountAsc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_AMOUNT_ASC',
  TokenCancelledsByNameSumAmountDesc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_AMOUNT_DESC',
  TokenCancelledsByNameSumIdAsc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_ID_ASC',
  TokenCancelledsByNameSumIdDesc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_ID_DESC',
  TokenCancelledsByNameSumNameAsc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_NAME_ASC',
  TokenCancelledsByNameSumNameDesc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_NAME_DESC',
  TokenCancelledsByNameSumOwnerAsc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_OWNER_ASC',
  TokenCancelledsByNameSumOwnerDesc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_OWNER_DESC',
  TokenCancelledsByNameSumReasonAsc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_REASON_ASC',
  TokenCancelledsByNameSumReasonDesc = 'TOKEN_CANCELLEDS_BY_NAME_SUM_REASON_DESC',
  TokenCancelledsByNameVariancePopulationAidAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_AID_ASC',
  TokenCancelledsByNameVariancePopulationAidDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_AID_DESC',
  TokenCancelledsByNameVariancePopulationAmountAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_AMOUNT_ASC',
  TokenCancelledsByNameVariancePopulationAmountDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_AMOUNT_DESC',
  TokenCancelledsByNameVariancePopulationIdAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_ID_ASC',
  TokenCancelledsByNameVariancePopulationIdDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_ID_DESC',
  TokenCancelledsByNameVariancePopulationNameAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_NAME_ASC',
  TokenCancelledsByNameVariancePopulationNameDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_NAME_DESC',
  TokenCancelledsByNameVariancePopulationOwnerAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_OWNER_ASC',
  TokenCancelledsByNameVariancePopulationOwnerDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_OWNER_DESC',
  TokenCancelledsByNameVariancePopulationReasonAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_REASON_ASC',
  TokenCancelledsByNameVariancePopulationReasonDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_POPULATION_REASON_DESC',
  TokenCancelledsByNameVarianceSampleAidAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_AID_ASC',
  TokenCancelledsByNameVarianceSampleAidDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_AID_DESC',
  TokenCancelledsByNameVarianceSampleAmountAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_AMOUNT_ASC',
  TokenCancelledsByNameVarianceSampleAmountDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_AMOUNT_DESC',
  TokenCancelledsByNameVarianceSampleIdAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_ID_ASC',
  TokenCancelledsByNameVarianceSampleIdDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_ID_DESC',
  TokenCancelledsByNameVarianceSampleNameAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_NAME_ASC',
  TokenCancelledsByNameVarianceSampleNameDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_NAME_DESC',
  TokenCancelledsByNameVarianceSampleOwnerAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_OWNER_ASC',
  TokenCancelledsByNameVarianceSampleOwnerDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_OWNER_DESC',
  TokenCancelledsByNameVarianceSampleReasonAsc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_REASON_ASC',
  TokenCancelledsByNameVarianceSampleReasonDesc = 'TOKEN_CANCELLEDS_BY_NAME_VARIANCE_SAMPLE_REASON_DESC',
  TokenRetiredsByNameAverageAidAsc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_AID_ASC',
  TokenRetiredsByNameAverageAidDesc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_AID_DESC',
  TokenRetiredsByNameAverageAmountAsc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_AMOUNT_ASC',
  TokenRetiredsByNameAverageAmountDesc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_AMOUNT_DESC',
  TokenRetiredsByNameAverageIdAsc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_ID_ASC',
  TokenRetiredsByNameAverageIdDesc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_ID_DESC',
  TokenRetiredsByNameAverageJurisdictionAsc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_JURISDICTION_ASC',
  TokenRetiredsByNameAverageJurisdictionDesc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_JURISDICTION_DESC',
  TokenRetiredsByNameAverageNameAsc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_NAME_ASC',
  TokenRetiredsByNameAverageNameDesc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_NAME_DESC',
  TokenRetiredsByNameAverageOwnerAsc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_OWNER_ASC',
  TokenRetiredsByNameAverageOwnerDesc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_OWNER_DESC',
  TokenRetiredsByNameAverageReasonAsc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_REASON_ASC',
  TokenRetiredsByNameAverageReasonDesc = 'TOKEN_RETIREDS_BY_NAME_AVERAGE_REASON_DESC',
  TokenRetiredsByNameCountAsc = 'TOKEN_RETIREDS_BY_NAME_COUNT_ASC',
  TokenRetiredsByNameCountDesc = 'TOKEN_RETIREDS_BY_NAME_COUNT_DESC',
  TokenRetiredsByNameDistinctCountAidAsc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_AID_ASC',
  TokenRetiredsByNameDistinctCountAidDesc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_AID_DESC',
  TokenRetiredsByNameDistinctCountAmountAsc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_AMOUNT_ASC',
  TokenRetiredsByNameDistinctCountAmountDesc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_AMOUNT_DESC',
  TokenRetiredsByNameDistinctCountIdAsc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_ID_ASC',
  TokenRetiredsByNameDistinctCountIdDesc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_ID_DESC',
  TokenRetiredsByNameDistinctCountJurisdictionAsc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_JURISDICTION_ASC',
  TokenRetiredsByNameDistinctCountJurisdictionDesc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_JURISDICTION_DESC',
  TokenRetiredsByNameDistinctCountNameAsc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_NAME_ASC',
  TokenRetiredsByNameDistinctCountNameDesc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_NAME_DESC',
  TokenRetiredsByNameDistinctCountOwnerAsc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_OWNER_ASC',
  TokenRetiredsByNameDistinctCountOwnerDesc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_OWNER_DESC',
  TokenRetiredsByNameDistinctCountReasonAsc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_REASON_ASC',
  TokenRetiredsByNameDistinctCountReasonDesc = 'TOKEN_RETIREDS_BY_NAME_DISTINCT_COUNT_REASON_DESC',
  TokenRetiredsByNameMaxAidAsc = 'TOKEN_RETIREDS_BY_NAME_MAX_AID_ASC',
  TokenRetiredsByNameMaxAidDesc = 'TOKEN_RETIREDS_BY_NAME_MAX_AID_DESC',
  TokenRetiredsByNameMaxAmountAsc = 'TOKEN_RETIREDS_BY_NAME_MAX_AMOUNT_ASC',
  TokenRetiredsByNameMaxAmountDesc = 'TOKEN_RETIREDS_BY_NAME_MAX_AMOUNT_DESC',
  TokenRetiredsByNameMaxIdAsc = 'TOKEN_RETIREDS_BY_NAME_MAX_ID_ASC',
  TokenRetiredsByNameMaxIdDesc = 'TOKEN_RETIREDS_BY_NAME_MAX_ID_DESC',
  TokenRetiredsByNameMaxJurisdictionAsc = 'TOKEN_RETIREDS_BY_NAME_MAX_JURISDICTION_ASC',
  TokenRetiredsByNameMaxJurisdictionDesc = 'TOKEN_RETIREDS_BY_NAME_MAX_JURISDICTION_DESC',
  TokenRetiredsByNameMaxNameAsc = 'TOKEN_RETIREDS_BY_NAME_MAX_NAME_ASC',
  TokenRetiredsByNameMaxNameDesc = 'TOKEN_RETIREDS_BY_NAME_MAX_NAME_DESC',
  TokenRetiredsByNameMaxOwnerAsc = 'TOKEN_RETIREDS_BY_NAME_MAX_OWNER_ASC',
  TokenRetiredsByNameMaxOwnerDesc = 'TOKEN_RETIREDS_BY_NAME_MAX_OWNER_DESC',
  TokenRetiredsByNameMaxReasonAsc = 'TOKEN_RETIREDS_BY_NAME_MAX_REASON_ASC',
  TokenRetiredsByNameMaxReasonDesc = 'TOKEN_RETIREDS_BY_NAME_MAX_REASON_DESC',
  TokenRetiredsByNameMinAidAsc = 'TOKEN_RETIREDS_BY_NAME_MIN_AID_ASC',
  TokenRetiredsByNameMinAidDesc = 'TOKEN_RETIREDS_BY_NAME_MIN_AID_DESC',
  TokenRetiredsByNameMinAmountAsc = 'TOKEN_RETIREDS_BY_NAME_MIN_AMOUNT_ASC',
  TokenRetiredsByNameMinAmountDesc = 'TOKEN_RETIREDS_BY_NAME_MIN_AMOUNT_DESC',
  TokenRetiredsByNameMinIdAsc = 'TOKEN_RETIREDS_BY_NAME_MIN_ID_ASC',
  TokenRetiredsByNameMinIdDesc = 'TOKEN_RETIREDS_BY_NAME_MIN_ID_DESC',
  TokenRetiredsByNameMinJurisdictionAsc = 'TOKEN_RETIREDS_BY_NAME_MIN_JURISDICTION_ASC',
  TokenRetiredsByNameMinJurisdictionDesc = 'TOKEN_RETIREDS_BY_NAME_MIN_JURISDICTION_DESC',
  TokenRetiredsByNameMinNameAsc = 'TOKEN_RETIREDS_BY_NAME_MIN_NAME_ASC',
  TokenRetiredsByNameMinNameDesc = 'TOKEN_RETIREDS_BY_NAME_MIN_NAME_DESC',
  TokenRetiredsByNameMinOwnerAsc = 'TOKEN_RETIREDS_BY_NAME_MIN_OWNER_ASC',
  TokenRetiredsByNameMinOwnerDesc = 'TOKEN_RETIREDS_BY_NAME_MIN_OWNER_DESC',
  TokenRetiredsByNameMinReasonAsc = 'TOKEN_RETIREDS_BY_NAME_MIN_REASON_ASC',
  TokenRetiredsByNameMinReasonDesc = 'TOKEN_RETIREDS_BY_NAME_MIN_REASON_DESC',
  TokenRetiredsByNameStddevPopulationAidAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_AID_ASC',
  TokenRetiredsByNameStddevPopulationAidDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_AID_DESC',
  TokenRetiredsByNameStddevPopulationAmountAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_AMOUNT_ASC',
  TokenRetiredsByNameStddevPopulationAmountDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_AMOUNT_DESC',
  TokenRetiredsByNameStddevPopulationIdAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_ID_ASC',
  TokenRetiredsByNameStddevPopulationIdDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_ID_DESC',
  TokenRetiredsByNameStddevPopulationJurisdictionAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_JURISDICTION_ASC',
  TokenRetiredsByNameStddevPopulationJurisdictionDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_JURISDICTION_DESC',
  TokenRetiredsByNameStddevPopulationNameAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_NAME_ASC',
  TokenRetiredsByNameStddevPopulationNameDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_NAME_DESC',
  TokenRetiredsByNameStddevPopulationOwnerAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_OWNER_ASC',
  TokenRetiredsByNameStddevPopulationOwnerDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_OWNER_DESC',
  TokenRetiredsByNameStddevPopulationReasonAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_REASON_ASC',
  TokenRetiredsByNameStddevPopulationReasonDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_POPULATION_REASON_DESC',
  TokenRetiredsByNameStddevSampleAidAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_AID_ASC',
  TokenRetiredsByNameStddevSampleAidDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_AID_DESC',
  TokenRetiredsByNameStddevSampleAmountAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_AMOUNT_ASC',
  TokenRetiredsByNameStddevSampleAmountDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_AMOUNT_DESC',
  TokenRetiredsByNameStddevSampleIdAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_ID_ASC',
  TokenRetiredsByNameStddevSampleIdDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_ID_DESC',
  TokenRetiredsByNameStddevSampleJurisdictionAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_JURISDICTION_ASC',
  TokenRetiredsByNameStddevSampleJurisdictionDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_JURISDICTION_DESC',
  TokenRetiredsByNameStddevSampleNameAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_NAME_ASC',
  TokenRetiredsByNameStddevSampleNameDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_NAME_DESC',
  TokenRetiredsByNameStddevSampleOwnerAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_OWNER_ASC',
  TokenRetiredsByNameStddevSampleOwnerDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_OWNER_DESC',
  TokenRetiredsByNameStddevSampleReasonAsc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_REASON_ASC',
  TokenRetiredsByNameStddevSampleReasonDesc = 'TOKEN_RETIREDS_BY_NAME_STDDEV_SAMPLE_REASON_DESC',
  TokenRetiredsByNameSumAidAsc = 'TOKEN_RETIREDS_BY_NAME_SUM_AID_ASC',
  TokenRetiredsByNameSumAidDesc = 'TOKEN_RETIREDS_BY_NAME_SUM_AID_DESC',
  TokenRetiredsByNameSumAmountAsc = 'TOKEN_RETIREDS_BY_NAME_SUM_AMOUNT_ASC',
  TokenRetiredsByNameSumAmountDesc = 'TOKEN_RETIREDS_BY_NAME_SUM_AMOUNT_DESC',
  TokenRetiredsByNameSumIdAsc = 'TOKEN_RETIREDS_BY_NAME_SUM_ID_ASC',
  TokenRetiredsByNameSumIdDesc = 'TOKEN_RETIREDS_BY_NAME_SUM_ID_DESC',
  TokenRetiredsByNameSumJurisdictionAsc = 'TOKEN_RETIREDS_BY_NAME_SUM_JURISDICTION_ASC',
  TokenRetiredsByNameSumJurisdictionDesc = 'TOKEN_RETIREDS_BY_NAME_SUM_JURISDICTION_DESC',
  TokenRetiredsByNameSumNameAsc = 'TOKEN_RETIREDS_BY_NAME_SUM_NAME_ASC',
  TokenRetiredsByNameSumNameDesc = 'TOKEN_RETIREDS_BY_NAME_SUM_NAME_DESC',
  TokenRetiredsByNameSumOwnerAsc = 'TOKEN_RETIREDS_BY_NAME_SUM_OWNER_ASC',
  TokenRetiredsByNameSumOwnerDesc = 'TOKEN_RETIREDS_BY_NAME_SUM_OWNER_DESC',
  TokenRetiredsByNameSumReasonAsc = 'TOKEN_RETIREDS_BY_NAME_SUM_REASON_ASC',
  TokenRetiredsByNameSumReasonDesc = 'TOKEN_RETIREDS_BY_NAME_SUM_REASON_DESC',
  TokenRetiredsByNameVariancePopulationAidAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_AID_ASC',
  TokenRetiredsByNameVariancePopulationAidDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_AID_DESC',
  TokenRetiredsByNameVariancePopulationAmountAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_AMOUNT_ASC',
  TokenRetiredsByNameVariancePopulationAmountDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_AMOUNT_DESC',
  TokenRetiredsByNameVariancePopulationIdAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_ID_ASC',
  TokenRetiredsByNameVariancePopulationIdDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_ID_DESC',
  TokenRetiredsByNameVariancePopulationJurisdictionAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_JURISDICTION_ASC',
  TokenRetiredsByNameVariancePopulationJurisdictionDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_JURISDICTION_DESC',
  TokenRetiredsByNameVariancePopulationNameAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_NAME_ASC',
  TokenRetiredsByNameVariancePopulationNameDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_NAME_DESC',
  TokenRetiredsByNameVariancePopulationOwnerAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_OWNER_ASC',
  TokenRetiredsByNameVariancePopulationOwnerDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_OWNER_DESC',
  TokenRetiredsByNameVariancePopulationReasonAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_REASON_ASC',
  TokenRetiredsByNameVariancePopulationReasonDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_POPULATION_REASON_DESC',
  TokenRetiredsByNameVarianceSampleAidAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_AID_ASC',
  TokenRetiredsByNameVarianceSampleAidDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_AID_DESC',
  TokenRetiredsByNameVarianceSampleAmountAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_AMOUNT_ASC',
  TokenRetiredsByNameVarianceSampleAmountDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_AMOUNT_DESC',
  TokenRetiredsByNameVarianceSampleIdAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_ID_ASC',
  TokenRetiredsByNameVarianceSampleIdDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_ID_DESC',
  TokenRetiredsByNameVarianceSampleJurisdictionAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_JURISDICTION_ASC',
  TokenRetiredsByNameVarianceSampleJurisdictionDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_JURISDICTION_DESC',
  TokenRetiredsByNameVarianceSampleNameAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_NAME_ASC',
  TokenRetiredsByNameVarianceSampleNameDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_NAME_DESC',
  TokenRetiredsByNameVarianceSampleOwnerAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_OWNER_ASC',
  TokenRetiredsByNameVarianceSampleOwnerDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_OWNER_DESC',
  TokenRetiredsByNameVarianceSampleReasonAsc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_REASON_ASC',
  TokenRetiredsByNameVarianceSampleReasonDesc = 'TOKEN_RETIREDS_BY_NAME_VARIANCE_SAMPLE_REASON_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

/** A condition to be used against `Token` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TokenCondition = {
  /** Checks for equality with the object’s `collection` field. */
  collection?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `index` field. */
  index?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `TokenDatum` values. */
export type TokenDataConnection = {
  __typename?: 'TokenDataConnection';
  /** A list of edges which contains the `TokenDatum` and cursor to aid in pagination. */
  edges: Array<TokenDataEdge>;
  /** A list of `TokenDatum` objects. */
  nodes: Array<TokenDatum>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TokenDatum` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TokenDatum` edge in the connection. */
export type TokenDataEdge = {
  __typename?: 'TokenDataEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenDatum` at the end of the edge. */
  node: TokenDatum;
};

/** Methods to use when ordering `TokenDatum`. */
export enum TokenDataOrderBy {
  AidAsc = 'AID_ASC',
  AidDesc = 'AID_DESC',
  EncryptedAsc = 'ENCRYPTED_ASC',
  EncryptedDesc = 'ENCRYPTED_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProofAsc = 'PROOF_ASC',
  ProofDesc = 'PROOF_DESC',
  TokenIdAsc = 'TOKEN_ID_ASC',
  TokenIdDesc = 'TOKEN_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UriAsc = 'URI_ASC',
  UriDesc = 'URI_DESC'
}

export type TokenDatum = Node & {
  __typename?: 'TokenDatum';
  aid: Scalars['Int']['output'];
  encrypted: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  proof: Scalars['String']['output'];
  /** Reads a single `Token` that is related to this `TokenDatum`. */
  token?: Maybe<Token>;
  tokenId: Scalars['String']['output'];
  type: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

/**
 * A condition to be used against `TokenDatum` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TokenDatumCondition = {
  /** Checks for equality with the object’s `aid` field. */
  aid?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `encrypted` field. */
  encrypted?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `proof` field. */
  proof?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tokenId` field. */
  tokenId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `uri` field. */
  uri?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `TokenDatum` object types. All fields are combined with a logical ‘and.’ */
export type TokenDatumFilter = {
  /** Filter by the object’s `aid` field. */
  aid?: InputMaybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TokenDatumFilter>>;
  /** Filter by the object’s `encrypted` field. */
  encrypted?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TokenDatumFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TokenDatumFilter>>;
  /** Filter by the object’s `proof` field. */
  proof?: InputMaybe<StringFilter>;
  /** Filter by the object’s `token` relation. */
  token?: InputMaybe<TokenFilter>;
  /** Filter by the object’s `tokenId` field. */
  tokenId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
  /** Filter by the object’s `uri` field. */
  uri?: InputMaybe<StringFilter>;
};

/** A filter to be used against `Token` object types. All fields are combined with a logical ‘and.’ */
export type TokenFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TokenFilter>>;
  /** Filter by the object’s `collection` field. */
  collection?: InputMaybe<StringFilter>;
  /** Filter by the object’s `entityByCollection` relation. */
  entityByCollection?: InputMaybe<EntityFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Filter by the object’s `index` field. */
  index?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TokenFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TokenFilter>>;
  /** Filter by the object’s `tokenClassByName` relation. */
  tokenClassByName?: InputMaybe<TokenClassFilter>;
  /** Filter by the object’s `tokenDataByTokenId` relation. */
  tokenDataByTokenId?: InputMaybe<TokenToManyTokenDatumFilter>;
  /** Some related `tokenDataByTokenId` exist. */
  tokenDataByTokenIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `tokenRetiredsById` relation. */
  tokenRetiredsById?: InputMaybe<TokenToManyTokenRetiredFilter>;
  /** Some related `tokenRetiredsById` exist. */
  tokenRetiredsByIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `tokenTransactionsByTokenId` relation. */
  tokenTransactionsByTokenId?: InputMaybe<TokenToManyTokenTransactionFilter>;
  /** Some related `tokenTransactionsByTokenId` exist. */
  tokenTransactionsByTokenIdExist?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TokenRetired = Node & {
  __typename?: 'TokenRetired';
  aid: Scalars['Int']['output'];
  amount: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  jurisdiction: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  owner: Scalars['String']['output'];
  reason: Scalars['String']['output'];
  /** Reads a single `Token` that is related to this `TokenRetired`. */
  tokenById?: Maybe<Token>;
  /** Reads a single `TokenClass` that is related to this `TokenRetired`. */
  tokenClassByName?: Maybe<TokenClass>;
};

export type TokenRetiredAggregates = {
  __typename?: 'TokenRetiredAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<TokenRetiredAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<TokenRetiredDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<TokenRetiredMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<TokenRetiredMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<TokenRetiredStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<TokenRetiredStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<TokenRetiredSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<TokenRetiredVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<TokenRetiredVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `TokenRetired` object types. */
export type TokenRetiredAggregatesFilter = {
  /** Mean average aggregate over matching `TokenRetired` objects. */
  average?: InputMaybe<TokenRetiredAverageAggregateFilter>;
  /** Distinct count aggregate over matching `TokenRetired` objects. */
  distinctCount?: InputMaybe<TokenRetiredDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `TokenRetired` object to be included within the aggregate. */
  filter?: InputMaybe<TokenRetiredFilter>;
  /** Maximum aggregate over matching `TokenRetired` objects. */
  max?: InputMaybe<TokenRetiredMaxAggregateFilter>;
  /** Minimum aggregate over matching `TokenRetired` objects. */
  min?: InputMaybe<TokenRetiredMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `TokenRetired` objects. */
  stddevPopulation?: InputMaybe<TokenRetiredStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `TokenRetired` objects. */
  stddevSample?: InputMaybe<TokenRetiredStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `TokenRetired` objects. */
  sum?: InputMaybe<TokenRetiredSumAggregateFilter>;
  /** Population variance aggregate over matching `TokenRetired` objects. */
  variancePopulation?: InputMaybe<TokenRetiredVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `TokenRetired` objects. */
  varianceSample?: InputMaybe<TokenRetiredVarianceSampleAggregateFilter>;
};

export type TokenRetiredAverageAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenRetiredAverageAggregates = {
  __typename?: 'TokenRetiredAverageAggregates';
  /** Mean average of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `TokenRetired` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TokenRetiredCondition = {
  /** Checks for equality with the object’s `aid` field. */
  aid?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `jurisdiction` field. */
  jurisdiction?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `owner` field. */
  owner?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `reason` field. */
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type TokenRetiredDistinctCountAggregateFilter = {
  aid?: InputMaybe<BigIntFilter>;
  amount?: InputMaybe<BigIntFilter>;
  id?: InputMaybe<BigIntFilter>;
  jurisdiction?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<BigIntFilter>;
  owner?: InputMaybe<BigIntFilter>;
  reason?: InputMaybe<BigIntFilter>;
};

export type TokenRetiredDistinctCountAggregates = {
  __typename?: 'TokenRetiredDistinctCountAggregates';
  /** Distinct count of aid across the matching connection */
  aid?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of jurisdiction across the matching connection */
  jurisdiction?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of owner across the matching connection */
  owner?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of reason across the matching connection */
  reason?: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `TokenRetired` object types. All fields are combined with a logical ‘and.’ */
export type TokenRetiredFilter = {
  /** Filter by the object’s `aid` field. */
  aid?: InputMaybe<IntFilter>;
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<BigIntFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TokenRetiredFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Filter by the object’s `jurisdiction` field. */
  jurisdiction?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TokenRetiredFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TokenRetiredFilter>>;
  /** Filter by the object’s `owner` field. */
  owner?: InputMaybe<StringFilter>;
  /** Filter by the object’s `reason` field. */
  reason?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tokenById` relation. */
  tokenById?: InputMaybe<TokenFilter>;
  /** Filter by the object’s `tokenClassByName` relation. */
  tokenClassByName?: InputMaybe<TokenClassFilter>;
};

/** Grouping methods for `TokenRetired` for usage during aggregation. */
export enum TokenRetiredGroupBy {
  Amount = 'AMOUNT',
  Id = 'ID',
  Jurisdiction = 'JURISDICTION',
  Name = 'NAME',
  Owner = 'OWNER',
  Reason = 'REASON'
}

export type TokenRetiredHavingAverageInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenRetiredHavingDistinctCountInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

/** Conditions for `TokenRetired` aggregates. */
export type TokenRetiredHavingInput = {
  AND?: InputMaybe<Array<TokenRetiredHavingInput>>;
  OR?: InputMaybe<Array<TokenRetiredHavingInput>>;
  average?: InputMaybe<TokenRetiredHavingAverageInput>;
  distinctCount?: InputMaybe<TokenRetiredHavingDistinctCountInput>;
  max?: InputMaybe<TokenRetiredHavingMaxInput>;
  min?: InputMaybe<TokenRetiredHavingMinInput>;
  stddevPopulation?: InputMaybe<TokenRetiredHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<TokenRetiredHavingStddevSampleInput>;
  sum?: InputMaybe<TokenRetiredHavingSumInput>;
  variancePopulation?: InputMaybe<TokenRetiredHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<TokenRetiredHavingVarianceSampleInput>;
};

export type TokenRetiredHavingMaxInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenRetiredHavingMinInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenRetiredHavingStddevPopulationInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenRetiredHavingStddevSampleInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenRetiredHavingSumInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenRetiredHavingVariancePopulationInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenRetiredHavingVarianceSampleInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenRetiredMaxAggregateFilter = {
  aid?: InputMaybe<IntFilter>;
  amount?: InputMaybe<BigIntFilter>;
};

export type TokenRetiredMaxAggregates = {
  __typename?: 'TokenRetiredMaxAggregates';
  /** Maximum of aid across the matching connection */
  aid?: Maybe<Scalars['Int']['output']>;
  /** Maximum of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']['output']>;
};

export type TokenRetiredMinAggregateFilter = {
  aid?: InputMaybe<IntFilter>;
  amount?: InputMaybe<BigIntFilter>;
};

export type TokenRetiredMinAggregates = {
  __typename?: 'TokenRetiredMinAggregates';
  /** Minimum of aid across the matching connection */
  aid?: Maybe<Scalars['Int']['output']>;
  /** Minimum of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']['output']>;
};

export type TokenRetiredStddevPopulationAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenRetiredStddevPopulationAggregates = {
  __typename?: 'TokenRetiredStddevPopulationAggregates';
  /** Population standard deviation of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

export type TokenRetiredStddevSampleAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenRetiredStddevSampleAggregates = {
  __typename?: 'TokenRetiredStddevSampleAggregates';
  /** Sample standard deviation of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

export type TokenRetiredSumAggregateFilter = {
  aid?: InputMaybe<BigIntFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenRetiredSumAggregates = {
  __typename?: 'TokenRetiredSumAggregates';
  /** Sum of aid across the matching connection */
  aid: Scalars['BigInt']['output'];
  /** Sum of amount across the matching connection */
  amount: Scalars['BigFloat']['output'];
};

export type TokenRetiredVariancePopulationAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenRetiredVariancePopulationAggregates = {
  __typename?: 'TokenRetiredVariancePopulationAggregates';
  /** Population variance of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

export type TokenRetiredVarianceSampleAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenRetiredVarianceSampleAggregates = {
  __typename?: 'TokenRetiredVarianceSampleAggregates';
  /** Sample variance of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `TokenRetired` values. */
export type TokenRetiredsConnection = {
  __typename?: 'TokenRetiredsConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<TokenRetiredAggregates>;
  /** A list of edges which contains the `TokenRetired` and cursor to aid in pagination. */
  edges: Array<TokenRetiredsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<TokenRetiredAggregates>>;
  /** A list of `TokenRetired` objects. */
  nodes: Array<TokenRetired>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TokenRetired` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `TokenRetired` values. */
export type TokenRetiredsConnectionGroupedAggregatesArgs = {
  groupBy: Array<TokenRetiredGroupBy>;
  having?: InputMaybe<TokenRetiredHavingInput>;
};

/** A `TokenRetired` edge in the connection. */
export type TokenRetiredsEdge = {
  __typename?: 'TokenRetiredsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenRetired` at the end of the edge. */
  node: TokenRetired;
};

/** Methods to use when ordering `TokenRetired`. */
export enum TokenRetiredsOrderBy {
  AidAsc = 'AID_ASC',
  AidDesc = 'AID_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  JurisdictionAsc = 'JURISDICTION_ASC',
  JurisdictionDesc = 'JURISDICTION_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OwnerAsc = 'OWNER_ASC',
  OwnerDesc = 'OWNER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReasonAsc = 'REASON_ASC',
  ReasonDesc = 'REASON_DESC'
}

/** A filter to be used against many `TokenDatum` object types. All fields are combined with a logical ‘and.’ */
export type TokenToManyTokenDatumFilter = {
  /** Every related `TokenDatum` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TokenDatumFilter>;
  /** No related `TokenDatum` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TokenDatumFilter>;
  /** Some related `TokenDatum` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TokenDatumFilter>;
};

/** A filter to be used against many `TokenRetired` object types. All fields are combined with a logical ‘and.’ */
export type TokenToManyTokenRetiredFilter = {
  /** Aggregates across related `TokenRetired` match the filter criteria. */
  aggregates?: InputMaybe<TokenRetiredAggregatesFilter>;
  /** Every related `TokenRetired` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TokenRetiredFilter>;
  /** No related `TokenRetired` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TokenRetiredFilter>;
  /** Some related `TokenRetired` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TokenRetiredFilter>;
};

/** A filter to be used against many `TokenTransaction` object types. All fields are combined with a logical ‘and.’ */
export type TokenToManyTokenTransactionFilter = {
  /** Aggregates across related `TokenTransaction` match the filter criteria. */
  aggregates?: InputMaybe<TokenTransactionAggregatesFilter>;
  /** Every related `TokenTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TokenTransactionFilter>;
  /** No related `TokenTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TokenTransactionFilter>;
  /** Some related `TokenTransaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TokenTransactionFilter>;
};

export type TokenTransaction = Node & {
  __typename?: 'TokenTransaction';
  aid: Scalars['Int']['output'];
  amount: Scalars['BigInt']['output'];
  from: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  to: Scalars['String']['output'];
  /** Reads a single `Token` that is related to this `TokenTransaction`. */
  token?: Maybe<Token>;
  tokenId: Scalars['String']['output'];
};

export type TokenTransactionAggregates = {
  __typename?: 'TokenTransactionAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<TokenTransactionAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<TokenTransactionDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']['output']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<TokenTransactionMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<TokenTransactionMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<TokenTransactionStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<TokenTransactionStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<TokenTransactionSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<TokenTransactionVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<TokenTransactionVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `TokenTransaction` object types. */
export type TokenTransactionAggregatesFilter = {
  /** Mean average aggregate over matching `TokenTransaction` objects. */
  average?: InputMaybe<TokenTransactionAverageAggregateFilter>;
  /** Distinct count aggregate over matching `TokenTransaction` objects. */
  distinctCount?: InputMaybe<TokenTransactionDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `TokenTransaction` object to be included within the aggregate. */
  filter?: InputMaybe<TokenTransactionFilter>;
  /** Maximum aggregate over matching `TokenTransaction` objects. */
  max?: InputMaybe<TokenTransactionMaxAggregateFilter>;
  /** Minimum aggregate over matching `TokenTransaction` objects. */
  min?: InputMaybe<TokenTransactionMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `TokenTransaction` objects. */
  stddevPopulation?: InputMaybe<TokenTransactionStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `TokenTransaction` objects. */
  stddevSample?: InputMaybe<TokenTransactionStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `TokenTransaction` objects. */
  sum?: InputMaybe<TokenTransactionSumAggregateFilter>;
  /** Population variance aggregate over matching `TokenTransaction` objects. */
  variancePopulation?: InputMaybe<TokenTransactionVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `TokenTransaction` objects. */
  varianceSample?: InputMaybe<TokenTransactionVarianceSampleAggregateFilter>;
};

export type TokenTransactionAverageAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenTransactionAverageAggregates = {
  __typename?: 'TokenTransactionAverageAggregates';
  /** Mean average of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `TokenTransaction` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TokenTransactionCondition = {
  /** Checks for equality with the object’s `aid` field. */
  aid?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `from` field. */
  from?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `to` field. */
  to?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tokenId` field. */
  tokenId?: InputMaybe<Scalars['String']['input']>;
};

export type TokenTransactionDistinctCountAggregateFilter = {
  aid?: InputMaybe<BigIntFilter>;
  amount?: InputMaybe<BigIntFilter>;
  from?: InputMaybe<BigIntFilter>;
  to?: InputMaybe<BigIntFilter>;
  tokenId?: InputMaybe<BigIntFilter>;
};

export type TokenTransactionDistinctCountAggregates = {
  __typename?: 'TokenTransactionDistinctCountAggregates';
  /** Distinct count of aid across the matching connection */
  aid?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of from across the matching connection */
  from?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of to across the matching connection */
  to?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tokenId across the matching connection */
  tokenId?: Maybe<Scalars['BigInt']['output']>;
};

/** A filter to be used against `TokenTransaction` object types. All fields are combined with a logical ‘and.’ */
export type TokenTransactionFilter = {
  /** Filter by the object’s `aid` field. */
  aid?: InputMaybe<IntFilter>;
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<BigIntFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TokenTransactionFilter>>;
  /** Filter by the object’s `from` field. */
  from?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TokenTransactionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TokenTransactionFilter>>;
  /** Filter by the object’s `to` field. */
  to?: InputMaybe<StringFilter>;
  /** Filter by the object’s `token` relation. */
  token?: InputMaybe<TokenFilter>;
  /** Filter by the object’s `tokenId` field. */
  tokenId?: InputMaybe<StringFilter>;
};

/** Grouping methods for `TokenTransaction` for usage during aggregation. */
export enum TokenTransactionGroupBy {
  Amount = 'AMOUNT',
  From = 'FROM',
  To = 'TO',
  TokenId = 'TOKEN_ID'
}

export type TokenTransactionHavingAverageInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenTransactionHavingDistinctCountInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

/** Conditions for `TokenTransaction` aggregates. */
export type TokenTransactionHavingInput = {
  AND?: InputMaybe<Array<TokenTransactionHavingInput>>;
  OR?: InputMaybe<Array<TokenTransactionHavingInput>>;
  average?: InputMaybe<TokenTransactionHavingAverageInput>;
  distinctCount?: InputMaybe<TokenTransactionHavingDistinctCountInput>;
  max?: InputMaybe<TokenTransactionHavingMaxInput>;
  min?: InputMaybe<TokenTransactionHavingMinInput>;
  stddevPopulation?: InputMaybe<TokenTransactionHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<TokenTransactionHavingStddevSampleInput>;
  sum?: InputMaybe<TokenTransactionHavingSumInput>;
  variancePopulation?: InputMaybe<TokenTransactionHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<TokenTransactionHavingVarianceSampleInput>;
};

export type TokenTransactionHavingMaxInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenTransactionHavingMinInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenTransactionHavingStddevPopulationInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenTransactionHavingStddevSampleInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenTransactionHavingSumInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenTransactionHavingVariancePopulationInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenTransactionHavingVarianceSampleInput = {
  aid?: InputMaybe<HavingIntFilter>;
  amount?: InputMaybe<HavingBigintFilter>;
};

export type TokenTransactionMaxAggregateFilter = {
  aid?: InputMaybe<IntFilter>;
  amount?: InputMaybe<BigIntFilter>;
};

export type TokenTransactionMaxAggregates = {
  __typename?: 'TokenTransactionMaxAggregates';
  /** Maximum of aid across the matching connection */
  aid?: Maybe<Scalars['Int']['output']>;
  /** Maximum of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']['output']>;
};

export type TokenTransactionMinAggregateFilter = {
  aid?: InputMaybe<IntFilter>;
  amount?: InputMaybe<BigIntFilter>;
};

export type TokenTransactionMinAggregates = {
  __typename?: 'TokenTransactionMinAggregates';
  /** Minimum of aid across the matching connection */
  aid?: Maybe<Scalars['Int']['output']>;
  /** Minimum of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']['output']>;
};

export type TokenTransactionStddevPopulationAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenTransactionStddevPopulationAggregates = {
  __typename?: 'TokenTransactionStddevPopulationAggregates';
  /** Population standard deviation of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

export type TokenTransactionStddevSampleAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenTransactionStddevSampleAggregates = {
  __typename?: 'TokenTransactionStddevSampleAggregates';
  /** Sample standard deviation of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

export type TokenTransactionSumAggregateFilter = {
  aid?: InputMaybe<BigIntFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenTransactionSumAggregates = {
  __typename?: 'TokenTransactionSumAggregates';
  /** Sum of aid across the matching connection */
  aid: Scalars['BigInt']['output'];
  /** Sum of amount across the matching connection */
  amount: Scalars['BigFloat']['output'];
};

export type TokenTransactionVariancePopulationAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenTransactionVariancePopulationAggregates = {
  __typename?: 'TokenTransactionVariancePopulationAggregates';
  /** Population variance of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

export type TokenTransactionVarianceSampleAggregateFilter = {
  aid?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
};

export type TokenTransactionVarianceSampleAggregates = {
  __typename?: 'TokenTransactionVarianceSampleAggregates';
  /** Sample variance of aid across the matching connection */
  aid?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']['output']>;
};

/** A connection to a list of `TokenTransaction` values. */
export type TokenTransactionsConnection = {
  __typename?: 'TokenTransactionsConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<TokenTransactionAggregates>;
  /** A list of edges which contains the `TokenTransaction` and cursor to aid in pagination. */
  edges: Array<TokenTransactionsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<TokenTransactionAggregates>>;
  /** A list of `TokenTransaction` objects. */
  nodes: Array<TokenTransaction>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TokenTransaction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `TokenTransaction` values. */
export type TokenTransactionsConnectionGroupedAggregatesArgs = {
  groupBy: Array<TokenTransactionGroupBy>;
  having?: InputMaybe<TokenTransactionHavingInput>;
};

/** A `TokenTransaction` edge in the connection. */
export type TokenTransactionsEdge = {
  __typename?: 'TokenTransactionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenTransaction` at the end of the edge. */
  node: TokenTransaction;
};

/** Methods to use when ordering `TokenTransaction`. */
export enum TokenTransactionsOrderBy {
  AidAsc = 'AID_ASC',
  AidDesc = 'AID_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  FromAsc = 'FROM_ASC',
  FromDesc = 'FROM_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TokenIdAsc = 'TOKEN_ID_ASC',
  TokenIdDesc = 'TOKEN_ID_DESC',
  ToAsc = 'TO_ASC',
  ToDesc = 'TO_DESC'
}

export type TokenomicsAccount = Node & {
  __typename?: 'TokenomicsAccount';
  accountNumber: Scalars['Int']['output'];
  address: Scalars['String']['output'];
  availBalance: Scalars['BigInt']['output'];
  delegationsBalance: Scalars['BigInt']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  rewardsBalance: Scalars['BigInt']['output'];
  totalBalance: Scalars['BigInt']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `TokenomicsAccount` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TokenomicsAccountCondition = {
  /** Checks for equality with the object’s `accountNumber` field. */
  accountNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `address` field. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `availBalance` field. */
  availBalance?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `delegationsBalance` field. */
  delegationsBalance?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `rewardsBalance` field. */
  rewardsBalance?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `totalBalance` field. */
  totalBalance?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against `TokenomicsAccount` object types. All fields are combined with a logical ‘and.’ */
export type TokenomicsAccountFilter = {
  /** Filter by the object’s `accountNumber` field. */
  accountNumber?: InputMaybe<IntFilter>;
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TokenomicsAccountFilter>>;
  /** Filter by the object’s `availBalance` field. */
  availBalance?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `delegationsBalance` field. */
  delegationsBalance?: InputMaybe<BigIntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TokenomicsAccountFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TokenomicsAccountFilter>>;
  /** Filter by the object’s `rewardsBalance` field. */
  rewardsBalance?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `totalBalance` field. */
  totalBalance?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
};

/** A connection to a list of `TokenomicsAccount` values. */
export type TokenomicsAccountsConnection = {
  __typename?: 'TokenomicsAccountsConnection';
  /** A list of edges which contains the `TokenomicsAccount` and cursor to aid in pagination. */
  edges: Array<TokenomicsAccountsEdge>;
  /** A list of `TokenomicsAccount` objects. */
  nodes: Array<TokenomicsAccount>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TokenomicsAccount` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TokenomicsAccount` edge in the connection. */
export type TokenomicsAccountsEdge = {
  __typename?: 'TokenomicsAccountsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TokenomicsAccount` at the end of the edge. */
  node: TokenomicsAccount;
};

/** Methods to use when ordering `TokenomicsAccount`. */
export enum TokenomicsAccountsOrderBy {
  AccountNumberAsc = 'ACCOUNT_NUMBER_ASC',
  AccountNumberDesc = 'ACCOUNT_NUMBER_DESC',
  AddressAsc = 'ADDRESS_ASC',
  AddressDesc = 'ADDRESS_DESC',
  AvailBalanceAsc = 'AVAIL_BALANCE_ASC',
  AvailBalanceDesc = 'AVAIL_BALANCE_DESC',
  DelegationsBalanceAsc = 'DELEGATIONS_BALANCE_ASC',
  DelegationsBalanceDesc = 'DELEGATIONS_BALANCE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RewardsBalanceAsc = 'REWARDS_BALANCE_ASC',
  RewardsBalanceDesc = 'REWARDS_BALANCE_DESC',
  TotalBalanceAsc = 'TOTAL_BALANCE_ASC',
  TotalBalanceDesc = 'TOTAL_BALANCE_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

/** A connection to a list of `Token` values. */
export type TokensConnection = {
  __typename?: 'TokensConnection';
  /** A list of edges which contains the `Token` and cursor to aid in pagination. */
  edges: Array<TokensEdge>;
  /** A list of `Token` objects. */
  nodes: Array<Token>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Token` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Token` edge in the connection. */
export type TokensEdge = {
  __typename?: 'TokensEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Token` at the end of the edge. */
  node: Token;
};

/** Methods to use when ordering `Token`. */
export enum TokensOrderBy {
  CollectionAsc = 'COLLECTION_ASC',
  CollectionDesc = 'COLLECTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IndexAsc = 'INDEX_ASC',
  IndexDesc = 'INDEX_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TokenRetiredsByIdAverageAidAsc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_AID_ASC',
  TokenRetiredsByIdAverageAidDesc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_AID_DESC',
  TokenRetiredsByIdAverageAmountAsc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_AMOUNT_ASC',
  TokenRetiredsByIdAverageAmountDesc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_AMOUNT_DESC',
  TokenRetiredsByIdAverageIdAsc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_ID_ASC',
  TokenRetiredsByIdAverageIdDesc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_ID_DESC',
  TokenRetiredsByIdAverageJurisdictionAsc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_JURISDICTION_ASC',
  TokenRetiredsByIdAverageJurisdictionDesc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_JURISDICTION_DESC',
  TokenRetiredsByIdAverageNameAsc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_NAME_ASC',
  TokenRetiredsByIdAverageNameDesc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_NAME_DESC',
  TokenRetiredsByIdAverageOwnerAsc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_OWNER_ASC',
  TokenRetiredsByIdAverageOwnerDesc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_OWNER_DESC',
  TokenRetiredsByIdAverageReasonAsc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_REASON_ASC',
  TokenRetiredsByIdAverageReasonDesc = 'TOKEN_RETIREDS_BY_ID_AVERAGE_REASON_DESC',
  TokenRetiredsByIdCountAsc = 'TOKEN_RETIREDS_BY_ID_COUNT_ASC',
  TokenRetiredsByIdCountDesc = 'TOKEN_RETIREDS_BY_ID_COUNT_DESC',
  TokenRetiredsByIdDistinctCountAidAsc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_AID_ASC',
  TokenRetiredsByIdDistinctCountAidDesc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_AID_DESC',
  TokenRetiredsByIdDistinctCountAmountAsc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_AMOUNT_ASC',
  TokenRetiredsByIdDistinctCountAmountDesc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_AMOUNT_DESC',
  TokenRetiredsByIdDistinctCountIdAsc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_ID_ASC',
  TokenRetiredsByIdDistinctCountIdDesc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_ID_DESC',
  TokenRetiredsByIdDistinctCountJurisdictionAsc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_JURISDICTION_ASC',
  TokenRetiredsByIdDistinctCountJurisdictionDesc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_JURISDICTION_DESC',
  TokenRetiredsByIdDistinctCountNameAsc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_NAME_ASC',
  TokenRetiredsByIdDistinctCountNameDesc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_NAME_DESC',
  TokenRetiredsByIdDistinctCountOwnerAsc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_OWNER_ASC',
  TokenRetiredsByIdDistinctCountOwnerDesc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_OWNER_DESC',
  TokenRetiredsByIdDistinctCountReasonAsc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_REASON_ASC',
  TokenRetiredsByIdDistinctCountReasonDesc = 'TOKEN_RETIREDS_BY_ID_DISTINCT_COUNT_REASON_DESC',
  TokenRetiredsByIdMaxAidAsc = 'TOKEN_RETIREDS_BY_ID_MAX_AID_ASC',
  TokenRetiredsByIdMaxAidDesc = 'TOKEN_RETIREDS_BY_ID_MAX_AID_DESC',
  TokenRetiredsByIdMaxAmountAsc = 'TOKEN_RETIREDS_BY_ID_MAX_AMOUNT_ASC',
  TokenRetiredsByIdMaxAmountDesc = 'TOKEN_RETIREDS_BY_ID_MAX_AMOUNT_DESC',
  TokenRetiredsByIdMaxIdAsc = 'TOKEN_RETIREDS_BY_ID_MAX_ID_ASC',
  TokenRetiredsByIdMaxIdDesc = 'TOKEN_RETIREDS_BY_ID_MAX_ID_DESC',
  TokenRetiredsByIdMaxJurisdictionAsc = 'TOKEN_RETIREDS_BY_ID_MAX_JURISDICTION_ASC',
  TokenRetiredsByIdMaxJurisdictionDesc = 'TOKEN_RETIREDS_BY_ID_MAX_JURISDICTION_DESC',
  TokenRetiredsByIdMaxNameAsc = 'TOKEN_RETIREDS_BY_ID_MAX_NAME_ASC',
  TokenRetiredsByIdMaxNameDesc = 'TOKEN_RETIREDS_BY_ID_MAX_NAME_DESC',
  TokenRetiredsByIdMaxOwnerAsc = 'TOKEN_RETIREDS_BY_ID_MAX_OWNER_ASC',
  TokenRetiredsByIdMaxOwnerDesc = 'TOKEN_RETIREDS_BY_ID_MAX_OWNER_DESC',
  TokenRetiredsByIdMaxReasonAsc = 'TOKEN_RETIREDS_BY_ID_MAX_REASON_ASC',
  TokenRetiredsByIdMaxReasonDesc = 'TOKEN_RETIREDS_BY_ID_MAX_REASON_DESC',
  TokenRetiredsByIdMinAidAsc = 'TOKEN_RETIREDS_BY_ID_MIN_AID_ASC',
  TokenRetiredsByIdMinAidDesc = 'TOKEN_RETIREDS_BY_ID_MIN_AID_DESC',
  TokenRetiredsByIdMinAmountAsc = 'TOKEN_RETIREDS_BY_ID_MIN_AMOUNT_ASC',
  TokenRetiredsByIdMinAmountDesc = 'TOKEN_RETIREDS_BY_ID_MIN_AMOUNT_DESC',
  TokenRetiredsByIdMinIdAsc = 'TOKEN_RETIREDS_BY_ID_MIN_ID_ASC',
  TokenRetiredsByIdMinIdDesc = 'TOKEN_RETIREDS_BY_ID_MIN_ID_DESC',
  TokenRetiredsByIdMinJurisdictionAsc = 'TOKEN_RETIREDS_BY_ID_MIN_JURISDICTION_ASC',
  TokenRetiredsByIdMinJurisdictionDesc = 'TOKEN_RETIREDS_BY_ID_MIN_JURISDICTION_DESC',
  TokenRetiredsByIdMinNameAsc = 'TOKEN_RETIREDS_BY_ID_MIN_NAME_ASC',
  TokenRetiredsByIdMinNameDesc = 'TOKEN_RETIREDS_BY_ID_MIN_NAME_DESC',
  TokenRetiredsByIdMinOwnerAsc = 'TOKEN_RETIREDS_BY_ID_MIN_OWNER_ASC',
  TokenRetiredsByIdMinOwnerDesc = 'TOKEN_RETIREDS_BY_ID_MIN_OWNER_DESC',
  TokenRetiredsByIdMinReasonAsc = 'TOKEN_RETIREDS_BY_ID_MIN_REASON_ASC',
  TokenRetiredsByIdMinReasonDesc = 'TOKEN_RETIREDS_BY_ID_MIN_REASON_DESC',
  TokenRetiredsByIdStddevPopulationAidAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_AID_ASC',
  TokenRetiredsByIdStddevPopulationAidDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_AID_DESC',
  TokenRetiredsByIdStddevPopulationAmountAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_AMOUNT_ASC',
  TokenRetiredsByIdStddevPopulationAmountDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_AMOUNT_DESC',
  TokenRetiredsByIdStddevPopulationIdAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_ID_ASC',
  TokenRetiredsByIdStddevPopulationIdDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_ID_DESC',
  TokenRetiredsByIdStddevPopulationJurisdictionAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_JURISDICTION_ASC',
  TokenRetiredsByIdStddevPopulationJurisdictionDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_JURISDICTION_DESC',
  TokenRetiredsByIdStddevPopulationNameAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_NAME_ASC',
  TokenRetiredsByIdStddevPopulationNameDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_NAME_DESC',
  TokenRetiredsByIdStddevPopulationOwnerAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_OWNER_ASC',
  TokenRetiredsByIdStddevPopulationOwnerDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_OWNER_DESC',
  TokenRetiredsByIdStddevPopulationReasonAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_REASON_ASC',
  TokenRetiredsByIdStddevPopulationReasonDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_POPULATION_REASON_DESC',
  TokenRetiredsByIdStddevSampleAidAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_AID_ASC',
  TokenRetiredsByIdStddevSampleAidDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_AID_DESC',
  TokenRetiredsByIdStddevSampleAmountAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_AMOUNT_ASC',
  TokenRetiredsByIdStddevSampleAmountDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_AMOUNT_DESC',
  TokenRetiredsByIdStddevSampleIdAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_ID_ASC',
  TokenRetiredsByIdStddevSampleIdDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_ID_DESC',
  TokenRetiredsByIdStddevSampleJurisdictionAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_JURISDICTION_ASC',
  TokenRetiredsByIdStddevSampleJurisdictionDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_JURISDICTION_DESC',
  TokenRetiredsByIdStddevSampleNameAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_NAME_ASC',
  TokenRetiredsByIdStddevSampleNameDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_NAME_DESC',
  TokenRetiredsByIdStddevSampleOwnerAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_OWNER_ASC',
  TokenRetiredsByIdStddevSampleOwnerDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_OWNER_DESC',
  TokenRetiredsByIdStddevSampleReasonAsc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_REASON_ASC',
  TokenRetiredsByIdStddevSampleReasonDesc = 'TOKEN_RETIREDS_BY_ID_STDDEV_SAMPLE_REASON_DESC',
  TokenRetiredsByIdSumAidAsc = 'TOKEN_RETIREDS_BY_ID_SUM_AID_ASC',
  TokenRetiredsByIdSumAidDesc = 'TOKEN_RETIREDS_BY_ID_SUM_AID_DESC',
  TokenRetiredsByIdSumAmountAsc = 'TOKEN_RETIREDS_BY_ID_SUM_AMOUNT_ASC',
  TokenRetiredsByIdSumAmountDesc = 'TOKEN_RETIREDS_BY_ID_SUM_AMOUNT_DESC',
  TokenRetiredsByIdSumIdAsc = 'TOKEN_RETIREDS_BY_ID_SUM_ID_ASC',
  TokenRetiredsByIdSumIdDesc = 'TOKEN_RETIREDS_BY_ID_SUM_ID_DESC',
  TokenRetiredsByIdSumJurisdictionAsc = 'TOKEN_RETIREDS_BY_ID_SUM_JURISDICTION_ASC',
  TokenRetiredsByIdSumJurisdictionDesc = 'TOKEN_RETIREDS_BY_ID_SUM_JURISDICTION_DESC',
  TokenRetiredsByIdSumNameAsc = 'TOKEN_RETIREDS_BY_ID_SUM_NAME_ASC',
  TokenRetiredsByIdSumNameDesc = 'TOKEN_RETIREDS_BY_ID_SUM_NAME_DESC',
  TokenRetiredsByIdSumOwnerAsc = 'TOKEN_RETIREDS_BY_ID_SUM_OWNER_ASC',
  TokenRetiredsByIdSumOwnerDesc = 'TOKEN_RETIREDS_BY_ID_SUM_OWNER_DESC',
  TokenRetiredsByIdSumReasonAsc = 'TOKEN_RETIREDS_BY_ID_SUM_REASON_ASC',
  TokenRetiredsByIdSumReasonDesc = 'TOKEN_RETIREDS_BY_ID_SUM_REASON_DESC',
  TokenRetiredsByIdVariancePopulationAidAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_AID_ASC',
  TokenRetiredsByIdVariancePopulationAidDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_AID_DESC',
  TokenRetiredsByIdVariancePopulationAmountAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_AMOUNT_ASC',
  TokenRetiredsByIdVariancePopulationAmountDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_AMOUNT_DESC',
  TokenRetiredsByIdVariancePopulationIdAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_ID_ASC',
  TokenRetiredsByIdVariancePopulationIdDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_ID_DESC',
  TokenRetiredsByIdVariancePopulationJurisdictionAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_JURISDICTION_ASC',
  TokenRetiredsByIdVariancePopulationJurisdictionDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_JURISDICTION_DESC',
  TokenRetiredsByIdVariancePopulationNameAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_NAME_ASC',
  TokenRetiredsByIdVariancePopulationNameDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_NAME_DESC',
  TokenRetiredsByIdVariancePopulationOwnerAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_OWNER_ASC',
  TokenRetiredsByIdVariancePopulationOwnerDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_OWNER_DESC',
  TokenRetiredsByIdVariancePopulationReasonAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_REASON_ASC',
  TokenRetiredsByIdVariancePopulationReasonDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_POPULATION_REASON_DESC',
  TokenRetiredsByIdVarianceSampleAidAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_AID_ASC',
  TokenRetiredsByIdVarianceSampleAidDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_AID_DESC',
  TokenRetiredsByIdVarianceSampleAmountAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_AMOUNT_ASC',
  TokenRetiredsByIdVarianceSampleAmountDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_AMOUNT_DESC',
  TokenRetiredsByIdVarianceSampleIdAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_ID_ASC',
  TokenRetiredsByIdVarianceSampleIdDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_ID_DESC',
  TokenRetiredsByIdVarianceSampleJurisdictionAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_JURISDICTION_ASC',
  TokenRetiredsByIdVarianceSampleJurisdictionDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_JURISDICTION_DESC',
  TokenRetiredsByIdVarianceSampleNameAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_NAME_ASC',
  TokenRetiredsByIdVarianceSampleNameDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_NAME_DESC',
  TokenRetiredsByIdVarianceSampleOwnerAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_OWNER_ASC',
  TokenRetiredsByIdVarianceSampleOwnerDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_OWNER_DESC',
  TokenRetiredsByIdVarianceSampleReasonAsc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_REASON_ASC',
  TokenRetiredsByIdVarianceSampleReasonDesc = 'TOKEN_RETIREDS_BY_ID_VARIANCE_SAMPLE_REASON_DESC',
  TokenTransactionsByTokenIdAverageAidAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_AVERAGE_AID_ASC',
  TokenTransactionsByTokenIdAverageAidDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_AVERAGE_AID_DESC',
  TokenTransactionsByTokenIdAverageAmountAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_AVERAGE_AMOUNT_ASC',
  TokenTransactionsByTokenIdAverageAmountDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_AVERAGE_AMOUNT_DESC',
  TokenTransactionsByTokenIdAverageFromAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_AVERAGE_FROM_ASC',
  TokenTransactionsByTokenIdAverageFromDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_AVERAGE_FROM_DESC',
  TokenTransactionsByTokenIdAverageTokenIdAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_AVERAGE_TOKEN_ID_ASC',
  TokenTransactionsByTokenIdAverageTokenIdDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_AVERAGE_TOKEN_ID_DESC',
  TokenTransactionsByTokenIdAverageToAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_AVERAGE_TO_ASC',
  TokenTransactionsByTokenIdAverageToDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_AVERAGE_TO_DESC',
  TokenTransactionsByTokenIdCountAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_COUNT_ASC',
  TokenTransactionsByTokenIdCountDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_COUNT_DESC',
  TokenTransactionsByTokenIdDistinctCountAidAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_DISTINCT_COUNT_AID_ASC',
  TokenTransactionsByTokenIdDistinctCountAidDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_DISTINCT_COUNT_AID_DESC',
  TokenTransactionsByTokenIdDistinctCountAmountAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_DISTINCT_COUNT_AMOUNT_ASC',
  TokenTransactionsByTokenIdDistinctCountAmountDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_DISTINCT_COUNT_AMOUNT_DESC',
  TokenTransactionsByTokenIdDistinctCountFromAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_DISTINCT_COUNT_FROM_ASC',
  TokenTransactionsByTokenIdDistinctCountFromDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_DISTINCT_COUNT_FROM_DESC',
  TokenTransactionsByTokenIdDistinctCountTokenIdAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_ID_ASC',
  TokenTransactionsByTokenIdDistinctCountTokenIdDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_DISTINCT_COUNT_TOKEN_ID_DESC',
  TokenTransactionsByTokenIdDistinctCountToAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_DISTINCT_COUNT_TO_ASC',
  TokenTransactionsByTokenIdDistinctCountToDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_DISTINCT_COUNT_TO_DESC',
  TokenTransactionsByTokenIdMaxAidAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MAX_AID_ASC',
  TokenTransactionsByTokenIdMaxAidDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MAX_AID_DESC',
  TokenTransactionsByTokenIdMaxAmountAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MAX_AMOUNT_ASC',
  TokenTransactionsByTokenIdMaxAmountDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MAX_AMOUNT_DESC',
  TokenTransactionsByTokenIdMaxFromAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MAX_FROM_ASC',
  TokenTransactionsByTokenIdMaxFromDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MAX_FROM_DESC',
  TokenTransactionsByTokenIdMaxTokenIdAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MAX_TOKEN_ID_ASC',
  TokenTransactionsByTokenIdMaxTokenIdDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MAX_TOKEN_ID_DESC',
  TokenTransactionsByTokenIdMaxToAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MAX_TO_ASC',
  TokenTransactionsByTokenIdMaxToDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MAX_TO_DESC',
  TokenTransactionsByTokenIdMinAidAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MIN_AID_ASC',
  TokenTransactionsByTokenIdMinAidDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MIN_AID_DESC',
  TokenTransactionsByTokenIdMinAmountAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MIN_AMOUNT_ASC',
  TokenTransactionsByTokenIdMinAmountDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MIN_AMOUNT_DESC',
  TokenTransactionsByTokenIdMinFromAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MIN_FROM_ASC',
  TokenTransactionsByTokenIdMinFromDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MIN_FROM_DESC',
  TokenTransactionsByTokenIdMinTokenIdAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MIN_TOKEN_ID_ASC',
  TokenTransactionsByTokenIdMinTokenIdDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MIN_TOKEN_ID_DESC',
  TokenTransactionsByTokenIdMinToAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MIN_TO_ASC',
  TokenTransactionsByTokenIdMinToDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_MIN_TO_DESC',
  TokenTransactionsByTokenIdStddevPopulationAidAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_POPULATION_AID_ASC',
  TokenTransactionsByTokenIdStddevPopulationAidDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_POPULATION_AID_DESC',
  TokenTransactionsByTokenIdStddevPopulationAmountAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_POPULATION_AMOUNT_ASC',
  TokenTransactionsByTokenIdStddevPopulationAmountDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_POPULATION_AMOUNT_DESC',
  TokenTransactionsByTokenIdStddevPopulationFromAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_POPULATION_FROM_ASC',
  TokenTransactionsByTokenIdStddevPopulationFromDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_POPULATION_FROM_DESC',
  TokenTransactionsByTokenIdStddevPopulationTokenIdAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_ID_ASC',
  TokenTransactionsByTokenIdStddevPopulationTokenIdDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_POPULATION_TOKEN_ID_DESC',
  TokenTransactionsByTokenIdStddevPopulationToAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_POPULATION_TO_ASC',
  TokenTransactionsByTokenIdStddevPopulationToDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_POPULATION_TO_DESC',
  TokenTransactionsByTokenIdStddevSampleAidAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_SAMPLE_AID_ASC',
  TokenTransactionsByTokenIdStddevSampleAidDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_SAMPLE_AID_DESC',
  TokenTransactionsByTokenIdStddevSampleAmountAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_SAMPLE_AMOUNT_ASC',
  TokenTransactionsByTokenIdStddevSampleAmountDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_SAMPLE_AMOUNT_DESC',
  TokenTransactionsByTokenIdStddevSampleFromAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_SAMPLE_FROM_ASC',
  TokenTransactionsByTokenIdStddevSampleFromDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_SAMPLE_FROM_DESC',
  TokenTransactionsByTokenIdStddevSampleTokenIdAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_ID_ASC',
  TokenTransactionsByTokenIdStddevSampleTokenIdDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_SAMPLE_TOKEN_ID_DESC',
  TokenTransactionsByTokenIdStddevSampleToAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_SAMPLE_TO_ASC',
  TokenTransactionsByTokenIdStddevSampleToDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_STDDEV_SAMPLE_TO_DESC',
  TokenTransactionsByTokenIdSumAidAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_SUM_AID_ASC',
  TokenTransactionsByTokenIdSumAidDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_SUM_AID_DESC',
  TokenTransactionsByTokenIdSumAmountAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_SUM_AMOUNT_ASC',
  TokenTransactionsByTokenIdSumAmountDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_SUM_AMOUNT_DESC',
  TokenTransactionsByTokenIdSumFromAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_SUM_FROM_ASC',
  TokenTransactionsByTokenIdSumFromDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_SUM_FROM_DESC',
  TokenTransactionsByTokenIdSumTokenIdAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_SUM_TOKEN_ID_ASC',
  TokenTransactionsByTokenIdSumTokenIdDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_SUM_TOKEN_ID_DESC',
  TokenTransactionsByTokenIdSumToAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_SUM_TO_ASC',
  TokenTransactionsByTokenIdSumToDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_SUM_TO_DESC',
  TokenTransactionsByTokenIdVariancePopulationAidAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_POPULATION_AID_ASC',
  TokenTransactionsByTokenIdVariancePopulationAidDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_POPULATION_AID_DESC',
  TokenTransactionsByTokenIdVariancePopulationAmountAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_POPULATION_AMOUNT_ASC',
  TokenTransactionsByTokenIdVariancePopulationAmountDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_POPULATION_AMOUNT_DESC',
  TokenTransactionsByTokenIdVariancePopulationFromAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_POPULATION_FROM_ASC',
  TokenTransactionsByTokenIdVariancePopulationFromDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_POPULATION_FROM_DESC',
  TokenTransactionsByTokenIdVariancePopulationTokenIdAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_ID_ASC',
  TokenTransactionsByTokenIdVariancePopulationTokenIdDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_POPULATION_TOKEN_ID_DESC',
  TokenTransactionsByTokenIdVariancePopulationToAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_POPULATION_TO_ASC',
  TokenTransactionsByTokenIdVariancePopulationToDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_POPULATION_TO_DESC',
  TokenTransactionsByTokenIdVarianceSampleAidAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_SAMPLE_AID_ASC',
  TokenTransactionsByTokenIdVarianceSampleAidDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_SAMPLE_AID_DESC',
  TokenTransactionsByTokenIdVarianceSampleAmountAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_SAMPLE_AMOUNT_ASC',
  TokenTransactionsByTokenIdVarianceSampleAmountDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_SAMPLE_AMOUNT_DESC',
  TokenTransactionsByTokenIdVarianceSampleFromAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_SAMPLE_FROM_ASC',
  TokenTransactionsByTokenIdVarianceSampleFromDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_SAMPLE_FROM_DESC',
  TokenTransactionsByTokenIdVarianceSampleTokenIdAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_ID_ASC',
  TokenTransactionsByTokenIdVarianceSampleTokenIdDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_SAMPLE_TOKEN_ID_DESC',
  TokenTransactionsByTokenIdVarianceSampleToAsc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_SAMPLE_TO_ASC',
  TokenTransactionsByTokenIdVarianceSampleToDesc = 'TOKEN_TRANSACTIONS_BY_TOKEN_ID_VARIANCE_SAMPLE_TO_DESC'
}

export type Transaction = Node & {
  __typename?: 'Transaction';
  code: Scalars['Int']['output'];
  fee: Scalars['JSON']['output'];
  gasUsed: Scalars['String']['output'];
  gasWanted: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  memo: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Message`. */
  messagesByTransactionHash: MessagesConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  time: Scalars['Datetime']['output'];
};


export type TransactionMessagesByTransactionHashArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MessageCondition>;
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};

/**
 * A condition to be used against `Transaction` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TransactionCondition = {
  /** Checks for equality with the object’s `code` field. */
  code?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `fee` field. */
  fee?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `gasUsed` field. */
  gasUsed?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gasWanted` field. */
  gasWanted?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `hash` field. */
  hash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `height` field. */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `memo` field. */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against `Transaction` object types. All fields are combined with a logical ‘and.’ */
export type TransactionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TransactionFilter>>;
  /** Filter by the object’s `code` field. */
  code?: InputMaybe<IntFilter>;
  /** Filter by the object’s `fee` field. */
  fee?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `gasUsed` field. */
  gasUsed?: InputMaybe<StringFilter>;
  /** Filter by the object’s `gasWanted` field. */
  gasWanted?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hash` field. */
  hash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `height` field. */
  height?: InputMaybe<IntFilter>;
  /** Filter by the object’s `memo` field. */
  memo?: InputMaybe<StringFilter>;
  /** Filter by the object’s `messagesByTransactionHash` relation. */
  messagesByTransactionHash?: InputMaybe<TransactionToManyMessageFilter>;
  /** Some related `messagesByTransactionHash` exist. */
  messagesByTransactionHashExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<TransactionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TransactionFilter>>;
  /** Filter by the object’s `time` field. */
  time?: InputMaybe<DatetimeFilter>;
};

/** A filter to be used against many `Message` object types. All fields are combined with a logical ‘and.’ */
export type TransactionToManyMessageFilter = {
  /** Every related `Message` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<MessageFilter>;
  /** No related `Message` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<MessageFilter>;
  /** Some related `Message` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<MessageFilter>;
};

/** A connection to a list of `Transaction` values. */
export type TransactionsConnection = {
  __typename?: 'TransactionsConnection';
  /** A list of edges which contains the `Transaction` and cursor to aid in pagination. */
  edges: Array<TransactionsEdge>;
  /** A list of `Transaction` objects. */
  nodes: Array<Transaction>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Transaction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Transaction` edge in the connection. */
export type TransactionsEdge = {
  __typename?: 'TransactionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Transaction` at the end of the edge. */
  node: Transaction;
};

/** Methods to use when ordering `Transaction`. */
export enum TransactionsOrderBy {
  CodeAsc = 'CODE_ASC',
  CodeDesc = 'CODE_DESC',
  FeeAsc = 'FEE_ASC',
  FeeDesc = 'FEE_DESC',
  GasUsedAsc = 'GAS_USED_ASC',
  GasUsedDesc = 'GAS_USED_DESC',
  GasWantedAsc = 'GAS_WANTED_ASC',
  GasWantedDesc = 'GAS_WANTED_DESC',
  HashAsc = 'HASH_ASC',
  HashDesc = 'HASH_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  MemoAsc = 'MEMO_ASC',
  MemoDesc = 'MEMO_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC'
}

export type ClaimCollectionQueryVariables = Exact<{
  claimCollectionId: Scalars['String']['input'];
}>;


export type ClaimCollectionQuery = { __typename?: 'Query', claimCollection?: { __typename?: 'ClaimCollection', nodeId: string, id: string, entity: string, admin: string, protocol: string, startDate?: any | null, endDate?: any | null, quota: number, count: number, evaluated: number, approved: number, rejected: number, disputed: number, invalidated: number, state: number, payments: any, claimSchemaTypesLoaded: boolean } | null };

export type ClaimCollectionsQueryVariables = Exact<{
  filter?: InputMaybe<ClaimCollectionFilter>;
}>;


export type ClaimCollectionsQuery = { __typename?: 'Query', claimCollections?: { __typename?: 'ClaimCollectionsConnection', nodes: Array<{ __typename?: 'ClaimCollection', id: string, protocol: string, rejected: number, approved: number, count: number, quota: number, evaluated: number, entity: string }> } | null };

export type ClaimCollectionsWithClaimsQueryVariables = Exact<{
  filter?: InputMaybe<ClaimCollectionFilter>;
  claimsByCollectionIdFilter?: InputMaybe<ClaimFilter>;
}>;


export type ClaimCollectionsWithClaimsQuery = { __typename?: 'Query', claimCollections?: { __typename?: 'ClaimCollectionsConnection', nodes: Array<{ __typename?: 'ClaimCollection', id: string, protocol: string, rejected: number, approved: number, count: number, quota: number, evaluated: number, entity: string, payments: any, claimsByCollectionId: { __typename?: 'ClaimsConnection', nodes: Array<{ __typename?: 'Claim', claimId: string, paymentsStatus: any, submissionDate: any, evaluationByClaimId?: { __typename?: 'Evaluation', status: number } | null }> } }> } | null };

export type ClaimsQueryVariables = Exact<{
  condition?: InputMaybe<ClaimCondition>;
  orderBy?: InputMaybe<Array<ClaimsOrderBy> | ClaimsOrderBy>;
}>;


export type ClaimsQuery = { __typename?: 'Query', claims?: { __typename?: 'ClaimsConnection', nodes: Array<{ __typename?: 'Claim', agentAddress: string, agentDid: string, claimId: string, paymentsStatus: any, submissionDate: any, evaluationByClaimId?: { __typename?: 'Evaluation', amount: any, status: number, evaluationDate: any } | null, collection?: { __typename?: 'ClaimCollection', payments: any, admin: string, protocol: string } | null }> } | null };

export type EntitiesQueryVariables = Exact<{
  filter?: InputMaybe<EntityFilter>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EntitiesQuery = { __typename?: 'Query', entities?: { __typename?: 'EntitiesConnection', totalCount: number, nodes: Array<{ __typename?: 'Entity', id: string, accordedRight: any, accounts: any, alsoKnownAs: string, assertionMethod: Array<string>, authentication: Array<string>, capabilityInvocation: Array<string>, context: any, capabilityDelegation: Array<string>, controller: Array<string>, credentials?: Array<string | null> | null, endDate?: any | null, entityVerified: boolean, externalId?: string | null, keyAgreement: Array<string>, linkedClaim: any, linkedResource: any, linkedEntity: any, nodeId: string, owner?: string | null, metadata: any, service: any, relayerNode: string, startDate?: any | null, settings: any, status: number, type: string, verificationMethod: any }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: any | null } } | null };

export type EntityQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type EntityQuery = { __typename?: 'Query', entity?: { __typename?: 'Entity', accordedRight: any, accounts: any, alsoKnownAs: string, assertionMethod: Array<string>, authentication: Array<string>, capabilityDelegation: Array<string>, capabilityInvocation: Array<string>, context: any, controller: Array<string>, credentials?: Array<string | null> | null, endDate?: any | null, entityVerified: boolean, externalId?: string | null, id: string, linkedClaim: any, keyAgreement: Array<string>, linkedEntity: any, linkedResource: any, metadata: any, nodeId: string, owner?: string | null, relayerNode: string, service: any, settings: any, startDate?: any | null, status: number, type: string, verificationMethod: any } | null };

export type EvaluationsQueryVariables = Exact<{
  filter?: InputMaybe<EvaluationFilter>;
}>;


export type EvaluationsQuery = { __typename?: 'Query', evaluations?: { __typename?: 'EvaluationsConnection', totalCount: number, nodes: Array<{ __typename?: 'Evaluation', collectionId: string, status: number, verificationProof?: string | null, claim?: { __typename?: 'Claim', submissionDate: any } | null }> } | null };

export type GetAccountTokensQueryVariables = Exact<{
  address: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountTokensQuery = { __typename?: 'Query', getAccountTokens: any };

export type GetTokensTotalForCollectionAmountsQueryVariables = Exact<{
  did: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTokensTotalForCollectionAmountsQuery = { __typename?: 'Query', getTokensTotalForCollectionAmounts: any };

export type MessagesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<MessageFilter>;
}>;


export type MessagesQuery = { __typename?: 'Query', messages?: { __typename?: 'MessagesConnection', totalCount: number, nodes: Array<{ __typename?: 'Message', id: number, value: any, typeUrl: string, to?: string | null, from?: string | null, denoms?: Array<string | null> | null, nodeId: string, tokenNames?: Array<string | null> | null, transactionHash: string, transactionByTransactionHash?: { __typename?: 'Transaction', code: number, fee: any, gasUsed: string, gasWanted: string, hash: string, height: number, nodeId: string, time: any } | null }> } | null };


export const ClaimCollectionDocument = gql`
    query ClaimCollection($claimCollectionId: String!) {
  claimCollection(id: $claimCollectionId) {
    nodeId
    id
    entity
    admin
    protocol
    startDate
    endDate
    quota
    count
    evaluated
    approved
    rejected
    disputed
    invalidated
    state
    payments
    claimSchemaTypesLoaded
  }
}
    `;

/**
 * __useClaimCollectionQuery__
 *
 * To run a query within a React component, call `useClaimCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useClaimCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClaimCollectionQuery({
 *   variables: {
 *      claimCollectionId: // value for 'claimCollectionId'
 *   },
 * });
 */
export function useClaimCollectionQuery(baseOptions: Apollo.QueryHookOptions<ClaimCollectionQuery, ClaimCollectionQueryVariables> & ({ variables: ClaimCollectionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClaimCollectionQuery, ClaimCollectionQueryVariables>(ClaimCollectionDocument, options);
      }
export function useClaimCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClaimCollectionQuery, ClaimCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClaimCollectionQuery, ClaimCollectionQueryVariables>(ClaimCollectionDocument, options);
        }
export function useClaimCollectionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClaimCollectionQuery, ClaimCollectionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClaimCollectionQuery, ClaimCollectionQueryVariables>(ClaimCollectionDocument, options);
        }
export type ClaimCollectionQueryHookResult = ReturnType<typeof useClaimCollectionQuery>;
export type ClaimCollectionLazyQueryHookResult = ReturnType<typeof useClaimCollectionLazyQuery>;
export type ClaimCollectionSuspenseQueryHookResult = ReturnType<typeof useClaimCollectionSuspenseQuery>;
export type ClaimCollectionQueryResult = Apollo.QueryResult<ClaimCollectionQuery, ClaimCollectionQueryVariables>;
export const ClaimCollectionsDocument = gql`
    query ClaimCollections($filter: ClaimCollectionFilter) {
  claimCollections(filter: $filter) {
    nodes {
      id
      protocol
      rejected
      approved
      count
      quota
      evaluated
      entity
    }
  }
}
    `;

/**
 * __useClaimCollectionsQuery__
 *
 * To run a query within a React component, call `useClaimCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClaimCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClaimCollectionsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useClaimCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<ClaimCollectionsQuery, ClaimCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClaimCollectionsQuery, ClaimCollectionsQueryVariables>(ClaimCollectionsDocument, options);
      }
export function useClaimCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClaimCollectionsQuery, ClaimCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClaimCollectionsQuery, ClaimCollectionsQueryVariables>(ClaimCollectionsDocument, options);
        }
export function useClaimCollectionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClaimCollectionsQuery, ClaimCollectionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClaimCollectionsQuery, ClaimCollectionsQueryVariables>(ClaimCollectionsDocument, options);
        }
export type ClaimCollectionsQueryHookResult = ReturnType<typeof useClaimCollectionsQuery>;
export type ClaimCollectionsLazyQueryHookResult = ReturnType<typeof useClaimCollectionsLazyQuery>;
export type ClaimCollectionsSuspenseQueryHookResult = ReturnType<typeof useClaimCollectionsSuspenseQuery>;
export type ClaimCollectionsQueryResult = Apollo.QueryResult<ClaimCollectionsQuery, ClaimCollectionsQueryVariables>;
export const ClaimCollectionsWithClaimsDocument = gql`
    query ClaimCollectionsWithClaims($filter: ClaimCollectionFilter, $claimsByCollectionIdFilter: ClaimFilter) {
  claimCollections(filter: $filter) {
    nodes {
      id
      protocol
      rejected
      approved
      count
      quota
      evaluated
      entity
      payments
      claimsByCollectionId(filter: $claimsByCollectionIdFilter) {
        nodes {
          claimId
          paymentsStatus
          submissionDate
          evaluationByClaimId {
            status
          }
        }
      }
    }
  }
}
    `;

/**
 * __useClaimCollectionsWithClaimsQuery__
 *
 * To run a query within a React component, call `useClaimCollectionsWithClaimsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClaimCollectionsWithClaimsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClaimCollectionsWithClaimsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      claimsByCollectionIdFilter: // value for 'claimsByCollectionIdFilter'
 *   },
 * });
 */
export function useClaimCollectionsWithClaimsQuery(baseOptions?: Apollo.QueryHookOptions<ClaimCollectionsWithClaimsQuery, ClaimCollectionsWithClaimsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClaimCollectionsWithClaimsQuery, ClaimCollectionsWithClaimsQueryVariables>(ClaimCollectionsWithClaimsDocument, options);
      }
export function useClaimCollectionsWithClaimsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClaimCollectionsWithClaimsQuery, ClaimCollectionsWithClaimsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClaimCollectionsWithClaimsQuery, ClaimCollectionsWithClaimsQueryVariables>(ClaimCollectionsWithClaimsDocument, options);
        }
export function useClaimCollectionsWithClaimsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClaimCollectionsWithClaimsQuery, ClaimCollectionsWithClaimsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClaimCollectionsWithClaimsQuery, ClaimCollectionsWithClaimsQueryVariables>(ClaimCollectionsWithClaimsDocument, options);
        }
export type ClaimCollectionsWithClaimsQueryHookResult = ReturnType<typeof useClaimCollectionsWithClaimsQuery>;
export type ClaimCollectionsWithClaimsLazyQueryHookResult = ReturnType<typeof useClaimCollectionsWithClaimsLazyQuery>;
export type ClaimCollectionsWithClaimsSuspenseQueryHookResult = ReturnType<typeof useClaimCollectionsWithClaimsSuspenseQuery>;
export type ClaimCollectionsWithClaimsQueryResult = Apollo.QueryResult<ClaimCollectionsWithClaimsQuery, ClaimCollectionsWithClaimsQueryVariables>;
export const ClaimsDocument = gql`
    query Claims($condition: ClaimCondition, $orderBy: [ClaimsOrderBy!]) {
  claims(condition: $condition, orderBy: $orderBy) {
    nodes {
      agentAddress
      agentDid
      claimId
      paymentsStatus
      evaluationByClaimId {
        amount
        status
        evaluationDate
      }
      submissionDate
      collection {
        payments
        admin
        protocol
      }
    }
  }
}
    `;

/**
 * __useClaimsQuery__
 *
 * To run a query within a React component, call `useClaimsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClaimsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClaimsQuery({
 *   variables: {
 *      condition: // value for 'condition'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useClaimsQuery(baseOptions?: Apollo.QueryHookOptions<ClaimsQuery, ClaimsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClaimsQuery, ClaimsQueryVariables>(ClaimsDocument, options);
      }
export function useClaimsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClaimsQuery, ClaimsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClaimsQuery, ClaimsQueryVariables>(ClaimsDocument, options);
        }
export function useClaimsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClaimsQuery, ClaimsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClaimsQuery, ClaimsQueryVariables>(ClaimsDocument, options);
        }
export type ClaimsQueryHookResult = ReturnType<typeof useClaimsQuery>;
export type ClaimsLazyQueryHookResult = ReturnType<typeof useClaimsLazyQuery>;
export type ClaimsSuspenseQueryHookResult = ReturnType<typeof useClaimsSuspenseQuery>;
export type ClaimsQueryResult = Apollo.QueryResult<ClaimsQuery, ClaimsQueryVariables>;
export const EntitiesDocument = gql`
    query entities($filter: EntityFilter, $after: Cursor, $first: Int) {
  entities(filter: $filter, after: $after, first: $first) {
    nodes {
      id
      accordedRight
      accounts
      alsoKnownAs
      assertionMethod
      authentication
      capabilityInvocation
      context
      capabilityDelegation
      controller
      credentials
      endDate
      entityVerified
      externalId
      keyAgreement
      linkedClaim
      linkedResource
      linkedEntity
      nodeId
      owner
      metadata
      service
      relayerNode
      startDate
      settings
      status
      type
      verificationMethod
    }
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

/**
 * __useEntitiesQuery__
 *
 * To run a query within a React component, call `useEntitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntitiesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useEntitiesQuery(baseOptions?: Apollo.QueryHookOptions<EntitiesQuery, EntitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntitiesQuery, EntitiesQueryVariables>(EntitiesDocument, options);
      }
export function useEntitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntitiesQuery, EntitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntitiesQuery, EntitiesQueryVariables>(EntitiesDocument, options);
        }
export function useEntitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EntitiesQuery, EntitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EntitiesQuery, EntitiesQueryVariables>(EntitiesDocument, options);
        }
export type EntitiesQueryHookResult = ReturnType<typeof useEntitiesQuery>;
export type EntitiesLazyQueryHookResult = ReturnType<typeof useEntitiesLazyQuery>;
export type EntitiesSuspenseQueryHookResult = ReturnType<typeof useEntitiesSuspenseQuery>;
export type EntitiesQueryResult = Apollo.QueryResult<EntitiesQuery, EntitiesQueryVariables>;
export const EntityDocument = gql`
    query entity($id: String!) {
  entity(id: $id) {
    accordedRight
    accounts
    alsoKnownAs
    assertionMethod
    authentication
    capabilityDelegation
    capabilityInvocation
    context
    controller
    credentials
    endDate
    entityVerified
    externalId
    id
    linkedClaim
    keyAgreement
    linkedEntity
    linkedResource
    metadata
    nodeId
    owner
    relayerNode
    service
    settings
    startDate
    status
    type
    verificationMethod
  }
}
    `;

/**
 * __useEntityQuery__
 *
 * To run a query within a React component, call `useEntityQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEntityQuery(baseOptions: Apollo.QueryHookOptions<EntityQuery, EntityQueryVariables> & ({ variables: EntityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntityQuery, EntityQueryVariables>(EntityDocument, options);
      }
export function useEntityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntityQuery, EntityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntityQuery, EntityQueryVariables>(EntityDocument, options);
        }
export function useEntitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EntityQuery, EntityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EntityQuery, EntityQueryVariables>(EntityDocument, options);
        }
export type EntityQueryHookResult = ReturnType<typeof useEntityQuery>;
export type EntityLazyQueryHookResult = ReturnType<typeof useEntityLazyQuery>;
export type EntitySuspenseQueryHookResult = ReturnType<typeof useEntitySuspenseQuery>;
export type EntityQueryResult = Apollo.QueryResult<EntityQuery, EntityQueryVariables>;
export const EvaluationsDocument = gql`
    query Evaluations($filter: EvaluationFilter) {
  evaluations(filter: $filter) {
    totalCount
    nodes {
      collectionId
      status
      verificationProof
      claim {
        submissionDate
      }
    }
  }
}
    `;

/**
 * __useEvaluationsQuery__
 *
 * To run a query within a React component, call `useEvaluationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvaluationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvaluationsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEvaluationsQuery(baseOptions?: Apollo.QueryHookOptions<EvaluationsQuery, EvaluationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EvaluationsQuery, EvaluationsQueryVariables>(EvaluationsDocument, options);
      }
export function useEvaluationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EvaluationsQuery, EvaluationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EvaluationsQuery, EvaluationsQueryVariables>(EvaluationsDocument, options);
        }
export function useEvaluationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EvaluationsQuery, EvaluationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EvaluationsQuery, EvaluationsQueryVariables>(EvaluationsDocument, options);
        }
export type EvaluationsQueryHookResult = ReturnType<typeof useEvaluationsQuery>;
export type EvaluationsLazyQueryHookResult = ReturnType<typeof useEvaluationsLazyQuery>;
export type EvaluationsSuspenseQueryHookResult = ReturnType<typeof useEvaluationsSuspenseQuery>;
export type EvaluationsQueryResult = Apollo.QueryResult<EvaluationsQuery, EvaluationsQueryVariables>;
export const GetAccountTokensDocument = gql`
    query GetAccountTokens($address: String!, $name: String) {
  getAccountTokens(address: $address, name: $name)
}
    `;

/**
 * __useGetAccountTokensQuery__
 *
 * To run a query within a React component, call `useGetAccountTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountTokensQuery({
 *   variables: {
 *      address: // value for 'address'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetAccountTokensQuery(baseOptions: Apollo.QueryHookOptions<GetAccountTokensQuery, GetAccountTokensQueryVariables> & ({ variables: GetAccountTokensQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountTokensQuery, GetAccountTokensQueryVariables>(GetAccountTokensDocument, options);
      }
export function useGetAccountTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountTokensQuery, GetAccountTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountTokensQuery, GetAccountTokensQueryVariables>(GetAccountTokensDocument, options);
        }
export function useGetAccountTokensSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAccountTokensQuery, GetAccountTokensQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountTokensQuery, GetAccountTokensQueryVariables>(GetAccountTokensDocument, options);
        }
export type GetAccountTokensQueryHookResult = ReturnType<typeof useGetAccountTokensQuery>;
export type GetAccountTokensLazyQueryHookResult = ReturnType<typeof useGetAccountTokensLazyQuery>;
export type GetAccountTokensSuspenseQueryHookResult = ReturnType<typeof useGetAccountTokensSuspenseQuery>;
export type GetAccountTokensQueryResult = Apollo.QueryResult<GetAccountTokensQuery, GetAccountTokensQueryVariables>;
export const GetTokensTotalForCollectionAmountsDocument = gql`
    query getTokensTotalForCollectionAmounts($did: String!, $name: String) {
  getTokensTotalForCollectionAmounts(did: $did, name: $name)
}
    `;

/**
 * __useGetTokensTotalForCollectionAmountsQuery__
 *
 * To run a query within a React component, call `useGetTokensTotalForCollectionAmountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokensTotalForCollectionAmountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokensTotalForCollectionAmountsQuery({
 *   variables: {
 *      did: // value for 'did'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetTokensTotalForCollectionAmountsQuery(baseOptions: Apollo.QueryHookOptions<GetTokensTotalForCollectionAmountsQuery, GetTokensTotalForCollectionAmountsQueryVariables> & ({ variables: GetTokensTotalForCollectionAmountsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTokensTotalForCollectionAmountsQuery, GetTokensTotalForCollectionAmountsQueryVariables>(GetTokensTotalForCollectionAmountsDocument, options);
      }
export function useGetTokensTotalForCollectionAmountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTokensTotalForCollectionAmountsQuery, GetTokensTotalForCollectionAmountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTokensTotalForCollectionAmountsQuery, GetTokensTotalForCollectionAmountsQueryVariables>(GetTokensTotalForCollectionAmountsDocument, options);
        }
export function useGetTokensTotalForCollectionAmountsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTokensTotalForCollectionAmountsQuery, GetTokensTotalForCollectionAmountsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTokensTotalForCollectionAmountsQuery, GetTokensTotalForCollectionAmountsQueryVariables>(GetTokensTotalForCollectionAmountsDocument, options);
        }
export type GetTokensTotalForCollectionAmountsQueryHookResult = ReturnType<typeof useGetTokensTotalForCollectionAmountsQuery>;
export type GetTokensTotalForCollectionAmountsLazyQueryHookResult = ReturnType<typeof useGetTokensTotalForCollectionAmountsLazyQuery>;
export type GetTokensTotalForCollectionAmountsSuspenseQueryHookResult = ReturnType<typeof useGetTokensTotalForCollectionAmountsSuspenseQuery>;
export type GetTokensTotalForCollectionAmountsQueryResult = Apollo.QueryResult<GetTokensTotalForCollectionAmountsQuery, GetTokensTotalForCollectionAmountsQueryVariables>;
export const MessagesDocument = gql`
    query Messages($first: Int, $filter: MessageFilter) {
  messages(first: $first, filter: $filter) {
    nodes {
      id
      value
      typeUrl
      to
      from
      denoms
      nodeId
      tokenNames
      transactionByTransactionHash {
        code
        fee
        gasUsed
        gasWanted
        hash
        height
        nodeId
        time
      }
      transactionHash
    }
    totalCount
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export function useMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesSuspenseQueryHookResult = ReturnType<typeof useMessagesSuspenseQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;