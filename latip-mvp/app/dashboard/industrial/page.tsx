"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardNav } from "@/components/dashboard-nav"
import { Cog, Package, Wrench, Factory, Clock, ArrowRight, Sparkles } from "lucide-react"

const UPCOMING_FEATURES = [
  {
    icon: Package,
    title: "Design Registration",
    description: "Register and protect your industrial designs and product innovations",
  },
  {
    icon: Wrench,
    title: "Model Protection",
    description: "Comprehensive protection for utility models and functional designs",
  },
  {
    icon: Factory,
    title: "Manufacturing Rights",
    description: "Secure exclusive manufacturing and commercial exploitation rights",
  },
  {
    icon: Sparkles,
    title: "Innovation Tracking",
    description: "Monitor design trends and competitive landscape analysis",
  },
]

export default function IndustrialModelsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Navigation Sidebar */}
      <div className="lg:col-span-1">
        <DashboardNav showBackButton backHref="/dashboard" backLabel="Back to Dashboard" />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
            <Cog className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            Industrial Models
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industrial design and model registration services for product innovations and manufacturing
          </p>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Coming Soon
          </Badge>
        </div>

        {/* Coming Soon Card */}
        <Card className="border-accent/20 bg-gradient-to-r from-accent/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Protect Your Product Innovations</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our industrial design protection system will help manufacturers and designers secure exclusive rights to
              their product innovations. From aesthetic designs to functional utility models, we'll provide
              comprehensive protection across Latin American markets.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Factory className="h-4 w-4" />
              <span>Expected Launch: Q1 2025</span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Features */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Industrial IP Protection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UPCOMING_FEATURES.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-accent/20 hover:border-accent/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Industry Categories */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Industry Coverage</CardTitle>
            <CardDescription>We'll serve various manufacturing and design industries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Automotive", icon: "🚗" },
                { name: "Electronics", icon: "📱" },
                { name: "Furniture", icon: "🪑" },
                { name: "Textiles", icon: "🧵" },
                { name: "Packaging", icon: "📦" },
                { name: "Tools", icon: "🔧" },
                { name: "Appliances", icon: "🏠" },
                { name: "Medical Devices", icon: "🏥" },
                { name: "Toys", icon: "🧸" },
              ].map((industry, index) => (
                <div key={index} className="text-center p-3 border border-border/20 rounded-lg">
                  <div className="text-2xl mb-2">{industry.icon}</div>
                  <div className="text-sm font-medium">{industry.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-primary/20 bg-primary/5 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">15 Years</div>
              <div className="text-sm text-muted-foreground">Protection Period</div>
            </CardContent>
          </Card>
          <Card className="border-secondary/20 bg-secondary/5 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary">19</div>
              <div className="text-sm text-muted-foreground">LATAM Markets</div>
            </CardContent>
          </Card>
          <Card className="border-accent/20 bg-accent/5 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground">Digital Process</div>
            </CardContent>
          </Card>
        </div>

        {/* Notify Me */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Manufacturer Partnership</h3>
            <p className="text-muted-foreground mb-4">
              Partner with us to streamline your industrial design protection process
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowRight className="mr-2 h-4 w-4" />
              Become a Partner
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
