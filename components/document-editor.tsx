"use client"

import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Typography } from "@tiptap/extension-typography"
import { TextAlign } from "@tiptap/extension-text-align"
import { Underline } from "@tiptap/extension-underline"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Bold,
  Italic,
  UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  FileText,
  Printer,
  Settings,
  Download,
  Eye,
} from "lucide-react"
import { PageContainer } from "@/components/page-container"
import { PageBreak } from "@/extensions/page-break"
import { useState } from "react"
import { HeaderFooterSettings } from "@/components/header-footer-settings"
import { ExportOptions } from "@/components/export-options"

export function DocumentEditor() {
  const [showSettings, setShowSettings] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [documentTitle, setDocumentTitle] = useState("Legal Document")
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      PageBreak,
    ],
    content: `
      <h1>Legal Document Template</h1>
      <p>This is a professional document editor designed for legal professionals. You can format text, add headings, and create structured documents with proper pagination.</p>
      <h2>Key Features</h2>
      <ul>
        <li>Rich text formatting</li>
        <li>Page boundaries and pagination</li>
        <li>Headers and footers with page numbers</li>
        <li>Manual and automatic page breaks</li>
        <li>Print-ready output</li>
      </ul>
      <p>Start typing to create your legal document. The editor will automatically handle page breaks and maintain professional formatting throughout your document.</p>
      <h2>Sample Legal Content</h2>
      <p>WHEREAS, the parties wish to enter into this agreement for the purpose of establishing terms and conditions that will govern their relationship;</p>
      <p>NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:</p>
      <div data-type="page-break" class="page-break" style="page-break-before: always; break-before: page; height: 1px; margin: 2rem 0; border-top: 2px dashed #ccc; position: relative;"><span style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: white; padding: 0 8px; font-size: 12px; color: #666;">Page Break</span></div>
      <h3>1. Definitions</h3>
      <p>For the purposes of this Agreement, the following terms shall have the meanings set forth below:</p>
      <p>(a) "Agreement" means this document and all amendments, modifications, and supplements hereto.</p>
      <p>(b) "Party" or "Parties" means the individual or entity entering into this Agreement.</p>
      <h3>2. Terms and Conditions</h3>
      <p>The parties acknowledge that they have read and understood all terms and conditions set forth in this Agreement.</p>
      <p>This Agreement shall be binding upon the parties and their respective heirs, successors, and assigns.</p>
      <h3>3. Governing Law</h3>
      <p>This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which it is executed.</p>
      <p>Any disputes arising under this Agreement shall be resolved through binding arbitration.</p>
      <h3>4. Miscellaneous</h3>
      <p>This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements relating to the subject matter hereof.</p>
      <p>If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
      <p>This Agreement may be executed in counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument.</p>
    `,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  })

  const handlePrint = () => {
    window.print()
  }

  const handleExportHTML = () => {
    if (!editor) return

    const content = editor.getHTML()
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${documentTitle}</title>
    <style>
        @page { size: A4; margin: 20mm; }
        body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.4; }
        .page-break { page-break-before: always; }
        h1 { font-size: 16pt; font-weight: bold; margin-bottom: 12pt; }
        h2 { font-size: 14pt; font-weight: bold; margin-bottom: 10pt; }
        h3 { font-size: 12pt; font-weight: bold; margin-bottom: 8pt; }
        p { margin-bottom: 6pt; }
        ul, ol { margin-bottom: 6pt; padding-left: 20pt; }
    </style>
</head>
<body>
    <h1>${documentTitle}</h1>
    ${content}
</body>
</html>`

    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${documentTitle.replace(/\s+/g, "_")}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!editor) {
    return null
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Toolbar */}
      <Card className={`mb-4 p-4 ${isPreviewMode ? "no-print" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive("bold") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("italic") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("underline") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive({ textAlign: "left" }) ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: "center" }) ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: "right" }) ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().setPageBreak().run()}
              title="Insert Page Break (Ctrl+Enter)"
            >
              <FileText className="h-4 w-4 mr-1" />
              Page Break
            </Button>
            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              title="Preview Mode"
            >
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              title="Document Settings"
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExportOptions(!showExportOptions)}
              title="Export Options"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
          </div>
        </div>

        {showSettings && (
          <HeaderFooterSettings
            documentTitle={documentTitle}
            onDocumentTitleChange={setDocumentTitle}
            onClose={() => setShowSettings(false)}
          />
        )}

        {showExportOptions && (
          <ExportOptions
            onExportHTML={handleExportHTML}
            onPrint={handlePrint}
            onClose={() => setShowExportOptions(false)}
          />
        )}
      </Card>

      {/* Editor Container */}
      <div className={`${isPreviewMode ? "export-preview" : "bg-gray-100"} p-8 min-h-screen`}>
        {/* Page Container - A4 dimensions */}
        <PageContainer editor={editor} documentTitle={documentTitle} isPreviewMode={isPreviewMode} />
      </div>
    </div>
  )
}
