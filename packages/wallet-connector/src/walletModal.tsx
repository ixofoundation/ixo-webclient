import { Modal, Box, Text, MantineProvider, Flex } from "@mantine/core";
import { SegmentedControl } from "@mantine/core";

import { useWallet } from "hooks";

export const WalletModal = (): JSX.Element => {
  const { opened, close } = useWallet();

  return (
    <MantineProvider>
      <Modal
        styles={{
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
        }}
        size="lg"
        opened={opened}
        onClose={close}
        title="Connect"
      >
        <Flex w="100%" justify="center">
          <Box w="50%">
            <SegmentedControl
              w="100%"
              data={["mobile", "desktop"]}
              styles={{
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
              }}
              radius={23}
              mb="sm"
            />
          </Box>
        </Flex>
      </Modal>
    </MantineProvider>
  );
};
