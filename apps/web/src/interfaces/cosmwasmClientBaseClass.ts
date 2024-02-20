import { DeliverTxResponse } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/stargate";
import { MsgExecuteContract } from "@ixo/impactxclient-sdk/types/codegen/cosmwasm/wasm/v1/tx";

export type SignXMessageProps = {
    messages: {
        typeUrl: string;
        value: MsgExecuteContract;
    }[];
    fee: StdFee;
    memo: string | undefined;
}

export type ExecuteFunctionProps = (data: SignXMessageProps) => Promise<DeliverTxResponse | string>;

export interface CosmwasmClientBase {
    contractAddress: string
    senderAddress: string
    message: SignXMessageProps | null
}