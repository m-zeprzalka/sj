# 🌍 PROMPT DO GENERACJI: SCENARIUSZE JUTRA

## 📋 KONTEKST PROJEKTU

**Nazwa:** Scenariusze Jutra (MSZ - Ministerstwo Spraw Zagranicznych)  
**Cel:** Przewidywanie przyszłości geopolitycznej z wykorzystaniem AI  
**Hackathon:** GovTech Challenge 2025  
**Nagroda:** 482,000 PLN

## 🎯 WIZJA PRODUKTU

### Tagline

"Świat zmienia się szybciej, niż potrafimy go analizować. Dzięki nowoczesnym technologiom możemy nie tylko obserwować rzeczywistość, ale też przewidywać jej przyszłe scenariusze."

### Core Concept

**Interactive Future Globe** - Interaktywna mapa/glob 3D gdzie użytkownik klika w kraj, a AI generuje 3 scenariusze geopolityczne (pozytywny, neutralny, negatywny) na podstawie aktualnych newsów.

## 🏗️ ARCHITEKTURA TECHNICZNA

### Stack (już zainstalowany w boilerplate)

```json
{
  "framework": "Next.js 15 (App Router)",
  "styling": "Tailwind CSS v4 + Shadcn/UI",
  "animations": "Framer Motion",
  "typescript": true,
  "theme": "Light mode default (next-themes)"
}
```

### Nowe zależności do instalacji

```bash
# Wizualizacja mapy - WYBIERZ PROSTSZE ROZWIĄZANIE
npm install react-simple-maps d3-geo d3-geo-projection
# LUB jeśli chcesz 3D glob (bardziej zaawansowane):
# npm install react-globe.gl three

# API i data fetching
npm install swr
npm install date-fns

# Opcjonalnie - news API
npm install newsapi
```

## 🎨 STRUKTURA APLIKACJI

### Landing Page (/) - już istnieje, zaktualizuj content

```typescript
// lib/content.ts - ZAMIEŃ PLACEHOLDERY
export const CONTENT = {
  project: {
    name: "Scenariusze Jutra",
    tagline: "Przewidywanie przyszłości geopolitycznej",
  },
  hero: {
    title: "Przewiduj przyszłość świata",
    subtitle: "Analiza geopolityczna napędzana AI i aktualnymi newsami",
    description:
      "Kliknij w dowolny kraj na mapie, aby zobaczyć 3 scenariusze przyszłości",
  },
  problems: [
    {
      title: "Chaos informacyjny",
      description:
        "Tysiące newsów dziennie - niemożliwe do przeanalizowania ręcznie",
    },
    {
      title: "Brak przewidywalności",
      description:
        "Trudno ocenić jak sytuacja w kraju rozwinie się w przyszłości",
    },
    {
      title: "Fragmentaryczna wiedza",
      description: "Brak holistycznego spojrzenia na sytuację geopolityczną",
    },
  ],
  features: [
    {
      title: "Interaktywna Mapa Świata",
      description: "Kliknij w dowolny kraj aby rozpocząć analizę",
      span: "col-span-2",
    },
    {
      title: "AI-Powered Scenariusze",
      description: "3 scenariusze: pozytywny, neutralny, negatywny",
    },
    {
      title: "Real-time News Analysis",
      description: "Analiza aktualnych newsów z ostatnich 7 dni",
    },
    {
      title: "Kontekst Geopolityczny",
      description: "Szczegółowe wyjaśnienie przyczyn i trendów",
    },
  ],
  metrics: [
    { value: "195", label: "Krajów w bazie", trend: "Pełne pokrycie" },
    { value: "3", label: "Scenariusze na kraj", trend: "Multi-perspektywa" },
    { value: "<30s", label: "Czas analizy", trend: "Błyskawiczne wyniki" },
  ],
  tech: [
    { name: "Next.js 15", category: "Framework" },
    { name: "OpenAI GPT-4", category: "AI Analysis" },
    { name: "React Simple Maps", category: "Visualization" },
    { name: "News API", category: "Data Source" },
    { name: "Framer Motion", category: "Animation" },
  ],
}
```

### Dashboard (/dashboard) - GŁÓWNA APLIKACJA

#### 1. Nowy layout z mapą zamiast sidebara

```typescript
// app/(app)/dashboard/layout.tsx
// USUŃ AppSidebar, zostaw tylko AppHeader
// Aplikacja działa na full-screen mapie
```

