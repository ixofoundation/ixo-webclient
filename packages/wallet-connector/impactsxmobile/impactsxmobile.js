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
exports.SignXWallet = void 0;
const signx_sdk_1 = require("@ixo/signx-sdk");
const SIGN_X_LOGIN_SUCCESS = 'SIGN_X_LOGIN_SUCCESS';
const SIGN_X_LOGIN_ERROR = 'SIGN_X_LOGIN_ERROR';
class SignXWallet {
    constructor() {
        this.signXClient = new signx_sdk_1.SignX({
            endpoint: 'https://your-signx-server.com',
            sitename: 'YourSiteName',
            network: 'mainnet',
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.signXClient.on(SIGN_X_LOGIN_SUCCESS, data => {
                    console.log('Login Success:', data);
                    // Handle successful login
                });
                this.signXClient.on(SIGN_X_LOGIN_ERROR, error => {
                    console.error('Login Error:', error);
                    // Handle login error
                });
                // Use loginRequest data to show QR code to user for scanning by mobile app
            }
            catch (error) {
                console.error('Error in connecting:', error);
                // Handle any other errors
            }
        });
    }
}
exports.SignXWallet = SignXWallet;
