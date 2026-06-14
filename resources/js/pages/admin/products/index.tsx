import { usePage, router } from '@inertiajs/react'
import { useState } from 'react'

type Product = {
  id: number
  name: string
  price: number
  image?: string
  category?: string
  badge?: string
  rating: number
  reviews: number
  in_stock: boolean
  stock: number
}

type PageProps = {
  products: Product[]
}

export default function ProductPage() {
  const { products } = usePage<PageProps>().props

  const [search, setSearch] = useState('')

  const resetForm = () => {
    setForm({
        id: null,
        name: '',
        price: '',
        image: null,
        category: '',
        badge: '',
        rating: '0',
        reviews: '0',
        in_stock: true,
        stock: '0',
    })
    }

  const [form, setForm] = useState({
      id: null as number | null,
      name: '',
      price: '',
      image: null as File | string | null,
      category: '',
      badge: '',
      rating: '0',
      reviews: '0',
      in_stock: true,
      stock: '0',
    })

  const handleDelete = (id: number) => {
    if (confirm('Hapus produk?')) {
      router.delete(`/admin/products/${id}`)
    }
  }

  const handleSubmit = () => {
    const formData = new FormData()

    formData.append('name', form.name)
    formData.append('price', form.price)
    formData.append('category', form.category || '')
    formData.append('badge', form.badge || '')
    formData.append('rating', form.rating)
    formData.append('reviews', form.reviews)
    formData.append('in_stock', form.in_stock ? '1' : '0')
     formData.append('stock', form.stock)

    if (form.image instanceof File) {
        formData.append('image', form.image)
    }

    if (form.id) {
        formData.append('_method', 'PUT')
        router.post(`/admin/products/${form.id}`, formData)
        } else {
        router.post('/admin/products', formData)
        }
    }

    const handleEdit = (product: Product) => {
        setForm({
            id: product.id,
            name: product.name,
            price: String(product.price),
            image: product.image || '',
            category: product.category || '',
            badge: product.badge || '',
            rating: String(product.rating),
            reviews: String(product.reviews),
            in_stock: product.in_stock,
            stock: String(product.stock),
        })
        }

        const getImageUrl = (image?: string) => {
    if (!image) return '/no-image.png'

    // kalau sudah absolute path (produk lama)
    if (image.startsWith('/')) {
        return image
    }

    // kalau dari storage
    return `/storage/${image}`
    }

    const filteredProducts = products.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
)

  return (
  <div className="p-6 max-w-7xl mx-auto space-y-6">
    <h1 className="text-2xl font-bold">Kelola Produk</h1>

    <div className="grid md:grid-cols-3 gap-6">
      
      {/* FORM */}
      <div className="md:col-span-1 bg-white border rounded-xl p-4 shadow-sm space-y-3">
        <h2 className="font-semibold">
          {form.id ? 'Edit Produk' : 'Tambah Produk'}
        </h2>

        <input
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded-lg p-2"
        />

        <input
          placeholder="Harga"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border rounded-lg p-2"
        />

        <div className="space-y-2">
            <p className="text-sm font-medium">Gambar Produk</p>

            <label className="cursor-pointer">
                <div className="border-2 border-dashed rounded-xl p-4 text-center hover:border-black transition">
                
                {form.image ? (
                    <div className="relative group">
                    <img
                        src={
                        typeof form.image === 'string'
                            ? (form.image.startsWith('/') ? form.image : `/storage/${form.image}`)
                            : URL.createObjectURL(form.image)
                        }
                        className="w-full h-40 object-cover rounded-lg"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition">
                        
                        <span className="text-white text-sm bg-black/50 px-3 py-1 rounded cursor-pointer">
                        Ganti
                        </span>

                        <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            setForm({ ...form, image: null })
                        }}
                        className="text-white text-sm bg-red-500 px-3 py-1 rounded cursor-pointer"
                        >
                        Hapus
                        </button>
                    </div>
                    </div>
                ) : (
                    <div className="py-10 text-gray-400">
                    <p className="text-sm">Klik untuk upload gambar</p>
                    <p className="text-xs">PNG, JPG max 2MB</p>
                    </div>
                )}

                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setForm({ ...form, image: file })
                    }}
                />
                </div>
            </label>
            </div>

        <input
          placeholder="Kategori"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border rounded-lg p-2"
        />

        <input
          placeholder="Badge"
          value={form.badge}
          onChange={(e) => setForm({ ...form, badge: e.target.value })}
          className="w-full border rounded-lg p-2"
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            placeholder="Rating"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="border rounded-lg p-2"
          />

          <input
            placeholder="Reviews"
            value={form.reviews}
            onChange={(e) => setForm({ ...form, reviews: e.target.value })}
            className="border rounded-lg p-2"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.in_stock}
            onChange={(e) =>
              setForm({ ...form, in_stock: e.target.checked })
            }
          />
          Tersedia
        </label>

        <input
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="border rounded-lg px-2"
          />

        <div className="flex gap-2">
        <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 cursor-pointer"
        >
            {form.id ? 'Update Produk' : 'Tambah Produk'}
        </button>

        {form.id && (
            <button
            onClick={resetForm}
            className="w-full bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300 cursor-pointer"
            >
            Batal
            </button>
        )}
        </div>
      </div>

      {/* LIST */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center gap-2 mb-4">
        <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg p-2"
        />

        {search && (
            <button
            onClick={() => setSearch('')}
            className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
            >
            ✕
            </button>
        )}
        </div>
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 border rounded-xl p-4 shadow-sm bg-white"
          >
            {/* IMAGE */}
            <img
                src={getImageUrl(p.image)}
                className="w-20 h-20 object-cover rounded-lg"
            />

            {/* INFO */}
            <div className="flex-1">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">
                Rp {p.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">
                {p.category || '-'}
              </p>
            </div>

            {/* ACTION */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg cursor-pointer"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
}