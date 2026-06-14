import { usePage, router } from '@inertiajs/react'
import { useState } from 'react'

type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'completed'
  | 'cancelled'

type OrderItem = {
  id: number
  name: string
  image: string
  price: number
  quantity: number
  type: 'product' | 'workshop'
  note?: string
}

type Order = {
  id: number
  status: OrderStatus
  total: number
  created_at: string
  payment_status: string
  shipping_status: string
  shipping_address?: string
  estimated_delivery?: string
  is_cod: boolean
  items: OrderItem[]
  customer_name?: string
}

type PageProps = {
  orders: Order[]
}

// 💰
function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

// 📅
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// 🎨 STATUS STYLE
const statusStyle = {
  pending: 'bg-orange-100 text-orange-600',
  paid: 'bg-blue-100 text-blue-600',
  processing: 'bg-purple-100 text-purple-600',
  shipped: 'bg-cyan-100 text-cyan-600',
  completed: 'bg-green-100 text-green-600',
  cancelled: 'bg-red-100 text-red-600',
}

export default function OrderPage() {
  const { orders: initialOrders } = usePage<PageProps>().props
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  console.log('initial orders', initialOrders);

  const [search, setSearch] = useState('')

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filtered = orders.filter((o) =>
    String(o.id).includes(search)
  )

  const handleStatusUpdate = (id: number, status: OrderStatus) => {
    const prevOrders = [...orders]

    setOrders((prev) =>
        prev.map((o) =>
        o.id === id
            ? {
                ...o,
                status,
                payment_status: status === 'paid' ? 'paid' : o.payment_status,
                shipping_status:
                status === 'shipped'
                    ? 'shipped'
                    : status === 'completed'
                    ? 'delivered'
                    : o.shipping_status,
            }
            : o
        )
    )

    // 🔥 UPDATE MODAL JUGA
    if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder({
        ...selectedOrder,
        status,
        })
    }

    // 🚀 CALL API
    router.post(
        `/admin/orders/${id}/status`,
        { status },
        {
        preserveScroll: true,

        onError: () => {
            // ❌ rollback kalau gagal
            setOrders(prevOrders)
            alert('Gagal update status')
        },
      }
    )
  }

  const getImageUrl = (img: string) => {
    if (!img) return '/no-image.png'
    if (img.startsWith('http')) return img
    if (img.startsWith('/')) return img
    return `/storage/${img}`
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Kelola Pesanan</h1>
        <p className="text-gray-500 text-sm">
          Manage semua order customer
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex gap-2">
        <input
          placeholder="Cari ID Order..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
        />

        {search && (
          <button
            onClick={() => setSearch('')}
            className="px-4 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ✕
          </button>
        )}
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="bg-white border rounded-2xl min-w-[300px] shadow-sm hover:shadow-md transition cursor-pointer"
        >
            {/* TOP */}
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <h2 className="font-bold text-lg">
                  ORDER #{order.id}
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDate(order.created_at)}
                </p>

                <p className="text-sm font-medium text-gray-700">
                    {order.customer_name || 'Guest'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[order.status]}`}
                >
                  {order.status}
                </span>
                  {order.is_cod ? (
                      <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[order.status]}`}
                      >
                          COD
                      </span>
                    ) : (
                       <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[order.status]}`}
                      >
                          REGULER
                      </span>
                    )}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="p-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {order.items.length} item
              </div>

              <div className="font-bold text-lg">
                {formatPrice(order.total)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* HEADER */}
            <div className="p-4 border-b flex justify-between items-center">
                <div>
                <h2 className="font-bold text-lg">
                    ORDER #{selectedOrder.id}
                </h2>
                <p className="text-sm text-gray-500">
                    {formatDate(selectedOrder.created_at)}
                </p>
                </div>

                <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-black"
                >
                ✕
                </button>
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-4">

                {/* STATUS */}
                <div className="flex justify-between items-center">
                <div className='flex flex-row gap-3'>
                   <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[selectedOrder.status]}`}
                    >
                        {selectedOrder.status}
                    </span>

                    {selectedOrder.is_cod ? (
                      <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[selectedOrder.status]}`}
                      >
                          COD
                      </span>
                    ) : (
                       <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[selectedOrder.status]}`}
                      >
                          REGULER
                      </span>
                    )}
                </div>
                

                <span className="font-bold text-lg">
                    {formatPrice(selectedOrder.total)}
                </span>
                </div>

                {/* ITEMS */}
                <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                    <div
                    key={item.id}
                    className="flex gap-3 items-center border rounded-xl p-3"
                    >
                    <img
                        src={getImageUrl(item.image)}
                        className="w-14 h-14 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                        {item.quantity} × {formatPrice(item.price)}
                        </p>

                        {item.note && (
                        <p className="text-xs text-gray-400 mt-1">
                            📝 {item.note}
                        </p>
                        )}
                    </div>
                    </div>
                ))}
                </div>

                {/* ADDRESS */}
                {selectedOrder.shipping_address && (
                <div className="bg-gray-50 border rounded-xl p-3 text-sm">
                    <strong>Alamat:</strong><br />
                    {selectedOrder.shipping_address}
                </div>
                )}

                {/* ACTION */}
                <div>
                <p className="text-lg font-semibold mb-2">
                    Update Status
                </p>

                <div className="flex flex-wrap gap-2">
                    {Object.keys(statusStyle).map((s) => (
                   <button
                        key={s}
                        onClick={() =>
                            handleStatusUpdate(
                              selectedOrder.id,
                              s as OrderStatus
                            )
                        }
                        className={`px-3 py-2 rounded-full text-sm font-medium border transition active:scale-80 cursor-pointer ${
                            selectedOrder.status === s
                            ? 'bg-black text-white'
                            : 'bg-white hover:bg-gray-100'
                        }`}
                        >
                        {s}
                        </button>
                    ))}
                </div>
                </div>

            </div>
            </div>
        </div>
        )}
    </div>
    
  )
}