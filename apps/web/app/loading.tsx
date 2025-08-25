import { PropertyGridSkeleton } from "@/components/LoadingStates"

const Loading = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded w-1/3"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
          </div>
          <PropertyGridSkeleton count={9} />
        </div>
      </div>
    </div>
  )
}

export default Loading
