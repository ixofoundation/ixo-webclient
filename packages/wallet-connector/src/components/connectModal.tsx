import { Box, Flex } from "@mantine/core";
import { useState } from "react";
import { ConnectModal as ImpactsXConnectModal } from "impactsxmobile";

export const ConnectModal = () => {
    const [activeTab] = useState("mobile");
  
    return (
      <Flex w="100%" direction="column" align="center">
        <Box>
          {activeTab === "mobile" && <ImpactsXConnectModal />}
        </Box>
      </Flex>
    );
  };
  