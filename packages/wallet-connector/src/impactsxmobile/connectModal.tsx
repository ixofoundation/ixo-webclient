import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Progress,
  Text,
  Button,
  Loader,
  Skeleton,
} from "@mantine/core";
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
  const [qrCodeExpired, setQRCodeExpired] = useState(false);

  // Set the initial timeout to be 2 minutes from now
  const twoMinutesInMilliseconds = 120000;
  const initialTimeout = new Date().getTime() + twoMinutesInMilliseconds;

  // Convert timeout to seconds for initial state of timeLeft
  const [timeLeft, setTimeLeft] = useState(twoMinutesInMilliseconds / 1000);
  const percent = (timeLeft / (twoMinutesInMilliseconds / 1000)) * 100;

  useEffect(() => {
    connectWallet(WalletType.ImpactXMobile);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (mobile.qr && timeLeft <= 0) {
      setQRCodeExpired(true);
    }
  }, [timeLeft]);

  const handleRegenerateQR = () => {
    connectWallet(WalletType.ImpactXMobile);
    setTimeLeft(twoMinutesInMilliseconds / 1000);
    setQRCodeExpired(false);
  };

  // Conditional rendering based on timeLeft
  if (qrCodeExpired) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="space-between"
        h={"150px"}
      >
        <BrokenLink />
        <Button variant="outline" onClick={handleRegenerateQR}>
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
          Scan this QR code with your Impacts X mobile app
        </Text>
      </Flex>
      {mobile.timeout! > 0 && (
        <TimeLeft percent={percent} timeLeft={timeLeft} />
      )}
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
