import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ADD_PRODUCT_AVAILABILITY_OPTIONS, ADD_PRODUCT_DEFAULT_VALUES } from '@/lib/constants'
import { useAddProduct } from '@/hooks/api'
import type { AddProductFormValues } from '@/types/product'

const addProductSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  price: yup.number().typeError('Price is required').positive('Price must be positive').required('Price is required'),
  discountPercentage: yup
    .number()
    .typeError('Discount percentage is required')
    .min(0, 'Discount cannot be negative')
    .required('Discount percentage is required'),
  stock: yup.number().typeError('Stock is required').integer('Stock must be a whole number').min(0).required('Stock is required'),
  tags: yup.array().of(yup.string().trim().required()).min(1, 'Add at least one tag').required(),
  brand: yup.string().optional(),
  sku: yup.string().required('SKU is required'),
  weight: yup.number().typeError('Weight is required').min(0).required('Weight is required'),
  dimensions: yup.object({
    width: yup.number().typeError('Width is required').min(0).required('Width is required'),
    height: yup.number().typeError('Height is required').min(0).required('Height is required'),
    depth: yup.number().typeError('Depth is required').min(0).required('Depth is required'),
  }).required(),
  warrantyInformation: yup.string().required('Warranty information is required'),
  shippingInformation: yup.string().required('Shipping information is required'),
  availabilityStatus: yup.string().required('Availability status is required'),
  returnPolicy: yup.string().required('Return policy is required'),
  minimumOrderQuantity: yup
    .number()
    .typeError('Minimum order quantity is required')
    .integer('Minimum order quantity must be a whole number')
    .min(1, 'Minimum order quantity must be at least 1')
    .required('Minimum order quantity is required'),
  thumbnail: yup.string().url('Enter a valid thumbnail URL').required('Thumbnail is required'),
  images: yup.array().of(yup.string().url('Enter valid image URLs').required()).min(1, 'Add at least one image').required(),
})

