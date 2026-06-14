"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Sparkles,
  Star,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  Instagram,
  MessageCircle,
} from "lucide-react"
import { Link } from "@inertiajs/react"
import { useCartStore } from "@/store/useCartStore"
import { usePage } from '@inertiajs/react'

// Decorative blob shape
function BlobDecor({ className = "" }: { className?: string }) {
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

function BigguMascot({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <img
      src="/Biggu_Lab-01-removebg-preview.png"
      alt="Biggu Lab Logo"
      className={className}
    />
  )
}

// Format price in IDR
function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}



export default function CartPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const cartItems = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const subtotal = useCartStore(state => state.getSubtotal())
  const clearCart = useCartStore(state => state.clearCart)

  const [showAddressModal, setShowAddressModal] = useState(false)

  const [addresses, setAddresses] = useState<string[]>([])

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  const [newAddress, setNewAddress] = useState('')

  const tax = subtotal * 0.1
  const total = subtotal + tax

  const { auth } = usePage().props as {
    auth: {
      user: any | null
    }
  }
  
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY)
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleCheckoutWithAddress = async () => {
    try {
      const response = await fetch('/midtrans/token/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN':
            document.querySelector('meta[name="csrf-token"]')
              ?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          items: cartItems,
          shipping_address: selectedAddress,
        }),
      })

      const data = await response.json()

      window.snap.pay(data.token, {
        onSuccess: function () {
          clearCart()
          window.location.href = '/order'
        },
        onPending: function () {
          clearCart()
          window.location.href = '/order'
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleCod = async () => {
    try {
      const response = await fetch('/cod/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN':
            document.querySelector('meta[name="csrf-token"]')
              ?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          items: cartItems,
          shipping_address: selectedAddress,
        }),
      })

      const data = await response.json()

      console.log(data)

      if (!response.ok) {
        throw new Error(data.message ?? 'Gagal membuat order COD')
      }

      clearCart()

      window.location.href = '/order'
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Colorful Top Banner */}
      <div className="bg-primary py-2.5 text-primary-foreground overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-flex items-center">
          <span className="mx-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> 
            SECURE CHECKOUT
          </span>
          <span className="mx-6 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Fast & Secure Payment
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              className="lg:hidden p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl lg:text-2xl font-bold text-primary">
                Biggu Lab
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/shop" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Belanja
              </Link>
              <Link href="/workshop" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Workshop
              </Link>
              <Link href="/about-us" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                  Tentang Kami
              </Link>
              <Link href="/order" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Pesanan
              </Link>
            </nav>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden py-4 border-t-2 border-primary/20">
              <div className="flex flex-col gap-2">
                <Link href="/shop" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Belanja
                </Link>
                <Link href="/workshop" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Workshop
                </Link>
                <Link href="/about-us" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                 Tentang Kami
                </Link>
                <Link href="/order" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Pesanan
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-secondary/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-primary">Cart</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="py-8 relative overflow-hidden">
        <BlobDecor className="absolute -top-20 -right-20 w-64 h-64 text-primary/10" />
        <BlobDecor className="absolute -bottom-20 -left-20 w-48 h-48 text-accent/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
              <ShoppingBag className="w-4 h-4 mr-2 inline" />
              Keranjang Anda
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Keranjang <span className="text-primary">Belanja</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {cartItems.length} produk{cartItems.length !== 1 ? 's' : ''} di keranjang anda - Review dan lanjutkan ke checkout!
            </p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-12">
              <div className="text-center">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-bold mb-2">Cart Kosong</h2>
                <p className="text-muted-foreground mb-6">Belum ada item di keranjang Anda</p>
                <Link href="/shop">
                  <Button className="bg-primary hover:bg-primary/90">
                    Mulai Belanja
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="border-2 border-primary/20 hover:border-primary/40 transition-colors overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-12 gap-6 p-4 sm:p-6 items-start">

                      {/* IMAGE */}
                      <div className="col-span-3 sm:col-span-2">
                        <div className="w-full aspect-square rounded-lg overflow-hidden bg-secondary">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* DETAILS */}
                      <div className="col-span-9 sm:col-span-4 flex flex-col justify-between min-w-0">
                        <div>
                          <Badge className="mb-2 bg-primary/10 text-primary text-xs">
                            {item.type === 'product' ? 'PRODUCT' : 'WORKSHOP'}
                          </Badge>

                          <h3 className="font-bold text-base sm:text-lg line-clamp-2">
                            {item.name}
                          </h3>

                          <div className="font-bold text-primary text-lg mt-2">
                            {formatPrice(item.price)}
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-2 bg-secondary rounded-lg p-1 w-fit mt-2">
                          <button className="cursor-pointer" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="px-3 min-w-[40px] text-center">
                            {item.quantity}
                          </span>

                          <button className="cursor-pointer" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* NOTE */}
                      <div className="col-span-12 sm:col-span-4">
                        <p className="text-sm text-muted-foreground mb-1">Keterangan</p>
                        <p className="text-sm break-words">
                          {item.note || "-"}
                        </p>
                      </div>

                      {/* SUBTOTAL */}
                      <div className="col-span-12 sm:col-span-2 text-right">
                        <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                        <p className="font-bold text-lg">
                          {formatPrice(item.price * item.quantity)}
                        </p>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:bg-red-500/10 rounded-lg mt-4 cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="border-2 border-primary/20 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-primary">Ringkasan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items Count */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Jumlah ({cartItems.length})</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between text-sm pb-4 border-b border-primary/10">
                    <span className="text-muted-foreground">Pajak (10%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-secondary/50 rounded-lg p-3 text-sm space-y-1 mt-2">
                    <p className="font-medium">Rincian:</p>
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Checkout Button */}
                  {/* <Button
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl mt-6 cursor-pointer"
                  >
                    Bayar Sekarang
                  </Button> */}

                  <Button
                    onClick={() => {
                      if (!auth?.user) {
                        window.location.href = `/login?redirect=/cart`
                        return
                      }

                      setShowAddressModal(true)
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl mt-6"
                  >
                    Pilih Alamat & Bayar
                  </Button>

                  {/* Continue Shopping */}
                  <Link href="/shop" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-primary/30 hover:border-primary hover:bg-primary/10 rounded-xl cursor-pointer"
                    >
                      Lanjut Berbelanja
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

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

        {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-black w-full max-w-lg rounded-2xl shadow-xl p-6 space-y-4">

            <h2 className="text-xl font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Pilih Alamat
            </h2>

            {/* LIST ALAMAT */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {addresses?.length > 0 ? (
                addresses.map((addr) => (
                  <div
                    key={addr}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-3 border rounded-xl cursor-pointer transition ${
                      selectedAddress === addr
                        ? 'border-primary bg-primary/10'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {addr}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  Belum ada alamat tersimpan.<br />
                  Tambahkan alamat baru untuk melanjutkan.
                </div>
              )}
            </div>

            {/* TAMBAH ALAMAT */}
            <div className="space-y-2">
              <p className="text-sm font-semibold">Tambah Alamat Baru</p>

              <textarea
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Masukkan alamat lengkap..."
                className="w-full border rounded-lg p-2"
              />

              <Button
                onClick={() => {
                  if (!newAddress) return

                  setAddresses([...addresses, newAddress])
                  setSelectedAddress(newAddress)
                  setNewAddress('')
                }}
                variant="outline"
                className="w-full cursor-pointer"
              >
                Tambah Alamat
              </Button>
            </div>

            {/* ACTION */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddressModal(false)}
                className="w-full"
              >
                Batal
              </Button>

              <Button
                disabled={!selectedAddress}
                onClick={() => {
                  setShowAddressModal(false)
                  handleCheckoutWithAddress()
                }}
                className="w-full bg-primary"
              >
                Gunakan & Bayar
              </Button>
            </div>
              <Button
                disabled={!selectedAddress}
                onClick={() => {
                  setShowAddressModal(false)
                  handleCod()
                }}
                className="w-full bg-primary cursor-pointer"
              >
                Bayar COD
              </Button>
          </div>
        </div>
      )}

      </footer>
    </div>
  )
}
