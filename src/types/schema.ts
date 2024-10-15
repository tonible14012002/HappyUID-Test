export interface Product {
  id: string
  name: string
  price: number
  categories: {
    label: string
    value: string
  }[]
  description: string
  sizes: string[]
  media: {
    url: string
    name: string
    id: string
  }[]
  gender: string
}
