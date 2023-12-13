import React, { useEffect, useState } from "react";
import { Box, Flex, Progress, Text, Button } from "@mantine/core";
import { QRCodeSVG } from "qrcode.react";
import { XIcon } from "assets/x-icon";
import { useWallet } from "hooks";
import { WalletType } from "@ixo-webclient/types";

export function TimeLeft({ timeout }: { timeout: number }) {
  // Convert timeout to seconds for ease of display
  const [timeLeft, setTimeLeft] = useState(Math.floor(timeout / 1000));
  const [percent, setPercent] = useState(100);

  console.log({timeLeft})

  useEffect(() => {
    // Only set the interval if there is time left
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1; // Decrementing by 1 second
          return newTime > 0 ? newTime : 0; // Ensure time doesn't go below zero
        });
      }, 1000); // Interval set to 1 second

      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Update percent based on time left
    setPercent((timeLeft / (timeout / 1000)) * 100);
  }, [timeLeft, timeout]);

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
  const { connectWallet, mobile } = useWallet()

  useEffect(() => {
    connectWallet(WalletType.ImpactXMobile)
  }, [])

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
      {mobile?.timeout && <TimeLeft timeout={mobile.timeout - new Date().getTime()} />}
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
