import Link from "next/link"
import { ShoppingBag, Clock, MapPin, Shield } from "lucide-react"
import CategoryCard from "@/components/category-card"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { fetchCategories, fetchFeaturedProducts } from "@/lib/data"

export default async function Home() {
  const categories = await fetchCategories()
  const featuredProducts = await fetchFeaturedProducts()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bipra: Your Grocery Store, Delivered!</h1>
              <p className="text-white text-lg mb-6">
                Fresh groceries and household essentials delivered to your doorstep in as little as 30 minutes.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-6">
  <Button asChild size="lg" className="bg-green-600 text-white hover:bg-green-700 transition-colors">
    <Link href="/categories">Shop Now</Link>
  </Button>
  <Button asChild size="lg" className="bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
    <Link href="/about">Learn More</Link>
  </Button>
</div>

            </div>
            <div className="md:w-1/2">
              <img src="/placeholder.svg?height=400&width=500" alt="Fresh groceries" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <ShoppingBag className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Thousands of products across multiple categories</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <Clock className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your groceries in as little as 30 minutes</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <MapPin className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-Time Tracking</h3>
              <p className="text-gray-600">Track your order in real-time on our interactive map</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Multiple payment options with secure transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="/categories">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <section className="py-12 bg-orange-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Get 20% Off Your First Order</h2>
                <p className="text-gray-600 mb-6">
                  Use code <span className="font-bold text-orange-500">BIPRA20</span> at checkout
                </p>
                <Button asChild size="lg" className="w-full md:w-auto">
                  <Link href="/categories">Shop Now</Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Promotion"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
