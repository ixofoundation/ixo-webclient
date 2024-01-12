import { Field, ID, ObjectType, } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class LinkedEntity {
  @Field(type => GraphQLJSON)
  data: any
}

@ObjectType()
export class Entity {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  type: string;

  @Field(() => LinkedEntity)
  linkedEntity: LinkedEntity
}

@ObjectType()
class Settings {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field()
  proof: string;

  @Field({ nullable: true })
  right?: string;

  @Field()
  encrypted: string;

  @Field() 
  mediaType: string;

  @Field()
  description: string;

  @Field()
  serviceEndpoint: string;
}

@ObjectType()
class Profile extends Settings {}

@ObjectType()
class Page extends Settings {}

@ObjectType()
class Tags extends Settings {}
