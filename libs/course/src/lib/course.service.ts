import { Injectable, NotFoundException } from "@nestjs/common";
import { DataService } from "@beehive-redo/data";
import { CreateCourseInput } from "./dto/create-course-input";
import { CreateLessonInput } from "./dto/create-lesson-input";
import { UpdateCourseInput } from "./dto/update-course-input";
import { UpdateLessonInput } from "./dto/update-lesson-input";
import { Course } from "./models/course";

@Injectable()
export class CourseService {
  items: Course[] = [
    {id: "intro-to-graphql", title: "Introduction to Graphql", lessons: [
      {id: "lesson-1", title: "Introduction to the course", content: "Hello student!"},
      {id: "lesson-2", title: "First real lesson of the course", content: "Hello student!"},
    ]},
    {id: "graphql-for-experts", title: "GraphQL for Experts", lessons: [
      {id: "lesson-1-course-2", title: "Introduction to the expoert course", content: "Hello student!"},
      {id: "lesson-2-course-2", title: "First real lesson of the expoert course", content: "Hello student!"},
    ]}
  ]

  constructor(private readonly data: DataService){}

  public courses(){
    return this.data.course.findMany({ include: {lessons: true}})
  }

  public async course(id: number){
    const found = await this.data.course.findUnique({
      where: {
        id: id
      }
    })

    if(!found){
      throw new NotFoundException(`Course with id ${id} not found.`)
    }

    return found
  }

  public createCourse(input: CreateCourseInput){
    return this.data.course.create({
      data: {...input }
    })
  }

  public async updateCourse(id: number, input: UpdateCourseInput){
    const course = await this.course(id)

    console.log("input", input)

    return this.data.course.update({
      where: { id: course.id },
      data: {
        ...input
      }
    })

  }

  public async deleteCourse(id: number){
    const deleted = await this.data.course.delete({
      where: {
        id,
      }
    })

    return !!deleted
  }

  public async createLesson(courseId: number, input: CreateLessonInput){
    const course = await this.course(courseId)


    return this.data.lesson.create({
      data: {
        course: {
          connect: {id: course.id}
        },
        ...input
      }
    })
  }

  public updateLesson(lessonId: number, input: UpdateLessonInput){
    return this.data.lesson.update({
      where: {id: lessonId},
      data: {
        ...input
      }
    })
  }

  public async deleteLesson(lessonId: number){
    const deleted = await this.data.lesson.delete({
      where: {
        id: lessonId
      }
    })

    return !!deleted
  }
}
