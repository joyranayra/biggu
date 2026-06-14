"use client"

// import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { 
  ShoppingBag, 
  Sparkles,
  Heart,
  Star,
  MapPin,
  Calendar,
  Clock,
  Users,
  Instagram,
  MessageCircle,
  Send,
  CheckCircle,
} from "lucide-react"

import { useCartStore } from '@/store/useCartStore'
import { Link } from "@inertiajs/react"
import Header from "@/components/app/header"

// Cute mascot SVG component
function BigguMascot({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <img
      src="/Biggu_Lab-01-removebg-preview.png"
      alt="Biggu Lab Logo"
      className={className}
    />
  )
}

// Format date
function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { 
    weekday: 'short',
    day: 'numeric', 
    month: 'short',
    year: 'numeric'
  })
}

function BigguLogo({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <img
      src="/Biggu Lab-01.png"
      alt="Biggu Lab Logo"
      className={className}
    />
  )
}

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

// Format price in IDR
function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

import { useEffect, useState } from "react"

type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
  badge?: string
  rating: number
  reviews: number
  in_stock: boolean
}

type Workshop = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  badge?: string
  date: string
  time: string
  location: string
  spots_total: number
  spots_left: number
  rating: number
  reviews: number
  difficulty: string
  includes: string[]
}

type PageProps = {
  products: Product[]
  workshops: Workshop[]
}

import { usePage } from '@inertiajs/react'

