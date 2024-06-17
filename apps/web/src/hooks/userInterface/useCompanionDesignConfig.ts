import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'

export const useCompanionDesignConfig = () => {
  const config = useAppSelector(selectEntityConfig)

  const companionConfig = config.UI?.companion
  const toolbarActiveColor = companionConfig?.toolbar?.active?.color
  const toolbarActiveBackground = companionConfig?.toolbar?.active?.background
  const toolbarColor = companionConfig?.toolbar.color
  const toolbarBackground = companionConfig?.toolbar.background

  return {
    toolbarActiveColor,
    toolbarActiveBackground,
    toolbarColor,
    toolbarBackground,
  }
}
