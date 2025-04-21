"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchOrder, fetchDeliveryTracking } from "@/lib/data"
import type { Order, DeliveryTracking } from "@/types"
import { useAuth } from "@/context/auth-context"
import DeliveryMap from "@/components/delivery-map"

interface OrderPageProps {
  params: {
    id: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [tracking, setTracking] = useState<DeliveryTracking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/orders/" + params.id)
      return
    }

    const loadOrderData = async () => {
      try {
        setLoading(true)
        const orderData = await fetchOrder(params.id)

        if (orderData) {
          setOrder(orderData)

          // Only fetch tracking for orders that are not delivered or cancelled
          if (orderData.status !== "delivered" && orderData.status !== "cancelled") {
            const trackingData = await fetchDeliveryTracking(params.id)
            setTracking(trackingData || null)
          }
        }
      } catch (error) {
        console.error("Error loading order:", error)
      } finally {
        setLoading(false)
      }
    }

    loadOrderData()
  }, [params.id, router, user])

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Order not found</h1>
        <p className="mb-6">We couldn't find the order you're looking for.</p>
        <Button asChild>
          <Link href="/orders">View All Orders</Link>
        </Button>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case "preparing":
        return <Package className="h-5 w-5 text-purple-500" />
      case "out_for_delivery":
        return <Truck className="h-5 w-5 text-orange-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <Clock className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "confirmed":
        return "Confirmed"
      case "preparing":
        return "Preparing"
      case "out_for_delivery":
        return "Out for Delivery"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "preparing":
        return "bg-purple-100 text-purple-800"
      case "out_for_delivery":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Link href="/orders" className="flex items-center text-gray-500 hover:text-green-600 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Orders
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
            {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <Badge className={`mt-2 md:mt-0 ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          <span className="ml-1">{getStatusText(order.status)}</span>
        </Badge>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          {tracking && <TabsTrigger value="tracking">Delivery Tracking</TabsTrigger>}
        </TabsList>

        <TabsContent value="details">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex items-center">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image || `/placeholder.svg?height=64&width=64&text=${item.product.name}`}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <Link href={`/products/${item.product.id}`} className="font-medium hover:text-green-600">
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-500">
                            ₹{item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{order.deliveryAddress.name}</p>
                  <p>{order.deliveryAddress.line1}</p>
                  {order.deliveryAddress.line2 && <p>{order.deliveryAddress.line2}</p>}
                  <p>
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.postalCode}
                  </p>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Payment Method</span>
                      <span className="font-medium">
                        {order.paymentMethod === "card"
                          ? "Credit/Debit Card"
                          : order.paymentMethod === "upi"
                            ? "UPI"
                            : "Cash on Delivery"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Status</span>
                      <Badge
                        className={
                          order.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : order.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.paymentStatus === "failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                        }
                      >
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </Badge>
                    </div>
                    {order.paymentId && (
                      <div className="flex justify-between">
                        <span>Transaction ID</span>
                        <span className="font-medium">{order.paymentId}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>₹{order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>{order.deliveryFee > 0 ? `₹${order.deliveryFee.toFixed(2)}` : "Free"}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-₹{order.discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button className="w-full" variant="outline">
                      Download Invoice
                    </Button>
                    <Button className="w-full" variant="outline">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {tracking && (
          <TabsContent value="tracking">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* Map */}
                <Card className="mb-6">
                  <CardContent className="p-0">
                    <div className="h-[400px] w-full">
                      <DeliveryMap tracking={tracking} />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Partner */}
                {tracking.deliveryPartner && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Delivery Partner</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={
                              tracking.deliveryPartner.image ||
                              `/placeholder.svg?height=64&width=64&text=${tracking.deliveryPartner.name.charAt(0)}`
                            }
                            alt={tracking.deliveryPartner.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">{tracking.deliveryPartner.name}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-4 w-4 mr-1" />
                            {tracking.deliveryPartner.phone}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <Button>Call</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div>
                {/* Tracking Updates */}
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {tracking.updates.map((update, index) => (
                        <div key={index} className="relative pl-6">
                          {index !== tracking.updates.length - 1 && (
                            <div className="absolute left-[9px] top-[24px] bottom-0 w-[2px] bg-gray-200"></div>
                          )}
                          <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                          </div>
                          <div>
                            <h4 className="font-medium">{update.status}</h4>
                            <p className="text-sm text-gray-500">{new Date(update.timestamp).toLocaleString()}</p>
                            <p className="text-sm mt-1">{update.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <p className="text-sm text-gray-500">
                        Estimated delivery by{" "}
                        <span className="font-medium">{new Date(tracking.estimatedArrival).toLocaleString()}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
