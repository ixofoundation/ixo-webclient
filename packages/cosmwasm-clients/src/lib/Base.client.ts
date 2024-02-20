import { MsgExecuteContract } from "@ixo/impactxclient-sdk/types/codegen/cosmwasm/wasm/v1/tx"
import { cosmwasm } from "@ixo/impactxclient-sdk"

export interface Coin {
    readonly denom: string;
    readonly amount: string;
}

export interface StdFee {
    readonly amount: readonly Coin[];
    readonly gas: string;
    /** The granter address that is used for paying with feegrants */
    readonly granter?: string;
    /** The fee payer address. The payer must have signed the transaction. */
    readonly payer?: string;
}

export interface MsgData {
    msgType: string;
    data: Uint8Array;
}

export interface DeliverTxResponse {
    readonly height: number;
    /** The position of the transaction within the block. This is a 0-based index. */
    readonly txIndex: number;
    /** Error code. The transaction suceeded iff code is 0. */
    readonly code: number;
    readonly transactionHash: string;
    readonly events: readonly Event[];
    /**
     * A string-based log document.
     *
     * This currently seems to merge attributes of multiple events into one event per type
     * (https://github.com/tendermint/tendermint/issues/9595). You might want to use the `events`
     * field instead.
     */
    readonly rawLog?: string;
    /** @deprecated Use `msgResponses` instead. */
    readonly data?: readonly MsgData[];
    /**
     * The message responses of the [TxMsgData](https://github.com/cosmos/cosmos-sdk/blob/v0.46.3/proto/cosmos/base/abci/v1beta1/abci.proto#L128-L140)
     * as `Any`s.
     * This field is an empty list for chains running Cosmos SDK < 0.46.
     */
    readonly msgResponses: Array<{
        readonly typeUrl: string;
        readonly value: Uint8Array;
    }>;
    readonly gasUsed: number;
    readonly gasWanted: number;
}

type SignXMessageProps = {
    messages: {
        typeUrl: string;
        value: MsgExecuteContract;
    }[];
    fee: StdFee;
    memo: string | undefined;
}

type ExecuteFunctionProps = (data: SignXMessageProps) => Promise<DeliverTxResponse | string>;

export class BaseClient {
    private executeFunction: ExecuteFunctionProps

    constructor(execute: ExecuteFunctionProps){
        this.executeFunction = execute
    }

    private formatMessage(senderAddress, contractAddress, msg, fee, memo = "", funds) {
        const message = {
            typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
            value: cosmwasm.wasm.v1.MsgExecuteContract.fromPartial({
                contract: contractAddress,
                funds,
                msg: strToArray(msg),
                sender: this.senderAddress,
            }),
        }
        return { messages: [message], fee, memo }
    }

    private async execute(senderAddress, instructions, fee, memo = "") {
        const msgs = instructions.map((i) => ({
            typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
            value: cosmwasm.wasm.v1.MsgExecuteContract.fromPartial({
                sender: senderAddress,
                contract: i.contractAddress,
                msg: (0, encoding_1.toUtf8)(JSON.stringify(i.msg)),
                funds: [...(i.funds || [])],
            }),
        }));



        if (this.executeFunction) {
            return await this.executeFunction(instruction);
        }
    }
}