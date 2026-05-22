interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductCreatePayload {
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand?: string
  sku: string
  weight: number
  dimensions: Dimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
  minimumOrderQuantity: number
  thumbnail: string
  images: string[]
}

export interface AddProductFormValues {
  title: string
  description: string
  category: string
  price: string
  discountPercentage: string
  stock: string
  tags: string
  brand: string
  sku: string
  weight: string
  width: string
  height: string
  depth: string
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
  minimumOrderQuantity: string
  thumbnail: string
  images: string[]
}

export type ProductCardProps = {
  product: Product
}

export type ProductQueryParams = {
  search?: string
  sortBy?: 'createdAt' | keyof Product
  order?: 'asc' | 'desc'
  // filters
  priceMin?: number
  priceMax?: number
  brand?: string
  category?: string
}