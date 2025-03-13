import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Product } from '../entities/product'
import type { ProductRepository } from '../repositories/products-repository'

interface CreateProductUseCaseRequest {
  vendorId: string
  name: string
  description: string
  price: number
  category: string
}

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    vendorId,
    name,
    description,
    price,
    category,
  }: CreateProductUseCaseRequest) {
    const product = Product.create({
      vendorId: new UniqueEntityId(vendorId),
      category,
      description,
      name,
      price,
    })

    await this.productRepository.create(product)

    return product
  }
}
