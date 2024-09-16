import { ApolloClient } from '@apollo/client'
import { EntityDocument } from 'generated/graphql'

export const getEntity = async ({ id, gqlClient }: { id: string; gqlClient: ApolloClient<unknown> }) => {
  try {
    const { data } = await gqlClient.query({
      query: EntityDocument,
      variables: { id },
    })
    return data.entity
  } catch (error) {
    console.error('Error fetching entity:', error)
    throw error
  }
}
