"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardNav } from "@/components/dashboard-nav"
import { FileText, Search, BookOpen, Scale, Clock, ArrowRight, Lightbulb } from "lucide-react"

const UPCOMING_FEATURES = [
  {
    icon: Search,
    title: "Prior Art Search",
    description: "Comprehensive search through patent databases to identify existing prior art",
  },
  {
    icon: BookOpen,
    title: "Patent Classification",
    description: "Automatic classification using international patent classification systems",
  },
  {
    icon: Scale,
    title: "Legal Analysis",
    description: "AI-powered analysis of patent claims and potential infringement risks",
  },
  {
    icon: Lightbulb,
    title: "Innovation Tracking",
    description: "Monitor patent landscapes and emerging technologies in your field",
  },
]

export default function PatentSearchPage() {
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
            <FileText className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Patent Search
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced patent database search and prior art analysis for comprehensive IP protection
          </p>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Coming Soon
          </Badge>
        </div>

        {/* Coming Soon Card */}
        <Card className="border-accent/20 bg-gradient-to-r from-accent/10 to-primary/10">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Next-Generation Patent Intelligence</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our patent search system will provide comprehensive analysis of patent databases across Latin America and
              globally. Using advanced AI, we'll help you identify prior art, analyze patent landscapes, and protect
              your innovations effectively.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lightbulb className="h-4 w-4" />
              <span>Expected Launch: Q3 2024</span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Features */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Advanced Patent Tools</h3>
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

        {/* Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-primary/20 bg-primary/5 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">2M+</div>
              <div className="text-sm text-muted-foreground">Patents Indexed</div>
            </CardContent>
          </Card>
          <Card className="border-secondary/20 bg-secondary/5 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary">19</div>
              <div className="text-sm text-muted-foreground">LATAM Countries</div>
            </CardContent>
          </Card>
          <Card className="border-accent/20 bg-accent/5 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent">50+</div>
              <div className="text-sm text-muted-foreground">Tech Categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Notify Me */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Early Access Program</h3>
            <p className="text-muted-foreground mb-4">
              Join our beta program and get exclusive access to patent search tools
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowRight className="mr-2 h-4 w-4" />
              Request Beta Access
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
