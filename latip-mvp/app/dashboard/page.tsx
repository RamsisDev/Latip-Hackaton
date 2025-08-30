"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ImageIcon, FileText, Copyright, Cog, ArrowRight, Zap, Clock, CheckCircle } from "lucide-react"

const SERVICES = [
  {
    id: "trademark",
    name: "Trademark Search",
    icon: Search,
    description: "Search and verify trademark availability across Latin America with AI-powered similarity detection.",
    features: ["Phonetic matching", "Semantic analysis", "Multi-country search", "Real-time results"],
    available: true,
    href: "/dashboard/trademark",
    color: "primary",
  },
  {
    id: "logo",
    name: "Logo Search",
    icon: ImageIcon,
    description: "AI-powered logo similarity detection and visual trademark analysis coming soon.",
    features: ["Visual similarity", "Color analysis", "Shape detection", "Brand protection"],
    available: false,
    href: "/dashboard/logo",
    color: "secondary",
  },
  {
    id: "patent",
    name: "Patent Search",
    icon: FileText,
    description: "Comprehensive patent database search and prior art analysis across LATAM.",
    features: ["Prior art search", "Patent classification", "Technical analysis", "Filing assistance"],
    available: false,
    href: "/dashboard/patent",
    color: "accent",
  },
  {
    id: "copyright",
    name: "Copyright Search",
    icon: Copyright,
    description: "Copyright registration verification and creative work protection services.",
    features: ["Work verification", "Registration status", "Infringement detection", "Legal support"],
    available: false,
    href: "/dashboard/copyright",
    color: "secondary",
  },
  {
    id: "industrial",
    name: "Industrial Models",
    icon: Cog,
    description: "Industrial design and model registration services for product innovations.",
    features: ["Design registration", "Model protection", "Innovation tracking", "Commercial rights"],
    available: false,
    href: "/dashboard/industrial",
    color: "accent",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Welcome to Your IP Dashboard
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Protect your intellectual property with our comprehensive suite of Web3-powered services. Choose a service
          below to get started.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">1</div>
            <div className="text-sm text-muted-foreground">Active Service</div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-secondary/5">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-secondary">0</div>
            <div className="text-sm text-muted-foreground">Searches Today</div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent">4</div>
            <div className="text-sm text-muted-foreground">Coming Soon</div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-center">Choose Your Service</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon
            const colorClasses = {
              primary: "border-primary/20 hover:border-primary/40 bg-primary/5 hover:bg-primary/10",
              secondary: "border-secondary/20 hover:border-secondary/40 bg-secondary/5 hover:bg-secondary/10",
              accent: "border-accent/20 hover:border-accent/40 bg-accent/5 hover:bg-accent/10",
            }

            return (
              <Card
                key={service.id}
                className={`${colorClasses[service.color as keyof typeof colorClasses]} transition-all duration-300 hover:shadow-lg ${
                  !service.available ? "opacity-75" : ""
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        service.color === "primary"
                          ? "bg-primary/20"
                          : service.color === "secondary"
                            ? "bg-secondary/20"
                            : "bg-accent/20"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          service.color === "primary"
                            ? "text-primary"
                            : service.color === "secondary"
                              ? "text-secondary"
                              : "text-accent"
                        }`}
                      />
                    </div>

                    {service.available ? (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/20">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-muted text-muted-foreground">
                        Coming Soon
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-current rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={service.href}>
                    <Button
                      className={`w-full group ${
                        service.available
                          ? service.color === "primary"
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : service.color === "secondary"
                              ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                              : "bg-accent hover:bg-accent/90 text-accent-foreground"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                      disabled={!service.available}
                    >
                      {service.available ? (
                        <>
                          Launch Service
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      ) : (
                        "Coming Soon"
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Help Section */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Need Help Getting Started?</h3>
          <p className="text-muted-foreground mb-4">
            Our AI-powered trademark search is ready to use. Other services are coming soon with advanced Web3 features.
          </p>
          <Link href="/dashboard/trademark">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-purple">
              Try Trademark Search
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
