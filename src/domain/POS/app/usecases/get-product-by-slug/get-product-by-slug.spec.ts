import { GetProductBySlugUseCase } from './get-product-by-slug'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product'
import { makeProduct } from 'test/factories/make-product'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryProductRepository: InMemoryProductRepository
let sut: GetProductBySlugUseCase

describe('Get Product by Slug', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new GetProductBySlugUseCase(inMemoryProductRepository)
  })

  test('gets a product by slug', async () => {
    const newProduct = makeProduct({
      slug: Slug.create('pizza-m'),
    })

    await inMemoryProductRepository.create(newProduct)

    const { product } = await sut.execute({
      slug: 'pizza-m',
    })

    expect(product.name).toEqual(newProduct.name)
    expect(product.id).toBeTruthy()
  })
})
