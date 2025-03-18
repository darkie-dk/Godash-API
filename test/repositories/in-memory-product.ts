import type { ProductRepository } from '@/domain/POS/app/repositories/products-repository'
import type { Product } from '@/domain/POS/enterprise/entities/product'

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = []

  async create(product: Product) {
    this.items.push(product)
  }

  async delete(product: Product): Promise<void> {
    const itemsIndex = this.items.findIndex((item) => item.id === product.id)

    this.items.splice(itemsIndex, 1)
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id)

    if (!product) {
      return null
    }

    return product
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const product = this.items.find((item) => item.slug.value === slug)

    if (!product) {
      return null
    }

    return product
  }

  async save(product: Product) {
    const itemsIndex = this.items.findIndex((item) => item.id === product.id)

    this.items[itemsIndex] = product
  }
}
