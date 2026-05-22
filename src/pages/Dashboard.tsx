import { useEffect, useState } from 'react'
import useAuthStore from '@/store/useAuthStore'
import ProductTable from '../components/ProductTable'
import { demoProducts } from '../data/demoProducts'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'

export default function Dashboard() {
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsLoading(false), 1200)

    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Welcome, {user?.name ?? 'Guest'}</h2>
        <p className="mt-1 text-sm text-slate-500">Product overview and quick access to details.</p>
      </div>

      <div className="space-y-4 lg:hidden">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)
          : demoProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      <div className="hidden lg:block">
        <ProductTable products={demoProducts} isLoading={isLoading} />
      </div>
    </div>
  )
}
