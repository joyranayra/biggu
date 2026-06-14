import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  type: 'product' | 'workshop'
  name: string
  price: number
  image: string
  quantity: number
  date?: string
  time?: string
  location?: string
  note?: string
}

interface CartState {
  items: CartItem[]

  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void

  getTotalItems: () => number
  getSubtotal: () => number
  toggleItem: (item: CartItem) => void
  getItemQuantity: (id: string) => number
  updateNote: (id: string, note: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items
        const existing = items.find(i => i.id === item.id)

        if (existing) {
          set({
            items: items.map(i =>
              i.id === item.id
                ? { 
                    ...i, 
                    quantity: item.quantity,
                    note: item.note
                  }
                : i
            )
          })
        } else {
          set({
            items: [...items, item]
          })
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter(i => i.id !== id)
        })
      },

      updateQuantity: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantity: qty } : i
          )
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },

      getItemQuantity: (id) => {
        const item = get().items.find(i => i.id === id)
        return item ? item.quantity : 0
      },

      toggleItem: (item) => {
        const exists = get().items.find(i => i.id === item.id)

        if (exists) {
            set({
              items: get().items.filter(i => i.id !== item.id)
            })
        } else {
            set({
            items: [...get().items, { ...item, quantity: 1 }]
            })
        }
      },

      updateNote: (id, note) => {
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, note } : i
          )
        })
      },
      
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)