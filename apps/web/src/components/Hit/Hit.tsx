import { Highlight } from 'react-instantsearch'
import { transformStorageEndpoint } from '@ixo-webclient/utils'

export const Hit = ({ hit }: { hit: any }) => {
  return (
    <article>
      <img
        alt='impacts entity'
        src={transformStorageEndpoint(hit.settings.Profile.data.image)}
        style={{ width: '100px' }}
      />
      <div className='hit-settings.Profile.data.name'>
        <Highlight attribute='settings.Profile.data.name' hit={hit} />
      </div>
      <div className='hit-settings.Profile.data.brand'>
        <Highlight attribute='settings.Profile.data.brand' hit={hit} />
      </div>
      <div className='hit-settings.Profile.data.description'>
        <Highlight attribute='settings.Profile.data.description' hit={hit} />
      </div>
    </article>
  )
}
