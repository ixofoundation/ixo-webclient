import Image from 'next/image'
import React from 'react'
import { Typography } from 'components/Typography'
import { Box, Flex, Grid, useMantineTheme } from '@mantine/core'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { IconAssistant } from 'components/IconPaths'
import { createStyles } from '@mantine/emotion'

export interface ICardItems {
  icon?: React.ReactNode
  content: string | JSX.Element
  active?: boolean
  onClick?: () => void
}

interface Props {
  icon: string
  title: JSX.Element | string
  columns: number
  items: ICardItems[] | JSX.Element
}

const useStyles = createStyles((theme) => ({
  card: {
    width: '100%',
    height: 'auto',
    background: theme.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  icon: {
    width: 20,
    height: 20,
  },
  itemBox: {
    borderRadius: theme.radius.md,
    padding: theme.spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
  },
}))

const Card: React.FC<Props> = ({ icon, title, columns, items }) => {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.colors.blue[5]

  return (
    <Box className={classes.card}>
      <Flex align='center' justify='space-between' mb='md'>
        <Flex gap='xs' align='center'>
          <Image src={icon} alt='icon' className={classes.icon} style={{ color: primaryColor }} />
          <Typography variant='secondary' size='lg'>
            {title}
          </Typography>
        </Flex>
        <Image src={IconAssistant} alt='Assistant' className={classes.icon} style={{ color: primaryColor }} />
      </Flex>

      <Grid columns={columns} gutter='xs'>
        {Array.isArray(items)
          ? items.map((item, index) => (
              <Grid.Col key={index} span={1}>
                <Flex
                  className={classes.itemBox}
                  styles={(theme) => ({
                    root: {
                      background: item.onClick ? theme.colors.gray[1] : '#FCFCFC',
                      borderColor: item.active ? theme.colors.blue[5] : 'transparent',
                      '&:hover': item.onClick ? { borderColor: theme.colors.blue[5] } : {},
                      cursor: item.onClick ? 'pointer' : 'default',
                    },
                  })}
                  onClick={item.onClick}
                >
                  {item.icon && (
                    <Box mr='xs'>
                      <Image
                        src={item.icon as string}
                        alt='icon'
                        className={classes.icon}
                        style={{ color: theme.black }}
                      />
                    </Box>
                  )}
                  <Typography size='sm' color='black'>
                    {item.content}
                  </Typography>
                </Flex>
              </Grid.Col>
            ))
          : items}
      </Grid>
    </Box>
  )
}

export default Card
