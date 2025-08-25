import { Skeleton } from "@/components/ui/skeleton"

export default function SearchesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <div className="w-64">
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="flex-1 space-y-6">
          <Skeleton className="h-12 w-64" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
