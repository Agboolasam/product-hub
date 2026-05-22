import { Link, useParams } from 'react-router-dom'
import { useProduct } from '@/hooks/api'
import DetailRow from '@/components/DetailRow'

export default function ProductDetails() {
  const { id } = useParams()
  const productId = Number(id)
  const isValidId = Number.isFinite(productId)
  const { data: product, isLoading, error } = useProduct(isValidId ? productId : 0)

  if (!isValidId) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-slate-600">Invalid product id.</p>
        <Link to="/products" className="mt-4 inline-block text-sm font-medium text-slate-900 underline">
          Back to products
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-slate-600">Loading product details...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-slate-600">Product not found.</p>
        <Link to="/products" className="mt-4 inline-block text-sm font-medium text-slate-900 underline">
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/products" className="text-sm font-medium text-slate-600 underline underline-offset-4">
        Back to products
      </Link>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-slate-200 lg:border-b-0 lg:border-r">
            <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover" />
          </div>

          <div className="space-y-6 p-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-500">Product #{productId}</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.title}</h1>
              <p className="mt-3 text-slate-600">{product.description}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailRow label="Category" value={product.category} />
              <DetailRow label="Brand" value={product.brand ?? '-'} />
              <DetailRow label="Price" value={`$${product.price.toFixed(2)}`} />
              <DetailRow label="Discount" value={`${product.discountPercentage}%`} />
              <DetailRow label="Rating" value={product.rating.toFixed(1)} />
              <DetailRow label="Stock" value={product.stock} />
              <DetailRow label="Availability" value={product.availabilityStatus} />
              <DetailRow label="Minimum Order" value={product.minimumOrderQuantity} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 border-t border-slate-200 p-6 lg:grid-cols-2">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Product information</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <DetailRow label="SKU" value={product.sku} />
              <DetailRow label="Weight" value={`${product.weight} kg`} />
              <DetailRow label="Dimensions" value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`} />
              <DetailRow label="Warranty" value={product.warrantyInformation} />
              <DetailRow label="Shipping" value={product.shippingInformation} />
              <DetailRow label="Return Policy" value={product.returnPolicy} />
              <DetailRow label="Created At" value={new Date(product.meta.createdAt).toLocaleString()} />
              <DetailRow label="Updated At" value={new Date(product.meta.updatedAt).toLocaleString()} />
              <DetailRow label="Barcode" value={product.meta.barcode} />
              <DetailRow label="QR Code" value={<a href={product.meta.qrCode} target="_blank" rel="noreferrer" className="underline">Open QR</a>} />
            </dl>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Tags</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Images</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.images.map((image) => (
                <img key={image} src={image} alt={product.title} className="h-44 w-full rounded-2xl object-cover" />
              ))}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900">Reviews</h2>
              <div className="mt-4 space-y-4">
                {product.reviews.map((review, index) => (
                  <article key={`${review.reviewerEmail}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-slate-900">{review.reviewerName}</div>
                        <div className="text-sm text-slate-500">{review.reviewerEmail}</div>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900">
                        {review.rating.toFixed(1)} / 5.0
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-700">{review.comment}</p>
                    <div className="mt-3 text-xs text-slate-500">{new Date(review.date).toLocaleString()}</div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}