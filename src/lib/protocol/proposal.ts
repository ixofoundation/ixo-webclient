import { toBase64, toUtf8 } from '@cosmjs/encoding'
import { AuthzExecActionTypes, AuthzExecData } from 'components/Modals/AddActionModal/SetupAuthzExecModal'
import {
  AuthzData,
  TYPE_URL_GENERIC_AUTHORIZATION,
  TYPE_URL_MSG_GRANT,
} from 'components/Modals/AddActionModal/SetupAuthzGrantModal'
import { BurnNftData } from 'components/Modals/AddActionModal/SetupBurnNFTModal'
import { ExecuteData } from 'components/Modals/AddActionModal/SetupExecuteSmartContractModal'
import { NATIVE_MICRODENOM } from 'constants/chains'
import {
  encodeRawProtobufMsg,
  makeBankMessage,
  makeDistributeMessage,
  makeExecutableMintMessage,
  makeMintMessage,
  makeStakingMessage,
  makeStargateMessage,
  makeWasmMessage,
  StakeType,
} from 'utils/messages'
import JSON5 from 'json5'
import { InstantiateData } from 'components/Modals/AddActionModal/SetupInstantiateSmartContractModal'
import { ManageSubDaosData } from 'components/Modals/AddActionModal/SetupManageSubDAOsModal'
import { ManageCw721Data } from 'components/Modals/AddActionModal/SetupManageTreasuryNFTsModal'
import { ManageCw20Data } from 'components/Modals/AddActionModal/SetupManageTreasuryTokensModal'
import { MigrateData } from 'components/Modals/AddActionModal/SetupMigrateSmartContractModal'
import { MintData } from 'components/Modals/AddActionModal/SetupMintModal'
import { SpendData } from 'components/Modals/AddActionModal/SetupSpendModal'
import { StakeData } from 'components/Modals/AddActionModal/SetupStakingActionsModal'
import { TransferNftData } from 'components/Modals/AddActionModal/SetupTransferNFTModal'
import { UpdateAdminData } from 'components/Modals/AddActionModal/SetupUpdateContractAdminModal'
import { UpdatePreProposeConfigData } from 'components/Modals/AddActionModal/SetupUpdateProposalSubmissionConfigModal'
import { ExecuteMsg } from 'types/dao'
import { UpdateProposalConfigData } from 'components/Modals/AddActionModal/SetupUpdateVotingConfigModal'
import { GovernanceVoteData } from 'components/Modals/AddActionModal/SetupVoteOnAGovernanceProposalModal'
import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import Long from 'long'
import { WithdrawTokenSwapData } from 'components/Modals/AddActionModal/SetupWithdrawTokenSwapModal'
import { UpdateInfoData } from 'components/Modals/AddActionModal/SetupUpdateDAOInfoModal'
import { CustomData } from 'components/Modals/AddActionModal/SetupCustomModal'
import { ManageMembersData } from 'components/Modals/AddActionModal/SetupManageMembersModal'
import { ManageStorageItemsData } from 'components/Modals/AddActionModal/SetupManageStorageItemsModal'
import { ValidatorActionsData, ValidatorActionType } from 'components/Modals/AddActionModal/SetupValidatorActionsModal'
import { MsgWithdrawValidatorCommission } from '@ixo/impactxclient-sdk/types/codegen/cosmos/distribution/v1beta1/tx'
import { MsgUnjail } from '@ixo/impactxclient-sdk/types/codegen/cosmos/slashing/v1beta1/tx'

export const makeSpendAction = (data: SpendData): any => {
  if (data.denom === NATIVE_MICRODENOM || data.denom.startsWith('ibc/')) {
    const bank = makeBankMessage(data.amount.toString(), data.to, data.denom)
    return { bank }
  }

  // Get cw20 token decimals from cw20 treasury list.
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: data.denom,
        funds: [],
        msg: {
          transfer: {
            recipient: data.to,
            amount: data.amount,
          },
        },
      },
    },
  })
}

