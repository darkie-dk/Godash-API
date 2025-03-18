import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Product } from '../../enterprise/entities/product'
import { ProductRepository } from '../repositories/products-repository'

interface CreateProductUseCaseRequest {
  vendorId: string
  name: string
  description: string
  price: number
  category: string
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    vendorId,
    name,
    description,
    price,
    category,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = Product.create({
      vendorId: new UniqueEntityId(vendorId),
      category,
      description,
      name,
      price,
    })

    await this.productRepository.create(product)

    return { product }
  }
}
