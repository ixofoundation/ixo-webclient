export function generateStaticParams() {
  return [{ slug: ['not-found'] }]
}

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  )
}
