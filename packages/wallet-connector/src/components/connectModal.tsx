import { Box, Flex } from "@mantine/core";
import { ConnectModal as ImpactsXConnectModal } from "impactsxmobile";

export const ConnectModal = () => {
    return (
      <Flex w="100%" direction="column" align="center">
        <Box>
          <ImpactsXConnectModal />
        </Box>
      </Flex>
    );
  };
  