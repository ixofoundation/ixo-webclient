import { ClientOnly } from './client'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export const dynamic = 'auto'

export default function Page() {
  return <ClientOnly />
}
