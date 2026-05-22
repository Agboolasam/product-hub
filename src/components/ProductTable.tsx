import { Link } from 'react-router-dom'
import type { ProductTableProps } from '@/types/productTable'
import { formatDate } from '../utils/formatDate'
import { Button } from './ui/button'
import TableSkeletonRow from './TableSkeletonRow'



export default function ProductTable({ products, isLoading  }: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium w-2/6">Title</th>
              <th className="px-4 py-3 font-medium w-1/12">Brand</th>
              <th className="px-4 py-3 font-medium w-1/12">Category</th>
              <th className="px-4 py-3 font-medium w-1/4">Description</th>
              <th className="px-4 py-3 font-medium w-1/12">Price</th>
              <th className="px-4 py-3 font-medium w-1/12">Rating</th>
              <th className="px-4 py-3 font-medium w-1/12">Stock</th>
              <th className="px-4 py-3 font-medium w-1/6">Created At</th>
              <th className="px-4 py-3 font-medium w-24">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => <TableSkeletonRow key={index} />)
            ) : null}
            {products.map((product) => (
              <tr key={product.id} className="align-top">
                <td className="px-4 py-4 font-medium text-slate-900">{product.title}</td>
                <td className="px-4 py-4">{product.brand ?? '-'}</td>
                <td className="px-4 py-4">{product.category}</td>
                <td className="px-4 py-4 max-w-md">
                  <p className="line-clamp-2">{product.description}</p>
                </td>
                <td className="px-4 py-4">${product.price.toFixed(2)}</td>
                <td className="px-4 py-4">{product.rating.toFixed(1)}</td>
                <td className="px-4 py-4">{product.stock}</td>
                <td className="px-4 py-4">{formatDate(product.meta.createdAt)}</td>
                <td className="px-4 py-4">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/product/${product.id}`}>View</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}