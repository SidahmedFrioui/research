import * as React from "react"
import { cn } from "#/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      // Added a soft shadow and rounded corners to the container itself
      className="relative w-full overflow-x-auto rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-sm"
    >
      <table
        data-slot="table"
        // Tabular nums ensure numbers (IDs) line up perfectly vertically
        className={cn("w-full caption-bottom text-sm tabular-nums", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      // Light gray background for the header to separate it from the body
      className={cn("bg-slate-50/80 border-b border-slate-200/60", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        // Added a smoother transition and a subtle indigo tint on hover
        "border-b border-slate-100 transition-all duration-200 hover:bg-indigo-50/30 data-[state=selected]:bg-indigo-50/50",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        // Stronger font-black and wider tracking for that "Pro Dashboard" feel
        "h-12 px-4 text-left align-middle font-bold uppercase tracking-wider text-[11px] text-slate-500 whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        // Increased padding for better readability
        "p-4 align-middle whitespace-nowrap text-slate-600 font-medium",
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-slate-50/50 font-bold text-slate-900",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-xs font-bold uppercase tracking-widest text-slate-400", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}