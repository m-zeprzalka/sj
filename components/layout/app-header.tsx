"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, Menu, Home } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Settings, FileText, BarChart3 } from "lucide-react"
import { CONTENT } from "@/lib/content"

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

interface AppHeaderProps {
  title: string
}

export function AppHeader({ title }: AppHeaderProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 h-14 sm:h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Left: Mobile Menu + Title */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {CONTENT.project.name.charAt(1) || "H"}
                      </span>
                    </div>
                    <span className="font-bold text-lg">
                      {CONTENT.project.name}
                    </span>
                  </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                  <ul className="space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href

                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <Icon className="w-5 h-5" />
                            {item.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>

                {/* Bottom Section */}
                <div className="p-4 space-y-2 border-t">
                  <div className="flex items-center justify-between px-3">
                    <span className="text-xs font-medium text-muted-foreground">
                      Theme
                    </span>
                    <ThemeToggle />
                  </div>

                  <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Home className="w-5 h-5" />
                    Back to Home
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Title */}
          <h1 className="text-lg sm:text-2xl font-bold">{title}</h1>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="w-5 h-5" />
          </Button>

          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
