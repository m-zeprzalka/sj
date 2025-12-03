"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { fadeInUp, staggerContainer } from "@/lib/animations"

interface TechStackBadgesProps {
  stack: string[]
}

export function TechStackBadges({ stack }: TechStackBadgesProps) {
  return (
    <section id="tech-stack" className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technologie</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nowoczesny stack technologiczny zapewniający wydajność i
            skalowalność
          </p>
        </motion.div>

        {/* Tech Badges */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {stack.map((tech, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Badge
                variant="secondary"
                className="text-base px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {tech}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground">
            Otwarty na integracje z dodatkowymi narzędziami i platformami
          </p>
        </motion.div>
      </div>
    </section>
  )
}
