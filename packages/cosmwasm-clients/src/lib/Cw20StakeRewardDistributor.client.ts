/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.26.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { Uint128, InfoResponse, OwnershipForAddr } from "./Cw20StakeRewardDistributor.types";
import { BaseClient, DeliverTxResponse, ExecuteProps } from "./Base.client";
export interface Cw20StakeRewardDistributorReadOnlyInterface {
  contractAddress: string;
  info: () => Promise<InfoResponse>;
  ownership: () => Promise<OwnershipForAddr>;
}

export interface Cw20StakeRewardDistributorInterface extends Cw20StakeRewardDistributorReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updateConfig: ({
    rewardRate,
    rewardToken,
    stakingAddr
  }: {
    rewardRate: Uint128;
    rewardToken: string;
    stakingAddr: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  distribute: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  withdraw: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateOwnership: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
export class Cw20StakeRewardDistributorClient extends BaseClient {
  sender: string;
  contractAddress: string;

  constructor(execute: any, sender: string, contractAddress: string) {
    super(execute);
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateConfig = this.updateConfig.bind(this);
    this.distribute = this.distribute.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.updateOwnership = this.updateOwnership.bind(this);
  }

  updateConfig = async ({
    rewardRate,
    rewardToken,
    stakingAddr,
    transactionConfig
  }: {
    rewardRate: Uint128;
    rewardToken: string;
    stakingAddr: string;
    transactionConfig: ExecuteProps["transactionConfig"]
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      update_config: {
        reward_rate: rewardRate,
        reward_token: rewardToken,
        staking_addr: stakingAddr
      }
    }, fee, memo, funds, transactionConfig);
  };
  distribute = async ({ transactionConfig }: { transactionConfig: ExecuteProps["transactionConfig"] }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      distribute: {}
    }, fee, memo, funds, transactionConfig);
  };
  withdraw = async ({ transactionConfig }: { transactionConfig: ExecuteProps["transactionConfig"] }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      withdraw: {}
    }, fee, memo, funds, transactionConfig);
  };
  updateOwnership = async ({ transactionConfig }: { transactionConfig: ExecuteProps["transactionConfig"] }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      update_ownership: {}
    }, fee, memo, funds, transactionConfig);
  };
}