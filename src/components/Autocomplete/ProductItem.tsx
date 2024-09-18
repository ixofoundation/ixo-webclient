import React, { createElement } from 'react'

export function ProductItem({ hit, components }: { hit: any; components: any }) {
  return (
    <a href={hit.url} className='aa-ItemLink'>
      <div className='aa-ItemContent'>
        <div className='aa-ItemTitle'>
          <components.Highlight hit={hit} attribute='name' />
        </div>
      </div>
    </a>
  )
}
