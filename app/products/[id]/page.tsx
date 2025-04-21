import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchProduct } from "@/lib/data"
import AddToCartButton from "@/components/add-to-cart-button"
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Link
        href={`/categories/${product.categoryId}`}
        className="flex items-center text-gray-500 hover:text-green-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to {product.category}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <img
            src={product.image || `/placeholder.svg?height=500&width=500&text=${product.name}`}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl font-bold text-green-600">₹{product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-gray-500 text-lg line-through">₹{product.originalPrice.toFixed(2)}</span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-gray-500">
              Price per {product.unit} • In stock: {product.stock}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <AddToCartButton product={product} />
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <Truck className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium">Fast Delivery</h3>
                <p className="text-sm text-gray-500">Delivered within 30 minutes in select areas</p>
              </div>
            </div>
            <div className="flex items-start">
              <ShieldCheck className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium">Quality Guarantee</h3>
                <p className="text-sm text-gray-500">Not satisfied? Get a refund within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
