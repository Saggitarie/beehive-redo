import { CoreModule } from "@beehive-redo/core"
import { CourseModule } from "@beehive-redo/course"
import { DataModule } from "@beehive-redo/data"
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [CoreModule, DataModule , CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
