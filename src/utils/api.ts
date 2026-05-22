import axios from 'axios'
import type { ProductsResponse, ProductQueryParams, Product } from '@/types/product'
import { LIMIT } from '@/lib/constants'

export const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://dummyjson.com'
export const BASE_URL = `${API_BASE}/products`

export const fetchProducts = async (
  { pageParam = 0 }: { pageParam: number },
  params: ProductQueryParams
): Promise<ProductsResponse> => {
  const url = params.search ? `${BASE_URL}/search` : BASE_URL

  const res = await axios.get<ProductsResponse>(url, {
    params: {
      limit: LIMIT,
      skip: pageParam,
      ...(params.search && { q: params.search }),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.order && { order: params.order }),
    },
  })

  return res.data
}

export const fetchSingleProduct = async (id: number): Promise<Product> => {
  const res = await axios.get<Product>(`${BASE_URL}/${id}`)
  return res.data
}

export const fetchCategories = async (): Promise<string[]> => {
  const url = `${API_BASE}/products/category-list` // dummyjson endpoint for categories
  const res = await axios.get<string[]>(url)
  return res.data
}

export default {
  fetchProducts,
  fetchSingleProduct,
}
