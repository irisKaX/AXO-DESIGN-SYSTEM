"use client"

import * as React from "react"
import { cn } from "cn"
import { Progress as ProgressPrimitive } from "radix-ui"

function Progress({
  className,
  value,
  max = 100,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      data-slot="progress"
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("size-full flex-1 bg-primary transition-all", value == null && "max-w-1/3 animate-pulse")}
        style={{ transform: value == null ? undefined : `translateX(-${100 - Math.min(100, Math.max(0, value / (max > 0 ? max : 100) * 100))}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
