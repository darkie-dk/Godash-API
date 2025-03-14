import type { Order } from '../../enterprise/entities/order'

export interface OrdersRepository {
  create(order: Order): Promise<void>
}
