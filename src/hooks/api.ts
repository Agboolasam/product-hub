import { useEffect } from 'react';
import type { ProductQueryParams } from '@/types/product';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchCategories, fetchProducts, fetchSingleProduct } from '@/utils/api'

// bulk product hook 
export const useInfiniteProducts = (params: ProductQueryParams = {}) => {
  const query = useInfiniteQuery({
    queryKey: ['products',params],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam }, params),
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
  });

  useEffect(() => {
    if (query.error) {
      toast.error("An error occured, try again");
    }
  }, [query.error]);

  // get last page from cache
  const lastPage = query.data?.pages.at(-1);

  return {
    ...query,
    products: query.data?.pages.flatMap((p) => p.products) ?? [],
    currentPage: lastPage ? Math.floor(lastPage.skip / lastPage.limit) + 1 : 0,
    totalPages: lastPage ? Math.ceil(lastPage.total / lastPage.limit) : 0,
  };
};

// single product hook — fetch by id
export const useProduct = (id: number) => {
  const query = useQuery({
    queryKey: ['products',  id],
    queryFn: () => fetchSingleProduct(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (query.error) {
      toast.error("An error occured, try again");
    }
  }, [query.error]);

  return query;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  })
}
