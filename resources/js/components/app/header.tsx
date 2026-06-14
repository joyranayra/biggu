import { useState } from "react";

import { 
  Menu, 
  X, 
  ShoppingBag, 
} from "lucide-react"
import { useCartStore } from "@/store/useCartStore";

import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const totalItems = useCartStore(state => state.getTotalItems())

    const { auth } = usePage().props as any;
    const user = auth?.user;

    
    return (
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
            <a href="#" className="flex items-center gap-2 group">
              {/* <BigguMascot className="w-24 h-24 lg:w-24 lg:h-24" /> */}
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
              <a href="/contact" className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10">
                Kontak
              </a>
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
                {user ? (
                  <>
                    {/* ORDER */}
                    <a 
                      href="/order" 
                      className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10"
                    >
                      Pesanan
                    </a>

                    {/* LOGOUT */}
                    <button
                      onClick={() => {
                        router.post('/logout', {}, {
                          preserveScroll: true,
                          onSuccess: () => {
                            router.visit('/')
                          }
                        })
                      }}
                      className="font-medium text-red-500 hover:text-white hover:bg-red-500 transition-colors px-3 py-2 rounded-full cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <a 
                    href="/login" 
                    className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-primary/10"
                  >
                    Login
                  </a>
                )}
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
                <a href="/contact" className="font-medium py-3 px-4 rounded-xl hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Kontak
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>
    );
}