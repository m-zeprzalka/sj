"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Zap, Shield, BarChart, LucideIcon } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface Feature {
  title: string
  description: string
  icon?: LucideIcon
  span?: string
}

interface SolutionBentoProps {
  features: Feature[]
}

const defaultIcons = [Sparkles, Zap, Shield, BarChart]

export function SolutionBento({ features }: SolutionBentoProps) {
  return (
    <section className="section-spacing px-4 sm:px-6 bg-muted/30">
      <div className="container-section">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-title mb-3 sm:mb-4 px-4">Nasze rozwiązanie</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Zaawansowana technologia spotyka się z prostotą użytkowania
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {features.map((feature, index) => {
            const Icon =
              feature.icon || defaultIcons[index % defaultIcons.length]
            const spanClass = feature.span || "col-span-1"

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={cn(
                  spanClass,
                  // Make spans responsive
                  spanClass.includes("col-span-2") &&
                    "sm:col-span-2 lg:col-span-2",
                  spanClass.includes("col-span-3") &&
                    "sm:col-span-2 lg:col-span-3"
                )}
              >
                <Card className="h-full border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
                  <CardContent className="p-5 sm:p-6 lg:p-8">
                    {/* Icon with Glow Effect */}
                    <div className="mb-4 sm:mb-6">
                      <div className="inline-flex p-3 sm:p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all group-hover:shadow-lg group-hover:shadow-primary/20">
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative Element */}
                    <div className="mt-4 sm:mt-6 h-1 w-12 bg-gradient-to-r from-primary to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
