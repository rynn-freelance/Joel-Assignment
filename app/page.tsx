import { DocumentEditor } from "@/components/document-editor"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Legal Document Editor</h1>
          <p className="text-muted-foreground">Professional document editing with pagination support</p>
        </div>
        <DocumentEditor />
      </div>
    </div>
  )
}
