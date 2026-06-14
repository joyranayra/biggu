"use client"

import { useState } from "react"
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { 
  Menu, 
  X, 
  ShoppingBag,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  MessageCircle,
  Heart,
  ChevronRight,
  CheckCircle,
  MessageSquare
} from "lucide-react"

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

export default function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const contactChannels = [
    {
      icon: Mail,
      title: "Email",
      value: "biggulab@gmail.com",
      description: "Kirim email kepada kami kapan saja"
    },
    {
      icon: Phone,
      title: "Telepon",
      value: "+62 977 6810 660",
      description: "Hubungi kami Senin-Jumat, 09.00-17.00"
    },
    {
      icon: MapPin,
      title: "Alamat",
      value: "Balikpapan, Kalimantan Timur, Indonesia",
      description: "Kunjungi studio kami dengan janji terlebih dahulu"
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      value: "Senin-Jumat 09.00-17.00 WITA",
      description: "Tutup pada akhir pekan & hari libur"
    }
  ]

  const faqs = [
    {
      question: "Berapa lama pengiriman?",
      answer: "Pengiriman standar memakan waktu 3-5 hari kerja di dalam Indonesia. Untuk pengiriman internasional dapat memakan waktu 7-14 hari tergantung tujuan."
    },
    {
      question: "Apakah saya bisa custom pesanan?",
      answer: "Bisa! Kami menerima pesanan custom untuk sebagian besar produk. Silakan hubungi kami dengan kebutuhan Anda dan kami akan memberikan penawaran."
    },
    {
      question: "Bagaimana kebijakan retur?",
      answer: "Kami menerima retur dalam 14 hari setelah pembelian untuk produk yang belum digunakan dan masih dalam kemasan asli. Silakan hubungi kami untuk proses retur."
    },
    {
      question: "Apakah tersedia harga grosir?",
      answer: "Ya, kami menyediakan harga khusus untuk pembelian dalam jumlah besar. Hubungi kami untuk informasi harga dan ketentuan grosir."
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Colorful Top Banner */}
      <div className="bg-primary py-2.5 text-primary-foreground overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-flex items-center">
          <span className="mx-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> 
            WE&apos;D LOVE TO HEAR FROM YOU
          </span>
          <span className="mx-6 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Get in touch with us anytime
          </span>
          <span className="mx-6 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Your feedback matters to us
          </span>
          <span className="mx-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> 
            WE&apos;D LOVE TO HEAR FROM YOU
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
              <a href="/about-us" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Tentang Kami
              </a>
              <a href="/contact" className="font-medium text-primary transition-colors px-3 py-2 rounded-full bg-primary/10">
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
                <a href="/about-us" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Tentang Kami
                </a>
                <a href="/contact" className="font-medium py-3 px-4 rounded-xl bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
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
            <span className="font-medium text-primary">Contact</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        {/* Decorative blobs */}
        <BlobDecor className="absolute -top-20 -right-20 w-96 h-96 text-primary/20 animate-pulse" />
        <BlobDecor className="absolute -bottom-32 -left-32 w-[500px] h-[500px] text-accent/15" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 mt-4 px-4 py-2 text-sm font-semibold bg-accent text-accent-foreground rounded-full">
              <MessageSquare className="w-4 h-4 mr-2 inline" />
              Terhubung dengan Kami
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
              Kami ingin <span className="text-primary">Mendengar Dari Anda</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Punya pertanyaan tentang produk kami, workshop, atau pesanan khusus? 
              Kirim pesan kepada kami dan kami akan merespons secepat mungkin!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 md:mb-8 relative">
        <BlobDecor className="absolute top-0 right-0 w-64 h-64 text-accent/10 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((channel, index) => {
              const Icon = channel.icon
              return (
                <Card key={index} className="border-2 border-transparent hover:border-primary/30 rounded-3xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{channel.title}</h3>
                    <p className="font-semibold text-primary mb-2">{channel.value}</p>
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Follow Kami <span className="text-primary">Di Media Sosial</span>
            </h2>
            <p className="text-muted-foreground">
              Tetap update dengan produk terbaru kami, workshop, dan konten di balik layar
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { icon: Instagram, label: "Instagram", handle: "@biggu.lab" },
              { icon: MessageCircle, label: "WhatsApp", handle: "+628 771 6810 660" },
              { icon: Mail, label: "Email", handle: "biggulab@gmail.com" }
            ].map((social, i) => {
              const Icon = social.icon
              return (
                <a
                  key={i}
                  href="#"
                  className="group flex flex-col items-center gap-3 p-6 rounded-3xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground rounded-2xl flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">{social.label}</p>
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{social.handle}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
              Have Questions?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group border-2 border-primary/20 rounded-2xl p-6 cursor-pointer hover:border-primary/40 transition-all">
                <summary className="flex items-center justify-between font-semibold text-lg">
                  <span>{faq.question}</span>
                  <span className="text-primary transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
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
