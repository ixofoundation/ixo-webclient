import { useEffect, useState } from "react";
import { Modal, MantineProvider, Flex, Text, Button } from "@mantine/core";
import { useWallet } from "hooks";
import { QRCodeSVG } from "qrcode.react";
import { upperFirst } from "@mantine/hooks";
import { ConnectModal } from "components/connectModal";

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
          Scan this QR code with your Impacts X mobile app
        </Text>
      </Flex>
      {/* <TimeLeft timeout={mobile?.timeout || 0} /> */}
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

export const WalletModal = () => {
  const { opened, close, wallet, mobile } = useWallet();

  const [step, setStep] = useState<"" | "transacting" | "profile" | "connect">(
    ""
  );

  useEffect(() => {
    if (wallet && mobile?.transacting) {
      setStep("transacting");
    }
    if (!wallet) {
      setStep("connect");
    }
  }, [wallet, mobile.transacting]);

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
        size={"md"}
        padding="xl"
        opened={opened}
        onClose={close}
        title={upperFirst(step)}
      >
        {step === "connect" && <ConnectModal />}
        {step === "transacting" && <TransactModal />}
      </Modal>
    </MantineProvider>
  );
};
