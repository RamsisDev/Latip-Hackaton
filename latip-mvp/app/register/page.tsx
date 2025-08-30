"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Wallet, Mail, Lock, User, Loader2 } from "lucide-react"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [walletLoading, setWalletLoading] = useState(false)
  const { register, connectWallet } = useAuth()
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(username, password, email)
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleWalletConnect = async () => {
    setWalletLoading(true)
    try {
      // Mock wallet address for demo
      const mockWalletAddress = "0x" + Math.random().toString(16).substr(2, 40)
      await connectWallet(mockWalletAddress)
      router.push("/dashboard")
    } catch (error) {
      console.error("Wallet connection failed:", error)
    } finally {
      setWalletLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/10" />

      <Card className="w-full max-w-md relative z-10 border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-accent">L</span>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Join Latip
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your account to start protecting your intellectual property
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            onClick={handleWalletConnect}
            disabled={walletLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-purple transition-all duration-300"
          >
            {walletLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wallet className="mr-2 h-4 w-4" />}
            Connect Wallet
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or register with</span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-input border-border focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-input border-border focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-input border-border focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground glow transition-all duration-300"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
            </Button>
          </form>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 transition-colors">
                Sign In
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
