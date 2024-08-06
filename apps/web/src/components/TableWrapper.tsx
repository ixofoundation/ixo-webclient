import { Box } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles((theme) => ({
  tableWrapper: {
    color: 'white',
    width: '100%',

    '& table': {
      width: '100%',
      borderSpacing: '0 4px',
      borderCollapse: 'separate',

      '& th, & td': {
        height: 'inherit',
      },
    },
  },
}))

export const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  const { classes } = useStyles()
  return <Box className={classes.tableWrapper}>{children}</Box>
}
