import { Money } from './Money'

test('create money', () => {
  const money = new Money(4999)

  console.log(money.amount)

  expect(money.value).toEqual(4999)
})

test('ammount money', () => {
  const money = new Money(4999)

  const addingMoney = new Money(2000)

  const total = money.add(addingMoney)

  expect(total.amount).toEqual(6999)
})

test('ammount money', () => {
  const money = new Money(4999)

  const subingMoney = new Money(2000)

  const total = money.subtract(subingMoney)

  expect(total.amount).toEqual(2999)
})
