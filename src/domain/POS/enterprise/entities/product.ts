import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optinal'
import { Slug } from './value-objects/slug'

interface ProductProps {
  vendorId: UniqueEntityId
  name: string
  slug: Slug
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

  get slug() {
    return this.props.slug
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

  set name(name: string) {
    this.props.name = name
    this.props.slug = Slug.createFromText(name)
    this.touch()
  }

  set price(price: number) {
    this.props.price = price
    this.touch()
  }

  static create(
    props: Optional<ProductProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const product = new Product(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        createdAt: new Date(),
      },
      id,
    )

    return product
  }
}