#### 2. Główny komponent - Interactive Map

```typescript
// components/map/world-map.tsx
"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { useState } from "react"
import { motion } from "framer-motion"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface WorldMapProps {
  onCountryClick: (countryCode: string, countryName: string) => void
  selectedCountry?: string
}

export function WorldMap({ onCountryClick, selectedCountry }: WorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  return (
    <div className="w-full h-full bg-gradient-to-b from-primary/5 to-background">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 147 }}
        className="w-full h-full"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isSelected = selectedCountry === geo.id
              const isHovered = hoveredCountry === geo.id

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredCountry(geo.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => onCountryClick(geo.id, geo.properties.name)}
                  style={{
                    default: {
                      fill: isSelected
                        ? "oklch(42% 0.19 264)"
                        : "oklch(94% 0.02 264)",
                      stroke: "oklch(90% 0.02 264)",
                      strokeWidth: 0.5,
                      outline: "none",
                      transition: "all 0.2s",
                    },
                    hover: {
                      fill: "oklch(72% 0.15 264)",
                      stroke: "oklch(42% 0.19 264)",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "oklch(42% 0.19 264)",
                      outline: "none",
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredCountry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-card border rounded-lg shadow-lg"
        >
          <p className="text-sm font-medium">
            Kliknij aby wygenerować scenariusze
          </p>
        </motion.div>
      )}
    </div>
  )
}
```

#### 3. Panel z scenariuszami

```typescript
// components/scenarios/scenario-panel.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Minus, TrendingDown, Loader2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Scenario {
  type: "positive" | "neutral" | "negative"
  title: string
  description: string
  probability: string
  timeframe: string
  keyFactors: string[]
}

interface ScenarioPanelProps {
  country: string
  scenarios: Scenario[] | null
  context: {
    currentSituation: string
    geopoliticalFactors: string[]
    recentNews: string[]
  } | null
  loading: boolean
  onClose: () => void
}

const scenarioConfig = {
  positive: {
    icon: TrendingUp,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
  },
  neutral: {
    icon: Minus,
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
  negative: {
    icon: TrendingDown,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
  },
}

export function ScenarioPanel({
  country,
  scenarios,
  context,
  loading,
  onClose,
}: ScenarioPanelProps) {
  if (!country) return null

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed right-0 top-0 h-screen w-full lg:w-[600px] bg-background border-l shadow-2xl z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{country}</h2>
          <p className="text-sm text-muted-foreground">
            Scenariusze przyszłości
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">
              Analizuję sytuację geopolityczną...
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Przetwarzam aktualne newsy i dane
            </p>
          </div>
        )}

        {/* Content */}
        {!loading && scenarios && context && (
          <Tabs defaultValue="scenarios" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scenarios">Scenariusze</TabsTrigger>
              <TabsTrigger value="context">Kontekst</TabsTrigger>
            </TabsList>

            <TabsContent value="scenarios" className="space-y-4 mt-6">
              {scenarios.map((scenario, index) => {
                const config = scenarioConfig[scenario.type]
                const Icon = config.icon

                return (
                  <motion.div
                    key={scenario.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`${config.borderColor} ${config.bgColor}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg bg-background ${config.color}`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {scenario.title}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {scenario.probability}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {scenario.timeframe}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm leading-relaxed">
                          {scenario.description}
                        </p>

                        <div>
                          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                            Kluczowe czynniki
                          </h4>
                          <ul className="space-y-1">
                            {scenario.keyFactors.map((factor, idx) => (
                              <li
                                key={idx}
                                className="text-sm flex items-start gap-2"
                              >
                                <span className="text-primary mt-1">•</span>
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </TabsContent>

            <TabsContent value="context" className="space-y-6 mt-6">
              {/* Current Situation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Aktualna sytuacja</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {context.currentSituation}
                  </p>
                </CardContent>
              </Card>

              {/* Geopolitical Factors */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Czynniki geopolityczne
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {context.geopoliticalFactors.map((factor, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <Badge variant="secondary" className="mt-0.5">
                          {idx + 1}
                        </Badge>
                        <span className="text-muted-foreground">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recent News */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Ostatnie wiadomości
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {context.recentNews.map((news, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3"
                      >
                        {news}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </motion.div>
  )
}
```

#### 4. Główna strona dashboard

