import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { TEntityModel } from 'types/entities'

const CollectionMetadata: React.FC<TEntityModel> = (collection) => {
  const theme: any = useTheme()
  const [selected, setSelected] = useState<'context' | 'metrics' | 'attributes'>('context')

  return (
    <FlexBox $direction='column' $gap={2}>
      <FlexBox $alignItems='center' $gap={3} cursor='pointer'>
        <Typography
          color={selected === 'context' ? 'blue' : 'dark-blue'}
          weight='medium'
          onClick={() => setSelected('context')}
        >
          Context
        </Typography>
        <Typography
          color={selected === 'metrics' ? 'blue' : 'dark-blue'}
          weight='medium'
          onClick={() => setSelected('metrics')}
        >
          Metrics
        </Typography>
        <Typography
          color={selected === 'attributes' ? 'blue' : 'dark-blue'}
          weight='medium'
          onClick={() => setSelected('attributes')}
        >
          Attributes
        </Typography>
      </FlexBox>

      <FlexBox $direction='column' $gap={2} color={theme.ixoColor2} $maxWidth='440px'>
        {selected === 'context' && (
          <>
            {collection.profile?.description && <Typography size='md'>{collection.profile?.description}</Typography>}
            {collection.profile?.name && <Typography size='md'>Creator: {collection.profile?.name}</Typography>}
            {collection.metadata?.created && (
              <Typography size='md'>
                Minted: {new Date(collection.metadata?.created as never as string).toLocaleDateString()}
              </Typography>
            )}
          </>
        )}
        {selected === 'metrics' && (
          <ul>
            {collection.token?.properties.maxSupply && (
              <li>
                <Typography size='md' color='blue'>
                  {Number(collection.token?.properties.maxSupply).toLocaleString()}
                </Typography>{' '}
                <Typography size='md'>Max Supply</Typography>
              </li>
            )}
          </ul>
        )}
        {selected === 'attributes' && (
          <ul>
            {collection.profile?.attributes?.map(({ key, value }, index) => (
              <li key={key + index}>
                <Typography size='md'>{key}</Typography>
                &nbsp;
                <Typography size='md' weight='bold'>
                  {value}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default CollectionMetadata
