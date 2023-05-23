import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class ErrorRes {
  @Field(() => String)
  error: Error['name']

  @Field(() => String)
  message: Error['message']
}

@ObjectType()
export class SuccessRes {
  @Field()
  success: boolean
}