```typescript
// app/(app)/dashboard/page.tsx
"use client"

import { useState } from "react"
import { WorldMap } from "@/components/map/world-map"
import { ScenarioPanel } from "@/components/scenarios/scenario-panel"
import { AppHeader } from "@/components/layout/app-header"
import { AnimatePresence } from "framer-motion"

export default function DashboardPage() {
  const [selectedCountry, setSelectedCountry] = useState<{
    code: string
    name: string
  } | null>(null)
  const [scenarios, setScenarios] = useState(null)
  const [context, setContext] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCountryClick = async (code: string, name: string) => {
    setSelectedCountry({ code, name })
    setLoading(true)
    setScenarios(null)
    setContext(null)

    try {
      // Wywołaj API
      const response = await fetch("/api/scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: name }),
      })

      const data = await response.json()
      setScenarios(data.scenarios)
      setContext(data.context)
    } catch (error) {
      console.error("Error fetching scenarios:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSelectedCountry(null)
    setScenarios(null)
    setContext(null)
  }

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Mapa Scenariuszy" />

      <div className="flex-1 relative">
        <WorldMap
          onCountryClick={handleCountryClick}
          selectedCountry={selectedCountry?.code}
        />

        <AnimatePresence>
          {selectedCountry && (
            <ScenarioPanel
              country={selectedCountry.name}
              scenarios={scenarios}
              context={context}
              loading={loading}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

## 🤖 API IMPLEMENTATION

### 1. Server Action dla scenariuszy

```typescript
// app/api/scenarios/route.ts
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { country } = await req.json()

    if (!country) {
      return NextResponse.json(
        { error: "Country name is required" },
        { status: 400 }
      )
    }

    // 1. Pobierz newsy (mockup - zastąp prawdziwym API)
    const recentNews = await fetchRecentNews(country)

    // 2. Wygeneruj scenariusze przez OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `Jesteś ekspertem ds. geopolityki i analiz strategicznych. 
Twoim zadaniem jest analiza sytuacji w danym kraju na podstawie aktualnych newsów 
i wygenerowanie 3 scenariuszy przyszłości (pozytywny, neutralny, negatywny).

Zwróć odpowiedź w formacie JSON z następującą strukturą:
{
  "scenarios": [
    {
      "type": "positive",
      "title": "Krótki tytuł",
      "description": "2-3 zdania opisu",
      "probability": "Prawdopodobieństwo %",
      "timeframe": "Perspektywa czasowa",
      "keyFactors": ["Czynnik 1", "Czynnik 2", "Czynnik 3"]
    },
    // ... neutral i negative
  ],
  "context": {
    "currentSituation": "Opis obecnej sytuacji 3-4 zdania",
    "geopoliticalFactors": ["Czynnik 1", "Czynnik 2", "Czynnik 3"],
    "recentNews": ["News 1", "News 2", "News 3"]
  }
}`,
        },
        {
          role: "user",
          content: `Przeanalizuj sytuację w kraju: ${country}

Aktualne newsy z ostatnich 7 dni:
${recentNews.map((n, i) => `${i + 1}. ${n}`).join("\n")}

Wygeneruj 3 scenariusze przyszłości (6-12 miesięcy) wraz z kontekstem geopolitycznym.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    })

    const result = JSON.parse(completion.choices[0].message.content || "{}")

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error generating scenarios:", error)
    return NextResponse.json(
      { error: "Failed to generate scenarios" },
      { status: 500 }
    )
  }
}

// Helper function - mockup newsów
async function fetchRecentNews(country: string): Promise<string[]> {
  // TODO: Zintegruj z News API lub innym źródłem
  // https://newsapi.org/docs/endpoints/everything

  // Mockup dla demo:
  return [
    `${country}: Nowy rozwój w polityce zagranicznej`,
    `${country}: Zmiany w gospodarce i handlu międzynarodowym`,
    `${country}: Aktualna sytuacja społeczno-polityczna`,
    `${country}: Najnowsze decyzje rządowe`,
    `${country}: Relacje z sąsiednimi krajami`,
  ]
}
```

### 2. Environment variables

```bash
# .env.local (CREATE THIS FILE)
OPENAI_API_KEY=sk-...your-key...