export const makeAuthzExecAction = (grantee: string, data: AuthzExecData): any => {
  return makeStargateMessage({
    stargate: {
      typeUrl: '/cosmos.authz.v1beta1.MsgExec',
      value: {
        grantee,
        msgs:
          data.authzExecActionType === AuthzExecActionTypes.Custom
            ? JSON.parse(data.custom)
            : [
                encodeRawProtobufMsg({
                  typeUrl: data.authzExecActionType,
                  value:
                    data.authzExecActionType === AuthzExecActionTypes.Delegate
                      ? data.delegate
                      : data.authzExecActionType === AuthzExecActionTypes.Undelegate
                      ? data.undelegate
                      : data.authzExecActionType === AuthzExecActionTypes.Redelegate
                      ? data.redelegate
                      : data.authzExecActionType === AuthzExecActionTypes.ClaimRewards
                      ? data.claimRewards
                      : undefined,
                }),
              ],
      },
    },
  })
}

export const makeAuthzAuthorizationAction = (grantee: string, data: AuthzData): any => {
  return makeStargateMessage({
    stargate: {
      typeUrl: data.typeUrl,
      value: {
        ...(data.typeUrl === TYPE_URL_MSG_GRANT
          ? {
              grant: {
                authorization: encodeRawProtobufMsg({
                  typeUrl: TYPE_URL_GENERIC_AUTHORIZATION,
                  value: {
                    msg: data.value.msgTypeUrl,
                  },
                }),
              },
            }
          : {
              msgTypeUrl: data.value.msgTypeUrl,
            }),
        grantee,
        granter: data.value.grantee,
      },
    },
  })
}

export const makeBurnNftAction = (data: BurnNftData): any => {
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: data.collection,
        funds: [],
        msg: {
          burn: {
            token_id: data.tokenId,
          },
        },
      },
    },
  })
}

export const makeMintAction = (governanceTokenAddress: string, data: MintData): any => {
  // const amount = convertDenomToMicroDenomWithDecimals(data.amount, governanceTokenInfo.decimals)
  return makeExecutableMintMessage(makeMintMessage(data.amount.toString(), data.to), governanceTokenAddress)
}

export const makeExecuteAction = (data: ExecuteData): any => {
  let msg
  try {
    msg = JSON5.parse(data.message)
  } catch (err) {
    console.error(`internal error. unparsable message: (${data.message})`, err)
    return
  }

  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: data.address,
        funds: data.funds,
        msg,
      },
    },
  })
}

export const makeInstantiateAction = (data: InstantiateData): any => {
  let msg
  try {
    msg = JSON5.parse(data.message)
  } catch (err) {
    console.error(`internal error. unparsable message: (${data.message})`, err)
    return
  }

  return makeWasmMessage({
    wasm: {
      instantiate: {
        admin: data.admin || null,
        code_id: data.codeId,
        funds: data.funds,
        label: data.label,
        msg,
      },
    },
  })
}

export const makeManageSubDaosAction = (address: string, data: ManageSubDaosData): any => {
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: address,
        funds: [],
        msg: {
          update_sub_daos: {
            to_add: data.toAdd,
            to_remove: data.toRemove.map(({ address }) => address),
          },
        },
      },
    },
  })
}

export const makeManageCw721Action = (address: string, data: ManageCw721Data): any => {
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: address,
        funds: [],
        msg: {
          update_cw721_list: {
            to_add: data.adding ? [data.address] : [],
            to_remove: !data.adding ? [data.address] : [],
          },
        },
      },
    },
  })
}

export const makeManageCw20Action = (address: string, data: ManageCw20Data): any => {
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: address,
        funds: [],
        msg: {
          update_cw20_list: {
            to_add: data.adding ? [data.address] : [],
            to_remove: !data.adding ? [data.address] : [],
          },
        },
      },
    },
  })
}

