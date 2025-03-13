import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optinal'

interface OrderProps {
  vendorId: UniqueEntityId
  customerId: UniqueEntityId
  orderItems: string
  createdAt: Date
  updatedAt?: Date
  amount: number
}

export class Order extends Entity<OrderProps> {
  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityId) {
    const order = new Order(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return order
  }

  get orderItems() {
    return this.props.orderItems
  }
}
