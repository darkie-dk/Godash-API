import { ProductRepository } from '../repositories/products-repository'

interface EditProductUseCaseRequest {
  productId: string
  vendorId: string
  name: string
  description: string
  price: number
  category: string
}

interface EditProductUseCaseResponse {}

export class EditProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    vendorId,
    name,
    description,
    price,
    category,
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new Error('Product Not Found.')
    }
    if (vendorId !== product.vendorId.toString()) {
      throw new Error('Not allowed.')
    }

    product.name = name
    product.description = description
    product.price = price
    product.category = category

    await this.productRepository.save(product)

    return {}
  }
}
