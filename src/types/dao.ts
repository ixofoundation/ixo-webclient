import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { Binary, Decimal, Empty, Timestamp, Uint128 } from './common'

/**
 * @example
  {
    "avatar": "https://randomuser.me/api/portraits/men/71.jpg",
    "name": "Jane Doe",
    "address": "ixo19h3lqj50uhzdrv8mkafnp55nqmz4ghc2sd3m48",
    "role": "Blockchain developer",
    "votingPower": 1.12,
    "staking": 50,
    "votes": 45,
    "proposals": 4,
    "status": "approved",
    "verified": false,
    "administrator": true,
    "assignedAuthority": 24.51
  }
 */
export interface IDAOMember {
  avatar?: string
  name?: string
  address: string
  role?: string
  votingPower: number
  staking: number
  votes: number
  proposals: number
  status: string // approved | rejected | pending
  verified?: boolean
  administrator?: boolean
  assignedAuthority: number
}

export type CosmosMsgFor_Empty =
  | {
      bank: BankMsg
    }
  | {
      custom: Empty
    }
  | {
      staking: StakingMsg
    }
  | {
      distribution: DistributionMsg
    }
  | {
      ibc: IbcMsg
    }
  | {
      wasm: WasmMsg
    }
  | {
      gov: GovMsg
    }
  | StargateMsg

export type CosmosMsgForEmpty = CosmosMsgFor_Empty

/**
 * The message types of the bank module.
 *
 * See https://github.com/cosmos/cosmos-sdk/blob/v0.40.0/proto/cosmos/bank/v1beta1/tx.proto
 */
export type BankMsg =
  | {
      send: {
        amount: Coin[]
        to_address: string
      }
    }
  | {
      burn: {
        amount: Coin[]
      }
    }
/**
 * The message types of the staking module.
 *
 * See https://github.com/cosmos/cosmos-sdk/blob/v0.40.0/proto/cosmos/staking/v1beta1/tx.proto
 */
export type StakingMsg =
  | {
      delegate: {
        amount: Coin
        validator: string
      }
    }
  | {
      undelegate: {
        amount: Coin
        validator: string
      }
    }
  | {
      redelegate: {
        amount: Coin
        dst_validator: string
        src_validator: string
      }
    }
/**
 * The message types of the distribution module.
 *
 * See https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/proto/cosmos/distribution/v1beta1/tx.proto
 */
export type DistributionMsg =
  | {
      set_withdraw_address: {
        /**
         * The `withdraw_address`
         */
        address: string
      }
    }
  | {
      withdraw_delegator_reward: {
        /**
         * The `validator_address`
         */
        validator: string
      }
    }
/**
 * The message type representing generic protobuf messages in CosmWasm.
 */
export type StargateMsg = {
  stargate: {
    type_url: string
    value: Binary
  }
}
/**
 * The message types of the wasm module.
 *
 * See https://github.com/CosmWasm/wasmd/blob/v0.14.0/x/wasm/internal/types/tx.proto
 */
export type WasmMsg =
  | {
      execute: {
        contract_addr: string
        funds: Coin[]
        /**
         * msg is the json-encoded ExecuteMsg struct (as raw Binary)
         */
        msg: Binary
      }
    }
  | {
      instantiate: {
        admin?: string | null
        code_id: number
        funds: Coin[]
        /**
         * A human-readbale label for the contract
         */
        label: string
        /**
         * msg is the JSON-encoded InstantiateMsg struct (as raw Binary)
         */
        msg: Binary
      }
    }
  | {
      migrate: {
        contract_addr: string
        /**
         * msg is the json-encoded MigrateMsg struct that will be passed to the new code
         */
        msg: Binary
        /**
         * the code_id of the new logic to place in the given contract
         */
        new_code_id: number
      }
    }
  | {
      update_admin: {
        admin: string
        contract_addr: string
      }
    }
  | {
      clear_admin: {
        contract_addr: string
      }
    }
export interface IbcTimeout {
  block?: IbcTimeoutBlock | null
  timestamp?: Timestamp | null
}
export interface IbcTimeoutBlock {
  height: number
  revision: number
}
export type IbcMsg =
  | {
      transfer: {
        amount: Coin
        channel_id: string
        timeout: IbcTimeout
        to_address: string
      }
    }
  | {
      send_packet: {
        channel_id: string
        data: Binary
        timeout: IbcTimeout
      }
    }
  | {
      close_channel: {
        channel_id: string
      }
    }

export type VoteOption = 'yes' | 'no' | 'abstain' | 'no_with_veto'
export type GovMsg = {
  vote: {
    proposal_id: number
    vote: VoteOption
  }
}

export interface MintMsg {
  mint: {
    amount: Uint128
    recipient: string
  }
}

export interface SubDao {
  addr: string
  charter?: string | null
  [k: string]: unknown
}

export interface MintMsgForNullable_Empty {
  extension?: Empty | null
  owner: string
  token_id: string
  token_uri?: string | null
  [k: string]: unknown
}
export interface InstantiateMsg {
  minter: string
  name: string
  symbol: string
  [k: string]: unknown
}

export enum DepositRefundPolicy {
  Always = 'always',
  OnlyPassed = 'only_passed',
  Never = 'never',
}

export type ExecuteMsg =
  | {
      propose: {
        msg: ProposeMessage
        [k: string]: unknown
      }
    }
  | {
      update_config:
        | {
            allow_revoting: boolean
            close_proposal_on_execution_failure: boolean
            dao: string
            max_voting_period: Duration
            min_voting_period?: Duration | null
            only_members_execute: boolean
            threshold: Threshold
            [k: string]: unknown
          }
        | {
            deposit_info?: UncheckedDepositInfo | null
            open_proposal_submission: boolean
            [k: string]: unknown
          }
    }
  | {
      withdraw: {
        denom?: UncheckedDenom | null
        [k: string]: unknown
      }
    }
  | {
      extension: {
        msg: Empty
        [k: string]: unknown
      }
    }
  | {
      proposal_created_hook: {
        proposal_id: number
        proposer: string
        [k: string]: unknown
      }
    }
  | {
      proposal_completed_hook: {
        new_status: Status
        proposal_id: number
        [k: string]: unknown
      }
    }
export type ProposeMessage = {
  propose: {
    description: string
    msgs: CosmosMsgFor_Empty[]
    title: string
  }
}

export interface UncheckedDepositInfo {
  amount: Uint128
  denom: DepositToken
  refund_policy: DepositRefundPolicy
  [k: string]: unknown
}
export type DepositToken =
  | {
      token: {
        denom: UncheckedDenom
      }
    }
  | {
      voting_module_token: Empty
    }
export type UncheckedDenom =
  | {
      native: string
    }
  | {
      cw20: string
    }
export type Status = 'open' | 'rejected' | 'passed' | 'executed' | 'closed' | 'execution_failed'

export type Duration =
  | {
      height: number
    }
  | {
      time: number
    }
export type Threshold =
  | {
      absolute_percentage: {
        percentage: PercentageThreshold
      }
    }
  | {
      threshold_quorum: {
        quorum: PercentageThreshold
        threshold: PercentageThreshold
      }
    }
  | {
      absolute_count: {
        threshold: Uint128
      }
    }
export type PercentageThreshold =
  | {
      majority: Empty
    }
  | {
      percent: Decimal
    }

export interface Member {
  addr: string
  weight: number
  [k: string]: unknown
}
