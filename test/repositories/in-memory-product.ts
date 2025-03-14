import type { ProductRepository } from '@/domain/POS/app/repositories/products-repository'
import type { Product } from '@/domain/POS/enterprise/entities/product'

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = []

  async findBySlug(slug: string): Promise<Product | null> {
    const product = this.items.find((item) => item.slug.value === slug)

    if (!product) {
      return null
    }

    return product
  }

  async create(product: Product) {
    this.items.push(product)
  }

  a
}
