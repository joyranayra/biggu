'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Menu,
  X,
  ShoppingBag,
  ChevronRight,
  MapPin,
  Calendar,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Instagram,
  MessageCircle,
  Bike,

} from 'lucide-react'

import { usePage } from "@inertiajs/react"
import { useCartStore } from '@/store/useCartStore'

function BigguMascot({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <img
      src="/Biggu_Lab-01-removebg-preview.png"
      alt="Biggu Lab Logo"
      className={className}
    />
  )
}

const getImageUrl = (image?: string) => {
    if (!image) return '/no-image.png'

    // path lama (public folder)
    if (image.startsWith('/')) {
      return image
    }

    // path dari storage
    return `/storage/${image}`
  }

// Types
type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled'

type OrderItem = {
  id: number
  name: string
  image: string
  price: number
  quantity: number
  type: 'product' | 'workshop'
  note: string
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
  is_cod: boolean,
  items: OrderItem[]
}

type PageProps = {
  orders: Order[]
}

// Format price in IDR
function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

// Decorative blob shape
function BlobDecor({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <path
        fill="currentColor"
        d="M44.5,-76.3C57.1,-69.2,66.3,-55.7,73.3,-41.5C80.3,-27.3,85.2,-12.4,84.3,2.1C83.4,16.6,76.8,30.7,67.4,42.5C58,54.3,45.9,63.8,32.4,70.5C18.9,77.2,4,81.2,-11.5,80.4C-27,79.6,-43.1,74.1,-55.3,64.1C-67.5,54.1,-75.8,39.6,-80.3,23.9C-84.8,8.2,-85.4,-8.7,-80.3,-23.2C-75.2,-37.7,-64.4,-49.8,-51.5,-56.8C-38.6,-63.8,-23.6,-65.7,-8.4,-70.1C6.8,-74.5,31.9,-83.4,44.5,-76.3Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

// Status badge component
function StatusBadge({ status }: { status: OrderStatus }) {
  const statusConfig = {
    pending: {
      bg: 'bg-orange-500/10 dark:bg-orange-500/20',
      text: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-500/30',
      label: 'Belum Bayar',
    },
    paid: {
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-500/30',
      label: 'Sudah Bayar',
    },
    processing: {
      bg: 'bg-purple-500/10 dark:bg-purple-500/20',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-500/30',
      label: 'Diproses',
    },
    shipped: {
      bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
      text: 'text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-500/30',
      label: 'Dikirim',
    },
    completed: {
      bg: 'bg-green-500/10 dark:bg-green-500/20',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-500/30',
      label: 'Selesai',
    },
    cancelled: {
      bg: 'bg-red-500/10 dark:bg-red-500/20',
      text: 'text-red-600 dark:text-red-400',
      border: 'border-red-500/30',
      label: 'Dibatalkan',
    },
  }

  const config = statusConfig[status]

  return (
    <Badge
      className={`${config.bg} ${config.text} ${config.border} border text-xs font-medium`}
    >
      {config.label}
    </Badge>
  )
}

// Order Status Stepper component
function OrderStatusStepper({ status }: { status: OrderStatus }) {
  const steps = [
    { id: 'pending', label: 'Belum Bayar', icon: AlertCircle },
    { id: 'paid', label: 'Sudah Bayar', icon: Package },
    { id: 'processing', label: 'Diproses', icon: Package },
    { id: 'shipped', label: 'Dikirim', icon: Truck },
    { id: 'completed', label: 'Selesai', icon: CheckCircle },
  ]

  const statusOrder = ['pending', 'paid', 'processing', 'shipped', 'completed']
  const currentIndex = statusOrder.indexOf(status)

  return (
    <div className="pt-4">
      <div className="flex flex-row items-center justify-between md:justify-start md:gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index <= currentIndex
          const isCompleted = index < currentIndex

          return (
            <div key={step.id} className="flex items-center flex-1 md:flex-none">
              <div className="flex flex-col justify-center items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium text-center min-w-[60px] ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-1 md:mx-2 rounded-full ${
                    isCompleted ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Empty State component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 mb-4 opacity-40">
        <ShoppingBag className="w-full h-full" />
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">Belum ada pesanan</h3>
      <p className="text-muted-foreground text-center max-w-sm">Mulai berbelanja sekarang dan lihat pesanan Anda di sini</p>
      <Button className="mt-6">Belanja Sekarang</Button>
    </div>
  )
}

// Skeleton Loader component
function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-3">
            <div className="h-4 bg-muted rounded w-1/3 mb-2" />
            <div className="h-3 bg-muted rounded w-1/4" />
          </CardHeader>
          <CardContent>
            <div className="h-3 bg-muted rounded w-full mb-2" />
            <div className="h-3 bg-muted rounded w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Order Card component
function OrderCard({ order, onViewDetail }: { order: Order; onViewDetail: (order: Order) => void }) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewDetail(order)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {/* <p className="text-sm font-medium text-muted-foreground">Order #{order.id}</p> */}
              <div className='flex flex-row gap-4'>
                  <img
                    className='object-fit w-18 h-18 rounded'
                    src={getImageUrl(order.items?.[0]?.image)}
                    alt={order.items?.[0]?.name}
                  />
                  <div className='flex flex-col'>
                    <p className='text-lg'>
                      {order.items?.[0]?.name ?? 'No item'}
                    </p> 
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString('id-ID')}</p>
                  </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end gap-2'>
            <p className="text-lg font-bold text-primary">{formatPrice(order.total)}</p>
            <StatusBadge status={order.status}  />  
          </div>
          
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className='flex flex-row items-center justify-between'>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Package className="w-4 h-4" />
            <span>{order.items.length} item(s)</span>
          </div>

          {order.is_cod && (
            <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium"
              style={{
                background: '#FAEEDA',
                borderColor: '#EF9F27',
                color: '#633806',
              }}
            >
              <Bike className="w-3 h-3" />
              Bayar di Tempat
            </div>
          )}
        </div>
        
        <Button variant="outline" size="sm" className="w-full cursor-pointer" onClick={(e) => {
          e.stopPropagation()
          onViewDetail(order)
        }}>
          Lihat Detail
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Order Detail Modal component
function OrderDetailModal({ order, onClose }: { order: Order; onClose: () => void }) {

  const handleCancel = async (orderId: number) => {
    if (!confirm('Yakin ingin membatalkan pesanan?')) return

    try {
      await fetch('/order/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content') || '',
        },
        body: JSON.stringify({ order_id: orderId }),
      })

      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const handlePay = async (orderId: number) => {
    try {
      const response = await fetch('/midtrans/token/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          order_id: orderId
        }),
      })

      const data = await response.json()

      window.snap.pay(data.token, {
        onSuccess: function (result) {
          console.log('SUCCESS', result)

          setTimeout(() => {
            window.location.href = '/order'
          }, 1500)
        },

        onPending: function (result) {
          console.log('PENDING', result)
          window.location.href = '/order'
        },

        onError: function (result) {
          console.log('ERROR', result)
          alert('Pembayaran gagal')
        },

        onClose: function () {
          console.log('User closed popup')
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} >
        <CardContent className="space-y-6">
          {/* Status Tracker */}
          <div className='flex flex-col'>
            <h3 className="font-semibold">Status Pesanan</h3>
            <OrderStatusStepper status={order.status} />
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-3">Item yang Dipesan</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-muted rounded-lg">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground capitalize mt-1">
                          {item.type === 'workshop' ? 'Workshop' : 'Produk'}
                        </p>
                        {item.note && (
                          <p className="text-xs text-muted-foreground mt-1">{item.note}</p>
                        )}
                      </div>
                      <p className="font-semibold text-sm">{formatPrice(item.price)}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Informasi Pengiriman</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <p>{order.shipping_address || 'Alamat tidak tersedia'}</p>
              </div>
              {order.estimated_delivery && (
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <p>Estimasi pengiriman: {new Date(order.estimated_delivery).toLocaleDateString('id-ID')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <p className="text-muted-foreground">Subtotal</p>
              <p>{formatPrice(order.total * (100 / 110))}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-muted-foreground">Pajak (10%)</p>
              <p>{formatPrice(order.total * 0.1)}</p>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <p>Total</p>
              <p className="text-primary">{formatPrice(order.total)}</p>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {order.payment_status === 'paid' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-600" />
              )}
              <h4 className="font-semibold">Status Pembayaran</h4>
            </div>
            <p className="text-sm text-muted-foreground capitalize">
              {order.payment_status === 'paid' && 'Pembayaran telah dikonfirmasi'}
              {order.payment_status === 'pending' && 'Menunggu konfirmasi pembayaran'}
              {order.payment_status === 'unpaid' && 'Pembayaran belum dilakukan'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            {order.status === 'pending' && !order.is_cod && (
              <div className='flex flex-1 flex-row gap-2'>
                <Button
                  className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => handleCancel(order.id)}
                >
                  Batalkan
                </Button>
                <Button
                  className="w-full cursor-pointer"
                  onClick={() => handlePay(order.id)}
                >
                  Bayar Sekarang
                </Button>
              </div>
            )}
            <Button variant="outline" className="flex-1 cursor-pointer" onClick={onClose}>
              Tutup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main Order Page Component
export default function OrderPage() {
  const { orders } = usePage().props as unknown as {
    orders: {
      data: Order[]
    }
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const allOrders = orders.data ?? []

  console.log('all orders', allOrders);

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest')

  function getFilteredAndSortedOrders(orders: Order[]) {
    let result = [...orders]

    // FILTER STATUS
    if (selectedStatus !== 'all') {
      result = result.filter((order) => order.status === selectedStatus)
    }

    // SORTING
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case 'highest':
          return b.total - a.total
        case 'lowest':
          return a.total - b.total
        default:
          return 0
      }
    })

    return result
  }

  const ALL_STATUS: (OrderStatus | 'all')[] = [
    'all',
    'pending',
    'paid',
    'processing',
    'shipped',
    'completed',
    'cancelled',
  ]

  const STATUS_LABEL: Record<OrderStatus | 'all', string> = {
    all: 'Semua Status',
    pending: 'Belum Bayar',
    paid: 'Sudah Bayar',
    processing: 'Diproses',
    shipped: 'Dikirim',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                B
              </div>
              <span className="font-bold text-lg">Binggu Lab</span>
            </a>

            {/* Navigation Menu - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="/shop" className="text-foreground font-medium hover:text-primary transition-colors">
                Belanja
              </a>
              <a href="/workshop" className="text-foreground font-medium  hover:text-primary transition-colors">
                Workshop
              </a>
              <a href="/cart" className="text-foreground font-medium hover:text-primary transition-colors">
                Keranjang
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden border-t border-border py-4 space-y-3">
              <a href="/" className="block px-4 py-2 rounded-lg text-foreground hover:bg-muted">
                Home
              </a>
              <a href="/products-page" className="block px-4 py-2 rounded-lg text-foreground hover:bg-muted">
                Produk
              </a>
              <a href="/workshops-page" className="block px-4 py-2 rounded-lg text-foreground hover:bg-muted">
                Workshop
              </a>
              <a href="/order" className="block px-4 py-2 rounded-lg text-primary font-medium bg-primary/10">
                Pesanan
              </a>
              <a href="/contact" className="block px-4 py-2 rounded-lg text-foreground hover:bg-muted">
                Kontak
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Decorative Blobs */}
        {/* <div className="absolute top-20 -right-32 w-64 h-64 opacity-20 text-primary pointer-events-none">
          <BlobDecor />
        </div>
        <div className="absolute bottom-40 -left-40 w-80 h-80 opacity-10 text-primary pointer-events-none">
          <BlobDecor />
        </div> */}

        {/* Page Header */}
        <div className="mb-8 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Pesanan Saya</h1>
              <p className="text-muted-foreground mt-1">
                {allOrders.length > 0 ? `Anda memiliki ${allOrders.length} pesanan` : 'Belum ada pesanan'}
              </p>
            </div>
          </div>
        </div>

        {/* Filter/Sort Bar */}
        {allOrders.length > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row gap-3 relative z-10">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="border rounded px-3 py-2"
            >
              {ALL_STATUS.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABEL[status]}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border rounded px-3 py-2"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="highest">Harga Tertinggi</option>
              <option value="lowest">Harga Terendah</option>
            </select>
          </div>
        )}

        {/* Orders List or Empty State */}
        <div className="relative z-10">
          {isLoading ? (
            <SkeletonLoader />
          ) : allOrders.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {getFilteredAndSortedOrders(allOrders).map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onViewDetail={setSelectedOrder}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <EmptyState />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Footer */}
      <footer id="contact" className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <BigguMascot className="w-18 h-18" />
                <span className="text-xl font-bold">
                  Biggu<span className="text-accent"> Lab</span>
                </span>
              </div>
              <p className="text-background/70 mb-4 max-w-sm">
                Handmade fashion collection made just for you! Based in Balikpapan, Indonesia.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/biggu.lab" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Link</h4>
              <nav className="space-y-2 text-background/70">
                <a href="/shop" className="block hover:text-primary transition-colors">Belanja</a>
                <a href="/workshops" className="block hover:text-primary transition-colors">Workshop</a>
                <a href="/about-us" className="block hover:text-primary transition-colors">Tentang Kami</a>
                <a href="/contact" className="block hover:text-primary transition-colors">Kontak</a>
              </nav>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Kontak</h4>
              <div className="space-y-2 text-background/70">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Balikpapan, Indonesia
                </p>
                <p className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  @biggu.lab
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/50 text-sm">
            <p>&copy; 2026 Biggu Lab. Made with love in Balikpapan.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
