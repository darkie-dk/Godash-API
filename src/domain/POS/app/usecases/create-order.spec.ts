import { InMemoryOrderRepository } from 'test/repositories/in-memory-order'
import { CreateOrderUseCase } from './create-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: CreateOrderUseCase

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new CreateOrderUseCase(inMemoryOrderRepository)
  })

  it('creates a order', async () => {
    const { order } = await sut.execute({
      vendorId: '1',
      customerId: '1',
      amount: 12990,
      orderItems: 'Pizza M x2',
    })

    expect(order.orderItems).toEqual('Pizza M x2')
    expect(inMemoryOrderRepository.items[0].id).toEqual(order.id)
  })
})
