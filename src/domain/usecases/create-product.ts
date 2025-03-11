import { Product } from '../entities/product'
import type { Money } from '../entities/value-objects/Money'
import type { ProductRepository } from '../repositories/products-repository'

interface CreateProductUseCaseRequest {
  vendorId: string
  name: string
  description: string
  price: Money
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
    const product = new Product({
      vendorId,
      name,
      description,
      price,
      category,
    })

    await this.productRepository.create(product)

    return product
  }
}
