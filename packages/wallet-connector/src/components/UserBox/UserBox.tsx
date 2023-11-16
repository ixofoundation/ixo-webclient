import { Box } from "@mantine/core";
import { PropsWithChildren } from "react";


export const UserBox = ({ children, color }: PropsWithChildren & { color: string; }) => (
    <Box sx={{ width: '160px', height: '74px', padding: '0 10px 20px 10px', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', color, cursor: 'pointer', transition: 'all 0.5s ease' }}>
        {children}
    </Box>
);
