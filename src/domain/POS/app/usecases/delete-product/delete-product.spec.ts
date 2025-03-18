import { InMemoryProductRepository } from 'test/repositories/in-memory-product'
import { makeProduct } from 'test/factories/make-product'
import { DeleteProductUseCase } from './delete-product'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryProductRepository: InMemoryProductRepository
let sut: DeleteProductUseCase

describe('Delete Product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new DeleteProductUseCase(inMemoryProductRepository)
  })

  test('deletes a product', async () => {
    const newProduct = makeProduct(
      {
        vendorId: new UniqueEntityId('vendor-1'),
      },
      new UniqueEntityId('product-1'),
    )

    await inMemoryProductRepository.create(newProduct)

    await sut.execute({
      productId: 'product-1',
      vendorId: 'vendor-1',
    })

    expect(inMemoryProductRepository.items).toHaveLength(0)
  })

  test('only deletes owned product', async () => {
    const newProduct = makeProduct(
      {
        vendorId: new UniqueEntityId('vendor-1'),
      },
      new UniqueEntityId('product-1'),
    )

    await inMemoryProductRepository.create(newProduct)

    expect(() => {
      return sut.execute({
        productId: 'product-1',
        vendorId: 'vendor-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
