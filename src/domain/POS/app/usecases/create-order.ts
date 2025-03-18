import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Order } from '../../enterprise/entities/order'
import { OrdersRepository } from '../repositories/order-repository'

interface CreateOrderUseCaseRequest {
  vendorId: string
  customerId: string
  amount: number
}

interface CreateOrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}

  async execute({
    vendorId,
    customerId,
    amount,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      vendorId: new UniqueEntityId(vendorId),
      customerId: new UniqueEntityId(customerId),

      amount,
    })

    await this.orderRepository.create(order)

    return {
      order,
    }
  }
}
