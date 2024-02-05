import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface UseWindowSizeHooksReturnType {
  width?: number
  height?: number
}

function useWindowSize(): UseWindowSizeHooksReturnType {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<UseWindowSizeHooksReturnType>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return (): void => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}

interface UseQueryHookReturnType {
  query: URLSearchParams
  getQuery: any
}

function useQuery(): UseQueryHookReturnType {
  const navigate = useNavigate()
  const { search } = useLocation()

  const queryParams = useMemo((): URLSearchParams => new URLSearchParams(search), [search])

  const getQuery = (searchParam: string, clearSearchParam?: boolean): string | null => {
    if (!queryParams.has(searchParam)) return null

    const query = queryParams.get(searchParam)

    if (clearSearchParam) {
      queryParams.delete(searchParam)

      navigate({ search: queryParams.toString() }, { replace: true })
    }

    return query
  }

  return { query: queryParams, getQuery }
}

export { useWindowSize, useQuery }
