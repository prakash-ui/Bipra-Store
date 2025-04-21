import type { Category, Product, Order, DeliveryTracking } from "@/types"

// Mock Categories
const categories: Category[] = [
  {
    id: "1",
    name: "Fruits & Vegetables",
    slug: "fruits-vegetables",
    image: "/placeholder.svg?height=200&width=200&text=Fruits+%26+Vegetables",
  },
  {
    id: "2",
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    image: "/placeholder.svg?height=200&width=200&text=Dairy+%26+Eggs",
  },
  {
    id: "3",
    name: "Bakery",
    slug: "bakery",
    image: "/placeholder.svg?height=200&width=200&text=Bakery",
  },
  {
    id: "4",
    name: "Beverages",
    slug: "beverages",
    image: "/placeholder.svg?height=200&width=200&text=Beverages",
  },
  {
    id: "5",
    name: "Snacks",
    slug: "snacks",
    image: "/placeholder.svg?height=200&width=200&text=Snacks",
  },
  {
    id: "6",
    name: "Household",
    slug: "household",
    image: "/placeholder.svg?height=200&width=200&text=Household",
  },
]

// Mock Products
const products: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Apples",
    slug: "fresh-organic-apples",
    description: "Sweet and juicy organic apples, perfect for snacking or baking.",
    price: 120,
    originalPrice: 150,
    discount: 20,
    category: "Fruits & Vegetables",
    categoryId: "1",
    image: "/placeholder.svg?height=300&width=300&text=Apples",
    stock: 50,
    unit: "kg",
    vendor: "Organic Farms",
    rating: 4.5,
    reviews: 28,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Whole Milk",
    slug: "whole-milk",
    description: "Fresh whole milk from grass-fed cows.",
    price: 60,
    originalPrice: 60,
    discount: 0,
    category: "Dairy & Eggs",
    categoryId: "2",
    image: "/placeholder.svg?height=300&width=300&text=Milk",
    stock: 30,
    unit: "liter",
    vendor: "Happy Dairy",
    rating: 4.7,
    reviews: 42,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Whole Wheat Bread",
    slug: "whole-wheat-bread",
    description: "Freshly baked whole wheat bread, perfect for sandwiches.",
    price: 40,
    originalPrice: 45,
    discount: 11,
    category: "Bakery",
    categoryId: "3",
    image: "/placeholder.svg?height=300&width=300&text=Bread",
    stock: 20,
    unit: "loaf",
    vendor: "Sunshine Bakery",
    rating: 4.3,
    reviews: 18,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Orange Juice",
    slug: "orange-juice",
    description: "Freshly squeezed orange juice with no added sugar.",
    price: 80,
    originalPrice: 100,
    discount: 20,
    category: "Beverages",
    categoryId: "4",
    image: "/placeholder.svg?height=300&width=300&text=Orange+Juice",
    stock: 25,
    unit: "liter",
    vendor: "Fresh Squeeze",
    rating: 4.6,
    reviews: 32,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Potato Chips",
    slug: "potato-chips",
    description: "Crunchy potato chips with a hint of sea salt.",
    price: 30,
    originalPrice: 35,
    discount: 14,
    category: "Snacks",
    categoryId: "5",
    image: "/placeholder.svg?height=300&width=300&text=Chips",
    stock: 40,
    unit: "pack",
    vendor: "Crunchy Delights",
    rating: 4.2,
    reviews: 24,
    isFeatured: false,
  },
  {
    id: "6",
    name: "Laundry Detergent",
    slug: "laundry-detergent",
    description: "Powerful laundry detergent that removes tough stains.",
    price: 180,
    originalPrice: 200,
    discount: 10,
    category: "Household",
    categoryId: "6",
    image: "/placeholder.svg?height=300&width=300&text=Detergent",
    stock: 15,
    unit: "bottle",
    vendor: "Clean Home",
    rating: 4.4,
    reviews: 36,
    isFeatured: false,
  },
  {
    id: "7",
    name: "Bananas",
    slug: "bananas",
    description: "Ripe and sweet bananas, perfect for a quick snack.",
    price: 50,
    originalPrice: 60,
    discount: 17,
    category: "Fruits & Vegetables",
    categoryId: "1",
    image: "/placeholder.svg?height=300&width=300&text=Bananas",
    stock: 60,
    unit: "dozen",
    vendor: "Tropical Farms",
    rating: 4.5,
    reviews: 22,
    isFeatured: true,
  },
  {
    id: "8",
    name: "Greek Yogurt",
    slug: "greek-yogurt",
    description: "Creamy Greek yogurt, high in protein and probiotics.",
    price: 90,
    originalPrice: 90,
    discount: 0,
    category: "Dairy & Eggs",
    categoryId: "2",
    image: "/placeholder.svg?height=300&width=300&text=Yogurt",
    stock: 35,
    unit: "cup",
    vendor: "Happy Dairy",
    rating: 4.8,
    reviews: 48,
    isFeatured: true,
  },
]

