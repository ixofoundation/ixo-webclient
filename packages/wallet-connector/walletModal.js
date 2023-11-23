"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@mantine/core");
const core_2 = require("@mantine/core");
const hooks_1 = require("./hooks");
const WalletModal = () => {
    const { opened, close } = (0, hooks_1.useWallet)();
    return ((0, jsx_runtime_1.jsx)(core_1.MantineProvider, { children: (0, jsx_runtime_1.jsx)(core_1.Modal, { styles: {
                root: {
                    borderRadius: "20%"
                },
                header: {
                    backgroundColor: "#01273A",
                },
                body: {
                    backgroundColor: "#01273A",
                },
                title: {
                    color: "white"
                }
            }, size: "lg", opened: opened, onClose: close, title: "Connect", children: (0, jsx_runtime_1.jsx)(core_1.Flex, { w: "100%", justify: "center", children: (0, jsx_runtime_1.jsx)(core_1.Box, { w: "50%", children: (0, jsx_runtime_1.jsx)(core_2.SegmentedControl, { w: "100%", data: ["mobile", "desktop"], styles: {
                            root: {
                                backgroundColor: "#01273A",
                            },
                            control: {
                                color: "white",
                            },
                            indicator: {
                                backgroundColor: "#00D2FF",
                                color: "white",
                            },
                            input: {
                                color: "white",
                            },
                        }, radius: 23, mb: "sm" }) }) }) }) }));
};
exports.WalletModal = WalletModal;
