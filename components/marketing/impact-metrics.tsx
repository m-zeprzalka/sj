"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef } from "react"
import { fadeInUp, staggerContainer } from "@/lib/animations"

interface Metric {
  value: string
  label: string
  trend?: string
}

interface ImpactMetricsProps {
  metrics: Metric[]
}

export function ImpactMetrics({ metrics }: ImpactMetricsProps) {
  return (
    <section className="section-spacing px-4 sm:px-6">
      <div className="container-section">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-title mb-3 sm:mb-4 px-4">Wpływ na biznes</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Mierzalne rezultaty, które robią różnicę
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Value */}
              <div className="mb-2 sm:mb-3">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text block">
                  {metric.value}
                </span>
                {metric.trend && (
                  <span className="text-xs sm:text-sm text-primary font-medium mt-1.5 sm:mt-2 inline-block">
                    {metric.trend}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="text-base sm:text-lg text-muted-foreground">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Context */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 sm:mt-12 px-4"
        >
          <p className="text-xs sm:text-sm text-muted-foreground">
            * Dane szacunkowe na podstawie analiz rynkowych
          </p>
        </motion.div>
      </div>
    </section>
  )
}
