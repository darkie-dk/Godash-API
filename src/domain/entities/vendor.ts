// enum Role {}

interface VendorProps {
  name: string
  email: string
  password: string
  role: string
}

export class Vendor {
  public id?: string
  public name: string
  public email: string
  public password: string
  public role: string

  constructor(props: VendorProps, id?: string) {
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.role = props.role
    this.id = id
  }
}
