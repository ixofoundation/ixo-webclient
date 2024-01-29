import { Module } from '@nestjs/common';
import { EntityResolver } from './entities.resolver';
import { EntitiesService } from './entities.service';
import { BlocksyncModule } from 'src/blocksync/blocksync.module';

@Module({
  imports: [BlocksyncModule],
  providers: [EntityResolver, EntitiesService],
})
export class EntitiesModule {}
