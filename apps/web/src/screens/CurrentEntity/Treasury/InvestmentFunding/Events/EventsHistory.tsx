import Image from 'next/image'
import React, { useMemo } from 'react'
import { Table } from 'components/Table'
import { useIxoConfigs } from 'hooks/configs'
import moment from 'moment'
import { Typography } from 'components/Typography'
import { renderTableHeader } from 'components/Table/Table'
import { IconEye } from 'components/IconPaths'
import { Box, Flex, useMantineTheme } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles((theme) => ({
  tableWrapper: {
    color: 'white',
    width: '100%',
    borderRadius: '4px',
    border: `1px solid #0C3549`,
    background: 'linear-gradient(180deg, #012639 0%, #002D42 97.29%)',
    boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.18)',
    padding: theme.spacing.md,

    '& table': {
      width: '100%',
      borderSpacing: '0 8px',
      borderCollapse: 'separate',

      '& th, & td': {
        height: 'inherit',
        overflow: 'hidden',
      },

      '& tbody > tr': {
        borderRadius: 8,
        outlineStyle: 'solid',
        outlineWidth: 1,
        outlineColor: 'transparent',
        transition: 'all 0.2s',

        '& > td:first-child': {
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        },
        '& > td:last-child': {
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          width: 250,
        },

        '&:hover': {
          outlineColor: theme.colors.blue[5],
        },
      },
    },
  },
  svgBox: {
    width: '60px',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.colors.blue[7],
    color: 'white',
    '&:hover': {
      color: theme.colors.blue[5],
    },
  },
}))

const EventsHistory: React.FC = () => {
  const theme = useMantineTheme()
  const { classes } = useStyles()
  const { convertToDenom } = useIxoConfigs()
  const tableData: any[] = []

  const columns = useMemo(
    () => [
      {
        Header: renderTableHeader('Date'),
        accessor: 'timestamp',
        renderCell: (cell: any) => {
          const timestamp = cell.value
          const date = moment(timestamp).format("DD MMM 'YY")
          const time = moment(timestamp).format('hh:mm')
          return (
            <Flex direction='column' gap={1} p={4}>
              <Typography size='lg'>{date}</Typography>
              <Typography size='sm' color='light-blue'>
                {time}
              </Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Event Type'),
        accessor: 'type',
        renderCell: (cell: any) => {
          const type = cell.value
          let color: string | undefined = undefined

          switch (type) {
            case 'buy':
              color = 'green'
              break
            case 'sell':
              color = 'red'
              break
            default:
              break
          }
          return (
            <Flex direction='column' p={4}>
              <Typography size='base' transform='capitalize' weight='bold' color={color}>
                {cell.value}
              </Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Message'),
        accessor: 'maxPrices',
        renderCell: (cell: any) => {
          const maxPrice = cell.value[0]
          const price = convertToDenom(maxPrice)
          const formattedPriceAmount = new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 6,
          }).format(Number(price?.amount || '0'))

          return (
            <Flex justify='flex-end' align='stretch' style={{ width: '250px', height: '100%' }}>
              <Flex justify='center' align='center' p={4} style={{ flex: 1, background: theme.colors.dark[7] }}>
                <Typography weight='bold'>
                  {formattedPriceAmount} {price?.denom.toUpperCase()}
                </Typography>
              </Flex>
              <Box className={classes.svgBox}>
                <Image src={IconEye} alt='Eye' width={5} height={5} color={theme.colors.blue[5]} />
              </Box>
            </Flex>
          )
        },
      },
    ],
    [convertToDenom, theme, classes],
  )

  const onRowClick = (state: any) => () => {
    console.log('onRowClick', { state })
  }

  return (
    <Box className={classes.tableWrapper}>
      <Table
        columns={columns}
        data={tableData}
        getRowProps={(state) => ({
          style: { height: 70, cursor: 'pointer' },
          onClick: onRowClick(state),
        })}
        getCellProps={() => ({ style: { background: '#023044' } })}
      />
      {tableData.length === 0 && (
        <Flex
          style={{
            width: '100%',
            height: '80px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            background: '#053549',
          }}
        >
          <Typography variant='primary' size='lg' color='dark-blue'>
            No Transactions
          </Typography>
        </Flex>
      )}
    </Box>
  )
}

export default EventsHistory
