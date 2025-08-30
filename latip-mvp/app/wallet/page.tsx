"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, Coins, Wallet, Zap, Shield, TrendingUp, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

const CRYPTO_CONNECTORS = [
  {
    id: "solana",
    name: "Solana",
    network: "Testnet",
    icon: "◎",
    color: "from-purple-500 to-pink-500",
    available: true,
    description: "Fast and low-cost transactions on Solana testnet",
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    network: "Testnet",
    icon: "₿",
    color: "from-orange-500 to-yellow-500",
    available: true,
    description: "Secure Bitcoin testnet transactions",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    network: "Mainnet",
    icon: "Ξ",
    color: "from-blue-500 to-cyan-500",
    available: false,
    description: "Coming soon - Ethereum mainnet integration",
  },
]

const TOKEN_PACKAGES = [
  {
    id: "starter",
    tokens: 10,
    price: "0.01",
    currency: "SOL",
    popular: false,
    description: "Perfect for trying out our services",
    features: ["10 trademark searches", "Basic support", "7-day validity"],
  },
  {
    id: "professional",
    tokens: 25,
    price: "0.02",
    currency: "SOL",
    popular: true,
    description: "Best value for regular users",
    features: ["25 trademark searches", "Priority support", "30-day validity", "Advanced analytics"],
  },
  {
    id: "enterprise",
    tokens: 50,
    price: "0.035",
    currency: "SOL",
    popular: false,
    description: "For businesses and agencies",
    features: ["50 trademark searches", "Premium support", "90-day validity", "API access", "Bulk operations"],
  },
]

export default function WalletPage() {
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null)
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null)
  const [recentPurchase, setRecentPurchase] = useState<{ tokens: number; connector: string } | null>(null)
  const { user, isAuthenticated, updateTokens, loading } = useAuth()
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

  const handlePurchase = async (packageId: string, tokens: number) => {
    if (!selectedConnector) {
      alert("Please select a payment method first")
      return
    }

    const connector = CRYPTO_CONNECTORS.find((c) => c.id === selectedConnector)
    if (!connector?.available) {
      alert("This payment method is not available yet")
      return
    }

    setPurchaseLoading(packageId)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Update token balance
    updateTokens(user.tokens + tokens)
    setRecentPurchase({ tokens, connector: connector.name })
    setPurchaseLoading(null)

    // Clear recent purchase notification after 5 seconds
    setTimeout(() => setRecentPurchase(null), 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Manage Tokens & Payments
              </h1>
              <p className="text-muted-foreground">Purchase tokens to access our intellectual property services</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Recent Purchase Notification */}
        {recentPurchase && (
          <Card className="border-green-500/20 bg-green-500/5 animate-in slide-in-from-top duration-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="font-medium text-green-400">Purchase Successful!</p>
                  <p className="text-sm text-muted-foreground">
                    Added {recentPurchase.tokens} tokens via {recentPurchase.connector}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Balance */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-pulse-glow">
                  <Coins className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Available Tokens</h2>
                  <p className="text-muted-foreground">Your current token balance</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">{user.tokens}</div>
                <p className="text-sm text-muted-foreground">tokens remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Select Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CRYPTO_CONNECTORS.map((connector) => (
              <Card
                key={connector.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedConnector === connector.id
                    ? "border-primary/40 bg-primary/10 glow-purple"
                    : "border-border/20 hover:border-primary/30"
                } ${!connector.available ? "opacity-60" : ""}`}
                onClick={() => connector.available && setSelectedConnector(connector.id)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${connector.color} flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold`}
                  >
                    {connector.icon}
                  </div>
                  <h4 className="font-semibold mb-1">{connector.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{connector.network}</p>
                  <p className="text-xs text-muted-foreground">{connector.description}</p>
                  {!connector.available && (
                    <Badge variant="outline" className="mt-2">
                      Coming Soon
                    </Badge>
                  )}
                  {selectedConnector === connector.id && (
                    <Badge className="mt-2 bg-primary/20 text-primary">Selected</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Token Packages */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Choose Token Package</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOKEN_PACKAGES.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative border-primary/20 hover:border-primary/40 transition-all duration-300 ${
                  pkg.popular ? "border-accent/40 bg-accent/5" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Coins className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{pkg.tokens} Tokens</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  <div className="text-2xl font-bold text-primary">
                    {pkg.price} {pkg.currency}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePurchase(pkg.id, pkg.tokens)}
                    disabled={!selectedConnector || purchaseLoading === pkg.id}
                    className={`w-full ${
                      pkg.popular
                        ? "bg-accent hover:bg-accent/90 text-accent-foreground glow"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    } transition-all duration-300`}
                  >
                    {purchaseLoading === pkg.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-4 w-4" />
                        Purchase {pkg.tokens} Tokens
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-secondary/20 bg-secondary/5">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Instant Transactions</h4>
              <p className="text-sm text-muted-foreground">Lightning-fast token purchases with blockchain technology</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Secure Payments</h4>
              <p className="text-sm text-muted-foreground">Your transactions are protected by advanced cryptography</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Best Value</h4>
              <p className="text-sm text-muted-foreground">Competitive pricing with no hidden fees or charges</p>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="border-muted/20">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-3">Need Help?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">How do tokens work?</p>
                <p>Each trademark search costs 1 token. Purchase tokens to access our services.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Refund Policy</p>
                <p>Unused tokens can be refunded within 30 days of purchase.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Token Expiry</p>
                <p>Tokens expire based on the package validity period shown above.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Support</p>
                <p>Contact our support team for any payment or token-related issues.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
