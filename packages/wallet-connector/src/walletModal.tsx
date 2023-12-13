import { useEffect, useState } from "react";
import { Modal, Box, MantineProvider, Flex, Text, Button } from "@mantine/core";
import { SegmentedControl } from "@mantine/core";
import { ConnectModal as ImpactsXConnectModal, TimeLeft } from "impactsxmobile";
import { useWallet } from "hooks";
import { KeplrIcon } from "assets/keplr-icon";
import { QRCodeSVG } from "qrcode.react";
import { upperFirst } from "@mantine/hooks";
import { WalletType } from "@ixo-webclient/types";

const DesktopWalletModal = () => {
  const { connectWallet } = useWallet()
  const handleKeplrConnect = () => {
    connectWallet(WalletType.Keplr)
  }

  return (
    <Flex
      w="100%"
      h="100%"
      justify="center"
      align="center"
      direction="column"
      gap="20px"
    >
      <Flex>
        <Text style={{ color: "white" }}>
          Select your browser extension wallet you wish to connect
        </Text>
      </Flex>
      <Box>
        <Button
          size="lg"
          styles={{
            root: { backgroundColor: "transparent", borderColor: "#00D2FF" },
            label: { color: "white" },
          }}
          leftSection={<KeplrIcon size={14} />}
          variant="default"
          onClick={handleKeplrConnect}
        >
          Keplr Wallet
        </Button>
      </Box>
    </Flex>
  );
};

const ConnectModal = () => {
  const [activeTab, setActiveTab] = useState("mobile");

  return (
    <Flex w="100%" direction="column" align="center">
      <Box w="50%">
        <SegmentedControl
          w="100%"
          data={["mobile", "desktop"]}
          styles={{
            root: {
              backgroundColor: "#436779",
              color: "white",
              padding: 0,
              height: "33px",
            },
            indicator: {
              backgroundColor: "#00D2FF",
            },
            label: {
              color: "white",
            },
          }}
          radius={23}
          mb="sm"
          onChange={setActiveTab}
          value={activeTab}
        />
      </Box>
      <Box>
        {activeTab === "mobile" && <ImpactsXConnectModal />}
        {activeTab === "desktop" && <DesktopWalletModal />}
      </Box>
    </Flex>
  );
};

const TransactModal = () => {
  const { mobile } = useWallet();
  return (
    <Flex
      w="100%"
      h="100%"
      justify="center"
      align="center"
      direction="column"
      gap="20px"
    >
      <Flex>
        <Text style={{ color: "white" }}>
          Scan this QR code with your Impacts X Mobile app
        </Text>
      </Flex>
      <TimeLeft timeout={mobile?.timeout || 0} />
      {mobile.qr && (
        <QRCodeSVG
          value={mobile.qr}
          size={250}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"Q"}
          style={{ padding: "20px", background: "white", borderRadius: "20px" }}
          imageSettings={{
            src: "/assets/oval-x-icon.png",
            x: undefined,
            y: undefined,
            height: 30,
            width: 30,
            excavate: true,
          }}
        />
      )}
    </Flex>
  );
};

export const WalletModal = (): JSX.Element => {
  const { opened, close, wallet, CustomComponent, mobile } = useWallet();

  const [step, setStep] = useState<"" | "transacting" | "profile" | "connect">(
    ""
  );

  useEffect(() => {
    if (wallet && mobile?.transacting) {
      setStep("transacting");
    }
    if (wallet && !mobile?.transacting) {
      setStep("profile");
    }
    if (!wallet) {
      setStep("connect");
    }
  }, [wallet, mobile.transacting]);

  console.log({ mobile, step })

  return (
    <MantineProvider>
      <Modal
        styles={{
          header: {
            backgroundColor: "#01273A",
          },
          body: {
            backgroundColor: "#01273A",
          },
          title: {
            color: "white",
          },
        }}
        radius="lg"
        size={step === "profile" ? "lg" : "md"}
        padding="xl"
        opened={opened}
        onClose={close}
        title={upperFirst(step)}
      >
        {step === "profile" && CustomComponent}
        {step === "connect" && <ConnectModal />}
        {step === "transacting" && <TransactModal />}
      </Modal>
    </MantineProvider>
  );
};
