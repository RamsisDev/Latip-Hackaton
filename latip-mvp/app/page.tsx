"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Shield,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight,
  Landmark as Trademark,
  ImageIcon,
  FileText,
  Cog,
  Copyright,
} from "lucide-react"

const LATAM_FLAGS = [
  "🇦🇷",
  "🇧🇴",
  "🇧🇷",
  "🇨🇱",
  "🇨🇴",
  "🇨🇷",
  "🇨🇺",
  "🇩🇴",
  "🇪🇨",
  "🇸🇻",
  "🇬🇹",
  "🇭🇳",
  "🇲🇽",
  "🇳🇮",
  "🇵🇦",
  "🇵🇾",
  "🇵🇪",
  "🇺🇾",
  "🇻🇪",
]

const SERVICES = [
  {
    id: "trademark",
    name: "Trademark Search",
    icon: Trademark,
    description: "Search and verify trademark availability across Latin America",
    available: true,
    href: "/dashboard/trademark",
  },
  {
    id: "logo",
    name: "Logo Search",
    icon: ImageIcon,
    description: "AI-powered logo similarity detection and analysis",
    available: false,
    href: "/dashboard/logo",
  },
  {
    id: "patent",
    name: "Patent Search",
    icon: FileText,
    description: "Comprehensive patent database search and analysis",
    available: false,
    href: "/dashboard/patent",
  },
  {
    id: "copyright",
    name: "Copyright Search",
    icon: Copyright,
    description: "Copyright registration verification and protection",
    available: false,
    href: "/dashboard/copyright",
  },
  {
    id: "industrial",
    name: "Industrial Models",
    icon: Cog,
    description: "Industrial design and model registration services",
    available: false,
    href: "/dashboard/industrial",
  },
]

const STATS = [
  { number: "90,000+", label: "Trademarks Stored", icon: Shield },
  { number: "5,000+", label: "Searches Done", icon: Search },
  { number: "10x", label: "Faster Than Traditional", icon: Zap },
]

export default function LandingPage() {
  const [currentService, setCurrentService] = useState(0)
  const [flagsAnimation, setFlagsAnimation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlagsAnimation((prev) => (prev + 1) % 100)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % SERVICES.length)
  }

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + SERVICES.length) % SERVICES.length)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated flags background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-4 p-8 animate-pulse">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="text-4xl transform transition-transform duration-1000"
                style={{
                  transform: `rotate(${(flagsAnimation + i * 5) % 360}deg) scale(${0.8 + Math.sin(flagsAnimation + i) * 0.2})`,
                }}
              >
                {LATAM_FLAGS[i % LATAM_FLAGS.length]}
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/80 to-accent/20" />

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6 animate-pulse-glow">
              <span className="text-3xl font-bold text-primary">L</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent animate-pulse">
            LATIP
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4">Latin America Intellectual Property</p>

          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Protect your innovations with blockchain-powered IP services across Latin America. Fast, secure, and
            transparent intellectual property management.
          </p>

          <Link href="/login">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-4 glow transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Choose Latip?
            </h2>
            <p className="text-xl text-muted-foreground">
              Revolutionary Web3 technology meets traditional IP protection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Global Coverage</h3>
                <p className="text-muted-foreground">
                  Comprehensive IP protection across all Latin American countries with unified search capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-card/50 backdrop-blur-sm hover:border-secondary/40 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/30 transition-colors">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  AI-powered search algorithms deliver results 10x faster than traditional IP search methods.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-card/50 backdrop-blur-sm hover:border-accent/40 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Blockchain Security</h3>
                <p className="text-muted-foreground">
                  Immutable records and transparent processes powered by blockchain technology for ultimate security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        {/* Blockchain mesh background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-1 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="border border-primary/20 aspect-square"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animation: "pulse 3s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Trusted by Innovators
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of creators protecting their intellectual property
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STATS.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="border-primary/20 bg-card/80 backdrop-blur-sm text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground">Comprehensive intellectual property protection suite</p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevService}
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/10 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex gap-2">
                {SERVICES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentService(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentService ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextService}
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/10 bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {SERVICES.slice(currentService, currentService + 3).map((service, index) => {
                const Icon = service.icon
                return (
                  <Card
                    key={service.id}
                    className={`border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 ${
                      !service.available ? "opacity-60" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {service.available ? (
                          <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-muted text-muted-foreground">
                            Coming Soon
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{service.description}</p>

                      <Link href={service.href}>
                        <Button
                          variant={service.available ? "default" : "outline"}
                          className={`w-full ${
                            service.available
                              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                              : "border-muted text-muted-foreground cursor-not-allowed"
                          }`}
                          disabled={!service.available}
                        >
                          {service.available ? "Try Now" : "Coming Soon"}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-4 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full mb-2">
              <span className="text-lg font-bold text-primary">L</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Latip</h3>
            <p className="text-muted-foreground text-sm">
              Protecting innovation across Latin America with Web3 technology
            </p>
          </div>

          <div className="text-xs text-muted-foreground">
            © 2024 Latip. All rights reserved. Built with blockchain technology.
          </div>
        </div>
      </footer>

    </div>
  )
}
