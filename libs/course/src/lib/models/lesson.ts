import {ObjectType, Field} from "@nestjs/graphql"

@ObjectType()
export class Lesson {
  @Field({nullable: true})
  id?: string
  @Field({nullable: true})
  title?: string
  @Field({nullable: true})
  description?: string

  @Field(()=> [Lesson], {nullable: true})
  lessons?: Lesson[]
}
