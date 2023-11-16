import { Box } from "@mantine/core";
import { PropsWithChildren } from "react";

export const Ping = ({ children }: PropsWithChildren) => (
    <Box sx={{
      position: 'relative',
      width: '100%',
      '&:hover': {
        cursor: 'pointer',
        // Apply styles to child components on hover if needed
      },
    }}>
      {children}
    </Box>
  );
  