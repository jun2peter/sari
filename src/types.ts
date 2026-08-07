export type CategoryId = 'stone' | 'double' | 'silver' | 'mala'

export type Product = {
  id: string
  code: string
  name: string
  price: number
  category: CategoryId
  image: string
  featured?: boolean
}

export type Category = {
  id: CategoryId
  name: string
  shortName: string
  description: string
}

export type CartLine = {
  productId: string
  quantity: number
}
