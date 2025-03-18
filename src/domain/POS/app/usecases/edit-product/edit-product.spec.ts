import { InMemoryProductRepository } from 'test/repositories/in-memory-product'
import { makeProduct } from 'test/factories/make-product'
import { EditProductUseCase } from './edit-product'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryProductRepository: InMemoryProductRepository
let sut: EditProductUseCase

describe('Edit Product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new EditProductUseCase(inMemoryProductRepository)
  })

  test('edits a product', async () => {
    const newProduct = makeProduct(
      {
        vendorId: new UniqueEntityId('vendor-1'),
      },
      new UniqueEntityId('product-1'),
    )

    await inMemoryProductRepository.create(newProduct)

    await sut.execute({
      productId: newProduct.id.toString(),
      vendorId: 'vendor-1',
      name: 'Pizza',
      description: 'Pizza',
      price: 4999,
      category: 'Pizza',
    })

    expect(inMemoryProductRepository.items[0]).toMatchObject({
      name: 'Pizza',
      description: 'Pizza',
      price: 4999,
      category: 'Pizza',
    })
  })

  test('only edits owned product', async () => {
    const newProduct = makeProduct(
      {
        vendorId: new UniqueEntityId('vendor-1'),
      },
      new UniqueEntityId('product-1'),
    )

    await inMemoryProductRepository.create(newProduct)

    expect(() => {
      return sut.execute({
        productId: newProduct.id.toString(),
        vendorId: 'vendor-2',
        name: 'Pizza',
        description: 'Pizza',
        price: 4999,
        category: 'Pizza',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
