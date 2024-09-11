'use client'

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
    loading: () => <div>Loading...</div>,
  },
)

export function ClientOnly() {
  const { fetchEntityConfig, entityConfig } = useIxoConfigs()

  useEffect(() => {
    fetchEntityConfig()
  }, [fetchEntityConfig])

  if (!entityConfig) {
    return null
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  )
}
