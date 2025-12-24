import { Skeleton } from "@/components/ui/skeleton"

export function OrdersSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div>
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div>
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div>
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="p-6">
            <div className="flex gap-6 mb-6">
              <Skeleton className="w-24 h-24 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40 mt-4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function OrderDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-32" />
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="p-6 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
              <Skeleton className="w-24 h-24 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  )
}

export function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-6 w-24 mt-2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-8 w-32" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  )
}

export function PaymentHistorySkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-48 mb-1" />
          <Skeleton className="h-3 w-40" />
        </div>
      ))}
    </div>
  )
}

