import type { Money } from './value-objects/Money'

interface ProductProps {
  vendorId: string
  name: string
  description: string
  price: Money
  category: string
}

export class Product {
  public id?: string
  public vendorId: string
  public name: string
  public description: string
  public price: Money
  public category: string

  constructor(props: ProductProps, id?: string) {
    this.vendorId = props.vendorId
    this.name = props.name
    this.description = props.description
    this.price = props.price
    this.category = props.category
    this.id = id
  }
}
