"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, FileText, Printer, Download } from "lucide-react"

interface ExportOptionsProps {
  onExportHTML: () => void
  onPrint: () => void
  onClose: () => void
}

export function ExportOptions({ onExportHTML, onPrint, onClose }: ExportOptionsProps) {
  return (
    <Card className="mt-4 p-4 border-t">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Export Options</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" onClick={onPrint} className="flex items-center gap-2 bg-transparent">
          <Printer className="h-4 w-4" />
          Print Document
        </Button>

        <Button variant="outline" onClick={onExportHTML} className="flex items-center gap-2 bg-transparent">
          <FileText className="h-4 w-4" />
          Export as HTML
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            alert("PDF export would require a server-side solution like Puppeteer or similar.")
          }}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export as PDF
        </Button>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <p>
          <strong>Print:</strong> Use browser's print function with proper page breaks and headers/footers
        </p>
        <p>
          <strong>HTML:</strong> Download a standalone HTML file with embedded styles
        </p>
        <p>
          <strong>PDF:</strong> Requires server-side implementation for production use
        </p>
      </div>
    </Card>
  )
}