export const makeMigrateAction = (data: MigrateData): any => {
  let msg
  try {
    msg = JSON5.parse(data.msg)
  } catch (err) {
    console.error(`internal error. unparsable message: (${msg})`, err)
    return
  }
  return makeWasmMessage({
    wasm: {
      migrate: {
        contract_addr: data.contract,
        new_code_id: data.codeId,
        msg,
      },
    },
  })
}

export const makeStakeAction = (data: StakeData): any => {
  if (data.stakeType === StakeType.WithdrawDelegatorReward) {
    return makeDistributeMessage(data.validator)
  }

  // NOTE: Does not support TOKEN staking at this point, however it could be
  // implemented here!
  // const decimals = nativeTokenDecimals(data.denom)!
  // const amount = convertDenomToMicroDenomWithDecimals(data.amount, decimals)
  return makeStakingMessage(data.stakeType, data.amount, data.denom, data.validator, data.toValidator)
}

export const makeTransferNFTAction = (data: TransferNftData): any => {
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: data.collection,
        funds: [],
        msg: data.executeSmartContract
          ? {
              send_nft: {
                contract: data.recipient,
                msg: toBase64(toUtf8(JSON.stringify(data.smartContractMsg))),
                token_id: data.tokenId,
              },
            }
          : {
              transfer_nft: {
                recipient: data.recipient,
                token_id: data.tokenId,
              },
            },
      },
    },
  })
}

export const makeUpdateAdminAction = (data: UpdateAdminData): any => {
  return makeWasmMessage({
    wasm: {
      update_admin: {
        contract_addr: data.contract,
        admin: data.newAdmin,
      },
    },
  })
}

export const makeUpdatePreProposeConfigAction = (preProposeAddress: string, data: UpdatePreProposeConfigData): any => {
  const updateConfigMessage: ExecuteMsg = {
    update_config: {
      deposit_info: data.depositRequired
        ? {
            amount: data.depositInfo.amount,
            denom:
              data.depositInfo.type === 'voting_module_token'
                ? {
                    voting_module_token: {},
                  }
                : {
                    token: {
                      denom:
                        data.depositInfo.type === 'native'
                          ? {
                              native: data.depositInfo.denomOrAddress,
                            }
                          : // depositInfo.type === 'cw20'
                            {
                              cw20: data.depositInfo.denomOrAddress,
                            },
                    },
                  },
            refund_policy: data.depositInfo.refundPolicy,
          }
        : null,
      open_proposal_submission: data.anyoneCanPropose,
    },
  }

  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: preProposeAddress,
        funds: [],
        msg: updateConfigMessage,
      },
    },
  })
}

export const makeUpdateVotingConfigAction = (
  daoAddress: string,
  proposalModuleAddress: string,
  data: UpdateProposalConfigData,
): any => {
  const typePercentageToPercentageThreshold = (t: 'majority' | '%', p: number | undefined) => {
    if (t === 'majority') {
      return { majority: {} }
    } else {
      if (p === undefined) {
        throw new Error('internal erorr: an undefined percent was configured with a non-majority threshold.')
      }
      return {
        percent: (p / 100).toString(),
      }
    }
  }
  const maxVotingInfoToCosmos = (t: 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds', v: number) => {
    const converter = {
      weeks: 604800,
      days: 86400,
      hours: 3600,
      minutes: 60,
      seconds: 1,
    }

    return {
      time: converter[t] * v,
    }
  }
  const updateConfigMessage: ExecuteMsg = {
    update_config: {
      threshold: data.quorumEnabled
        ? {
            threshold_quorum: {
              quorum: typePercentageToPercentageThreshold(data.quorumType, data.quorumPercentage),
              threshold: typePercentageToPercentageThreshold(data.thresholdType, data.thresholdPercentage),
            },
          }
        : {
            absolute_percentage: {
              percentage: typePercentageToPercentageThreshold(data.thresholdType, data.thresholdPercentage),
            },
          },
      max_voting_period: maxVotingInfoToCosmos(data.proposalDurationUnits, data.proposalDuration),
      only_members_execute: data.onlyMembersExecute,
      allow_revoting: data.allowRevoting,
      // Pass through because we don't support changing them yet.
      dao: daoAddress,
      close_proposal_on_execution_failure: true, // 'proposalModuleConfig.close_proposal_on_execution_failure',
      min_voting_period: null, //'proposalModuleConfig.min_voting_period',
    },
  }

  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: proposalModuleAddress,
        funds: [],
        msg: updateConfigMessage,
      },
    },
  })
}
export const makeGovernanceVoteAction = (walletAddress: string, data: GovernanceVoteData): any => {
  return makeStargateMessage({
    stargate: {
      typeUrl: '/cosmos.gov.v1beta1.MsgVote',
      value: {
        proposalId: Long.fromString(data.proposalId || '-1'),
        voter: walletAddress,
        option: data.vote,
      } as MsgVote,
    },
  })
}

