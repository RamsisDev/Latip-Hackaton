"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { DashboardNav } from "@/components/dashboard-nav"
import { Search, Loader2, CheckCircle, AlertTriangle, FileText, Globe } from "lucide-react"

const LATAM_COUNTRIES = [
  { value: "global", label: "Global Latin America" },
  { value: "AR", label: "Argentina" },
  { value: "BO", label: "Bolivia" },
  { value: "BR", label: "Brazil" },
  { value: "CL", label: "Chile" },
  { value: "CO", label: "Colombia" },
  { value: "CR", label: "Costa Rica" },
  { value: "CU", label: "Cuba" },
  { value: "DO", label: "Dominican Republic" },
  { value: "EC", label: "Ecuador" },
  { value: "SV", label: "El Salvador" },
  { value: "GT", label: "Guatemala" },
  { value: "HN", label: "Honduras" },
  { value: "MX", label: "Mexico" },
  { value: "NI", label: "Nicaragua" },
  { value: "PA", label: "Panama" },
  { value: "PY", label: "Paraguay" },
  { value: "PE", label: "Peru" },
  { value: "UY", label: "Uruguay" },
  { value: "VE", label: "Venezuela" },
]

// Mock data for search results
const MOCK_PHONETIC_RESULTS = [
  {
    name: "TechFlow Solutions",
    country: "Brazil",
    status: "Active",
    registrationId: "BR-2023-001234",
    lastUpdate: "2023-08-15",
  },
  {
    name: "TekFlo Systems",
    country: "Mexico",
    status: "Pending",
    registrationId: "MX-2023-005678",
    lastUpdate: "2023-09-02",
  },
  {
    name: "TechFlex Corp",
    country: "Argentina",
    status: "Active",
    registrationId: "AR-2022-009876",
    lastUpdate: "2023-07-20",
  },
]

const MOCK_SEMANTIC_RESULTS = [
  {
    name: "FlowTech Industries",
    nameSimilarity: 82,
    descriptionSimilarity: 74,
    country: "Chile",
    status: "Active",
    registrationId: "CL-2023-002468",
  },
  {
    name: "Digital Flow Solutions",
    nameSimilarity: 68,
    descriptionSimilarity: 91,
    country: "Colombia",
    status: "Active",
    registrationId: "CO-2023-001357",
  },
  {
    name: "Tech Stream Pro",
    nameSimilarity: 45,
    descriptionSimilarity: 67,
    country: "Peru",
    status: "Expired",
    registrationId: "PE-2021-007890",
  },
]

interface SearchResults {
  hasMatches: boolean
  phoneticMatches: typeof MOCK_PHONETIC_RESULTS
  semanticMatches: typeof MOCK_SEMANTIC_RESULTS
  searchedCountry: string
  searchedName: string
}

