"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types"
import { useToast } from "@/components/ui/use-toast"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("bipra_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("bipra_user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login with mock data
      if (email && password) {
        // Mock user data
        const mockUser: User = {
          id: "1",
          name: "John Doe",
          email: email,
          phone: "+1234567890",
          addresses: [
            {
              id: "1",
              name: "Home",
              line1: "123 Main St",
              line2: "Apt 4B",
              city: "New York",
              state: "NY",
              postalCode: "10001",
              isDefault: true,
            },
          ],
          loyaltyPoints: 150,
        }

        setUser(mockUser)
        localStorage.setItem("bipra_user", JSON.stringify(mockUser))

        toast({
          title: "Login successful",
          description: `Welcome back, ${mockUser.name}!`,
        })

        return true
      }

      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      })

      return false
    } catch (error) {
      console.error("Login error:", error)

      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      })

      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration
      if (name && email && password) {
        // Mock user data
        const mockUser: User = {
          id: "1",
          name: name,
          email: email,
          addresses: [],
          loyaltyPoints: 0,
        }

        setUser(mockUser)
        localStorage.setItem("bipra_user", JSON.stringify(mockUser))

        toast({
          title: "Registration successful",
          description: `Welcome to Bipra, ${name}!`,
        })

        return true
      }

      toast({
        title: "Registration failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      })

      return false
    } catch (error) {
      console.error("Registration error:", error)

      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive",
      })

      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("bipra_user")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
