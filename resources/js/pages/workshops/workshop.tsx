"use client"

import { useState, useMemo } from "react"
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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
  Calendar,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react"
import { useCartStore } from "@/store/useCartStore";
// import { workshops } from "@/dummy/workshop"

import { usePage } from '@inertiajs/react'

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
  workshops: Workshop[]
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

const categories = ["All", "Beading", "Rajut", "Makrame", "Sulam", "Lukis"]

const difficultyLevels = ["All levels", "Pemula", "Menengah", "Lanjutan"]

const priceRanges = [
  { label: "Semua Harga", min: 0, max: Infinity },
  { label: "Di bawah Rp150.000", min: 0, max: 150000 },
  { label: "Rp150.000 - Rp250.000", min: 150000, max: 250000 },
  { label: "Di atas Rp250.000", min: 250000, max: Infinity },
]

const sortOptions = [
  { value: "featured", label: "Unggulan" },
  { value: "date", label: "Terdekat" },
  { value: "price-low", label: "Harga: Termurah ke Termahal" },
  { value: "price-high", label: "Harga: Termahal ke Termurah" },
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

const getImageUrl = (image?: string) => {
    if (!image) return '/no-image.png'

    // path lama (public folder)
    if (image.startsWith('/')) {
      return image
    }

    // path dari storage
    return `/storage/${image}`
  }

export default function WorkshopsPage() {
  const { workshops } = usePage<PageProps>().props

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels")
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [sortBy, setSortBy] = useState("featured")
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [gridView, setGridView] = useState<"grid" | "large">("grid")
  const [selectedWorkshop, setSelectedWorkshop] = useState<typeof workshops[0] | null>(null)

  const items = useCartStore(state => state.items)

  const toggleItem = useCartStore(state => state.toggleItem)

  const totalItems = useCartStore(state => state.getTotalItems())

  const registerWorkshop = (workshop: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const item = {
      id: `${workshop.id}`,
      type: 'workshop' as const,
      name: workshop.name,
      price: workshop.price,
      image: workshop.image,
      quantity: 1,
      date: workshop.date,
      time: workshop.time,
      location: workshop.location
    }

    toggleItem(item)

    setSelectedWorkshop(null)
  }

  const isRegistered = useCartStore(state =>
    selectedWorkshop
      ? state.items.some(i => i.id === `${selectedWorkshop.id}`)
      : false
  )

  // Filter and sort workshops
  const filteredWorkshops = useMemo(() => {
    let result = [...workshops]

    // Search filter
    if (searchQuery) {
      result = result.filter(w => 
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(w => w.category === selectedCategory)
    }

    // Difficulty filter
    if (selectedDifficulty !== "All Levels") {
      result = result.filter(w => w.difficulty === selectedDifficulty)
    }

    // Price range filter
    const priceRange = priceRanges[selectedPriceRange]
    result = result.filter(w => w.price >= priceRange.min && w.price <= priceRange.max)

    // Available spots filter
    if (showAvailableOnly) {
      result = result.filter(w => w.spots_left > 0)
    }

    // Sort
    switch (sortBy) {
      case "date":
        result = result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
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
        // Featured - prioritize badges and available spots
        result = result.sort((a, b) => {
          if (a.badge && !b.badge) return -1
          if (!a.badge && b.badge) return 1
          return b.spots_left - a.spots_left
        })
    }

    return result
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedPriceRange, sortBy, showAvailableOnly])

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
                  ? workshops.length 
                  : workshops.filter(w => w.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-accent rounded-full" />
          Kesulitan
        </h3>
        <div className="space-y-2">
          {difficultyLevels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedDifficulty(level)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-medium cursor-pointer ${
                selectedDifficulty === level
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/10 text-foreground"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full" />
          Harga
        </h3>
        <div className="space-y-2">
          {priceRanges.map((range, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPriceRange(idx)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-medium cursor-pointer ${
                selectedPriceRange === idx
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10 text-foreground"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Available Only */}
      <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl">
        <Checkbox 
          id="available" 
          checked={showAvailableOnly}
          onCheckedChange={(checked) => setShowAvailableOnly(checked as boolean)}
          className="border-primary data-[state=checked]:bg-primary cursor-pointer"
        />
        <label htmlFor="available" className="font-medium cursor-pointer">
          Ready Stock
        </label>
      </div>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full rounded-xl border-2 border-primary/30 hover:border-primary hover:bg-primary/10 cursor-pointer"
        onClick={() => {
          setSelectedCategory("All")
          setSelectedDifficulty("All Levels")
          setSelectedPriceRange(0)
          setShowAvailableOnly(false)
          setSearchQuery("")
        }}
      >
        Hapus Filter
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Colorful Top Banner */}
      <div className="bg-primary py-2.5 text-primary-foreground overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-flex items-center">
          <span className="mx-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> 
            HAND-MADE FASHION WORKSHOPS
          </span>
          <span className="mx-6 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Learn & Create with us!
          </span>
          <span className="mx-6 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Based in Balikpapan, ID
          </span>
          <span className="mx-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> 
            HAND-MADE FASHION WORKSHOPS
          </span>
          <span className="mx-6 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Learn & Create with us!
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
              <Link href="/shop" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Belanja
              </Link>
              <Link href="/workshop" className="font-medium text-primary bg-primary/10 px-3 py-2 rounded-full">
                Workshop
              </Link>
              <Link href="/about-us" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
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
                <Link href="/shop" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Belanja
                </Link>
                <Link href="/workshop" className="font-medium py-3 px-4 rounded-xl bg-primary/10 text-primary" onClick={() => setIsMenuOpen(false)}>
                  Workshop
                </Link>
                <Link href="/#about" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
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
            <span className="font-medium text-primary">Workshops</span>
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
              <Calendar className="w-4 h-4 mr-2 inline" />
              Belajar Dan Membuat
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Workshop <span className="text-primary">Kami</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Bergabunglah dengan workshop kreatif kami dan belajar membuat item handmade yang indah dengan tangan Anda sendiri!
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
                placeholder="Cari workshop..."
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
                    <SelectItem key={option.value} value={option.value} className="rounded-lg cursor-pointer">
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

            {/* Workshops Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Menampilkan <span className="font-semibold text-foreground">{filteredWorkshops.length}</span> Workshop
                </p>
                {(selectedCategory !== "All" || selectedDifficulty !== "All Levels" || selectedPriceRange !== 0 || showAvailableOnly || searchQuery) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedCategory !== "All" && (
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {selectedCategory}
                        <button onClick={() => setSelectedCategory("All")} className="ml-2 cursor-pointer">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedDifficulty !== "All Levels" && (
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {selectedDifficulty}
                        <button onClick={() => setSelectedDifficulty("All Levels")} className="ml-2 cursor-pointer">
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

              {/* Workshops */}
              {filteredWorkshops.length > 0 ? (
                <div className={`grid gap-6 ${
                  gridView === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                    : "grid-cols-1 sm:grid-cols-2"
                }`}>
                  {filteredWorkshops.map((workshop) => (
                    <Card
                      key={workshop.id}
                      className={`group border-2 border-transparent rounded-3xl overflow-hidden transition-all bg-card h-full ${
                        workshop.spots_left > 0
                          ? "cursor-pointer hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
                          : "cursor-not-allowed opacity-70"
                      }`}
                      onClick={() => {
                        if (workshop.spots_left > 0) {
                          setSelectedWorkshop(workshop)
                        }
                      }}
                    >
                      <CardContent className="p-0">
                        <div className={`relative overflow-hidden bg-secondary ${
                          gridView === "large" ? "aspect-[4/5]" : "aspect-square"
                        }`}>
                          <img
                            src={getImageUrl(workshop.image)}
                            alt={workshop.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {workshop.spots_left === 0 && (
                            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                              <Badge className="bg-muted text-muted-foreground text-sm">Terpesan Penuh</Badge>
                            </div>
                          )}
                          {workshop.badge && workshop.spots_left > 0 && (
                            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-bold rounded-full px-3">
                              {workshop.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-medium text-primary">{workshop.category}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="w-3 h-3 fill-accent text-accent" />
                              {workshop.rating} ({workshop.reviews})
                            </div>
                          </div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{workshop.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(workshop.date)}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary text-lg">{formatPrice(workshop.price)}</span>
                            <Badge variant={workshop.spots_left > 0 ? "secondary" : "outline"} className="rounded-full">
                              <Users className="w-3 h-3 mr-1" />
                              {workshop.spots_left > 0 ? `${workshop.spots_left} spot tersisa` : "Penuh"}
                            </Badge>
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
                  <h3 className="text-xl font-bold mb-2">No workshops found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory("All")
                      setSelectedDifficulty("All Levels")
                      setSelectedPriceRange(0)
                      setShowAvailableOnly(false)
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

      {/* Workshop Modal */}
      <Dialog open={!!selectedWorkshop} onOpenChange={() => setSelectedWorkshop(null)}>
        <DialogContent className="max-w-2xl rounded-3xl">
          {selectedWorkshop && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={getImageUrl(selectedWorkshop.image)}
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
                        <span>{selectedWorkshop.spots_left} dari {selectedWorkshop.spots_left} spot tersedia</span>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Termasuk:</p>
                      <div className="flex flex-wrap gap-2">
                        {/* {selectedWorkshop.includes.map((item, i) => (
                          <Badge key={i} variant="secondary" className="rounded-full">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {item}
                          </Badge>
                        ))} */}
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
                      disabled={selectedWorkshop?.spots_left === 0}
                    >
                      {isRegistered ? (
                        <>
                          <CheckCircle className="mr-2 w-5 h-5" />
                          Lanjut Keranjang
                        </>
                      ) : (
                        <>
                          <Calendar className="mr-2 w-5 h-5" />
                          {selectedWorkshop?.spots_left > 0 ? "Daftar Sekarang" : "Penuh"}
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
