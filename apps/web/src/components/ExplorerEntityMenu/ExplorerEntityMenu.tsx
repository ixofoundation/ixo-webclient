import { Button, Menu, em, rem, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { LiaChevronDownSolid } from 'react-icons/lia'
import { useQuery } from 'hooks/window'
import { upperFirst } from 'lodash'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { toRootEntityType } from 'utils/entities'
import Investments from 'assets/icons/Investments'
import Cells from 'assets/icons/Cells'
import Oracle from 'assets/icons/Oracle'
import Template from 'assets/icons/Template'
import Projects from 'assets/icons/Projects'
import DataAssets from 'assets/icons/DataAssets'
import { EntityType } from 'types/entities'
import { useNavigate } from 'react-router-dom'

const getEntityIcon = (type: string, styles?: { color?: string; size?: string }) => {
  switch (type) {
    case 'project':
      return <Projects fill={styles?.color ?? '#000'} width={styles?.size ?? '24'} />
    case 'oracle':
      return <Oracle fill={styles?.color ?? '#000'} width={styles?.size ?? '24'} />
    case 'investment':
      return <Investments fill={styles?.color ?? '#000'} width={styles?.size ?? '24'} />
    case 'asset':
      return <DataAssets fill={styles?.color ?? '#000'} width={styles?.size ?? '24'} />
    case 'protocol':
      return <Template fill={styles?.color ?? '#000'} width={styles?.size ?? '24'} />
    case 'dao':
      return <Cells fill={styles?.color ?? '#000'} width={styles?.size ?? '24'} />
    default:
      return <Template fill={styles?.color ?? '#000'} width={styles?.size ?? '24'} />
  }
}

const entities = ['dao', 'project', 'investment', 'asset', 'protocol', 'oracle']

export function ExplorerEntityMenu() {
  const { getQuery, query } = useQuery()
  const type: string | undefined = getQuery('type')
  const theme = useMantineTheme() as any
  const config = useAppSelector(selectEntityConfig)
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
  const navigate = useNavigate()

  if (!isMobile) return null

  const handleMenuItemChange = (entity: string) => {
    query.set('type', entity)
    navigate({ search: query.toString() })
  }

  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  return (
    <Menu transitionProps={{ transition: 'pop-top-right' }} position='top-end' width={150} withinPortal>
      <Menu.Target>
        <Button
          size='compact-lg'
          variant='outline'
          color={primaryColor}
          leftSection={getEntityIcon(type ?? '', { size: '18' })}
          rightSection={<LiaChevronDownSolid style={{ width: rem(18), height: rem(18) }} />}
        >
          {upperFirst(toRootEntityType(type ?? ''))}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {entities.map((entity: string) => (
          <Menu.Item
            key={entity}
            onClick={() => handleMenuItemChange(entity)}
            leftSection={getEntityIcon(entity, { color: config?.[EntityType.Oracle]?.themeColor })}
          >
            {upperFirst(entity)}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
