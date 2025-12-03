"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  unit?: string
  trend?: string
  trendUp?: boolean
  icon?: LucideIcon
}

export function StatCard({
  title,
  value,
  unit,
  trend,
  trendUp = true,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold">{value}</h3>
              {unit && (
                <span className="text-lg text-muted-foreground">{unit}</span>
              )}
            </div>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trendUp ? (
                  <ArrowUp className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    trendUp ? "text-green-500" : "text-red-500"
                  )}
                >
                  {trend}
                </span>
                <span className="text-sm text-muted-foreground">
                  vs poprzedni miesiąc
                </span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
