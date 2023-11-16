import { Box } from '@mantine/core';
import { PropsWithChildren } from 'react';

export const Inner = ({ children }: PropsWithChildren) => (
  <Box sx={{ position: 'relative', zIndex: 2, background: 'inherit' }}>
    {children}
  </Box>
);
