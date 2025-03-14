import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Product } from '../../enterprise/entities/product'
import { GetProductBySlugUseCase } from './get-product-by-slug'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryProductRepository: InMemoryProductRepository
let sut: GetProductBySlugUseCase

describe('Get Product by Slug', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new GetProductBySlugUseCase(inMemoryProductRepository)
  })

  test('gets a product by slug', async () => {
    const newProduct = Product.create({
      vendorId: new UniqueEntityId('1'),
      name: 'Pizza M',
      slug: Slug.create('pizza-m'),
      description: 'Massa, molho de tomate, peperoni e queijo.',
      category: 'Pizzas',
      price: 4999,
    })

    inMemoryProductRepository.create(newProduct)

    const { product } = await sut.execute({
      slug: 'pizza-m',
    })

    expect(product.name).toEqual(newProduct.name)
    expect(product.id).toBeTruthy()
  })
})
