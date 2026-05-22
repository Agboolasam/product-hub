import type { AddProductFormValues } from '@/types/product'

export const LIMIT = 10

export const ADD_PRODUCT_DEFAULT_VALUES: AddProductFormValues = {
	title: '',
	description: '',
	category: '',
	price: '',
	discountPercentage: '',
	stock: '',
	tags: '',
	brand: '',
	sku: '',
	weight: '',
	width: '',
	height: '',
	depth: '',
	warrantyInformation: '',
	shippingInformation: '',
	availabilityStatus: 'In Stock',
	returnPolicy: '',
	minimumOrderQuantity: '',
	thumbnail: '',
	images: ['', '', ''],
}

export const ADD_PRODUCT_AVAILABILITY_OPTIONS = ['In Stock', 'Low Stock', 'Out of Stock'] as const


