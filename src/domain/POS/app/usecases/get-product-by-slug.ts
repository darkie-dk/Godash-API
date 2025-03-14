import { Product } from '../../enterprise/entities/product'
import { ProductRepository } from '../repositories/products-repository'

interface GetProductBySlugUseCaseRequest {
  slug: string
}

interface GetProductBySlugUseCaseResponse {
  product: Product
}

export class GetProductBySlugUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    slug,
  }: GetProductBySlugUseCaseRequest): Promise<GetProductBySlugUseCaseResponse> {
    const product = await this.productRepository.findBySlug(slug)

    if (!product) {
      throw new Error('Product not found.')
    }

    return { product }
  }
}
