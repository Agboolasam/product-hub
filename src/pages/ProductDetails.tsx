import { Link, useParams } from 'react-router-dom'
import { demoProducts } from '../data/demoProducts'

export default function ProductDetails() {
  const { id } = useParams()
  const product = demoProducts.find((item) => String(item.id) === id)

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-slate-600">Product not found.</p>
        <Link to="/products" className="mt-4 inline-block text-sm font-medium text-slate-900 underline">
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/products" className="text-sm font-medium text-slate-600 underline underline-offset-4">
        Back to products
      </Link>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-wide text-slate-500">Product #{product.id}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.title}</h1>
        <p className="mt-4 text-slate-600">{product.description}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">Price</dt>
            <dd className="text-lg font-semibold text-slate-900">${product.price.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Rating</dt>
            <dd className="text-lg font-semibold text-slate-900">{product.rating.toFixed(1)}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Stock</dt>
            <dd className="text-lg font-semibold text-slate-900">{product.stock}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Created At</dt>
            <dd className="text-lg font-semibold text-slate-900">
              {new Date(product.meta.createdAt).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}