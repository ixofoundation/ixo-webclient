import { ClientOnly } from './client'

export function generateStaticParams() {
  return [
    { slug: [] }, // This represents the root path "/"
    { slug: [''] }, // This represents any other slugs
  ]
}

export default function Page() {
  return <ClientOnly />
}