# Optional - jeśli używasz News API
NEWS_API_KEY=your-news-api-key
```

## 📦 INSTRUKCJE IMPLEMENTACJI

### Krok 1: Instalacja zależności

```bash
cd C:\app\BOILERPLATES\scenariusze-jutra
npm install react-simple-maps d3-geo d3-geo-projection swr date-fns
```

### Krok 2: Aktualizacja content.ts

- Zamień wszystkie `[PLACEHOLDER]` na treści podane w sekcji "STRUKTURA APLIKACJI"

### Krok 3: Utwórz komponenty

```
components/
├── map/
│   └── world-map.tsx          # Interaktywna mapa
├── scenarios/
│   └── scenario-panel.tsx     # Panel z scenariuszami
```

### Krok 4: Zmodyfikuj dashboard

```
app/(app)/
├── dashboard/
│   ├── layout.tsx    # USUŃ sidebar, zostaw header
│   └── page.tsx      # Pełnoekranowa mapa + panel
```

### Krok 5: API Routes

```
app/api/
└── scenarios/
    └── route.ts      # POST endpoint dla generacji
```

### Krok 6: Dodaj zmienne środowiskowe

```bash
# .env.local
OPENAI_API_KEY=sk-...
```

## 🎨 WYMAGANIA WIZUALNE

### Mapa

- Gradienty: `from-primary/5 to-background`
- Kraje: hover efekt z powiększeniem koloru
- Animacje: smooth transitions (200ms)
- Tooltip: wyświetla się na hover

### Panel Scenariuszy

- Slide-in z prawej strony (Framer Motion)
- 3 kolorowe karty:
  - Pozytywny: green-600/green-50
  - Neutralny: yellow-600/yellow-50
  - Negatywny: red-600/red-50
- Tabs: Scenariusze | Kontekst
- Loading state: spinner + tekst

### Responsywność

- Mobile: Panel full-width overlay
- Desktop: Panel 600px width
- Mapa: zawsze full-screen background

## 🔧 DODATKOWE FEATURES (opcjonalne)

### MVP+

1. **Cache scenariuszy** - zapisuj w localStorage
2. **Eksport do PDF** - generuj raport
3. **Porównaj kraje** - wybierz 2-3 kraje
4. **Historia analiz** - zapisuj ostatnie 10 krajów
5. **Powiadomienia** - gdy zmieni się sytuacja

### Integracja News API (produkcja)

```typescript
// lib/news-api.ts
import { NewsAPI } from "newsapi"

const newsapi = new NewsAPI(process.env.NEWS_API_KEY)

export async function fetchNewsForCountry(country: string, days = 7) {
  const from = new Date()
  from.setDate(from.getDate() - days)

  const response = await newsapi.v2.everything({
    q: country,
    language: "pl",
    sortBy: "publishedAt",
    from: from.toISOString(),
    pageSize: 10,
  })

  return response.articles.map((a) => ({
    title: a.title,
    description: a.description,
    url: a.url,
    publishedAt: a.publishedAt,
  }))
}
```

## ✅ CHECKLIST PRZED SUBMITEM

- [ ] Instalacja wszystkich zależności
- [ ] Aktualizacja lib/content.ts z prawdziwymi danymi
- [ ] Utworzenie WorldMap component
- [ ] Utworzenie ScenarioPanel component
- [ ] Zmodyfikowanie dashboard/page.tsx
- [ ] API route /api/scenarios
- [ ] Dodanie OPENAI_API_KEY do .env.local
- [ ] Test na minimum 5 krajach
- [ ] Sprawdzenie responsywności (mobile/desktop)
- [ ] Build bez błędów: `npm run build`
- [ ] README.md z instrukcjami uruchomienia

## 🚀 DODATKOWE WSKAZÓWKI

### Prompt Engineering dla OpenAI

- Używaj `response_format: { type: "json_object" }` dla strukturalnego outputu
- Temperature: 0.7 (balans kreatywność/przewidywalność)
- Max tokens: 2000-3000 dla pełnych analiz
- System message: jasno zdefiniuj rolę i format odpowiedzi

### Performance

- Użyj `useSWR` dla cache'owania requestów
- Lazy load mapy (dynamiczny import)
- Debounce country clicks (300ms)

### UX Tips

- Loading skeleton zamiast pustego panelu
- Error boundaries dla failed API calls
- Toast notifications dla sukcesów/błędów
- Keyboard navigation (Escape zamyka panel)

---

**GOTOWE!** Masz wszystko czego potrzebujesz do implementacji. Zacznij od instalacji zależności, potem content.ts, następnie komponenty, i na końcu API integration. Powodzenia! 🌍✨
