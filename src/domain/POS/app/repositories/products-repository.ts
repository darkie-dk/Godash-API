import type { Product } from '../../enterprise/entities/product'

export interface ProductRepository {
  findBySlug(slug: string): Promise<Product | null>
  create(product: Product): Promise<void>
}
