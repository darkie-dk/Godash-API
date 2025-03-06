import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from 'prisma/prisma/prisma.service'

@Controller('/api')
export class AppController {
  constructor(
    private appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get('/users')
  async store() {
    return await this.prisma.user.findMany()
  }
}
