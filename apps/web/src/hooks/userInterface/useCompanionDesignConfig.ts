import { useQuery } from 'hooks/window'
import { lowerCase } from 'lodash'
import { useParams } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'

export const useCompanionDesignConfig = () => {
  const { getQuery } = useQuery()
  const params = useParams()
  const exploreType: string | undefined = getQuery('type')
  const entity = useAppSelector(getEntityById(params.entityId ?? ''))
  const config = useAppSelector(selectEntityConfig)

  const companionConfig = config.UI?.companion
  const toolbarActiveColor = companionConfig?.toolbar?.active?.color
  let toolbarActiveBackground = companionConfig?.toolbar?.active?.background
  const toolbarColor = companionConfig?.toolbar.color
  const toolbarBackground = companionConfig?.toolbar.background

  const type = lowerCase(exploreType ?? entity?.type ?? '')

  if (config[type]?.themeColor) {
    toolbarActiveBackground = config[type]?.themeColor
  }

  return {
    toolbarActiveColor,
    toolbarActiveBackground,
    toolbarColor,
    toolbarBackground,
  }
}
