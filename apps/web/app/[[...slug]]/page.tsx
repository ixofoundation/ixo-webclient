import { ClientOnly } from './client'

// export function generateStaticParams() {
//   return [{ slug: ['explore-new'] }]
// }

export const dynamic = 'force-dynamic'

export default function Page() {
  return <ClientOnly />
}
