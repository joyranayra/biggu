import { usePage, router } from '@inertiajs/react'
import { useState } from 'react'

type Workshop = {
  id: number
  name: string
  description: string
  price: number
  image?: string
  category?: string
  badge?: string
  date: string
  time: string
  location: string
  spots_total: number
  spots_left: number
  rating: number
  reviews: number
  difficulty: string
  includes: string[] | string
}

type PageProps = {
  workshops: Workshop[]
}

export default function WorkshopPage() {
  const { workshops } = usePage<PageProps>().props

  const [search, setSearch] = useState('')

  const [form, setForm] = useState({
    id: null as number | null,
    name: '',
    description: '',
    price: '',
    image: null as File | string | null,
    category: '',
    badge: '',
    date: '',
    time: '',
    location: '',
    spots_total: '0',
    spots_left: '0',
    rating: '0',
    reviews: '0',
    difficulty: '',
    includes: '', // comma separated
  })

  const resetForm = () => {
    setForm({
      id: null,
      name: '',
      description: '',
      price: '',
      image: null,
      category: '',
      badge: '',
      date: '',
      time: '',
      location: '',
      spots_total: '0',
      spots_left: '0',
      rating: '0',
      reviews: '0',
      difficulty: '',
      includes: '',
    })
  }

  const handleDelete = (id: number) => {
    if (confirm('Hapus workshop?')) {
      router.delete(`/admin/workshops/${id}`)
    }
  }

  const handleSubmit = () => {
    if (!form.name || !form.price) {
      alert('Nama & harga wajib diisi')
      return
    }

    const formData = new FormData()

    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('price', form.price)
    formData.append('category', form.category || '')
    formData.append('badge', form.badge || '')
    formData.append('date', form.date)
    formData.append('time', form.time)
    formData.append('location', form.location)
    formData.append('spots_total', form.spots_total)
    formData.append('spots_left', form.spots_left)
    formData.append('rating', form.rating || '0')
    formData.append('reviews', form.reviews || '0')
    formData.append('difficulty', form.difficulty || '')

    // 🔥 includes → JSON
    const includesArray = form.includes
      ? form.includes.split(',').map((i) => i.trim())
      : []

    formData.append('includes', JSON.stringify(includesArray))

    if (form.image instanceof File) {
      formData.append('image', form.image)
    }

    if (form.id) {
      formData.append('_method', 'PUT')
      router.post(`/admin/workshops/${form.id}`, formData, {
        onSuccess: () => resetForm(),
      })
    } else {
      router.post('/admin/workshops', formData, {
        onSuccess: () => resetForm(),
      })
    }
  }

  const handleEdit = (w: Workshop) => {
    setForm({
      id: w.id,
      name: w.name,
      description: w.description,
      price: String(w.price),
      image: w.image || '',
      category: w.category || '',
      badge: w.badge || '',
      date: w.date || '',
      time: w.time || '',
      location: w.location || '',
      spots_total: String(w.spots_total),
      spots_left: String(w.spots_left),
      rating: String(w.rating ?? 0),
      reviews: String(w.reviews ?? 0),
      difficulty: w.difficulty || '',
      includes: Array.isArray(w.includes)
        ? w.includes.join(', ')
        : w.includes || '',
    })
  }

  const getImageUrl = (image?: string | null) => {
    if (!image) return '/no-image.png'
    if (image.startsWith('http')) return image
    if (image.startsWith('/')) return image
    return `/storage/${image}`
  }

  const getPreviewImage = () => {
    if (!form.image) return null
    if (typeof form.image === 'string') return getImageUrl(form.image)
    return URL.createObjectURL(form.image)
  }

  const filtered = workshops.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
    }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Kelola Workshop</h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* FORM */}
        <div className="bg-white border rounded-xl p-4 space-y-3">

          <h2 className="font-semibold">
            {form.id ? 'Edit Workshop' : 'Tambah Workshop'}
          </h2>

          <input placeholder="Nama"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 w-full rounded" />

          <textarea placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 w-full rounded" />

          <input placeholder="Harga"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 w-full rounded" />

          {/* IMAGE */}
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

          <input placeholder="Kategori"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 w-full rounded" />

          <input placeholder="Badge"
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            className="border p-2 w-full rounded" />

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
                Tanggal Workshop
            </label>

            <input
                type="date"
                value={form.date}
                onChange={(e) =>
                setForm({ ...form, date: e.target.value })
                }
                className="w-full border rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-black"
            />
            </div>

          <input placeholder="Waktu (10:00 - 13:00)"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="border p-2 w-full rounded" />

          <input placeholder="Lokasi"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border p-2 w-full rounded" />

          <div className="grid grid-cols-2 gap-2">
            <input placeholder="Total Slot"
              value={form.spots_total}
              onChange={(e) => setForm({ ...form, spots_total: e.target.value })}
              className="border p-2 rounded" />

            <input placeholder="Sisa Slot"
              value={form.spots_left}
              onChange={(e) => setForm({ ...form, spots_left: e.target.value })}
              className="border p-2 rounded" />
          </div>

          <input placeholder="Difficulty"
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
            className="border p-2 w-full rounded" />

          <input placeholder="Includes (pisah koma)"
            value={form.includes}
            onChange={(e) => setForm({ ...form, includes: e.target.value })}
            className="border p-2 w-full rounded" />

          <div className="flex gap-2">
            <button onClick={handleSubmit}
              className="bg-black text-white w-full py-2 rounded">
              {form.id ? 'Update' : 'Tambah'}
            </button>

            {form.id && (
              <button onClick={resetForm}
                className="bg-gray-200 w-full py-2 rounded">
                Batal
              </button>
            )}
          </div>
        </div>

        {/* LIST */}
        <div className="md:col-span-2 space-y-4">

          <input
            placeholder="Cari workshop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 w-full rounded-lg p-2"
          />

          {filtered.map((w) => (
            <div key={w.id}
              className="flex gap-4 border p-4 rounded bg-white">

              <img src={getImageUrl(w.image)}
                className="w-24 h-24 object-cover rounded" />

              <div className="flex-1">
                <h3 className="font-bold">{w.name}</h3>
                <p className="text-sm text-gray-500">{w.location}</p>
               <p className="text-sm">
                {formatDate(w.date)} • {w.time}
                </p>
                <p className="text-sm text-green-600">
                  Rp {w.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">
                  Slot: {w.spots_left}/{w.spots_total}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button onClick={() => handleEdit(w)}
                  className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>

                <button onClick={() => handleDelete(w.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded">
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