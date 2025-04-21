import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Leaf, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Bipra</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your one-stop shop for fresh groceries and household essentials, delivered to your doorstep.
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-4">
              Bipra was founded in 2023 with a simple mission: to make grocery shopping convenient, affordable, and enjoyable for everyone.
            </p>
            <p className="text-lg mb-4">
              Our founders, a team of entrepreneurs with expertise in e-commerce, logistics, and technology, recognized the challenges people face with traditional grocery shopping - long lines, limited selection, and the hassle of carrying heavy bags.
            </p>
            <p className="text-lg">
              Today, Bipra serves thousands of customers across multiple cities, offering a wide selection of products from trusted suppliers and delivering them with care and efficiency.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg?height=400&width=600&text=Our+Story" 
              alt="Bipra founders" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16 bg-gray-50 py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Freshness Guaranteed</h3>
              <p className="text-gray-600">
                We source our products directly from farmers and trusted suppliers to ensure maximum freshness and quality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We strive to exceed expectations with every order.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to eco-friendly practices, from sustainable packaging to reducing food waste.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center mb-4 text-xl font-bold">1</div>
            <h3 className="text-xl font-semibold mb-2">Browse</h3>
            <p className="text-gray-600">
              Explore our wide selection of groceries and household essentials.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center mb-4 text-xl font-bold">2</div>
            <h3 className="text-xl font-semibold mb-2">Order</h3>
            <p className="text-gray-600">
              Add items to your cart and checkout with secure payment options.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center mb-4 text-xl font-bold">3</div>
            <h3 className="text-xl font-semibold mb-2">Delivery</h3>
            <p className="text-gray-600">
              Sit back and relax as we deliver your order straight to your door.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center mb-4 text-xl font-bold">4</div>
            <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
            <p className="text-gray-600">
              Enjoy fresh, quality products with every purchase from Bipra.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
