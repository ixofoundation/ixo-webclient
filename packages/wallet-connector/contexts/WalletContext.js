"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletProvider = exports.WalletContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hooks_1 = require("@mantine/hooks");
const react_1 = require("react");
exports.WalletContext = (0, react_1.createContext)(undefined);
const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = (0, react_1.useState)(null);
    const [opened, { open, close }] = (0, hooks_1.useDisclosure)(false);
    // Add methods to handle wallet connection, disconnection, etc.
    const providerValue = (0, react_1.useMemo)(() => ({ wallet, setWallet, opened, open, close }), [wallet, setWallet, opened, open, close]);
    return ((0, jsx_runtime_1.jsx)(exports.WalletContext.Provider, { value: providerValue, children: children }));
};
exports.WalletProvider = WalletProvider;
