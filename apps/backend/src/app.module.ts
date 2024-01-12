import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { EntitiesModule } from './entities/entities.module';
import { EntitiesService } from './entities/entities.service';
import { HttpService } from '@nestjs/axios';


@Module({
  imports: [
    EntitiesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule {}