export default function TrademarkSearchPage() {
  const [trademarkName, setTrademarkName] = useState("")
  const [country, setCountry] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResults | null>(null)
  const { user, updateTokens } = useAuth()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!trademarkName.trim() || !country) {
      return
    }

    if (!user || user.tokens <= 0) {
      alert("Insufficient tokens. Please purchase more tokens from your wallet.")
      return
    }

    setLoading(true)
    setResults(null)

    // Deduct 1 token
    updateTokens(user.tokens - 1)

    // Simulate API call with loading spinner
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Mock search logic - randomly determine if matches exist
    const hasMatches =  true
    //Math.random() > 0.5 // 70% chance of matches

    const searchResults: SearchResults = {
      hasMatches,
      phoneticMatches: hasMatches ? MOCK_PHONETIC_RESULTS : [],
      semanticMatches: hasMatches ? MOCK_SEMANTIC_RESULTS : [],
      searchedCountry: LATAM_COUNTRIES.find((c) => c.value === country)?.label || country,
      searchedName: trademarkName,
    }

    setResults(searchResults)
    setLoading(false)

    // API placeholder for future backend integration
    /*
    try {
      const response = await fetch('/api/trademark/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trademarkName,
          country,
          description
        })
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
    */
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/20">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/20">Pending</Badge>
      case "expired":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/20">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSimilarityBadge = (percentage: number) => {
    if (percentage >= 80) {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/20">{percentage}%</Badge>
    } else if (percentage >= 60) {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/20">{percentage}%</Badge>
    } else {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/20">{percentage}%</Badge>
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Navigation Sidebar */}
      <div className="lg:col-span-1">
        <DashboardNav showBackButton backHref="/dashboard" backLabel="Back to Dashboard" />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Trademark Search
          </h1>
          <p className="text-muted-foreground">
            Search for existing trademarks across Latin America to verify availability and avoid conflicts.
          </p>
        </div>

        {/* Search Form */}
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search Parameters
            </CardTitle>
            <CardDescription>Enter your trademark details to search across our comprehensive database.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Trademark Name */}
                <div className="space-y-2">
                  <label htmlFor="trademark-name" className="text-sm font-medium">
                    Trademark Name *
                  </label>
                  <Input
                    id="trademark-name"
                    type="text"
                    placeholder="Enter trademark name"
                    value={trademarkName}
                    onChange={(e) => setTrademarkName(e.target.value)}
                    className="bg-input border-border focus:border-primary transition-colors"
                    required
                  />
                </div>

                {/* Country Selection */}
                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium">
                    Country/Region *
                  </label>
                  <Select value={country} onValueChange={setCountry} required>
                    <SelectTrigger className="bg-input border-border focus:border-primary">
                      <SelectValue placeholder="Select country or region" />
                    </SelectTrigger>
                    <SelectContent>
                      {LATAM_COUNTRIES.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          <div className="flex items-center gap-2">
                            {country.value === "global" && <Globe className="h-4 w-4" />}
                            {country.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description (Optional)
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe your trademark, products, or services..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-input border-border focus:border-primary transition-colors min-h-[100px]"
                />
              </div>

              {/* Search Button */}
              <Button
                type="submit"
                disabled={loading || !trademarkName.trim() || !country}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-purple transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching Database...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search Trademark ({user?.tokens || 0} tokens available)
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="border-secondary/20 bg-secondary/5">
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-primary rounded-full animate-spin animation-delay-150" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Searching Database</h3>
                  <p className="text-muted-foreground">Analyzing trademark databases across Latin America...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {results && !loading && (
          <div className="space-y-6">
            {!results.hasMatches ? (
              /* No Matches Found */
              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-400 mb-2">Great News!</h3>
                  <p className="text-lg">
                    ✅ The trademark "{results.searchedName}" is not registered in {results.searchedCountry}.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    This trademark appears to be available for registration in the selected region.
                  </p>
                </CardContent>
              </Card>
            ) : (
              /* Matches Found */
              <div className="space-y-6">
                <Card className="border-yellow-500/20 bg-yellow-500/5">
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">Potential Conflicts Found</h3>
                    <p className="text-muted-foreground">
                      We found similar trademarks that may conflict with "{results.searchedName}". Review the results
                      below.
                    </p>
                  </CardContent>
                </Card>

                {/* Phonetic Similarity Table */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Phonetic Similarity Matches
                    </CardTitle>
                    <CardDescription>Trademarks that sound similar to your search term</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border/50">
                            <TableHead>Trademark Name</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Registration ID</TableHead>
                            <TableHead>Last Update</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {results.phoneticMatches.map((match, index) => (
                            <TableRow key={index} className="border-border/30 hover:bg-muted/50">
                              <TableCell className="font-medium">{match.name}</TableCell>
                              <TableCell>{match.country}</TableCell>
                              <TableCell>{getStatusBadge(match.status)}</TableCell>
                              <TableCell className="font-mono text-sm">{match.registrationId}</TableCell>
                              <TableCell>{match.lastUpdate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Semantic & Description Similarity Table */}
                <Card className="border-secondary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-secondary" />
                      Semantic & Description Similarity
                    </CardTitle>
                    <CardDescription>Trademarks with similar meaning or description content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border/50">
                            <TableHead>Trademark Name</TableHead>
                            <TableHead>Name Similarity</TableHead>
                            <TableHead>Description Similarity</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Registration ID</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {results.semanticMatches.map((match, index) => (
                            <TableRow key={index} className="border-border/30 hover:bg-muted/50">
                              <TableCell className="font-medium">{match.name}</TableCell>
                              <TableCell>{getSimilarityBadge(match.nameSimilarity)}</TableCell>
                              <TableCell>{getSimilarityBadge(match.descriptionSimilarity)}</TableCell>
                              <TableCell>{match.country}</TableCell>
                              <TableCell>{getStatusBadge(match.status)}</TableCell>
                              <TableCell className="font-mono text-sm">{match.registrationId}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Search Again */}
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Need Another Search?</h3>
                <p className="text-muted-foreground mb-4">
                  Each search costs 1 token. You have {user?.tokens || 0} tokens remaining.
                </p>
                <Button
                  onClick={() => {
                    setResults(null)
                    setTrademarkName("")
                    setCountry("")
                    setDescription("")
                  }}
                  variant="outline"
                  className="border-accent/20 hover:border-accent/40 hover:bg-accent/10"
                >
                  Start New Search
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