export const makeWithdrawTokenSwapAction = (data: WithdrawTokenSwapData): any => {
  if (!data?.tokenSwapContractAddress) {
    throw new Error('error.loadingData')
  }

  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: data.tokenSwapContractAddress,
        funds: [],
        msg: {
          withdraw: {},
        },
      },
    },
  })
}

export const makeUpdateInfoAction = (daoAddress: string, data: UpdateInfoData): any => {
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: daoAddress,
        funds: [],
        msg: {
          update_config: {
            config: {
              ...data,
              // Replace empty string with null.
              image_url: data.image_url?.trim() || null,
            },
          },
        },
      },
    },
  })
}

export const makeCustomAction = (data: CustomData): any => {
  let msg
  try {
    msg = JSON5.parse(data.message)
  } catch (err) {
    console.error(`internal error. unparsable message: (${data.message})`, err)
    return
  }
  // Convert the wasm message component to base64
  if (msg.wasm) msg = makeWasmMessage(msg)
  return msg
}

export const makeManageMembersAction = (cw4GroupAddress: string, data: ManageMembersData): any => {
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: cw4GroupAddress,
        funds: [],
        msg: {
          update_members: {
            add: data.toAdd,
            remove: data.toRemove.map(({ addr }) => addr),
          },
        },
      },
    },
  })
}

export const makeManageStorageItemsAction = (daoAddress: string, data: ManageStorageItemsData): any => {
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: daoAddress,
        funds: [],
        msg: data.setting
          ? {
              set_item: {
                key: data.key,
                addr: data.value,
              },
            }
          : {
              remove_item: {
                key: data.key,
              },
            },
      },
    },
  })
}

export const makeValidatorActions = (validatorAddress: string, data: ValidatorActionsData): any => {
  switch (data.validatorActionType) {
    case ValidatorActionType.WithdrawValidatorCommission:
      return makeStargateMessage({
        stargate: {
          typeUrl: ValidatorActionType.WithdrawValidatorCommission,
          value: {
            validatorAddress,
          } as MsgWithdrawValidatorCommission,
        },
      })
    case ValidatorActionType.CreateValidator: {
      const parsed = JSON.parse(data.createMsg)
      return makeStargateMessage({
        stargate: {
          typeUrl: ValidatorActionType.CreateValidator,
          value: {
            ...parsed,
            pubkey: encodeRawProtobufMsg(parsed.pubkey),
          },
        },
      })
    }
    case ValidatorActionType.EditValidator:
      return makeStargateMessage({
        stargate: {
          typeUrl: ValidatorActionType.EditValidator,
          value: JSON.parse(data.editMsg),
        },
      })
    case ValidatorActionType.UnjailValidator:
      return makeStargateMessage({
        stargate: {
          typeUrl: ValidatorActionType.UnjailValidator,
          value: {
            validatorAddr: validatorAddress,
          } as MsgUnjail,
        },
      })
    default:
      throw Error('Unrecogonized validator action type')
  }
}
