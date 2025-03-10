import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PrismaService } from 'prisma/prisma/prisma.service'
import { CurrentUser } from '@/auth/current-user.decorator'
import type { TokenPayload } from '@/auth/jwt.strategy'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { z } from 'zod'

const createOrderBodySchema = z.object({
  customerId: z.string(),
  totalPrice: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema)

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

@Controller('/orders')
@UseGuards(AuthGuard('jwt'))
export class CreateOrderController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateOrderBodySchema,
    @CurrentUser() user: TokenPayload,
  ) {
    const { customerId, totalPrice } = body
    const userId = user.sub

    await this.prisma.order.create({
      data: {
        customerId,
        vendorId: userId,
        totalPrice,
      },
    })
  }
}
