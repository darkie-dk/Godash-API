import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Product,
  type ProductProps,
} from '@/domain/POS/enterprise/entities/product'
import { faker } from '@faker-js/faker'

export function makeProduct(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityId,
) {
  const product = Product.create(
    {
      vendorId: new UniqueEntityId('1'),
      name: faker.food.dish(),
      description: faker.food.description(),
      category: 'Comida',
      price: 4999,
      ...override,
    },
    id,
  )

  return product
}
