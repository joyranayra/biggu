import { useState, useMemo, useEffect } from "react"
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { 
  Menu, 
  X, 
  ShoppingBag, 
  Sparkles,
  Heart,
  Star,
  Search,
  Grid3X3,
  LayoutGrid,
  ChevronRight,
  Filter,
  ArrowUpDown,
  MapPin,
  Instagram,
  MessageCircle,
} from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useCartStore } from "@/store/useCartStore";
// import { products } from "@/dummy/product"

import { usePage } from '@inertiajs/react'

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
  stock: number
}

type PageProps = {
  products: Product[]
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

const categories = ["All", "Perhiasan", "Tas", "Aksesori", "Pakaian"]

const priceRanges = [
  { label: "Semua Harga", min: 0, max: Infinity },
  { label: "Di bawah Rp. 100.000", min: 0, max: 100000 },
  { label: "Rp. 100.000 - Rp. 200.000", min: 100000, max: 200000 },
  { label: "Rp. 200.000 - Rp. 400.000", min: 200000, max: 400000 },
  { label: "Di atas Rp. 400.00０", min: 400000, max: Infinity },
]

const sortOptions = [
  { value: "featured", label: "Unggulan" },
  { value: "newest", label: "Terbaru" },
  { value: "price-low", label: "Harga: Rendah ke Tinggi" },
  { value: "price-high", label: "Harga: Tinggi ke Rendah" },
  { value: "rating", label: "Rating Tertinggi" },
]

// Format price in IDR
function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProductsPage() {
  const { products } = usePage<PageProps>().props

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [sortBy, setSortBy] = useState("featured")
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [gridView, setGridView] = useState<"grid" | "large">("grid")

  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const totalItems = useCartStore(state => state.getTotalItems())

  const items = useCartStore(state => state.items)
  const addItem = useCartStore(state => state.addItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const removeItem = useCartStore(state => state.removeItem)
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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Price range filter
    const priceRange = priceRanges[selectedPriceRange]
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max)

    // In stock filter
    if (showInStockOnly) {
      result = result.filter(p => p.in_stock)
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result = result.sort((a, b) => b.id - a.id)
        break
      case "price-low":
        result = result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result = result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result = result.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Featured - keep original order but prioritize badges
        result = result.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0))
    }

    return result
  }, [searchQuery, selectedCategory, selectedPriceRange, sortBy, showInStockOnly])

  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`space-y-8 ${isMobile ? "" : "sticky top-24"}`}>
      {/* Categories */}
      <div>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full" />
          Kategori
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-medium cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10 text-foreground"
              }`}
            >
              {cat === "All" ? "Semua" : cat}
              <span className="float-right text-sm opacity-70">
                {cat === "All" 
                  ? products.length 
                  : products.filter(p => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-accent rounded-full" />
          Harga
        </h3>
        <div className="space-y-2">
          {priceRanges.map((range, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPriceRange(idx)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-medium cursor-pointer ${
                selectedPriceRange === idx
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/10 text-foreground"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only */}
      <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl">
        <Checkbox 
          id="inStock" 
          checked={showInStockOnly}
          onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
          className="border-primary data-[state=checked]:bg-primary cursor-pointer"
        />
        <label htmlFor="inStock" className="font-medium">
          Ready Stock
        </label>
      </div>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full rounded-xl border-2 border-primary/30 hover:border-primary hover:bg-primary/10 cursor-pointer"
        onClick={() => {
          setSelectedCategory("All")
          setSelectedPriceRange(0)
          setShowInStockOnly(false)
          setSearchQuery("")
        }}
      >
        Hapus Filter
      </Button>
    </div>
  )

  const getImageUrl = (image?: string) => {
    if (!image) return '/no-image.png'

    // path lama (public folder)
    if (image.startsWith('/')) {
      return image
    }

    // path dari storage
    return `/storage/${image}`
  }

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
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl lg:text-2xl font-bold text-primary">
                Biggu Lab
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/products" className="font-medium text-primary bg-primary/10 px-3 py-2 rounded-full">
                Belanja
              </Link>
              <Link href="/workshop" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Workshop
              </Link>
              <Link href="/#about" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Tentang Kami
              </Link>
              <Link href="/contact" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Kontak
              </Link>
            </nav>

            {/* Cart */}
            <div className="flex flex-row gap-2">
                <a href="/cart" className="relative p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                    {totalItems}
                    </span>
                )}
                </a>
                <a href="/login" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                    Login
                </a>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden py-4 border-t-2 border-primary/20">
              <div className="flex flex-col gap-2">
                <Link href="/products" className="font-medium py-3 px-4 rounded-xl bg-primary/10 text-primary" onClick={() => setIsMenuOpen(false)}>
                  Belanja
                </Link>
                <Link href="/workshop" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Workshop
                </Link>
                <Link href="/about-us" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Tentang Kami
                </Link>
                <Link href="/contact" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Kontak
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
            <span className="font-medium text-primary">Shop</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="py-12 relative overflow-hidden">
        <BlobDecor className="absolute -top-20 -right-20 w-64 h-64 text-primary/10" />
        <BlobDecor className="absolute -bottom-20 -left-20 w-48 h-48 text-accent/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Koleksi Kami
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Semua <span className="text-primary">Produk</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Temukan koleksi hasil kerajinan kami yang unik, aksesori, pakaian, dan dekorasi rumah.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Sort Bar */}
      <div className="border-y-2 border-primary/10 bg-background sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 rounded-full border-2 border-primary/20 focus:border-primary bg-secondary/50"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden rounded-full border-2 border-primary/30 cursor-pointer">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-left text-primary">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar isMobile />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] rounded-full border-2 border-primary/20 cursor-pointer">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl cursor-pointer">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="rounded-lg cursor-pointer cursor-pointer">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Grid Toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-secondary rounded-full p-1">
                <button
                  onClick={() => setGridView("grid")}
                  className={`p-2 rounded-full transition-colors ${
                    gridView === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 cursor-pointer"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridView("large")}
                  className={`p-2 rounded-full transition-colors ${
                    gridView === "large" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 cursor-pointer"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Menampilkan <span className="font-semibold text-foreground">{filteredProducts.length}</span> produk
                </p>
                {(selectedCategory !== "All" || selectedPriceRange !== 0 || showInStockOnly || searchQuery) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedCategory !== "All" && (
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {selectedCategory}
                        <button onClick={() => setSelectedCategory("All")} className="ml-2 cursor-pointer">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedPriceRange !== 0 && (
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {priceRanges[selectedPriceRange].label}
                        <button onClick={() => setSelectedPriceRange(0)} className="ml-2 cursor-pointer">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${
                  gridView === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                    : "grid-cols-1 sm:grid-cols-2"
                }`}>
                  {filteredProducts.map((product) => (
                      <Card 
                        className="group cursor-pointer border-2 border-transparent hover:border-primary/30 rounded-3xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 bg-card h-full"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <CardContent className="p-0">
                          <div className={`relative overflow-hidden bg-secondary ${
                            gridView === "large" ? "aspect-[4/5]" : "aspect-square"
                          }`}>
                            <img
                              src={getImageUrl(product.image)}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {!product.in_stock && (
                              <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                                <Badge className="bg-muted text-muted-foreground text-sm">Out of Stock</Badge>
                              </div>
                            )}
                            {product.badge && product.in_stock && (
                              <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-bold rounded-full px-3">
                                {product.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs font-medium text-primary">{product.category}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Star className="w-3 h-3 fill-accent text-accent" />
                                {product.rating} ({product.reviews})
                              </div>
                            </div>
                            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
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
                                  <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold">
                                    +{product.colors.length - 3}
                                  </span>
                                )}
                              </div> */}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory("All")
                      setSelectedPriceRange(0)
                      setShowInStockOnly(false)
                      setSearchQuery("")
                    }}
                    className="rounded-full cursor-pointer"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
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
                    src={getImageUrl(selectedProduct.image)}
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

                  <div className="rounded-2xl mt-3">
                    <p className="font-bold text-lg">Stok: {selectedProduct.stock}</p>
                  </div>


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
    </div>
  )
}