export default function Welcome() {
  const { 
    products = [], 
    workshops = [] 
  } = usePage<PageProps>().props

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)
  const [email, setEmail] = useState("")

  const toggleItem = useCartStore(state => state.toggleItem)
  const items = useCartStore(state => state.items)

  const addItem = useCartStore(state => state.addItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)

  const updateNote = useCartStore(state => state.updateNote)

  // keranjang
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState("")

  useEffect(() => {
    if (selectedProduct) {
      const existingItem = items.find(
        i => i.id === `${selectedProduct.id}`
      )

      setQty(existingItem?.quantity || 1)
      setNote(existingItem?.note || "")
    }
  }, [selectedProduct, items])

  const productQty = selectedProduct
  ? items.find(i => i.id === `${selectedProduct.id}`)?.quantity || 0
  : 0

  const addToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const existing = items.find(
      i => i.id === `${product.id}`
    )

    if (existing) {
      updateQuantity(existing.id, qty)
      updateNote(existing.id, note)
    } else {
      addItem({
        id: `${product.id}`,
        type: 'product',
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: qty,
        note,
      })
    }

    setSelectedProduct(null)
  }

  const registerWorkshop = (workshop: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    toggleItem({
      id: `workshop-${workshop.id}`,
      type: 'workshop',
      name: workshop.name,
      price: workshop.price,
      image: workshop.image,
      quantity: 1,
      date: workshop.date,
      time: workshop.time,
      location: workshop.location
    })
  }

  const isRegistered = selectedWorkshop
  ? items.some(i => i.id === `workshop-${selectedWorkshop.id}`)
  : false

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Colorful Top Banner */}
      <div className="bg-primary py-2.5 text-primary-foreground overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-flex items-center">
          <span className="mx-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> 
            HAND-MADE FASHION COLLECTION
          </span>
          <span className="mx-6 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Made just for you!
          </span>
          <span className="mx-6 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Based in Balikpapan, ID
          </span>
          <span className="mx-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> 
            HAND-MADE FASHION COLLECTION
          </span>
          <span className="mx-6 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Made just for you!
          </span>
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        {/* Decorative blobs */}
        <BlobDecor className="absolute -top-20 -right-20 w-96 h-96 text-primary/20 animate-pulse" />
        <BlobDecor className="absolute -bottom-32 -left-32 w-[500px] h-[500px] text-accent/15" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 px-4 py-2 text-sm font-semibold bg-accent text-accent-foreground rounded-full">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Koleksi Terbaru 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
                <span className="text-primary">Handmade</span> Fashion,{" "}
                Terbaik Untuk <span className="text-primary">Anda!</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Temukan aksesori, pakaian, dan dekorasi rumah buatan tangan yang unik. Setiap produk dibuat dengan penuh cinta oleh para pengrajin lokal di Balikpapan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="rounded-full text-base font-semibold px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105" asChild>
                  <a href="/shop">
                    Belanja Sekarang
                    <Sparkles className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full text-base font-semibold px-8 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all" asChild>
                  <a href="/workshop">
                    Gabung Workshop
                  </a>
                </Button>
              </div>
              
              {/* Stats */}
              {/* <div className="flex gap-8 mt-12 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Pelanggan Bahagia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm text-muted-foreground">Produk Unik</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Workshops Terselenggara</div>
                </div>
              </div> */}
            </div>
            
            {/* Hero Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-primary/20 shadow-xl transform hover:scale-105 transition-transform">
                    <img
                      src="/produk/gantungan kunci rajut/gantungan-kunci-rajut-1.jpeg"
                      alt="Handmade beads"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-accent/20 shadow-xl transform hover:scale-105 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=400&h=300&fit=crop"
                      alt="Crochet items"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-accent/20 shadow-xl transform hover:scale-105 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop"
                      alt="Handmade bags"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-primary/20 shadow-xl transform hover:scale-105 transition-transform">
                    <img
                      src="/produk/topi bunga rajut/topi-bunga-rajut-1.jpeg"
                      alt="Accessories"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Floating mascot */}
              <div className="absolute -bottom-6 -left-6 animate-bounce">
                <BigguMascot className="w-48 h-48 drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Banner */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {["Ready Stock", "Handmade", "Good Quality", "Best Price"].map((cat, i) => (
              <button 
                key={cat}
                className="px-6 py-3 bg-primary-foreground text-primary rounded-full font-semibold hover:scale-105 transition-transform shadow-md flex items-center gap-2"
              >
                <span className="text-lg">{["🛍️", "✨", "🎁", "🎨"][i]}</span>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24 relative">
        <BlobDecor className="absolute top-0 right-0 w-64 h-64 text-accent/10 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
              Produk Kami
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">Dibuat</span> Dengan Cinta
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Setiap produk unik dan dibuat dengan penuh perhatian. Temukan aksesori favorit barumu!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.slice(0, 6).map((product) => (
              <Card 
                key={product.id} 
                className="group cursor-pointer border-2 border-transparent hover:border-primary/30 rounded-3xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 bg-card"
                onClick={() => setSelectedProduct(product)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-bold rounded-full px-3">
                        {product.badge}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Button 
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all rounded-full shadow-lg"
                      size="sm"
                    >
                     Tampilkan
                    </Button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium text-primary mb-1">{product.category}</p>
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary text-lg">{formatPrice(product.price)}</span>
                      {/* <div className="flex gap-1">
                        {product.colors.slice(0, 3).map((color, i) => (
                          <span 
                            key={i} 
                            className="w-4 h-4 rounded-full border-2 border-background shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                        )}
                      </div> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="rounded-full px-8 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                Lihat Semua Produk
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section id="workshops" className="py-16 md:py-24 bg-gradient-to-br from-accent/10 via-background to-primary/10 relative">
        <BlobDecor className="absolute bottom-0 left-0 w-72 h-72 text-primary/10 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-accent/20 text-accent-foreground rounded-full font-semibold">
              Belajar Bersama Kami
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Workshop Kreatif
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ikuti workshop kami dan pelajari seni kerajinan tangan langsung dari para ahli. Cocok untuk semua tingkat keahlian!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {workshops.slice(0, 3).map((workshop) => (
              <Card 
                key={workshop.id} 
                className="overflow-hidden group cursor-pointer rounded-3xl border-2 border-transparent hover:border-accent/30 transition-all hover:shadow-xl hover:-translate-y-1"
                onClick={() => setSelectedWorkshop(workshop)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={workshop.image}
                    alt={workshop.name}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground rounded-full font-bold">
                    {workshop.spots_left} spots left
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                    {workshop.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {workshop.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {formatDate(workshop.date)}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      {workshop.time}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {workshop.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="font-bold text-xl text-primary">{formatPrice(workshop.price)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/workshop">
              <Button size="lg" className="rounded-full px-8 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                Lihat Semua Workshop
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=800&fit=crop"
                  alt="Our workshop"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">2+</div>
                <div className="text-sm font-medium">Pengalaman</div>
              </div>
            </div>
            
            <div>
              <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
                About Biggu Lab
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-primary">Dibuat</span> dengan cinta di Balikpapan
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Selamat datang di Biggu Lab! Kami adalah studio kreatif kecil yang berbasis di Balikpapan, Indonesia,
                  dengan passion pada fashion dan aksesori handmade.
                </p>
                <p>
                  Setiap produk yang kami buat dikerjakan dengan penuh cinta dan perhatian terhadap detail. Dari aksesori manik-manik
                  hingga produk rajutan, kami percaya pada keindahan karya buatan tangan.
                </p>
                <p>
                  Bergabunglah dengan komunitas pecinta kerajinan kami dan temukan keseruan dalam dunia fashion handmade!
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <Button size="lg" className="rounded-full font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  Follow Kami
                  <Instagram className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer">
                  Hubungi Kami
                  <MessageCircle className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <BigguLogo className="w-42 h-42 mx-auto -mt-12" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Bergabunglah dengan Keluarga Biggu!
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Berlangganan untuk mendapatkan pembaruan tentang produk baru, workshop, dan penawaran eksklusif!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full bg-primary-foreground text-foreground border-0 h-12 px-6"
              />
              <Button 
                size="lg" 
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold whitespace-nowrap h-12 px-6 cursor-pointer"
              >
                Berlangganan
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

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
                Koleksi Fashion Handmade Terbaik Untuk Anda! Based in Balikpapan, Indonesia.
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
              <h4 className="font-bold mb-4">Tautan</h4>
              <nav className="space-y-2 text-background/70">
                <a href="/shop" className="block hover:text-primary transition-colors">Belanja</a>
                <a href="/workshops" className="block hover:text-primary transition-colors">Workshop</a>
                <a href="/about" className="block hover:text-primary transition-colors">Tentang Kami</a>
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

      {/* Product Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="min-w-2xl rounded-3xl">
          {selectedProduct && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <DialogHeader>
                    <Badge className="w-fit bg-primary/10 text-primary rounded-full">
                      {selectedProduct.category}
                    </Badge>
                    <DialogTitle className="text-2xl font-bold">{selectedProduct.name}</DialogTitle>
                    <DialogDescription className="text-3xl font-bold text-primary">
                      {formatPrice(selectedProduct.price)}
                    </DialogDescription>
                  </DialogHeader>

                  <Textarea
                    placeholder="Contoh: warna hitam, size M, request custom..."
                    value={note}
                    onChange={(e) => {
                      setNote(e.target.value)
                    }}
                    className="rounded-2xl border-2 min-h-24 resize-none mt-3"
                  />

                  <div className="flex flex-col gap-4 my-4">
                    <div className="flex items-center justify-between w-full bg-primary/10 rounded-full px-4 py-1">
                      {/* MINUS */}
                      <button
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 text-lg font-bold cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          const id = `${selectedProduct?.id}`

                          setQty(prev => Math.max(1, prev - 1))
                        }}
                      >
                        -
                      </button>

                      {/* QTY */}
                      <span className="font-bold text-lg text-primary">
                        {qty}
                      </span>

                      {/* PLUS */}
                      <button
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white shadow hover:bg-primary/80 text-lg font-bold cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          const id = `${selectedProduct?.id}`

                          setQty(prev => prev + 1)
                        }}
                      >
                        +
                      </button>
                    </div>
                    <Button 
                        className="flex-1 rounded-full font-semibold min-h-12 py-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!selectedProduct) return

                          addToCart(selectedProduct, e);
                          setNote("")
                        }}
                      >
                        <ShoppingBag className="mr-2 w-10 h-10" />
                        Masukan Keranjang
                      </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Workshop Registration Modal */}
      <Dialog open={!!selectedWorkshop} onOpenChange={() => setSelectedWorkshop(null)}>
        <DialogContent className="max-w-2xl rounded-3xl">
          {selectedWorkshop && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={selectedWorkshop.image}
                    alt={selectedWorkshop.name}
                    className="object-cover w-full h-full"
                  />
                  {selectedWorkshop.badge && (
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-bold rounded-full px-3">
                      {selectedWorkshop.badge}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col">
                  <DialogHeader>
                    <div className="flex gap-2 mb-2">
                      <Badge className="w-fit bg-primary/10 text-primary rounded-full">
                        {selectedWorkshop.category}
                      </Badge>
                      <Badge className="w-fit bg-accent/10 text-accent-foreground rounded-full">
                        {selectedWorkshop.difficulty}
                      </Badge>
                    </div>
                    <DialogTitle className="text-2xl font-bold">{selectedWorkshop.name}</DialogTitle>
                    <DialogDescription className="text-3xl font-bold text-primary mt-2">
                      {formatPrice(selectedWorkshop.price)}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-4 space-y-4 flex-1">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-medium">{selectedWorkshop.rating}</span>
                      <span className="text-muted-foreground">({selectedWorkshop.reviews} reviews)</span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{formatDate(selectedWorkshop.date)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{selectedWorkshop.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{selectedWorkshop.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{selectedWorkshop.spots_left} of {selectedWorkshop.spots_total} Kursi Tersedia</span>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Includes:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedWorkshop.includes.map((item, i) => (
                          <Badge key={i} variant="secondary" className="rounded-full">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button 
                      className={`flex-1 rounded-full font-semibold h-12 cursor-pointer ${
                        isRegistered 
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : ""
                      }`}
                      onClick={(e) => selectedWorkshop && registerWorkshop(selectedWorkshop, e)}
                      disabled={
                        selectedWorkshop?.spots_left === 0 && !isRegistered
                      }
                    >
                      {isRegistered ? (
                        <>
                          <ShoppingBag className="mr-2 w-5 h-5" />
                          Lanjut ke Pembayaran
                        </>
                      ) : (
                        <>
                          <Calendar className="mr-2 w-5 h-5" />
                          {selectedWorkshop?.spots_left > 0 ? "Daftar Sekarang" : "Fully Booked"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
