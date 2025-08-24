"use client"

import type { CSSProperties } from "react"

interface PageHeaderFooterProps {
  pageNumber: number
  totalPages: number
  title?: string
  style?: CSSProperties
  className?: string
}

export function PageHeader({
  title = "Legal Document",
  pageNumber,
  style,
  className = "",
}: Pick<PageHeaderFooterProps, "title" | "pageNumber" | "style" | "className">) {
  return (
    <div
      className={`absolute flex justify-between items-center text-xs text-muted-foreground border-b border-gray-200 pb-2 px-4 ${className}`}
      style={style}
    >
      <div className="flex items-center gap-4">
        <span className="font-medium">{title}</span>
        <span className="text-gray-400">|</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
      <div className="text-right">
        <span className="text-gray-500">Page {pageNumber}</span>
      </div>
    </div>
  )
}

export function PageFooter({
  pageNumber,
  totalPages,
  style,
  className = "",
}: Pick<PageHeaderFooterProps, "pageNumber" | "totalPages" | "style" | "className">) {
  return (
    <div
      className={`absolute flex justify-between items-center text-xs text-muted-foreground border-t border-gray-200 pt-2 px-4 ${className}`}
      style={style}
    >
      <div className="text-left">
        <span className="text-gray-500">Confidential & Privileged</span>
      </div>
      <div className="text-center flex-1">
        <span className="font-medium">
          Page {pageNumber} of {totalPages}
        </span>
      </div>
      <div className="text-right">
        <span className="text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  )
}
