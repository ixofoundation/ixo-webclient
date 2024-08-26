import { useQuery } from 'hooks/window'
import { lowerCase } from 'lodash'
import { useParams } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'

export const useTabDesignConfig = () => {
  const { getQuery } = useQuery()
  const params = useParams()
  const exploreType: string | undefined = getQuery('type')
  const entity = useAppSelector(getEntityById(params?.entityId ?? ''))
  const config = useAppSelector(selectEntityConfig)

  const tabConfig = config?.UI?.header?.tabs
  const tabActiveColor = tabConfig?.active?.color
  let tabActiveBackground = tabConfig?.active?.background
  const tabColor = tabConfig?.color
  const tabBackground = tabConfig?.background
  const tabBorderColor = tabConfig?.borderColor
  const assistantBackground = `linear-gradient(to right, ${tabConfig?.assistant.to}, ${tabConfig?.assistant.right})`
  const assistantActiveBackground = `linear-gradient(to right, ${tabConfig?.assistant.active.to}, ${tabConfig?.assistant.active.right})`
  const assistantColor = tabConfig?.assistant.color
  const assistantActiveColor = tabConfig?.assistant.active.color

  const type = lowerCase(exploreType ?? entity?.type ?? '')

  if (config[type]?.themeColor) {
    tabActiveBackground = config[type]?.themeColor
  }

  return {
    tabActiveColor,
    tabActiveBackground,
    tabColor,
    tabBackground,
    tabBorderColor,
    assistantBackground,
    assistantActiveBackground,
    assistantColor,
    assistantActiveColor,
  }
}
