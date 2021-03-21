import { Module } from '@nestjs/common'
import { CourseResolver } from './resolvers/course.resolver';
import { CourseService } from './course.service';
import { LessonResolver } from './resolvers/lesson.resolver';
import { DataModule } from "@beehive-redo/data"

@Module({
  controllers: [],
  imports: [DataModule],
  providers: [CourseResolver, CourseService, LessonResolver],
  exports: [],
})
export class CourseModule {}
