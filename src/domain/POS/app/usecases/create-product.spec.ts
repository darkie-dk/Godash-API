import { CreateProductUseCase } from './create-product'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product'

let inMemoryProductRepository: InMemoryProductRepository
let sut: CreateProductUseCase

describe('Create Product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new CreateProductUseCase(inMemoryProductRepository)
  })

  test('creates a product', async () => {
    const { product } = await sut.execute({
      vendorId: '1',
      name: 'Pizza M',
      description: 'Massa, molho de tomate, peperoni e queijo.',
      category: 'Pizzas',
      price: 4999,
    })

    expect(product.name).toEqual('Pizza M')
    expect(inMemoryProductRepository.items[0].id).toEqual(product.id)
  })
})
