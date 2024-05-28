import { selectEntityConfig } from "redux/entitiesExplorer/entitiesExplorer.selectors"
import { useAppSelector } from "redux/hooks"

export const useExplorerDesignConfig = () => {
  const config = useAppSelector(selectEntityConfig)

  const explorerConfig = config.UI?.explorer


    const defaultColumnCount = explorerConfig?.defaultColumnCount ?? 3

    return {
        defaultColumnCount
    }
}