import { IWalletConnector } from "interfaces/walletConnector";
import { SignX } from "@ixo/signx-sdk";
import { Wallet } from "contexts";
import { toHex } from "@cosmjs/encoding";
import { createRegistry } from "@ixo/impactxclient-sdk";

const SIGN_X_LOGIN_SUCCESS = "SIGN_X_LOGIN_SUCCESS";
const SIGN_X_LOGIN_ERROR = "SIGN_X_LOGIN_ERROR";
const SIGN_X_TRANSACT_SUCCESS = "SIGN_X_TRANSACT_SUCCESS";
const SIGN_X_TRANSACT_ERROR = "SIGN_X_TRANSACT_ERROR";

export const SignXEndpoints = {
  devnet: "https://signx.devnet.ixo.earth",
  testnet: "https://signx.testnet.ixo.earth",
  mainnet: "https://signx.ixo.earth",
};

export const strToArray = (str: string): Uint8Array => {
  return new Uint8Array(Buffer.from(str));
};

export class SignXWallet {
  private signXClient: SignX;
  timeout: number;

  constructor(network: keyof typeof SignXEndpoints) {
    this.signXClient = new SignX({
      endpoint: SignXEndpoints[network],
      sitename: "Launchpad Portal",
      network: network,
    });
    this.timeout = this.signXClient.timeout;
  }

  async init() {
    return await this.signXClient.login({ pollingInterval: 2000 });
  }

  async initTransaction(sequence: number, data: any, wallet: Wallet) {
    const registry = createRegistry();
    return {
      timeout: this.timeout,
      data: await this.signXClient.transact({
        address: wallet.address,
        did: wallet.did!,
        pubkey: toHex(wallet.pubKey),
        timestamp: new Date().toISOString(),
        transactions: [{
          sequence: sequence, txBodyHex: toHex(
            registry.encodeTxBody({ messages: data as any, memo: undefined })
          )
        }],
      }),
    };
  }

  pollNextTransaction(){
    this.signXClient.pollNextTransaction()
  }


  async connect() {
    return new Promise((resolve, reject) => {
      try {
        this.signXClient.on(SIGN_X_LOGIN_SUCCESS, (result) => {
          console.log("Login Success:", result);
          resolve(result.data); // Resolve the promise with the login success data
        });

        this.signXClient.on(SIGN_X_LOGIN_ERROR, (error) => {
          console.error("Login Error:", error);
          reject(error); // Reject the promise with the login error
        });

        // Use loginRequest data to show QR code to user for scanning by mobile app
      } catch (error) {
        console.error("Error in connecting:", error);
        reject(error); // Reject the promise with any other errors
      }
    });
  }

  async waitOnTransactionExecution() {
    return new Promise((resolve, reject) => {
      try {
        this.signXClient.on(SIGN_X_TRANSACT_SUCCESS, (result) => {
          console.log("Transaction success:", result);
          resolve(result.data); // Resolve the promise with the login success data
        });

        this.signXClient.on(SIGN_X_TRANSACT_ERROR, (error) => {
          console.error("Transaction Error:", error);
          reject(error); // Reject the promise with the login error
        });

        // Use loginRequest data to show QR code to user for scanning by mobile app
      } catch (error) {
        console.error("Error in connecting:", error);
        reject(error); // Reject the promise with any other errors
      }
    });
  }

  // Implement other methods from IWalletConnector...
}
