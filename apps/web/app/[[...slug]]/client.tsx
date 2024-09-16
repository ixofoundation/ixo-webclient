'use client'

import { Spinner } from 'components/Spinner/Spinner'
import { useIxoConfigs } from 'hooks/configs'
import dynamic from 'next/dynamic'
import { Suspense, useEffect } from 'react'

const App = dynamic(
  () =>
    import('../../src/router').catch((err) => {
      console.error('Error loading main component:', err)
      return () => <div>Error loading application</div>
    }),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
)

export function ClientOnly() {
  const { fetchEntityConfig, fetchThemeConfig, entityConfig } = useIxoConfigs()

  useEffect(() => {
    fetchEntityConfig()
    fetchThemeConfig()
  }, [fetchEntityConfig, fetchThemeConfig])

  if (!entityConfig) {
    return null
  }
  return (
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  )
}
