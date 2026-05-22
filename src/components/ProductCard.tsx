import { Link } from 'react-router-dom'
import type { ProductCardProps } from '@/types/product'
import { formatDate } from '../utils/formatDate'
import { Button } from './ui/button'


export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <img src={product.thumbnail} alt={product.title} className="h-44 w-full object-cover" />

      <div className="space-y-4 p-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="text-slate-500">Price</div>
            <div className="mt-1 font-semibold text-slate-900">${product.price.toFixed(2)}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="text-slate-500">Rating</div>
            <div className="mt-1 font-semibold text-slate-900">{product.rating.toFixed(1)}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="text-slate-500">Stock</div>
            <div className="mt-1 font-semibold text-slate-900">{product.stock}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="text-slate-500">Created</div>
            <div className="mt-1 font-semibold text-slate-900">{formatDate(product.meta.createdAt)}</div>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link to={`/product/${product.id}`}>View product</Link>
        </Button>
      </div>
    </article>
  )
}
