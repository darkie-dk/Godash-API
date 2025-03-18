import { ProductRepository } from '../repositories/products-repository'

interface DeleteProductUseCaseRequest {
  productId: string
  vendorId: string
}

interface DeleteProductUseCaseResponse {}

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    vendorId,
  }: DeleteProductUseCaseRequest): Promise<DeleteProductUseCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new Error('Product Not Found.')
    }
    if (vendorId !== product.vendorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.productRepository.delete(product)

    return {}
  }
}
