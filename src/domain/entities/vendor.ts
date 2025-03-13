// enum Role {}

import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optinal'

interface VendorProps {
  name: string
  email: string
  password: string
  role: string
  createdAt: Date
}

export class Vendor extends Entity<VendorProps> {
  static create(
    props: Optional<VendorProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const vendor = new Vendor(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return vendor
  }
}
