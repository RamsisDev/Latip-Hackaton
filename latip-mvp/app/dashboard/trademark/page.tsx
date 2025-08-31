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

import registros from "./registros.json"


type Registro = {
  nombre: string
  paisProcedencia: string // código: "EC", "AR", etc.
  fechaRegistro: string
  numeroExpediente: string
  titular: string
  apoderado: string
  seccionTipo: string
  seccionTexto: string
}
type RegistrosByCountry = Record<string, Registro[]>
const DATA = registros as RegistrosByCountry

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
  { value: "NA", label: "Not Especified" },
] as const

const COUNTRY_LABEL_BY_CODE: Record<string, string> =
  Object.fromEntries(LATAM_COUNTRIES.map(c => [c.value, c.label]))

// normaliza texto (lowercase, sin tildes, colapsa espacios)
function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

// bigramas para Dice
function bigrams(s: string): string[] {
  const n = s.length
  if (n < 2) return [s]
  const grams: string[] = []
  for (let i = 0; i < n - 1; i++) grams.push(s.slice(i, i + 2))
  return grams
}

// Similaridad Sørensen–Dice con bigramas (0..1)
function diceSimilarity(a: string, b: string): number {
  const A = bigrams(normalizeText(a))
  const B = bigrams(normalizeText(b))
  if (A.length === 0 || B.length === 0) return 0
  const freq = new Map<string, number>()
  for (const g of A) freq.set(g, (freq.get(g) ?? 0) + 1)
  let overlap = 0
  for (const g of B) {
    const c = freq.get(g)
    if (c && c > 0) {
      overlap++
      freq.set(g, c - 1)
    }
  }
  return (2 * overlap) / (A.length + B.length)
}

function toPercent(x: number) {
  return Math.round(x * 100)
}

// ---------------------- UI helpers ----------------------
function getStatusBadge(status: string) {
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

function getSimilarityBadge(percentage: number) {
  if (percentage >= 80) {
    return <Badge className="bg-red-500/20 text-red-400 border-red-500/20">{percentage}%</Badge>
  } else if (percentage >= 60) {
    return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/20">{percentage}%</Badge>
  } else {
    return <Badge className="bg-green-500/20 text-green-400 border-green-500/20">{percentage}%</Badge>
  }
}

// ---------------------- Tipos de resultados ----------------------
const MOCK_PHONETIC_RESULTS: Array<{
  name: string
  country: string
  status: string
  registrationId: string
  lastUpdate: string
}> = []

const MOCK_SEMANTIC_RESULTS: Array<{
  name: string
  nameSimilarity: number
  descriptionSimilarity: number
  country: string
  status: string
  registrationId: string
}> = []

interface SearchResults {
  hasMatches: boolean
  phoneticMatches: typeof MOCK_PHONETIC_RESULTS
  semanticMatches: typeof MOCK_SEMANTIC_RESULTS
  searchedCountry: string
  searchedName: string
}

// ---------------------- Búsqueda principal ----------------------
function searchSemanticByName(term: string, countryCode: string): typeof MOCK_SEMANTIC_RESULTS {
  const THRESHOLD = 0.3 // 30%
  const pool: Registro[] =
    !countryCode || countryCode === "global"
      ? Object.values(DATA).flat()
      : (DATA[countryCode] ?? [])

  const matches = pool
    .map(reg => ({
      reg,
      score: diceSimilarity(term, reg.nombre),
    }))
    .filter(x => x.score >= THRESHOLD)
    .sort((a, b) => b.score - a.score)

  const mapped = matches.map(({ reg, score }) => ({
    name: reg.nombre,
    nameSimilarity: toPercent(score),
    descriptionSimilarity: 0, // no tenemos descripción; dejamos 0
    country: COUNTRY_LABEL_BY_CODE[reg.paisProcedencia] ?? reg.paisProcedencia,
    status: "N/A",
    registrationId: reg.numeroExpediente,
  }))

  return mapped as typeof MOCK_SEMANTIC_RESULTS
}

// ---------------------- Componente ----------------------
export default function TrademarkSearchPage() {
  const [trademarkName, setTrademarkName] = useState("")
  const [country, setCountry] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResults | null>(null)
  const { user, updateTokens } = useAuth()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trademarkName.trim() || !country) return

    // if (!user || user.tokens <= 0) {
    //   alert("Insufficient tokens. Please purchase more tokens from your wallet.")
    //   return
    // }

    setLoading(true)
    setResults(null)

    // ⚠️ Esto solo descuenta en el cliente (no es seguro)
    //updateTokens(user.tokens - 1)

    // Simula latencia
    await new Promise((r) => setTimeout(r, 800))

    const semanticMatches = searchSemanticByName(trademarkName, country)
    const hasMatches = semanticMatches.length > 0

    const searchResults: SearchResults = {
      hasMatches,
      phoneticMatches: [], // si quieres, puedes replicar los mismos que semanticMatches
      semanticMatches,
      searchedCountry: COUNTRY_LABEL_BY_CODE[country] ?? country,
      searchedName: trademarkName,
    }

    setResults(searchResults)
    setLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <DashboardNav showBackButton backHref="/dashboard" backLabel="Back to Dashboard" />
      </div>

      {/* Main */}
      <div className="lg:col-span-3 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Trademark Search
          </h1>
          <p className="text-muted-foreground">
            Search for existing trademarks across Latin America to verify availability and avoid conflicts.
          </p>
        </div>

        {/* Form */}
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search Parameters
            </CardTitle>
            <CardDescription>Enter your trademark details to search across our database.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium">
                    Country/Region *
                  </label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="bg-input border-border focus:border-primary">
                      <SelectValue placeholder="Select country or region" />
                    </SelectTrigger>
                    <SelectContent>
                      {LATAM_COUNTRIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          <div className="flex items-center gap-2">
                            {c.value === "global" && <Globe className="h-4 w-4" />}
                            {c.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

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

        {/* Loading */}
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

                {/* Renombrado: ahora son resultados SEMÁNTICOS */}
                <Card className="border-secondary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-secondary" />
                      Semantic Similarity Matches
                    </CardTitle>
                    <CardDescription>Trademarks similar to your search term (by name)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border/50">
                            <TableHead>Trademark Name</TableHead>
                            <TableHead>Name Similarity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Registration ID</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {results.semanticMatches.map((match, index) => (
                            <TableRow key={index} className="border-border/30 hover:bg-muted/50">
                              <TableCell className="font-medium">{match.name}</TableCell>
                              <TableCell>{getSimilarityBadge(match.nameSimilarity)}</TableCell>
                              <TableCell>{getStatusBadge(match.status)}</TableCell>
                              <TableCell>{match.country}</TableCell>
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