// Mock Orders
const orders: Order[] = [
  {
    id: "ORD12345",
    userId: "1",
    items: [
      {
        product: products[0],
        quantity: 2,
        price: products[0].price,
      },
      {
        product: products[1],
        quantity: 1,
        price: products[1].price,
      },
    ],
    total: 300,
    subtotal: 280,
    tax: 14,
    deliveryFee: 40,
    discount: 34,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "card",
    paymentId: "PAY98765",
    deliveryAddress: {
      id: "1",
      name: "Home",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      isDefault: true,
    },
    createdAt: "2023-05-15T10:30:00Z",
    estimatedDelivery: "2023-05-15T12:30:00Z",
  },
  {
    id: "ORD12346",
    userId: "1",
    items: [
      {
        product: products[2],
        quantity: 1,
        price: products[2].price,
      },
      {
        product: products[3],
        quantity: 2,
        price: products[3].price,
      },
    ],
    total: 220,
    subtotal: 200,
    tax: 10,
    deliveryFee: 40,
    discount: 30,
    status: "out_for_delivery",
    paymentStatus: "paid",
    paymentMethod: "upi",
    paymentId: "PAY98766",
    deliveryAddress: {
      id: "1",
      name: "Home",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      isDefault: true,
    },
    createdAt: "2023-06-20T14:45:00Z",
    estimatedDelivery: "2023-06-20T16:45:00Z",
  },
]

// Mock Delivery Tracking
const deliveryTracking: DeliveryTracking[] = [
  {
    orderId: "ORD12346",
    status: "out_for_delivery",
    deliveryPartner: {
      id: "DEL789",
      name: "Michael Johnson",
      phone: "+1234567890",
      image: "/placeholder.svg?height=100&width=100&text=MJ",
    },
    currentLocation: {
      lat: 40.7128,
      lng: -74.006,
    },
    estimatedArrival: "2023-06-20T16:45:00Z",
    updates: [
      {
        status: "Order Placed",
        timestamp: "2023-06-20T14:45:00Z",
        description: "Your order has been placed successfully.",
      },
      {
        status: "Order Confirmed",
        timestamp: "2023-06-20T14:50:00Z",
        description: "Your order has been confirmed and is being prepared.",
      },
      {
        status: "Out for Delivery",
        timestamp: "2023-06-20T15:30:00Z",
        description: "Your order is out for delivery with Michael Johnson.",
      },
    ],
  },
]

// Data Fetching Functions
export async function fetchCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return categories
}

export async function fetchCategory(slug: string): Promise<Category | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return categories.find((category) => category.slug === slug)
}

export async function fetchProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products
}

export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.filter((product) => product.categoryId === categoryId)
}

export async function fetchProduct(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.find((product) => product.id === id)
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.find((product) => product.slug === slug)
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.filter((product) => product.isFeatured)
}

export async function fetchOrders(userId: string): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return orders.filter((order) => order.userId === userId)
}

export async function fetchOrder(id: string): Promise<Order | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return orders.find((order) => order.id === id)
}

export async function fetchDeliveryTracking(orderId: string): Promise<DeliveryTracking | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return deliveryTracking.find((tracking) => tracking.orderId === orderId)
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}
