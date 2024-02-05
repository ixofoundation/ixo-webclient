import { Module } from '@nestjs/common';
import { BlocksyncService } from './blocksync.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [BlocksyncService],
  exports: [BlocksyncService],
})
export class BlocksyncModule {}
