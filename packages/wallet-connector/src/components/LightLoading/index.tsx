import { Box } from '@mantine/core';

export const LightLoading = () => (
  <Box sx={{
    display: 'block',
    width: '100%',
    height: '4px',
    background: 'rgb(255, 165, 0)',
    borderRadius: '0 0 2px 2px',
    boxShadow: '0px 0px 5px 0px rgba(255, 165, 0, 1)',
    animation: 'flashing 1s infinite',
    '@keyframes flashing': {
      '0%': { boxShadow: '0px 0px 5px 0px rgba(255, 165, 0, 1)' },
      '50%': { boxShadow: '0px 0px 5px 1px rgba(255, 200, 0, 1)', background: 'rgb(255, 200, 0)' },
      '100%': { boxShadow: '0px 0px 5px 0px rgba(255, 165, 0, 1)' },
    },
  }} />
);
