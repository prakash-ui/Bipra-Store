export interface User {
  id: string
  name: string
  email: string
  phone?: string
  addresses: Address[]
  loyaltyPoints: number
}

export interface Address {
  id: string
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  isDefault: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  image?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice: number
  discount: number
  category: string
  categoryId: string
  image?: string
  stock: number
  unit: string
  vendor?: string
  rating: number
  reviews: number
  isFeatured: boolean
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  subtotal: number
  tax: number
  deliveryFee: number
  discount: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  paymentId?: string
  deliveryAddress: Address
  createdAt: string
  estimatedDelivery: string
}

export interface OrderItem {
  product: Product
  quantity: number
  price: number
}

export type OrderStatus = "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled"

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded"

export type PaymentMethod = "card" | "upi" | "cod" | "wallet"

export interface DeliveryTracking {
  orderId: string
  status: OrderStatus
  deliveryPartner?: {
    id: string
    name: string
    phone: string
    image?: string
  }
  currentLocation?: {
    lat: number
    lng: number
  }
  estimatedArrival: string
  updates: DeliveryUpdate[]
}

export interface DeliveryUpdate {
  status: string
  timestamp: string
  description: string
}
