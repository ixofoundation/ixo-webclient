import { EntityDocument } from 'generated/graphql'
import { gqlClient } from 'index'

export const getEntity = async ({ id }: { id: string }) => {
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
