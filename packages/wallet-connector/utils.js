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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectedWalletInfo = void 0;
const encoding_1 = require("@cosmjs/encoding");
const types_1 = require("@ixo-webclient/types");
const impactxclient_sdk_1 = require("@ixo/impactxclient-sdk");
const bs58_1 = __importDefault(require("bs58"));
const getConnectedWalletInfo = (wallet, client, chainInfo) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Call experimentalSuggestChain if defined, except for Keplr Mobile web.
    if (wallet.type !== types_1.WalletType.Keplr || client.mode !== 'mobile-web') {
        yield ((_a = client.experimentalSuggestChain) === null || _a === void 0 ? void 0 : _a.call(client, chainInfo));
    }
    yield client.enable(chainInfo.chainId);
    // Parallelize for efficiency.
    const [{ name, bech32Address: address, pubKey }, offlineSigner] = yield Promise.all([
        // Get name, address, and public key.
        client.getKey(chainInfo.chainId),
        // Get offline signer.
        wallet.getOfflineSignerFunction(client)(chainInfo.chainId),
    ]);
    const did = impactxclient_sdk_1.utils.did.generateSecpDid(bs58_1.default.encode(pubKey));
    if (address === undefined) {
        throw new Error('Failed to retrieve wallet address.');
    }
    return {
        wallet,
        walletClient: client,
        chainInfo,
        offlineSigner,
        name,
        address,
        did,
        publicKey: {
            data: pubKey,
            hex: (0, encoding_1.toHex)(pubKey),
        },
    };
});
exports.getConnectedWalletInfo = getConnectedWalletInfo;
