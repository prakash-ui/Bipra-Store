import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/types"

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
        <div className="aspect-square relative">
          <img
            src={category.image || `/placeholder.svg?height=200&width=200`}
            alt={category.name}
            className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="p-3 text-center">
          <h3 className="font-medium text-sm">{category.name}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}
