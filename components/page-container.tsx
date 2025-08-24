"use client"

import { useEffect, useRef, useState } from "react"
import { type Editor, EditorContent } from "@tiptap/react"
import { PageHeader, PageFooter } from "@/components/page-header-footer"

interface PageContainerProps {
  editor: Editor
  documentTitle?: string
  isPreviewMode?: boolean
}

export function PageContainer({ editor, documentTitle = "Legal Document", isPreviewMode = false }: PageContainerProps) {
  const [pages, setPages] = useState([1])
  const editorRef = useRef<HTMLDivElement>(null)

  // A4 dimensions in pixels (at 96 DPI)
  const A4_WIDTH = 794 // 210mm
  const A4_HEIGHT = 1123 // 297mm
  const PAGE_MARGIN = 60 // 20mm margins
  const HEADER_HEIGHT = 40
  const FOOTER_HEIGHT = 40
  const CONTENT_HEIGHT = A4_HEIGHT - PAGE_MARGIN * 2 - HEADER_HEIGHT - FOOTER_HEIGHT

  useEffect(() => {
    if (!editor || !editorRef.current) return

    const checkPageOverflow = () => {
      const editorElement = editorRef.current
      if (!editorElement) return

      const contentHeight = editorElement.scrollHeight
      const pageBreaks = editor.getHTML().match(/data-type="page-break"/g)?.length || 0

      // Calculate pages needed based on content height and manual page breaks
      const naturalPages = Math.ceil(contentHeight / CONTENT_HEIGHT)
      const pagesNeeded = Math.max(naturalPages, pageBreaks + 1)

      if (pagesNeeded !== pages.length) {
        setPages(Array.from({ length: Math.max(1, pagesNeeded) }, (_, i) => i + 1))
      }
    }

    // Check overflow on content changes
    const handleUpdate = () => {
      setTimeout(checkPageOverflow, 100) // Small delay to ensure DOM is updated
    }

    editor.on("update", handleUpdate)
    editor.on("create", handleUpdate)

    // Initial check
    handleUpdate()

    return () => {
      editor.off("update", handleUpdate)
      editor.off("create", handleUpdate)
    }
  }, [editor, pages.length, CONTENT_HEIGHT])

  return (
    <div className={`${isPreviewMode ? "" : "bg-gray-100"} p-8 min-h-screen`}>
      <div className="space-y-8">
        {pages.map((pageNumber) => (
          <div key={pageNumber} className="relative">
            {/* Page Number Indicator */}
            {!isPreviewMode && (
              <div className="absolute -left-16 top-4 text-sm text-muted-foreground font-medium page-indicator">
                Page {pageNumber}
              </div>
            )}

            {/* A4 Page */}
            <div
              className={`bg-white mx-auto relative ${
                isPreviewMode ? "print-page" : "shadow-lg border border-gray-200"
              }`}
              style={{
                width: `${A4_WIDTH}px`,
                height: `${A4_HEIGHT}px`,
                minHeight: `${A4_HEIGHT}px`,
              }}
            >
              <PageHeader
                title={documentTitle}
                pageNumber={pageNumber}
                style={{
                  top: `${PAGE_MARGIN}px`,
                  left: `${PAGE_MARGIN}px`,
                  right: `${PAGE_MARGIN}px`,
                  height: `${HEADER_HEIGHT}px`,
                }}
                className={isPreviewMode ? "print-header" : ""}
              />

              {/* Page Content Area */}
              <div
                className={`absolute ${isPreviewMode ? "print-content" : ""}`}
                style={{
                  top: `${PAGE_MARGIN + HEADER_HEIGHT}px`,
                  left: `${PAGE_MARGIN}px`,
                  right: `${PAGE_MARGIN}px`,
                  height: `${CONTENT_HEIGHT}px`,
                  overflow: "hidden",
                }}
              >
                {pageNumber === 1 ? (
                  <div ref={editorRef}>
                    <EditorContent editor={editor} className="prose prose-sm max-w-none h-full" />
                  </div>
                ) : (
                  <div
                    className="prose prose-sm max-w-none"
                    style={{
                      marginTop: `-${(pageNumber - 1) * CONTENT_HEIGHT}px`,
                    }}
                  >
                    <EditorContent editor={editor} />
                  </div>
                )}
              </div>

              <PageFooter
                pageNumber={pageNumber}
                totalPages={pages.length}
                style={{
                  bottom: `${PAGE_MARGIN}px`,
                  left: `${PAGE_MARGIN}px`,
                  right: `${PAGE_MARGIN}px`,
                  height: `${FOOTER_HEIGHT}px`,
                }}
                className={isPreviewMode ? "print-footer" : ""}
              />

              {/* Page Boundaries Visualization */}
              {!isPreviewMode && (
                <div className="absolute inset-0 pointer-events-none page-boundaries">
                  {/* Margin guides */}
                  <div
                    className="absolute border border-dashed border-blue-200 opacity-30"
                    style={{
                      top: `${PAGE_MARGIN}px`,
                      left: `${PAGE_MARGIN}px`,
                      right: `${PAGE_MARGIN}px`,
                      bottom: `${PAGE_MARGIN}px`,
                    }}
                  />
                  <div
                    className="absolute border border-dashed border-green-200 opacity-20"
                    style={{
                      top: `${PAGE_MARGIN + HEADER_HEIGHT}px`,
                      left: `${PAGE_MARGIN}px`,
                      right: `${PAGE_MARGIN}px`,
                      bottom: `${PAGE_MARGIN + FOOTER_HEIGHT}px`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
