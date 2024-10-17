import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

import { Storage } from '@/libs/storage'
import type { Product } from '@/types/schema'
import { sleep } from '@/utils/sleep'
// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fakeBaseQuery(),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        await sleep(1000)
        try {
          const products = Storage.getValue<Product[]>('products', [])
          return { data: products }
        } catch (error) {
          return {
            error: { status: 500, data: { message: 'Internal Server Error' } },
          }
        }
      },
    }),
    createProduct: builder.mutation<Product, Product>({
      queryFn: async (product: Product) => {
        await sleep(1000)
        try {
          const products = Storage.getValue<Product[]>('products', []) ?? []
          Storage.setValue('products', [...products, product])
          return {
            data: product,
          }
        } catch (error) {
          return {
            error: { status: 500, data: { message: 'Internal Server Error' } },
          }
        }
      },
    }),
    updateProduct: builder.mutation<Product, Product>({
      queryFn: async (product: Product) => {
        await sleep(1000)
        try {
          const products = Storage.getValue<Product[]>('products', []) ?? []
          let founded = false
          const updatedProducts = products.map((p) => {
            if (p.id === product.id) {
              founded = true
              return product
            }
            return p
          })
          if (!founded) {
            return {
              error: { status: 404, data: { message: 'Product not found' } },
            }
          }
          Storage.setValue('products', updatedProducts)
          return {
            data: product,
          }
        } catch (error) {
          return {
            error: { status: 500, data: { message: 'Internal Server Error' } },
          }
        }
      },
    }),
    removeProduct: builder.mutation<Product[], string[]>({
      queryFn: async (ids: string[]) => {
        await sleep(1000)
        try {
          const products = Storage.getValue<Product[]>('products', []) ?? []
          const updatedProducts = products.filter((p) => !ids.includes(p.id))
          Storage.setValue('products', updatedProducts)
          return {
            data: products.filter((p) => ids.includes(p.id)),
          }
        } catch (error) {
          return {
            error: { status: 500, data: { message: 'Internal Server Error' } },
          }
        }
      },
    }),
    getProductDetail: builder.query<Product, string>({
      queryFn: async (id: string) => {
        sleep(1000)
        try {
          const products = Storage.getValue<Product[]>('products', []) ?? []
          const product = products.find((p) => p.id === id)
          if (!product) {
            return {
              error: { status: 404, data: { message: 'Product not found' } },
            }
          }
          return {
            data: product,
          }
        } catch (error) {
          return {
            error: { status: 500, data: { message: 'Internal Server Error' } },
          }
        }
      },
    }),
  }),
})

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useRemoveProductMutation,
  useUpdateProductMutation,
  useGetProductDetailQuery,
} = productApi

export default productApi
