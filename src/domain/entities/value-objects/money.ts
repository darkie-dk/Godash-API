export class Money {
  public value: number

  constructor(value: number) {
    this.value = value
  }

  get amount(): number {
    return this.value
  }

  add(other: Money): Money {
    return new Money(this.value + other.value)
  }

  subtract(other: Money): Money {
    return new Money(this.value - other.value)
  }
}
