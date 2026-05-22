import type { Product } from './product'

export type ProductTableProps = {
  products: Product[]
  isLoading?: boolean
}