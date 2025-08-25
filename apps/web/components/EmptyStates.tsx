"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Search, Building, Filter } from "lucide-react"

type EmptyStateProps = {
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
}

const EmptyState = ({ title, description, action, icon }: EmptyStateProps) => {
  return (
    <div className="text-center py-12 space-y-4">
      {icon && <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">{icon}</div>}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
      </div>
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  )
}

const NoPropertiesFound = ({ onClearFilters }: { onClearFilters?: () => void }) => {
  return (
    <EmptyState
      icon={<Search className="w-8 h-8 text-muted-foreground" />}
      title="No properties found"
      description="We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms."
      action={
        onClearFilters
          ? {
              label: "Clear filters",
              onClick: onClearFilters,
            }
          : undefined
      }
    />
  )
}

const NoDevelopersFound = ({ onClearFilters }: { onClearFilters?: () => void }) => {
  return (
    <EmptyState
      icon={<Building className="w-8 h-8 text-muted-foreground" />}
      title="No developers found"
      description="We couldn't find any developers matching your search criteria. Try adjusting your filters."
      action={
        onClearFilters
          ? {
              label: "Clear filters",
              onClick: onClearFilters,
            }
          : undefined
      }
    />
  )
}

const NoSearchResults = () => {
  return (
    <EmptyState
      icon={<Filter className="w-8 h-8 text-muted-foreground" />}
      title="Start your search"
      description="Use the filters above to find properties that match your preferences."
    />
  )
}

export { EmptyState, NoPropertiesFound, NoDevelopersFound, NoSearchResults }
