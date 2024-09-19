import { rem } from "@mantine/core";
import { IconLinkOff } from "@tabler/icons-react";

export const BrokenLink = () => (
  <IconLinkOff
    style={{ width: rem(80), height: rem(80) }}
    stroke={1.5}
    color="var(--mantine-color-red-filled)"
  />
);
