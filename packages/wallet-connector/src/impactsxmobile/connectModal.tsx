import React, { useEffect, useState } from "react";
import { Box, Flex, Progress, Text, Button } from "@mantine/core";
import { QRCodeSVG } from "qrcode.react";
import { XIcon } from "assets/x-icon";
import { useWallet } from "hooks";
import { WalletType } from "@ixo-webclient/types";
import { BrokenLink } from "assets/brokenLink";

export function TimeLeft({
  percent,
  timeLeft,
}: {
  percent: number;
  timeLeft: number;
}) {
  return (
    <Flex direction="column" align="center" gap="5px" w="100%">
      <Box style={{ flex: "1", alignSelf: "stretch" }}>
        <Progress value={percent} color={"#00D2FF"} size="4px" />
      </Box>
      <Text style={{ color: "#00D2FF" }}>time left: {timeLeft}s</Text>
    </Flex>
  );
}

export const ConnectModal = () => {
  const { connectWallet, mobile } = useWallet();

  useEffect(() => {
    connectWallet(WalletType.ImpactXMobile);
  }, []);

  // Correctly calculate timeout
  const initialTimeout = (mobile.timeout || 0) - new Date().getTime();
  // Convert timeout to seconds for initial state of timeLeft
  const [timeLeft, setTimeLeft] = useState(Math.floor(initialTimeout / 1000));

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  // Calculate percent based on timeLeft
  const percent = (timeLeft / (initialTimeout / 1000)) * 100;

  console.log({ timeLeft });

  // Conditional rendering based on timeLeft
  if (timeLeft <= 0) {
    return (
      <Flex direction="column" align="center" justify="space-between" h={"150px"}>
        <BrokenLink />
        <Button
          variant="outline"
          onClick={() => connectWallet(WalletType.ImpactXMobile)}
        >
          Regenerate QR
        </Button>
      </Flex>
    );
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
          Scan this QR code with your Impacts X Mobile app
        </Text>
      </Flex>
      {mobile?.timeout && <TimeLeft percent={percent} timeLeft={timeLeft} />}
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
      <Button
        size="lg"
        styles={{
          root: { backgroundColor: "transparent", borderColor: "#00D2FF" },
          label: { color: "white" },
        }}
        leftSection={<XIcon size={14} />}
        variant="default"
      >
        Download Impacts X
      </Button>
    </Flex>
  );
};
