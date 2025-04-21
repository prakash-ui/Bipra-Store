"use client"

import { useEffect, useRef } from "react"
import type { DeliveryTracking } from "@/types"

interface DeliveryMapProps {
  tracking: DeliveryTracking
}

export default function DeliveryMap({ tracking }: DeliveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current || !tracking.currentLocation) return

    // In a real app, this would use Leaflet.js or Google Maps
    // For this demo, we'll create a simple mock map

    const canvas = document.createElement("canvas")
    canvas.width = mapRef.current.clientWidth
    canvas.height = mapRef.current.clientHeight
    mapRef.current.innerHTML = ""
    mapRef.current.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Load map image
    const mapImage = new Image()
    mapImage.crossOrigin = "anonymous"
    mapImage.src = "/placeholder.svg?height=400&width=800&text=Map"

    mapImage.onload = () => {
      // Draw map
      ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height)

      // Draw delivery location
      ctx.fillStyle = "#ef4444"
      ctx.beginPath()
      ctx.arc(canvas.width * 0.7, canvas.height * 0.4, 10, 0, 2 * Math.PI)
      ctx.fill()

      // Draw delivery partner location
      ctx.fillStyle = "#22c55e"
      ctx.beginPath()
      ctx.arc(canvas.width * 0.5, canvas.height * 0.6, 10, 0, 2 * Math.PI)
      ctx.fill()

      // Draw path
      ctx.strokeStyle = "#22c55e"
      ctx.lineWidth = 3
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.5, canvas.height * 0.6)
      ctx.lineTo(canvas.width * 0.7, canvas.height * 0.4)
      ctx.stroke()

      // Add labels
      ctx.font = "14px Arial"
      ctx.fillStyle = "#000"
      ctx.fillText("Delivery Location", canvas.width * 0.7 + 15, canvas.height * 0.4 + 5)
      ctx.fillText("Delivery Partner", canvas.width * 0.5 + 15, canvas.height * 0.6 + 5)
    }

    // Simulate movement
    let posX = canvas.width * 0.5
    const targetX = canvas.width * 0.7
    let posY = canvas.height * 0.6
    const targetY = canvas.height * 0.4

    const moveInterval = setInterval(() => {
      if (Math.abs(posX - targetX) < 1 && Math.abs(posY - targetY) < 1) {
        clearInterval(moveInterval)
        return
      }

      // Update position
      posX += (targetX - posX) * 0.01
      posY += (targetY - posY) * 0.01

      // Redraw
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height)

      // Draw delivery location
      ctx.fillStyle = "#ef4444"
      ctx.beginPath()
      ctx.arc(canvas.width * 0.7, canvas.height * 0.4, 10, 0, 2 * Math.PI)
      ctx.fill()

      // Draw delivery partner location
      ctx.fillStyle = "#22c55e"
      ctx.beginPath()
      ctx.arc(posX, posY, 10, 0, 2 * Math.PI)
      ctx.fill()

      // Draw path
      ctx.strokeStyle = "#22c55e"
      ctx.lineWidth = 3
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(posX, posY)
      ctx.lineTo(canvas.width * 0.7, canvas.height * 0.4)
      ctx.stroke()

      // Add labels
      ctx.font = "14px Arial"
      ctx.fillStyle = "#000"
      ctx.fillText("Delivery Location", canvas.width * 0.7 + 15, canvas.height * 0.4 + 5)
      ctx.fillText("Delivery Partner", posX + 15, posY + 5)
    }, 100)

    return () => clearInterval(moveInterval)
  }, [tracking])

  return (
    <div ref={mapRef} className="h-full w-full bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  )
}
