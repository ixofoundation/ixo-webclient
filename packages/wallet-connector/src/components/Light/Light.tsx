import { Box } from "@mantine/core";
import { PropsWithChildren } from "react";

export const Light = ({ children }: PropsWithChildren) => (
    <Box sx={{ display: 'block', width: '100%', height: '4px', background: 'rgb(240, 0, 0)', borderRadius: '0 0 2px 2px', boxShadow: '0px 0px 5px 0px rgb(255, 0, 0)' }}>
      {children}
    </Box>
  );