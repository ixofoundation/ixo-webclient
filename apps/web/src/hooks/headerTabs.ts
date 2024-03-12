import { useMemo } from 'react'
import { HeaderTab } from 'components/Dashboard/types'
import useCurrentEntity from './currentEntity'
import { toRootEntityType } from 'utils/entities'
import { useLocation, useParams } from 'react-router-dom'
import { chainNetwork, useEntityConfig } from './configs'
import { toTitleCase } from 'utils/formatters'

export function useHeaderTabs() {
  const { entityId } = useParams<{ entityId: string }>()
  const currentEntity = useCurrentEntity()
  const entityType = toRootEntityType(currentEntity.entityType)
  const entityConfig = useEntityConfig()
  const title = entityConfig.title || toTitleCase(entityType)
  const { search } = useLocation()

  const headerTabs = useMemo(() => {
    const buttons: HeaderTab[] = []

    /**
     * @description overview page
     */
    buttons.push({
      iconClass: `icon-${entityType!.toLowerCase()}`,
      path: `/entity/${entityId}/overview`,
      title: title,
      tooltip: `${title} Overview`,
    })

    /**
     * @description dashboard page
     */
    buttons.push({
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'DASHBOARD',
      tooltip: `${title} Management`,
      search,
    })

    /**
     * @description treasury page
     */
    if (entityType === 'dao') {
      buttons.push({
        iconClass: `icon-funding`,
        path: `/entity/${entityId}/treasury`,
        title: 'TREASURY',
        tooltip: `${title} Treasury`,
      })
      // } else if (entityType === 'investment' || entityType === 'project' || entityType === 'oracle') {
      //   buttons.push({
      //     iconClass: `icon-funding`,
      //     path: `/entity/${entityId}/treasury`,
      //     title: 'FUNDING',
      //     tooltip: `${title} Funding`,
      //   })
    } else if (entityType === 'asset/device' && chainNetwork !== 'mainnet') {
      buttons.push({
        iconClass: 'icon-exchange',
        path: `/exchange/trade/${entityId}`,
        title: 'EXCHANGE',
        tooltip: `${title} Exchange`,
      })
    }

    return buttons
  }, [title, entityId, entityType, search])

  return headerTabs
}
