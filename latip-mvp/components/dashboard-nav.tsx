"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, Search, ImageIcon, FileText, Copyright, Cog, ArrowLeft } from "lucide-react"

const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Trademark Search",
    href: "/dashboard/trademark",
    icon: Search,
  },
  {
    title: "Logo Search",
    href: "/dashboard/logo",
    icon: ImageIcon,
    disabled: true,
  },
  {
    title: "Patent Search",
    href: "/dashboard/patent",
    icon: FileText,
    disabled: true,
  },
  {
    title: "Copyright Search",
    href: "/dashboard/copyright",
    icon: Copyright,
    disabled: true,
  },
  {
    title: "Industrial Models",
    href: "/dashboard/industrial",
    icon: Cog,
    disabled: true,
  },
]

interface DashboardNavProps {
  showBackButton?: boolean
  backHref?: string
  backLabel?: string
}

export function DashboardNav({
  showBackButton = false,
  backHref = "/dashboard",
  backLabel = "Back to Dashboard",
}: DashboardNavProps) {
  const pathname = usePathname()

  return (
    <nav className="space-y-4">
      {showBackButton && (
        <Link href={backHref}>
          <Button
            variant="outline"
            className="w-full justify-start border-primary/20 hover:border-primary/40 hover:bg-primary/10 bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backLabel}
          </Button>
        </Link>
      )}

      <div className="space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.disabled ? "#" : item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-primary/20 text-primary hover:bg-primary/30",
                  item.disabled && "opacity-50 cursor-not-allowed",
                )}
                disabled={item.disabled}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.title}
                {item.disabled && <span className="ml-auto text-xs text-muted-foreground">Soon</span>}
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
