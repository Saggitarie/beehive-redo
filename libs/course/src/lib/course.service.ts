import { Injectable } from "@nestjs/common";
import { CreateCourseInput } from "./dto/create-course-input";
import { CreateLessonInput } from "./dto/create-lesson-input";
import { UpdateCourseInput } from "./dto/update-course-input";
import { UpdateLessonInput } from "./dto/update-lesson-input";
import { Course } from "./models/course";
import { Lesson } from "./models/lesson";

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

  public courses(){
    return this.items
  }

  public course(id: string){
    return this.items.find(item => item.id === id)
  }

  public createCourse(input: CreateCourseInput){
    const newCourse = {
      id: Date.now().toString(),
      ...input
    }

    this.items.push(newCourse)
    return newCourse
  }

  public updateCourse(id: string, input: UpdateCourseInput, lessons: Lesson[]){
    const course = this.course(id)
    const updated: Course = {
      ...course,
      ...input,
      lessons: lessons ? lessons : course.lessons
    }

    this.items = this.items.map(item => {
      if(item.id === id){
        return updated
      }

      return item
    })

    return updated
  }

  public deleteCourse(id: string){
    const course = this.course(id)

    if(!course){
      return false
    }

    this.items = this.items.filter(item => item.id !== id)
    return true
  }

  public createLesson(courseId: string, input: CreateLessonInput){
    const newLesson = {
      id: Date.now().toString(),
      ...input
    }

    const course = this.course(courseId)
    this.updateCourse(courseId, {}, [...course.lessons, newLesson])

    return newLesson
  }

  public updateLesson(courseId: string, lessonId: string, input: UpdateLessonInput){
    const course = this.course(courseId)
    const lesson = course.lessons.find(item => item.id === lessonId)

    const updated: Lesson = {
      ...lesson,
      ...input
    }

    course.lessons = course.lessons.map(item => {
      if(item.id === lessonId){
        return updated
      }
      return item
    })

    return updated
  }

  public deleteLesson(courseId: string, lessonId: string, input: UpdateLessonInput){
    const course = this.course(courseId)

    if(!course){
      return false
    }

    const lesson = course.lessons.find(item => item.id === lessonId)

    if(!lesson){
      return false
    }

    course.lessons = course.lessons.filter(item => item.id !== lessonId)

    return true
  }
}
