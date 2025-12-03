import { Hero } from "@/components/marketing/hero"
import { ProblemCards } from "@/components/marketing/problem-cards"
import { SolutionBento } from "@/components/marketing/solution-bento"
import { ImpactMetrics } from "@/components/marketing/impact-metrics"
import { TechStackBadges } from "@/components/marketing/tech-stack-badges"
import { CONTENT } from "@/lib/content"

export default function Home() {
  return (
    <>
      {/* HACK: Edytuj teksty w lib/content.ts */}

      <Hero
        title={CONTENT.hero.title}
        subtitle={CONTENT.hero.subtitle}
        description={CONTENT.hero.description}
        ctaPrimary={CONTENT.hero.ctaPrimary}
        ctaSecondary={CONTENT.hero.ctaSecondary}
      />

      <ProblemCards problems={CONTENT.problems} />

      <SolutionBento features={CONTENT.features} />

      <ImpactMetrics metrics={CONTENT.metrics} />

      <TechStackBadges stack={CONTENT.tech} />
    </>
  )
}
