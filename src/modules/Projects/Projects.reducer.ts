import { ProjectsState } from './types'
import { reducer as entityReducer } from '../../common/modules/Entities/Entities.reducer'
import filterSchema from './ProjectsFilter.schema.json'

export const initialState: ProjectsState = {
  entities: null,
  filter: {
    dateFrom: null,
    dateTo: null,
    categories: filterSchema.ddoTags.map(ddoCategory => ({
      name: ddoCategory.name,
      tags:
        ddoCategory.selectedTags && ddoCategory.selectedTags.length
          ? [...ddoCategory.selectedTags]
          : [],
    })),
    userEntities: true,
    featuredEntities: false,
    popularEntities: false,
  },
}

export const reducer = entityReducer(initialState, 'ixo/Projects/')
