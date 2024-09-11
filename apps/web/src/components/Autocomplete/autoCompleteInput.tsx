'use client'
import React, { createElement } from 'react'
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import { Autocomplete } from './autoComplete'
import { ProductItem } from './ProductItem'
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import { algoliaAppId, algoliaIndexName, algoliaSearchKey } from 'constants/common'

const appId = 'latency'
const apiKey = '6be0576ff61c053d5f9a3225e2a90f76'

const searchClient = algoliasearch(algoliaAppId, algoliaSearchKey)

export function AutocompleteFull() {
  return (
    <div className='app-container'>
      <h1>React Application</h1>
      <Autocomplete
        openOnFocus={true}
        getSources={({ query }) => [
          {
            sourceId: 'products',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'algoliaIndexName',
                    // @ts-expect-error
                    query,
                  },
                ],
              })
            },
            templates: {
              item({ item, components }) {
                return <ProductItem hit={item} components={components} />
              },
            },
          },
        ]}
      />
    </div>
  )
}
