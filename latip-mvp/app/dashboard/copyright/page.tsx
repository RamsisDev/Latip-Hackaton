"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardNav } from "@/components/dashboard-nav"
import { Copyright, Shield, FileCheck, AlertTriangle, Clock, ArrowRight, Music } from "lucide-react"

const UPCOMING_FEATURES = [
  {
    icon: FileCheck,
    title: "Work Verification",
    description: "Verify copyright registration status and ownership of creative works",
  },
  {
    icon: Shield,
    title: "Infringement Detection",
    description: "Monitor and detect unauthorized use of your copyrighted content",
  },
  {
    icon: AlertTriangle,
    title: "DMCA Protection",
    description: "Automated DMCA takedown notices and legal protection services",
  },
  {
    icon: Music,
    title: "Multi-Media Support",
    description: "Support for text, images, music, video, and software copyright",
  },
]

export default function CopyrightSearchPage() {
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
            <Copyright className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Copyright Search
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive copyright verification and creative work protection services
          </p>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Coming Soon
          </Badge>
        </div>

        {/* Coming Soon Card */}
        <Card className="border-secondary/20 bg-gradient-to-r from-secondary/10 to-primary/10">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Protect Your Creative Works</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our copyright protection system will help creators verify registration status, monitor for infringement,
              and take action against unauthorized use. From literature and music to software and digital art, we'll
              protect your creative intellectual property.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Music className="h-4 w-4" />
              <span>Expected Launch: Q4 2024</span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Features */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Copyright Protection Tools</h3>
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

        {/* Content Types */}
        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle>Supported Content Types</CardTitle>
            <CardDescription>We'll protect various forms of creative intellectual property</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Literature", icon: "📚" },
                { name: "Music", icon: "🎵" },
                { name: "Visual Art", icon: "🎨" },
                { name: "Photography", icon: "📸" },
                { name: "Software", icon: "💻" },
                { name: "Video", icon: "🎬" },
                { name: "Architecture", icon: "🏗️" },
                { name: "Digital Media", icon: "📱" },
              ].map((type, index) => (
                <div key={index} className="text-center p-3 border border-border/20 rounded-lg">
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium">{type.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notify Me */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Creator Early Access</h3>
            <p className="text-muted-foreground mb-4">
              Join our creator community and get priority access to copyright protection tools
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowRight className="mr-2 h-4 w-4" />
              Join Creator Program
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
