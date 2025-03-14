import type { OrdersRepository } from '@/domain/POS/app/repositories/order-repository'
import type { Order } from '@/domain/POS/enterprise/entities/order'

export class InMemoryOrderRepository implements OrdersRepository {
  public items: Order[] = []

  async create(order: Order) {
    this.items.push(order)
  }
}
