import { Box, Container, Group, Text } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles((theme) => ({
  layoutWrapper: {
    display: 'flex',
    flexDirection: 'column',
    '& a': {
      color: theme.colors.blue[6], // Assuming ixoNewBlue is similar to Mantine's blue[6]
    },
  },

  layoutHeader: {
    background: theme.colors.gray[1], // Assuming ixoGrey100 is similar to Mantine's gray[1]
    padding: '40px 0',
  },

  layoutBody: {
    padding: '60px 0',
  },

  breadcrumbs: {
    textTransform: 'uppercase',
    '& a': {
      color: theme.colors.gray[7], // Assuming ixoGrey700 is similar to Mantine's gray[7]
      '&:hover': {
        textDecoration: 'none',
        color: theme.colors.gray[7],
      },
    },
  },
}))

export function Layout({ children }) {
  const { classes } = useStyles()

  return (
    <Box className={classes.layoutWrapper}>
      <Box className={classes.layoutHeader}>{/* Header content */}</Box>
      <Box className={classes.layoutBody}>
        <Container>
          <Group>{children}</Group>
        </Container>
      </Box>
    </Box>
  )
}

export function Breadcrumbs({ children }) {
  const { classes } = useStyles()

  return <Text className={classes.breadcrumbs}>{children}</Text>
}
