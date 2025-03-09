import { Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import type { Request } from 'express'
import { PrismaService } from 'prisma/prisma/prisma.service'
import { CurrentUser } from 'src/auth/current-user.decorator'
import type { TokenPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe'
import { z } from 'zod'

const createOrderBodySchema = z.object({})

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

@Controller('/order')
@UseGuards(AuthGuard('jwt'))
export class CreateOrderController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createOrderBodySchema))
  async handle(@CurrentUser() user: TokenPayload) {
    return user.sub
  }
}
