import Link from "next/link"
import { fetchCategories } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"

export default async function CategoriesPage() {
  const categories = await fetchCategories()

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md h-full">
              <div className="aspect-video relative">
                <img
                  src={category.image || `/placeholder.svg?height=200&width=400&text=${category.name}`}
                  alt={category.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-500">Browse all {category.name.toLowerCase()} products</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
