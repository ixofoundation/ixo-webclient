import { Box } from "@mantine/core";
import { PropsWithChildren } from "react";


export const StatusText = ({ children, color }: PropsWithChildren & { color: string; }) => (
    <Box component="p" sx={{ color, textTransform: 'uppercase', fontSize: '11px', margin: '4px auto', fontWeight: 'normal' }}>
        {children}
    </Box>
);
