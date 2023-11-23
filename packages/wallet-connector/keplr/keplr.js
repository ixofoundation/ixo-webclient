"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keplr = void 0;
const cosmos_chain_resolver_1 = require("@ixo/cosmos-chain-resolver");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
class Keplr {
    connect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const chainInfo = yield (0, cosmos_chain_resolver_1.getKeplrChainInfo)('impacthub', constants_1.chainNetwork);
            chainInfo.rest = (_a = process.env.REACT_APP_GAIA_URL) !== null && _a !== void 0 ? _a : chainInfo.rest;
            const wallet = constants_1.KeplrExtensionWallet;
            const walletClient = yield wallet.getClient(chainInfo);
            if (!walletClient) {
                throw new Error('Failed to retrieve wallet client.');
            }
            const connectedWallet = yield (0, utils_1.getConnectedWalletInfo)(wallet, walletClient, chainInfo);
            return connectedWallet;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic to disconnect from Leap wallet
        });
    }
}
exports.Keplr = Keplr;
