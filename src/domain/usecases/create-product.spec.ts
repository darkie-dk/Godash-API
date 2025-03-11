import type { Product } from '../entities/product'
import type { ProductRepository } from '../repositories/products-repository'
import { CreateProductUseCase } from './create-product'

const fakeProductRepository: ProductRepository = {
  create: async function (product: Product) {},
}

test('create a product', async () => {
  const createProduct = new CreateProductUseCase(fakeProductRepository)

  const product = await createProduct.execute({
    vendorId: '1',
    name: 'Pizza M',
    description: 'Massa, molho de tomate, peperoni e queijo.',
    category: 'Pizzas',
    price: 4999,
  })

  expect(product.name).toEqual('Pizza M')
})