export default function AddProduct() {
  const [values, setValues] = useState<AddProductFormValues>(ADD_PRODUCT_DEFAULT_VALUES)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addProductMutation = useAddProduct()
  const navigate = useNavigate()

  const parsedPayload = useMemo(() => {
    const tags = values.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    return {
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category.trim(),
      price: Number(values.price),
      discountPercentage: Number(values.discountPercentage),
      rating: 0,
      stock: Number(values.stock),
      tags,
      brand: values.brand.trim() || undefined,
      sku: values.sku.trim(),
      weight: Number(values.weight),
      dimensions: {
        width: Number(values.width),
        height: Number(values.height),
        depth: Number(values.depth),
      },
      warrantyInformation: values.warrantyInformation.trim(),
      shippingInformation: values.shippingInformation.trim(),
      availabilityStatus: values.availabilityStatus,
      returnPolicy: values.returnPolicy.trim(),
      minimumOrderQuantity: Number(values.minimumOrderQuantity),
      thumbnail: values.thumbnail.trim(),
      images: values.images.map((image) => image.trim()).filter(Boolean),
    }
  }, [values])

  const updateField = (field: keyof AddProductFormValues, value: string | string[]) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const updateImage = (index: number, value: string) => {
    setValues((current) => {
      const images = [...current.images]
      images[index] = value
      return { ...current, images }
    })
  }

  const addImageField = () => {
    setValues((current) => ({ ...current, images: [...current.images, ''] }))
  }

  const removeImageField = (index: number) => {
    setValues((current) => ({
      ...current,
      images: current.images.length > 1 ? current.images.filter((_, imageIndex) => imageIndex !== index) : [''],
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      await addProductSchema.validate(parsedPayload, { abortEarly: false })
      setErrors({})

      await addProductMutation.mutateAsync(parsedPayload)
      navigate('/products')
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: Record<string, string> = {}
        error.inner.forEach((item) => {
          if (item.path) {
            nextErrors[item.path] = item.message
          }
        })
        setErrors(nextErrors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 underline underline-offset-4">
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">New Product</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Add product</h1>
          <p className="mt-2 text-sm text-slate-500">Create a product and send it to the DummyJSON add endpoint.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="grid gap-4 md:grid-cols-2">
            <Field label="Title" error={errors.title}>
              <Input value={values.title} onChange={(event) => updateField('title', event.target.value)} />
            </Field>
            <Field label="Category" error={errors.category}>
              <Input value={values.category} onChange={(event) => updateField('category', event.target.value)} />
            </Field>
            <Field label="Brand" error={errors.brand}>
              <Input value={values.brand} onChange={(event) => updateField('brand', event.target.value)} />
            </Field>
            <Field label="SKU" error={errors.sku}>
              <Input value={values.sku} onChange={(event) => updateField('sku', event.target.value)} />
            </Field>
            <Field label="Price" error={errors.price}>
              <Input type="number" step="0.01" value={values.price} onChange={(event) => updateField('price', event.target.value)} />
            </Field>
            <Field label="Discount %" error={errors.discountPercentage}>
              <Input type="number" step="0.01" value={values.discountPercentage} onChange={(event) => updateField('discountPercentage', event.target.value)} />
            </Field>
            <Field label="Stock" error={errors.stock}>
              <Input type="number" value={values.stock} onChange={(event) => updateField('stock', event.target.value)} />
            </Field>
            <Field label="Weight" error={errors.weight}>
              <Input type="number" step="0.01" value={values.weight} onChange={(event) => updateField('weight', event.target.value)} />
            </Field>
            <Field label="Minimum order quantity" error={errors.minimumOrderQuantity}>
              <Input type="number" value={values.minimumOrderQuantity} onChange={(event) => updateField('minimumOrderQuantity', event.target.value)} />
            </Field>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Field label="Width" error={errors.width}>
              <Input type="number" step="0.01" value={values.width} onChange={(event) => updateField('width', event.target.value)} />
            </Field>
            <Field label="Height" error={errors.height}>
              <Input type="number" step="0.01" value={values.height} onChange={(event) => updateField('height', event.target.value)} />
            </Field>
            <Field label="Depth" error={errors.depth}>
              <Input type="number" step="0.01" value={values.depth} onChange={(event) => updateField('depth', event.target.value)} />
            </Field>
            <Field label="Availability" error={errors.availabilityStatus}>
              <select
                value={values.availabilityStatus}
                onChange={(event) => updateField('availabilityStatus', event.target.value)}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900"
              >
                {ADD_PRODUCT_AVAILABILITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Field label="Tags (comma separated)" error={errors.tags}>
              <Input value={values.tags} onChange={(event) => updateField('tags', event.target.value)} placeholder="beauty, mascara" />
            </Field>
            <Field label="Thumbnail URL" error={errors.thumbnail}>
              <Input value={values.thumbnail} onChange={(event) => updateField('thumbnail', event.target.value)} placeholder="https://..." />
            </Field>
            <Field label="Warranty information" error={errors.warrantyInformation}>
              <Input value={values.warrantyInformation} onChange={(event) => updateField('warrantyInformation', event.target.value)} />
            </Field>
            <Field label="Shipping information" error={errors.shippingInformation}>
              <Input value={values.shippingInformation} onChange={(event) => updateField('shippingInformation', event.target.value)} />
            </Field>
            <Field label="Return policy" error={errors.returnPolicy}>
              <Input value={values.returnPolicy} onChange={(event) => updateField('returnPolicy', event.target.value)} />
            </Field>
          </section>

          <section className="grid gap-4">
            <Field label="Description" error={errors.description}>
              <textarea
                value={values.description}
                onChange={(event) => updateField('description', event.target.value)}
                rows={5}
                className="min-h-32 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </Field>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Images</h2>
                <p className="text-sm text-slate-500">Add at least one image URL.</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addImageField}>
                <Plus className="h-4 w-4" />
                Add image
              </Button>
            </div>

            <div className="space-y-3">
              {values.images.map((image, index) => (
                <div key={`${index}-${image}`} className="flex items-center gap-2">
                  <Input
                    value={image}
                    onChange={(event) => updateImage(index, event.target.value)}
                    placeholder="https://..."
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => removeImageField(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {errors.images ? <p className="text-sm text-rose-500">{errors.images}</p> : null}
            </div>
          </section>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting || addProductMutation.isPending} className="min-w-40">
              {isSubmitting || addProductMutation.isPending ? 'Saving...' : 'Create product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error ? <p className="text-sm text-rose-500">{error}</p> : null}
    </label>
  )
}