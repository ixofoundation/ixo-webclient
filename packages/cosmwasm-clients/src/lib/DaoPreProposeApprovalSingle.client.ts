/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.26.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import { UncheckedDenom, UncheckedDepositInfo, ProposeMessage ,Binary,   ExecuteExt, Status, Coin,  QueryExt, Addr, Config, DepositInfoResponse, HooksResponse } from "./DaoPreProposeApprovalSingle.types";
import { BaseClient, DeliverTxResponse } from "./Base.client";
export interface DaoPreProposeApprovalSingleReadOnlyInterface {
  contractAddress: string;
  proposalModule: () => Promise<Addr>;
  dao: () => Promise<Addr>;
  config: () => Promise<Config>;
  depositInfo: ({
    proposalId
  }: {
    proposalId: number;
  }) => Promise<DepositInfoResponse>;
  proposalSubmittedHooks: () => Promise<HooksResponse>;
  queryExtension: ({
    msg
  }: {
    msg: QueryExt;
  }) => Promise<Binary>;
}
export interface DaoPreProposeApprovalSingleInterface extends DaoPreProposeApprovalSingleReadOnlyInterface {
  contractAddress: string;
  sender: string;
  propose: ({
    msg
  }: {
    msg: ProposeMessage;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateConfig: ({
    depositInfo,
    openProposalSubmission
  }: {
    depositInfo?: UncheckedDepositInfo;
    openProposalSubmission: boolean;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  withdraw: ({
    denom
  }: {
    denom?: UncheckedDenom;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  extension: ({
    msg
  }: {
    msg: ExecuteExt;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  addProposalSubmittedHook: ({
    address
  }: {
    address: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  removeProposalSubmittedHook: ({
    address
  }: {
    address: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  proposalCompletedHook: ({
    newStatus,
    proposalId
  }: {
    newStatus: Status;
    proposalId: number;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
export class DaoPreProposeApprovalSingleClient extends BaseClient {
  sender: string;
  contractAddress: string;

  constructor(execute: any, sender: string, contractAddress: string) {
    super(execute);
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.propose = this.propose.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.extension = this.extension.bind(this);
    this.addProposalSubmittedHook = this.addProposalSubmittedHook.bind(this);
    this.removeProposalSubmittedHook = this.removeProposalSubmittedHook.bind(this);
    this.proposalCompletedHook = this.proposalCompletedHook.bind(this);
  }

  propose = async ({
    msg
  }: {
    msg: ProposeMessage;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<string | DeliverTxResponse | undefined> => {
    return await super.execute(this.sender, this.contractAddress, {
      propose: {
        msg
      }
    }, fee, memo, funds);
  };
  updateConfig = async ({
    depositInfo,
    openProposalSubmission
  }: {
    depositInfo?: UncheckedDepositInfo;
    openProposalSubmission: boolean;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<string | DeliverTxResponse | undefined> => {
    return await super.execute(this.sender, this.contractAddress, {
      update_config: {
        deposit_info: depositInfo,
        open_proposal_submission: openProposalSubmission
      }
    }, fee, memo, funds);
  };
  withdraw = async ({
    denom
  }: {
    denom?: UncheckedDenom;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<string | DeliverTxResponse | undefined> => {
    return await super.execute(this.sender, this.contractAddress, {
      withdraw: {
        denom
      }
    }, fee, memo, funds);
  };
  extension = async ({
    msg
  }: {
    msg: ExecuteExt;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<string | DeliverTxResponse | undefined> => {
    return await super.execute(this.sender, this.contractAddress, {
      extension: {
        msg
      }
    }, fee, memo, funds);
  };
  addProposalSubmittedHook = async ({
    address
  }: {
    address: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<string | DeliverTxResponse | undefined> => {
    return await super.execute(this.sender, this.contractAddress, {
      add_proposal_submitted_hook: {
        address
      }
    }, fee, memo, funds);
  };
  removeProposalSubmittedHook = async ({
    address
  }: {
    address: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<string | DeliverTxResponse | undefined> => {
    return await super.execute(this.sender, this.contractAddress, {
      remove_proposal_submitted_hook: {
        address
      }
    }, fee, memo, funds);
  };
  proposalCompletedHook = async ({
    newStatus,
    proposalId
  }: {
    newStatus: Status;
    proposalId: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<string | DeliverTxResponse | undefined> => {
    return await super.execute(this.sender, this.contractAddress, {
      proposal_completed_hook: {
        new_status: newStatus,
        proposal_id: proposalId
      }
    }, fee, memo, funds);
  };
}