"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Wallet, LogOut, Coins, User } from "lucide-react"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="border-b border-border/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-primary">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Latip Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">Intellectual Property Platform</p>
              </div>
            </Link>

            {/* User Info and Actions */}
            <div className="flex items-center gap-4">
              {/* Token Balance */}
              <Card className="px-4 py-2 bg-secondary/10 border-secondary/20">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">Available Tokens:</span>
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                    {user.tokens}
                  </Badge>
                </div>
              </Card>

              {/* Wallet Button */}
              <Link href="/wallet">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/20 hover:border-primary/40 hover:bg-primary/10 glow-purple transition-all duration-300 bg-transparent"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallet
                </Button>
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-accent" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">{user.username}</div>
                    <div className="text-xs text-muted-foreground">{user.email || "Wallet User"}</div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Frame Container */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="border border-primary/20 rounded-lg bg-card/30 backdrop-blur-sm p-6 glow-purple">
          {children}
        </div>
      </main>
    </div>
  )
}
