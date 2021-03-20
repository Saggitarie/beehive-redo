import {ObjectType, Field} from "@nestjs/graphql"

@ObjectType()
export class Course {
  @Field({nullable: true})
  id?: string

  @Field({nullable:true})
  title?: string

  @Field({nullable:true})
  description?: string

  @Field({nullable:true})
  imageUrl?: string

  @Field({nullable: true})
  content?: string
}
