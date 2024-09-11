'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  )
}
