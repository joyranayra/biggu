"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Link } from "@inertiajs/react";

import { 
  Menu, 
  X, 
  ShoppingBag, 
  Sparkles,
  Heart,
  Star,
  MapPin,
  Instagram,
  MessageCircle,
  Send,
  Users,
  Package,
  Award,
  Palette,
  Scissors,
  ChevronRight,
  Gem
} from "lucide-react"

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

// Team members data
const teamMembers = [
  {
    name: "Vebby",
    role: "Founder",
    image: "/about/vebby.jpeg",
    description: "Memiliki passion terhadap kerajinan handmade sejak kecil. Mendirikan Biggu Lab untuk berbagi kebahagiaan dalam berkarya."
  },
  {
    name: "Andri",
    role: "Desainer Produk",
    image: "/about/andri.jpeg",
    description: "Pikiran kreatif di balik desain unik kami. Terinspirasi dari budaya lokal Indonesia."
  },
  {
    name: "Cindi",
    role: "Instruktur Workshop",
    image: "/about/cindi.jpeg",
    description: "Ahli dalam beading dan rajut. Senang mengajarkan seni kerajinan handmade kepada orang lain."
  }
]

// Values data
const values = [
  {
    icon: Heart,
    title: "Dibuat dengan Cinta",
    description: "Setiap karya dibuat dengan penuh passion dan perhatian, memastikan kualitas dan keunikan."
  },
  {
    icon: Palette,
    title: "Desain Kreatif",
    description: "Kami menggabungkan teknik tradisional dengan estetika modern untuk menciptakan karya yang segar dan trendi."
  },
  {
    icon: Users,
    title: "Komunitas Utama",
    description: "Kami membangun koneksi melalui workshop dan pengalaman kreatif bersama."
  },
  {
    icon: Award,
    title: "Material Berkualitas",
    description: "Kami menggunakan bahan terbaik untuk memastikan ketahanan dan keindahan di setiap produk."
  }
]

// Milestones data
const milestones = [
  { year: "2024", title: "Biggu Lab Didirikan", description: "Dimulai sebagai hobi kerajinan kecil di Balikpapan" },
  { year: "2024", title: "Workshop Pertama", description: "Mengadakan workshop gantungan kunci manik-manik pertama dengan 10 peserta" },
  { year: "2025", title: "500+ Pelanggan", description: "Mencapai lebih dari 500 pelanggan yang puas" },
  { year: "2025", title: "Peluncuran Toko Online", description: "Meluncurkan website resmi dan memperluas jangkauan" },
  { year: "2026", title: "Studio Workshop", description: "Membuka studio khusus untuk kegiatan workshop" }
]

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(0)
  const [email, setEmail] = useState("")

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
              className="lg:hidden p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-xl lg:text-2xl font-bold text-primary">
                Biggu Lab
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="/shop" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Belanja
              </a>
              <a href="/workshop" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Workshop
              </a>
              <a href="/about-us" className="font-medium text-primary bg-primary/10 px-3 py-2 rounded-full">
                Tentang Kami
              </a>
              <a href="/contact" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Kontak
              </a>
            </nav>

            {/* Cart */}
            <div className="flex flex-row gap-2">
                <a href="/cart" className="relative p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
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
                <a href="/shop" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Belanja
                </a>
                <a href="/workshop" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Workshop
                </a>
                <a href="/about-us" className="font-medium py-3 px-4 rounded-xl bg-primary/10 text-primary" onClick={() => setIsMenuOpen(false)}>
                  Tentang Kami
                </a>
                <a href="/contact" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Kontak
                </a>
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
            <span className="font-medium text-primary">About-us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <BlobDecor className="absolute -top-20 -right-20 w-96 h-96 text-primary/20 animate-pulse" />
        <BlobDecor className="absolute -bottom-32 -left-32 w-[500px] h-[500px] text-accent/15" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 px-4 py-2 text-sm font-semibold bg-accent text-accent-foreground rounded-full">
                <Heart className="w-4 h-4 mr-2 inline" />
                Cerita Kami
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
                Tentang <span className="text-primary">Biggu Lab</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Sebuah studio kreatif kecil di Balikpapan, Indonesia, yang bersemangat menyebarkan kebahagiaan melalui fashion handmade dan workshop kreatif.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="rounded-full text-base font-semibold px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105" asChild>
                  <a href="/shop">
                    Telusuri Koleksi
                    <Sparkles className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full text-base font-semibold px-8 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all" asChild>
                  <a href="/workshop">
                    Ikuti Workshop
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=800&fit=crop"
                  alt="Biggu Lab Workshop"
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Floating mascot */}
              <div className="absolute -bottom-6 -left-6 animate-bounce">
                <BigguMascot className="w-32 h-32 drop-shadow-lg" />
              </div>
              {/* Stats card */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground p-4 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">2+</div>
                <div className="text-sm font-medium">Tahun Pengalaman</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: "500+", label: "Pelanggan Puas" },
              { icon: Package, value: "50+", label: "Produk Unik" },
              { icon: Scissors, value: "20+", label: "Workshop Selesai" },
              { icon: Gem, value: "100%", label: "Handmade" }
            ].map((stat, index) => (
              <div key={index} className="text-center text-primary-foreground">
                <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 relative">
        <BlobDecor className="absolute top-0 right-0 w-64 h-64 text-accent/10 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
              Our Story
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bagaimana Semua Ini <span className="text-primary">Dimulai</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Biggu Lab dimulai sebagai hobi kecil pada tahun 2024, lahir dari cinta terhadap karya kerajinan handmade 
                dan keinginan untuk menciptakan potongan-potongan unik dan bermakna yang membawa kebahagiaan ke dalam hidup orang-orang.
              </p>
              <p>
                Yang awalnya hanya membuat gantungan kunci manik-manik untuk teman, dengan cepat berkembang menjadi sesuatu yang lebih besar. 
                Kami menyadari bahwa di tengah dunia yang serba cepat dan serba massal ini, ada sesuatu yang istimewa 
                dalam memiliki produk yang dibuat dengan tangan manusia, penuh cinta dan perhatian.
              </p>
              <p>
                Saat ini, Biggu Lab adalah sebuah studio kreatif tempat kami membuat aksesori fashion handmade, 
                mengadakan workshop seru, dan membangun komunitas pecinta kerajinan di Balikpapan dan sekitarnya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-8 bg-gradient-to-br from-accent/10 via-background to-primary/10 relative">
        <BlobDecor className="absolute bottom-0 left-0 w-72 h-72 text-primary/10 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-accent/20 text-accent-foreground rounded-full font-semibold">
              Apa yang Kami Percaya
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">Nilai</span> Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi dasar dari setiap hal yang kami lakukan di Biggu Lab
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-2 border-transparent hover:border-primary/30 rounded-3xl transition-all hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
              Perjalanan Kami
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">Milestones</span> & Kenangan
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/20 mt-2" />
                  )}
                </div>
                <Card className="flex-1 rounded-2xl border-2 border-transparent hover:border-primary/30 transition-all">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative">
        <BlobDecor className="absolute top-0 right-0 w-64 h-64 text-accent/10 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-accent/20 text-accent-foreground rounded-full font-semibold">
              The Creators
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kenalilah <span className="text-primary">Tim Kami</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Orang-orang hebat di balik Biggu Lab
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2 border-transparent hover:border-primary/30 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <Badge className="mb-3 bg-primary/10 text-primary rounded-full">
                    {member.role}
                  </Badge>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
    </div>
  )
}
