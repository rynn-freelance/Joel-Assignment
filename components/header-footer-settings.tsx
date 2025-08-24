"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface HeaderFooterSettingsProps {
  documentTitle: string
  onDocumentTitleChange: (title: string) => void
  onClose: () => void
}

export function HeaderFooterSettings({ documentTitle, onDocumentTitleChange, onClose }: HeaderFooterSettingsProps) {
  return (
    <Card className="mt-4 p-4 border-t">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Document Settings</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="document-title" className="text-xs">
            Document Title
          </Label>
          <Input
            id="document-title"
            value={documentTitle}
            onChange={(e) => onDocumentTitleChange(e.target.value)}
            placeholder="Enter document title"
            className="text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Header/Footer Info</Label>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Headers show document title and date</p>
            <p>• Footers show page numbers and confidentiality notice</p>
            <p>• All elements are print-ready</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
