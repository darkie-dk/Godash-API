import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optinal'

interface ProductProps {
  vendorId: UniqueEntityId
  name: string
  description: string
  price: number
  category: string
  createdAt: Date
  updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
  get vendorId() {
    return this.props.vendorId
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get price() {
    return this.props.price
  }

  get category() {
    return this.props.category
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set price(price: number) {
    this.props.price = price
    this.touch()
  }

  static create(
    props: Optional<ProductProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const product = new Product(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return product
  }
}
