import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optinal'

interface OrderItemsProps {
  orderId: UniqueEntityId
  productId: UniqueEntityId
  quantity: number
  amount: number
  updatedAt: Date
}

export class Order extends Entity<OrderItemsProps> {
  get productId() {
    return this.props.productId
  }

  get orderId() {
    return this.props.orderId
  }

  get quantity() {
    return this.props.quantity
  }

  get amount() {
    return this.props.amount
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity
    this.touch()
  }

  set amount(amount: number) {
    this.props.amount = amount
    this.touch()
  }

  static create(
    props: Optional<OrderItemsProps, 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    const order = new Order(
      {
        ...props,
        updatedAt: new Date(),
      },
      id,
    )

    return order
  }
}
