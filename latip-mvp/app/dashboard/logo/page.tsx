"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardNav } from "@/components/dashboard-nav"
import { ImageIcon, Sparkles, Eye, Palette, Zap, Clock, ArrowRight } from "lucide-react"

const UPCOMING_FEATURES = [
  {
    icon: Eye,
    title: "Visual Similarity Detection",
    description: "AI-powered analysis to detect visually similar logos and designs",
  },
  {
    icon: Palette,
    title: "Color Pattern Analysis",
    description: "Advanced color scheme comparison and trademark conflict detection",
  },
  {
    icon: Sparkles,
    title: "Shape Recognition",
    description: "Geometric pattern matching for comprehensive logo protection",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Lightning-fast logo analysis powered by machine learning",
  },
]

export default function LogoSearchPage() {
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
          <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
            <ImageIcon className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Logo Search
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered visual trademark analysis and logo similarity detection across Latin America
          </p>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Coming Soon
          </Badge>
        </div>

        {/* Coming Soon Card */}
        <Card className="border-secondary/20 bg-gradient-to-r from-secondary/10 to-accent/10">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Revolutionary Visual IP Protection</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We're developing cutting-edge AI technology to analyze visual trademarks, logos, and designs. Our system
              will detect similarities in shape, color, composition, and style to provide comprehensive intellectual
              property protection.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Expected Launch: Q2 2024</span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Features */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">What's Coming</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UPCOMING_FEATURES.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-secondary/20 hover:border-secondary/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-secondary" />
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

        {/* Notify Me */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Get Notified</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to know when Logo Search launches with exclusive early access
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowRight className="mr-2 h-4 w-4" />
              Join Waitlist
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
