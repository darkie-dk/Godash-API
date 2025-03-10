import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PrismaService } from 'prisma/prisma/prisma.service'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { z } from 'zod'

const pageQueryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/orders')
@UseGuards(AuthGuard('jwt'))
export class FetchRecentOrdersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) query: PageQueryParamsSchema,
  ) {
    const perPage = 20
    const orders = await this.prisma.order.findMany({
      take: perPage,
      skip: (query.page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { orders }
  }
}
