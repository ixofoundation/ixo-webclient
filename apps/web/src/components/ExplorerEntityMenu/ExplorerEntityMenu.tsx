import { Button, Menu, Text, em, rem, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconSquareCheck,
  IconPackage,
  IconUsers,
  IconCalendar,
  IconChevronDown,
} from '@tabler/icons-react';
import { selectEntityConfig } from 'redux/configs/configs.selectors';
import { useAppSelector } from 'redux/hooks';

export function ExplorerEntityMenu() {
  const theme = useMantineTheme() as any;
  const config = useAppSelector(selectEntityConfig)
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  if(!isMobile) return null
  

  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  return (
    <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="top-end"
      width={150}
      withinPortal
    >
      <Menu.Target>
        <Button
          size="compact-lg"
          variant="outline"
          color={primaryColor}
          rightSection={
            <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          }
        >
          Create new
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconPackage
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
          rightSection={
            <Text size="xs" tt="uppercase" fw={700} c="dimmed">
              Ctrl + P
            </Text>
          }
        >
          Project
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSquareCheck
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.pink[6]}
              stroke={1.5}
            />
          }
          rightSection={
            <Text size="xs" tt="uppercase" fw={700} c="dimmed">
              Ctrl + T
            </Text>
          }
        >
          Task
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconUsers
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.cyan[6]}
              stroke={1.5}
            />
          }
          rightSection={
            <Text size="xs" tt="uppercase" fw={700} c="dimmed">
              Ctrl + U
            </Text>
          }
        >
          Team
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconCalendar
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.violet[6]}
              stroke={1.5}
            />
          }
          rightSection={
            <Text size="xs" tt="uppercase" fw={700} c="dimmed">
              Ctrl + E
            </Text>
          }
        >
          Event
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}