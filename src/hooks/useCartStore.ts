import { create } from 'zustand'
import { type MockMenu } from '../services/seedMockData'

export interface CartItem extends MockMenu {
  quantity: number
}

export interface WizardDetails {
  plan: '5-day' | '7-day'
  slot: 'lunch' | 'dinner'
  deliveryAddress: string
  notes: string
}

interface CartState {
  chefId: string | null
  items: CartItem[]
  totalPrice: number
  wizardDetails: WizardDetails
  
  // Actions
  addItem: (item: MockMenu, chefId: string) => { success: boolean; conflict?: boolean }
  forceAddItem: (item: MockMenu, chefId: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  updateWizardDetails: (details: Partial<WizardDetails>) => void
}

const initialWizardDetails: WizardDetails = {
  plan: '5-day',
  slot: 'lunch',
  deliveryAddress: '',
  notes: ''
}

export const useCartStore = create<CartState>((set, get) => ({
  chefId: null,
  items: [],
  totalPrice: 0,
  wizardDetails: initialWizardDetails,

  addItem: (item, chefId) => {
    const state = get()
    
    // Check if we are adding from a different chef
    if (state.chefId && state.chefId !== chefId && state.items.length > 0) {
      return { success: false, conflict: true }
    }

    const existingItem = state.items.find(i => i.id === item.id)
    let newItems: CartItem[] = []

    if (existingItem) {
      newItems = state.items.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    } else {
      newItems = [...state.items, { ...item, quantity: 1 }]
    }

    const newTotalPrice = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)

    set({
      chefId,
      items: newItems,
      totalPrice: newTotalPrice
    })

    return { success: true }
  },

  forceAddItem: (item, chefId) => {
    const newItems: CartItem[] = [{ ...item, quantity: 1 }]
    const newTotalPrice = item.price

    set({
      chefId,
      items: newItems,
      totalPrice: newTotalPrice,
      wizardDetails: initialWizardDetails // Reset wizard details when switching chef
    })
  },

  removeItem: (itemId) => {
    const state = get()
    const newItems = state.items.filter(i => i.id !== itemId)
    const newTotalPrice = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
    const newChefId = newItems.length === 0 ? null : state.chefId

    set({
      chefId: newChefId,
      items: newItems,
      totalPrice: newTotalPrice
    })
  },

  updateQuantity: (itemId, quantity) => {
    const state = get()
    if (quantity <= 0) {
      state.removeItem(itemId)
      return
    }

    const newItems = state.items.map(i => 
      i.id === itemId ? { ...i, quantity } : i
    )
    const newTotalPrice = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)

    set({
      items: newItems,
      totalPrice: newTotalPrice
    })
  },

  clearCart: () => {
    set({
      chefId: null,
      items: [],
      totalPrice: 0,
      wizardDetails: initialWizardDetails
    })
  },

  updateWizardDetails: (details) => {
    set(state => ({
      wizardDetails: {
        ...state.wizardDetails,
        ...details
      }
    }))
  }
}))
