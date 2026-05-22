import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'
import { LIMIT } from '@/lib/constants'
import { useCategories, useInfiniteProducts } from '@/hooks/api'
import ProductTable from '../components/ProductTable'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Plus, RotateCw } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuthStore()
  const [search, setSearch] = useState('')
  const [createdAtSort, setCreatedAtSort] = useState<'newest' | 'oldest'>('newest')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [pageIndex, setPageIndex] = useState(0)
  const mobileSentinelRef = useRef<HTMLDivElement | null>(null)
  const { data: categories = [] } = useCategories()

  const order = createdAtSort === 'newest' ? 'desc' : 'asc'
  const normalizedSearch = search.trim().toLowerCase()
  const productsQuery = useInfiniteProducts({
    search: selectedCategory ? undefined : search.trim() || undefined,
    sortBy: 'createdAt',
    order,
    category: selectedCategory || undefined,
  })
  const products = productsQuery.products
  const hasNextPage = productsQuery.hasNextPage ?? false
  const isFetchingNextPage = productsQuery.isFetchingNextPage

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.title.toLowerCase().includes(normalizedSearch))
    : [...products]

  const tablePageProducts = filteredProducts.slice(pageIndex * LIMIT, (pageIndex + 1) * LIMIT)

  useEffect(() => {
    setPageIndex(0)
  }, [search, createdAtSort, selectedCategory])

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return
    const requiredCount = (pageIndex + 1) * LIMIT
    if (filteredProducts.length < requiredCount) {
      productsQuery.fetchNextPage()
    }
  }, [filteredProducts.length, pageIndex, hasNextPage, isFetchingNextPage, productsQuery])

  useEffect(() => {
    const sentinel = mobileSentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          productsQuery.fetchNextPage()
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, productsQuery])

  const isLoading = productsQuery.isFetching

  const handlePrevPage = () => setPageIndex((current) => Math.max(0, current - 1))

  const handleNextPage = () => {
    setPageIndex((current) => {
      if (current + 1 >= productsQuery.totalPages && hasNextPage) {
        productsQuery.fetchNextPage()
      }
      return current + 1
    })
  }

  const handleReload = () => {
    productsQuery.refetch()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Welcome, {user?.name ?? 'Guest'}</h2>
        <p className="mt-1 text-sm text-slate-500">Product overview and quick access to details.</p>
      </div>

      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products by title"
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={createdAtSort}
            onChange={(event) => setCreatedAtSort(event.target.value as 'newest' | 'oldest')}
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900"
          >
            <option value="newest">Newest created</option>
            <option value="oldest">Oldest created</option>
          </select>
        </div>
      </section>

      <div className="space-y-4 lg:hidden">
        <div className="flex justify-end gap-2">
          <Button asChild size="sm">
            <Link to="/products/add">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add product
            </Link>
          </Button>
        </div>

        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
          : filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}

        {!isLoading && isFetchingNextPage ? <ProductCardSkeleton /> : null}

        <div ref={mobileSentinelRef} className="h-4" />
      </div>

      <div className="hidden lg:block">
        <div className="mb-4 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={handleReload} disabled={productsQuery.isFetching}>
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Reload</span>
          </Button>

          <Button asChild size="sm">
            <Link to="/products/add">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add product
            </Link>
          </Button>
        </div>

        <ProductTable products={tablePageProducts} isLoading={isLoading} />

        <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="text-sm text-slate-600">
            Page {pageIndex + 1} of {productsQuery.totalPages}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={pageIndex === 0}>
              Previous
            </Button>
            <Button
              size="sm"
              onClick={handleNextPage}
              disabled={!hasNextPage && pageIndex + 1 >= productsQuery.totalPages}
            >
              Next
            </Button>
          </div>
        </div>

        
      </div>
    </div>
  )
}
