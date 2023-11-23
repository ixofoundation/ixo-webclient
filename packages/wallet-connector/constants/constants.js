"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.KeplrExtensionWallet = exports.chainNetwork = exports.CHAIN_ID = void 0;
const types_1 = require("@ixo-webclient/types");
exports.CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const testnetOrDevnet = (exports.CHAIN_ID === null || exports.CHAIN_ID === void 0 ? void 0 : exports.CHAIN_ID.startsWith('pandora'))
    ? 'testnet'
    : 'devnet';
exports.chainNetwork = (exports.CHAIN_ID === null || exports.CHAIN_ID === void 0 ? void 0 : exports.CHAIN_ID.startsWith('ixo'))
    ? 'mainnet'
    : testnetOrDevnet;
exports.KeplrExtensionWallet = {
    type: types_1.WalletType.Keplr,
    name: 'Keplr Wallet',
    description: 'Keplr Chrome Extension',
    imageUrl: 'https://bafkreifdzoeavalj5ger3bigyapou5vgcpbcflupowqrju5ykxubcbyjlq.ipfs.nftstorage.link',
    getClient: () => __awaiter(void 0, void 0, void 0, function* () { return (yield Promise.resolve().then(() => __importStar(require('@keplr-wallet/stores')))).getKeplrFromWindow(); }),
    getOfflineSignerFunction: (client) => 
    // This function expects to be bound to the `client` instance.
    client.getOfflineSignerAuto.bind(client),
    windowKeystoreRefreshEvent: 'keplr_keystorechange',
};
