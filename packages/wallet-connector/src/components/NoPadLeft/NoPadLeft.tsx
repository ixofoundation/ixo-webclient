import { Box } from '@mantine/core';
import { PropsWithChildren } from 'react';

export const NoPadLeft = ({ children }: PropsWithChildren) => (
    <Box sx={{ paddingRight: 0, position: 'relative', zIndex: 2 }}>
      {children}
      {/* Adjust nested styles accordingly */}
    </Box>
  );
  