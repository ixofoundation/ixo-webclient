import { Coin } from "@cosmjs/proto-signing"
import { DeliverTxResponse, StdFee } from "@cosmjs/stargate"
import { cosmwasm } from "@ixo/impactxclient-sdk"
import { Uint128 } from "@ixo/impactxclient-sdk/types/codegen/DaoCore.types"
import { Vote } from "@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types"
import { MsgExecuteContract } from "@ixo/impactxclient-sdk/types/codegen/cosmwasm/wasm/v1/tx"
import { strToArray } from "utils/encoding"

type DaoPreProposeSingleVoteProps = {
    proposalId: string
    rationale?: string
    vote: Vote
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

export class Cw20Base {
    contractAddress: string
    senderAddress: string
    message: SignXMessageProps | null
    private executeFunction: ExecuteFunctionProps

    constructor(contractAddress: string, senderAddress: string, execute: ExecuteFunctionProps) {
        this.contractAddress = contractAddress
        this.senderAddress = senderAddress
        this.message = null
        this.executeFunction = execute; // Store the passed function for later use\
    }

    private formatMessage(msg: string, fee: StdFee, memo: string | undefined, funds: Coin[] | undefined) {
        const message = {
            typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
            value: cosmwasm.wasm.v1.MsgExecuteContract.fromPartial({
                contract: this.contractAddress,
                funds,
                msg: strToArray(msg),
                sender: this.senderAddress,
            }),
        }
        return { messages: [message], fee, memo }
    }

    async vote({ proposalId, rationale, vote }: DaoPreProposeSingleVoteProps, fee: StdFee, memo: string | undefined, funds: Coin[] | undefined) {
        const messageObject = {
            vote: {
                proposal_id: proposalId, rationale, vote
            }
        }
        const instruction = this.formatMessage(JSON.stringify(messageObject), fee, memo, funds)

        return await this.execute(instruction)
    }

    async transfer({ amount, recipient }: { amount: Uint128, recipient: string }, fee: StdFee, memo: string | undefined, funds: Coin[] | undefined) {
        const messageObject = {
            transfer: {
                amount, recipient
            }
        }
        const instruction = this.formatMessage(JSON.stringify(messageObject), fee, memo, funds)

        return await this.execute(instruction)
    }

    async send({ amount, contract, msg }: { amount: Uint128, contract: string, msg: string }, fee: StdFee, memo: string | undefined, funds: Coin[] | undefined) {
        const messageObject = {
            send: {
                amount,
                contract,
                msg
            }
        }
        const instruction = this.formatMessage(JSON.stringify(messageObject), fee, memo, funds)

        return await this.execute(instruction)
    }

    async transferFrom({
        amount,
        owner,
        recipient
    }: {
        amount: Uint128;
        owner: string;
        recipient: string;
    }, fee: StdFee, memo?: string, funds?: Coin[]) {
        const messageObject = {
            transfer_from: {
                amount,
                owner,
                recipient
            }
        }
        const instruction = this.formatMessage(JSON.stringify(messageObject), fee, memo, funds)

        return await this.execute(instruction);
    };

    async sendFrom({
        amount,
        contract,
        msg,
        owner
    }: {
        amount: Uint128;
        contract: string;
        msg: string;
        owner: string;
    }, fee: StdFee, memo?: string, funds?: Coin[]) {

        const messageObject = {
            send_from: {
                amount,
                contract,
                msg,
                owner
            }
        }

        const instruction = this.formatMessage(JSON.stringify(messageObject), fee, memo, funds)

        return await this.execute(instruction);
    };

    private async execute(instruction: SignXMessageProps) {
        if (this.executeFunction && this.message) {
            return await this.executeFunction(instruction);
        }
    }
}
