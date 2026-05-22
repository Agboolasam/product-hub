import { Link } from 'react-router-dom'
import type { ProductTableProps } from '@/types/productTable'
import { formatDate } from '../utils/formatDate'
import { Button } from './ui/button'
import TableSkeletonRow from './TableSkeletonRow'



export default function ProductTable({ products, isLoading = false }: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Created At</th>
              <th className="px-4 py-3 font-medium">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => <TableSkeletonRow key={index} />)
            ) : null}
            {products.map((product) => (
              <tr key={product.id} className="align-top">
                <td className="px-4 py-4 font-medium text-slate-900">{product.title}</td>
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