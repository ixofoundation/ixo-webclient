import { EntityFilter } from 'generated/graphql'

export const getGQLEntitiesQueryTypeFilter = (type: string): EntityFilter['type'] => {
  if (type === 'protocol') {
    return {
      in: ['protocol', 'protocol/deed', 'protocol/claim', 'protocol/impact'],
    }
  }

  if (type === 'oracle') {
    return {
      in: ['oracle', 'oracle/evaluation'],
    }
  }

  return {
    equalToInsensitive: type,
  }
}
