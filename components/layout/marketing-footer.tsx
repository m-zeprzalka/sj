import { Separator } from "@/components/ui/separator"
import { CONTENT } from "@/lib/content"

export function MarketingFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            Built for{" "}
            <span className="font-semibold">{CONTENT.project.hackathon}</span>{" "}
            by Team{" "}
            <span className="font-semibold">{CONTENT.project.team}</span>
          </p>

          <p>
            © {currentYear} {CONTENT.project.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
