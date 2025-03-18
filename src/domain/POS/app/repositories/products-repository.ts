import type { Product } from '../../enterprise/entities/product'

export interface ProductRepository {
  create(product: Product): Promise<void>
  delete(product: Product): Promise<void>
  findBySlug(slug: string): Promise<Product | null>
  findById(id: string): Promise<Product | null>
  save(product: Product): Promise<void>
}
