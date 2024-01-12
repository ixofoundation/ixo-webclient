import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Entity, LinkedEntity } from './models/entity.model';
import { BlocksyncService } from 'src/blocksync/blocksync.service';
import { Observable } from 'rxjs';
import { GraphQLJSON } from 'graphql-type-json';

@Resolver(() => Entity)
export class EntityResolver {
  constructor(private blockSyncService: BlocksyncService) {}

  @Query(() => [Entity])
  entities(): Observable<Entity[]> {
    const query = `query Entities($filter: EntityFilter) {
        entities(filter: $filter) {
          nodes {
            id
            type
            linkedEntity
          }
        }
      }`;

    const variables = {
      filter: {
        not: { type: { startsWith: 'asset' } },
      },
    };

    return this.blockSyncService.query(query, variables);
  }

  @ResolveField('linkedEntity', returns => LinkedEntity)
  async getLinkedEntity(@Parent() entity: Entity) {
    console.log("linkedEntity", entity.linkedEntity)
    return { data: "works"}
  }
}
