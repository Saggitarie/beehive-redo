import {InputType, Field} from "@nestjs/graphql"

@InputType()
export class UpdateLessonInput {
  @Field()
  title?: string

  @Field({nullable: true})
  description?: string

  @Field({nullable: true})
  imageUrl?: string
}
