import { BsBarChart } from 'react-icons/bs'
import { ImDroplet } from 'react-icons/im'
import { LuCircleDashed } from 'react-icons/lu'
import { upperCase } from 'lodash'

const isActivePath = (path: string, key: string) => {
  return path.includes(key)
}

export const tabs = {
  explore: {
    getTabs: (type: string, path: string, params: Record<string, string>) => [
      {
        label: upperCase(type),
        icon: LuCircleDashed,
        isActive: isActivePath(path, '/explore'),
        path: '/explore',
      },
    ],
  },
  'explore-new': {
    getTabs: (type: string, path: string, params: Record<string, string>) => [],
  },
  entity: {
    getTabs: (entity: string, path: string, params: Record<string, string>) => {
      return (
        {
          dao: [
            {
              label: 'DAO',
              icon: LuCircleDashed,
              isActive: isActivePath(path, `/entity/${params.entityId}/overview`),
              path: `/entity/${params.entityId}/overview/page`,
            },
            {
              label: 'DASHBOARD',
              icon: BsBarChart,
              isActive: isActivePath(path, `/entity/${params.entityId}/dashboard`),
              path: `/entity/${params.entityId}/dashboard`,
            },
            {
              label: 'TREASURY',
              icon: ImDroplet,
              isActive: isActivePath(path, `/entity/${params.entityId}/treasury`),
              path: `/entity/${params.entityId}/treasury`,
            },
          ],
          project: [
            {
              label: 'PROJECT',
              icon: LuCircleDashed,
              isActive: isActivePath(path, `/entity/${params.entityId}/overview`),
              path: `/entity/${params.entityId}/overview/page`,
            },
            {
              label: 'DASHBOARD',
              icon: BsBarChart,
              isActive: isActivePath(path, `/entity/${params.entityId}/dashboard`),
              path: `/entity/${params.entityId}/dashboard`,
            },
          ],
          oracle: [
            {
              label: 'ORACLE',
              icon: LuCircleDashed,
              isActive: isActivePath(path, `/entity/${params.entityId}/overview`),
              path: `/entity/${params.entityId}/overview/page`,
            },
            {
              label: 'DASHBOARD',
              icon: BsBarChart,
              isActive: isActivePath(path, `/entity/${params.entityId}/dashboard`),
              path: `/entity/${params.entityId}/dashboard`,
            },
          ],
          protocol: [
            {
              label: 'PROTOCOL',
              icon: LuCircleDashed,
              isActive: isActivePath(path, `/entity/${params.entityId}/overview`),
              path: `/entity/${params.entityId}/overview/page`,
            },
            {
              label: 'DASHBOARD',
              icon: BsBarChart,
              isActive: isActivePath(path, `/entity/${params.entityId}/dashboard`),
              path: `/entity/${params.entityId}/dashboard`,
            },
          ],
          deed: [
            {
              label: 'DEED',
              icon: LuCircleDashed,
              isActive: isActivePath(path, `/entity/${params.entityId}/overview/proposal/${params.deedId}`),
              path: `/entity/${params.entityId}/overview/page`,
            },
            {
              label: 'DASHBOARD',
              icon: BsBarChart,
              isActive: isActivePath(path, `/entity/${params.entityId}/dashboard`),
              path: `/entity/${params.entityId}/dashboard`,
            },
          ],
          request: [
            {
              label: 'OVERVIEW',
              icon: LuCircleDashed,
              isActive: isActivePath(path, `/entity/${params.entityId}/overview`),
              path: `/entity/${params.entityId}/overview/page`,
            },
            {
              label: 'DASHBOARD',
              icon: BsBarChart,
              isActive: isActivePath(path, `/entity/${params.entityId}/dashboard`),
              path: `/entity/${params.entityId}/dashboard`,
            },
          ],
          asset: [
            {
              label: 'ASSET',
              icon: LuCircleDashed,
              isActive: isActivePath(path, `/entity/${params.entityId}/overview`),
              path: `/entity/${params.entityId}/overview/page`,
            },
            {
              label: 'DASHBOARD',
              icon: BsBarChart,
              isActive: isActivePath(path, `/entity/${params.entityId}/dashboard`),
              path: `/entity/${params.entityId}/dashboard`,
            },
          ],
          investment: [
            {
              label: 'INVESTMENT',
              icon: LuCircleDashed,
              isActive: isActivePath(path, `/entity/${params.entityId}/overview`),
              path: `/entity/${params.entityId}/overview/page`,
            },
            {
              label: 'DASHBOARD',
              icon: BsBarChart,
              isActive: isActivePath(path, `/entity/${params.entityId}/dashboard`),
              path: `/entity/${params.entityId}/dashboard`,
            },
          ],
        }[entity] ?? []
      )
    },
  },
}
