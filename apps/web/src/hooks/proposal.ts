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
import { StakeToGroupData } from 'components/Modals/AddActionModal/SetupStakeToGroupModal'
import { MsgWithdrawValidatorCommission } from '@ixo/impactxclient-sdk/types/codegen/cosmos/distribution/v1beta1/tx'
import { MsgUnjail } from '@ixo/impactxclient-sdk/types/codegen/cosmos/slashing/v1beta1/tx'
import { PerformTokenSwapData } from 'components/Modals/AddActionModal/SetupTokenSwapModal'
import { coins } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/amino'
import { DaoAdminExecData } from 'components/Modals/AddActionModal/SetupDAOAdminExecuteModal'
import { SendGroupTokenData } from 'components/Modals/AddActionModal/SetupSendGroupTokenModal'
import { cosmwasm, ixo, utils } from '@ixo/impactxclient-sdk'
import { useCurrentEntityDAOGroup } from './currentEntity'
import { AcceptToMarketplaceData } from 'components/Modals/AddActionModal/SetupAcceptToMarketplaceModal'
import { TDAOGroupModel } from 'types/entities'

export function useMakeProposalAction(coreAddress: string, daoGroups: { [address: string]: TDAOGroupModel }) {
  const { daoGroup } = useCurrentEntityDAOGroup(coreAddress, daoGroups)

  const makeSpendAction = (data: SpendData): any => {
    const { denom, amount, to } = data
    if (
      denom === NATIVE_MICRODENOM
      //  || denom.startsWith('ibc/')
    ) {
      const bank = makeBankMessage(amount, to, denom)
      return { bank }
    } else {
      return makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: denom,
            funds: [],
            msg: {
              transfer: {
                recipient: to,
                amount: amount,
              },
            },
          },
        },
      })
    }
  }

  const makeAuthzExecAction = (data: AuthzExecData): any => {
    return makeStargateMessage({
      stargate: {
        typeUrl: '/cosmos.authz.v1beta1.MsgExec',
        value: {
          grantee: coreAddress,
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

  const makeAuthzAuthorizationAction = (data: AuthzData): any => {
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
                  expiration: utils.proto.toTimestamp(new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)),
                },
              }
            : {
                msgTypeUrl: data.value.msgTypeUrl,
              }),
          grantee: data.value.grantee,
          granter: coreAddress,
        },
      },
    })
  }

  const makeBurnNftAction = (data: BurnNftData): any => {
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

  const makeMintAction = (governanceTokenAddress: string, data: MintData): any => {
    // const amount = convertDenomToMicroDenomWithDecimals(data.amount, governanceTokenInfo.decimals)
    return makeExecutableMintMessage(makeMintMessage(data.amount.toString(), data.to), governanceTokenAddress)
  }

  const makeExecuteAction = (data: ExecuteData): any => {
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

  const makeInstantiateAction = (data: InstantiateData): any => {
    const message = utils.conversions.JsonToArray(data.message)

    return makeStargateMessage({
      stargate: {
        typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
        value: cosmwasm.wasm.v1.MsgInstantiateContract.fromPartial({
          admin: data.admin,
          codeId: Long.fromNumber(data.codeId),
          funds: data.funds,
          label: data.label,
          msg: message,
        })
      },
    })
  }

  const makeManageSubDaosAction = (data: ManageSubDaosData): any => {
    return makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: coreAddress,
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

  const makeManageCw721Action = (address: string, data: ManageCw721Data): any => {
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

  const makeManageCw20Action = (address: string, data: ManageCw20Data): any => {
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

  const makeMigrateAction = (data: MigrateData): any => {
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

  const makeStakeAction = (data: StakeData): any => {
    if (data.stakeType === StakeType.WithdrawDelegatorReward) {
      return makeDistributeMessage(data.validator)
    }

    // NOTE: Does not support TOKEN staking at this point, however it could be
    // implemented here!
    // const decimals = nativeTokenDecimals(data.denom)!
    // const amount = convertDenomToMicroDenomWithDecimals(data.amount, decimals)
    return makeStakingMessage(data.stakeType, data.amount, data.denom, data.validator, data.toValidator)
  }

  const makeTransferNFTAction = (data: TransferNftData): any => {
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

  const makeUpdateAdminAction = (data: UpdateAdminData): any => {
    return makeWasmMessage({
      wasm: {
        update_admin: {
          contract_addr: data.contract,
          admin: data.newAdmin,
        },
      },
    })
  }

  const makeUpdatePreProposeConfigAction = (data: UpdatePreProposeConfigData): any => {
    const preProposalContractAddress = daoGroup?.proposalModule.preProposalContractAddress
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
          contract_addr: preProposalContractAddress,
          funds: [],
          msg: updateConfigMessage,
        },
      },
    })
  }

  const makeUpdateVotingConfigAction = (data: UpdateProposalConfigData): any => {
    const proposalModuleAddress = daoGroup?.proposalModule.proposalModuleAddress
    const proposalModuleConfig = daoGroup?.proposalModule.proposalConfig

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
        dao: proposalModuleConfig?.dao,
        close_proposal_on_execution_failure: proposalModuleConfig?.close_proposal_on_execution_failure,
        min_voting_period: proposalModuleConfig?.min_voting_period,
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

  const makeGovernanceVoteAction = (walletAddress: string, data: GovernanceVoteData): any => {
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

  const makeWithdrawTokenSwapAction = (data: WithdrawTokenSwapData): any => {
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

  const makeUpdateInfoAction = (data: UpdateInfoData): any => {
    return makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: coreAddress,
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

  const makeCustomAction = (data: CustomData): any => {
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

  const makeManageMembersAction = (data: ManageMembersData, cw4GroupAddress: string): any => {
    return makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: cw4GroupAddress,
          funds: [],
          msg: {
            update_members: {
              add: data.add,
              remove: data.remove.map(({ addr }) => addr),
            },
          },
        },
      },
    })
  }

  const makeManageStorageItemsAction = (data: ManageStorageItemsData): any => {
    // TODO:
    // V1 DAOs and V2-alpha DAOs use a value key of `addr`, V2-beta uses `value`.
    // const valueKey =
    //   context.info.coreVersion === ContractVersion.V1 || context.info.coreVersion === ContractVersion.V2Alpha
    //     ? 'addr'
    //     : 'value'
    return makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: coreAddress,
          funds: [],
          msg: data.setting
            ? {
                set_item: {
                  key: data.key,
                  ['value']: data.value,
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

  const makeValidatorActions = (validatorAddress: string, data: ValidatorActionsData): any => {
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

  const CW20_SEND_MSG_KEY = 'ixo_initiate_token_swap'

  const makePerformTokenSwapAction = (data: PerformTokenSwapData): any => {
    // Should never happen if form validation is working correctly.
    if (!data.tokenSwapContractAddress || !data.selfParty) {
      throw new Error('error.loadingData')
    }

    // Convert amount to micro amount.
    // const amount = convertDenomToMicroDenomWithDecimals(data.selfParty.amount, data.selfParty.decimals).toString()
    const amount = data.selfParty.amount

    return data.selfParty.type === 'cw20'
      ? makeWasmMessage({
          wasm: {
            execute: {
              // Execute CW20 send message.
              contract_addr: data.selfParty.denomOrAddress,
              funds: [],
              msg: {
                send: {
                  amount,
                  contract: data.tokenSwapContractAddress,
                  msg: toBase64(
                    toUtf8(
                      JSON.stringify({
                        // Use common key to identify CW20s being sent to
                        // token swaps from this DAO DAO action.
                        [CW20_SEND_MSG_KEY]: {},
                      }),
                    ),
                  ),
                },
              },
            },
          },
        })
      : makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: data.tokenSwapContractAddress,
              funds: coins(amount, data.selfParty.denomOrAddress),
              msg: {
                fund: {},
              },
            },
          },
        })
  }

  const makeDaoAdminExecAction = (data: DaoAdminExecData): any => {
    return makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: data.coreAddress,
          funds: [],
          msg: {
            execute_admin_msgs: {
              msgs: data.msgs,
            },
          },
        },
      },
    })
  }

  const makeStakeToGroupAction = (data: StakeToGroupData): any => {
    return makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: data.tokenContract,
          funds: [],
          msg: {
            send: {
              amount: data.amount,
              contract: data.stakingContract,
              msg: btoa('{"stake": {}}'),
            },
          },
        },
      },
    })
  }

  const makeSendGroupTokenAction = (data: SendGroupTokenData): any => {
    return makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: data.contract,
          funds: [],
          msg: {
            transfer: {
              recipient: data.toAddress,
              amount: data.amount,
            },
          },
        },
      },
    })
  }

  const makeJoinAction = (data: any): any => {
    const { id, coreAddress, address } = data
    return makeStargateMessage({
      stargate: {
        typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedEntity',
        value: ixo.iid.v1beta1.MsgAddLinkedEntity.fromPartial({
          id,
          linkedEntity: ixo.iid.v1beta1.LinkedEntity.fromPartial({
            type: 'MemberDAO',
            id: address,
            relationship: `member`,
            service: ``,
          }),
          signer: coreAddress,
        }),
      },
    })
  }

  const makeAcceptToMarketplaceAction = (data: AcceptToMarketplaceData): any => {
    const { did, relayerNodeDid, relayerNodeAddress } = data
    return makeStargateMessage({
      stargate: {
        typeUrl: '/ixo.entity.v1beta1.MsgUpdateEntityVerified',
        value: ixo.entity.v1beta1.MsgUpdateEntityVerified.fromPartial({
          id: did,
          entityVerified: true,
          relayerNodeDid,
          relayerNodeAddress,
        }),
      },
    })
  }

  const makeCreateEntityAction = (data: any): any => {
    return makeStargateMessage({
      stargate: data,
    })
  }

  return {
    makeSpendAction,
    makeAuthzExecAction,
    makeAuthzAuthorizationAction,
    makeMintAction,
    makeBurnNftAction,
    makeExecuteAction,
    makeInstantiateAction,
    makeManageSubDaosAction,
    makeManageCw721Action,
    makeManageCw20Action,
    makeMigrateAction,
    makeStakeAction,
    makeTransferNFTAction,
    makeUpdateAdminAction,
    makeUpdatePreProposeConfigAction,
    makeUpdateVotingConfigAction,
    makeGovernanceVoteAction,
    makeWithdrawTokenSwapAction,
    makeUpdateInfoAction,
    makeCustomAction,
    makeManageMembersAction,
    makeManageStorageItemsAction,
    makeValidatorActions,
    makePerformTokenSwapAction,
    makeDaoAdminExecAction,
    makeStakeToGroupAction,
    makeSendGroupTokenAction,
    makeJoinAction,
    makeAcceptToMarketplaceAction,
    makeCreateEntityAction,
  }
}
