import { ClientOnly } from './client'

// export function generateStaticParams() {
//   return [{ slug: ['explore-new'] }]
// }

export const dynamic = 'auto'

export default function Page() {
  return <ClientOnly />
}
