import { Box } from "@mantine/core";
import { PropsWithChildren } from "react";

export const StatusBox = ({ children }: PropsWithChildren) => (
    <Box sx={{ textAlign: 'center', width: '110px', position: 'relative', zIndex: 1 }}>
      {children}
    </Box>
  );
  
