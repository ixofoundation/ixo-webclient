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
exports.useWallet = void 0;
const types_1 = require("@ixo-webclient/types");
const react_1 = require("react");
const WalletContext_1 = require("../contexts/WalletContext");
const impactsxmobile_1 = require("../impactsxmobile");
const keplr_1 = require("../keplr");
const KeplrWallet = new keplr_1.Keplr();
const signXWallet = new impactsxmobile_1.SignXWallet();
const useWallet = () => {
    const context = (0, react_1.useContext)(WalletContext_1.WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    const connectWallet = (type) => __awaiter(void 0, void 0, void 0, function* () {
        let wallet;
        // Logic to connect the wallet
        if (type === types_1.WalletType.Keplr) {
            wallet = yield KeplrWallet.connect();
        }
        if (type === types_1.WalletType.ImpactXMobile) {
            wallet = yield signXWallet.connect();
        }
        if (wallet) {
            context.setWallet(wallet);
        }
    });
    const disconnectWallet = () => {
        // Logic to disconnect the wallet
    };
    // Add other wallet-related methods here
    return Object.assign(Object.assign({}, context), { connectWallet, disconnectWallet });
};
exports.useWallet = useWallet;
