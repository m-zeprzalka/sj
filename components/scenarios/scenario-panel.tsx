"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Minus,
  TrendingDown,
  Loader2,
  X,
  Calendar,
  Percent,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

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
    label: "Scenariusz Pozytywny",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    badgeColor:
      "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
  },
  neutral: {
    icon: Minus,
    label: "Scenariusz Neutralny",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    badgeColor:
      "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300",
  },
  negative: {
    icon: TrendingDown,
    label: "Scenariusz Negatywny",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    badgeColor: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
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
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-screen w-full lg:w-[650px] bg-background border-l shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b p-4 sm:p-6 flex items-center justify-between z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold truncate">
              {country}
            </h2>
            <p className="text-sm text-muted-foreground">
              Scenariusze przyszłości geopolitycznej
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium">
                  Analizuję sytuację geopolityczną...
                </p>
                <p className="text-sm text-muted-foreground mt-2 text-center px-4">
                  Przetwarzam aktualne dane i generuję scenariusze
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>Powered by OpenAI GPT-4</span>
                </div>
              </motion.div>
            )}

            {/* Content */}
            {!loading && scenarios && context && (
              <Tabs defaultValue="scenarios" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="scenarios">Scenariusze</TabsTrigger>
                  <TabsTrigger value="context">Kontekst</TabsTrigger>
                </TabsList>

                <TabsContent value="scenarios" className="space-y-4">
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
                        <Card
                          className={`${config.borderColor} ${config.bgColor} transition-all duration-300 hover:shadow-lg`}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div
                                  className={`p-2 rounded-lg bg-background ${config.color} shrink-0`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <CardTitle className="text-base sm:text-lg leading-tight mb-2">
                                    {scenario.title}
                                  </CardTitle>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${config.badgeColor} border-0`}
                                    >
                                      <Percent className="w-3 h-3 mr-1" />
                                      {scenario.probability}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {scenario.timeframe}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm leading-relaxed text-foreground/90">
                              {scenario.description}
                            </p>

                            <div>
                              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                                <div className="w-1 h-4 bg-primary rounded-full" />
                                Kluczowe czynniki
                              </h4>
                              <ul className="space-y-2">
                                {scenario.keyFactors.map((factor, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm flex items-start gap-2"
                                  >
                                    <span
                                      className={`${config.color} mt-1 font-bold`}
                                    >
                                      •
                                    </span>
                                    <span className="text-foreground/80">
                                      {factor}
                                    </span>
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

                <TabsContent value="context" className="space-y-6">
                  {/* Current Situation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Aktualna sytuacja
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {context.currentSituation}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Geopolitical Factors */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Czynniki geopolityczne
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {context.geopoliticalFactors.map((factor, idx) => (
                            <li
                              key={idx}
                              className="text-sm flex items-start gap-3"
                            >
                              <Badge
                                variant="secondary"
                                className="mt-0.5 shrink-0"
                              >
                                {idx + 1}
                              </Badge>
                              <span className="text-muted-foreground">
                                {factor}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Recent News */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Źródła informacji
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {context.recentNews.map((news, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3 py-1"
                            >
                              {news}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
