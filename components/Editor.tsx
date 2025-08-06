"use client"
import { useRef, useState, useEffect } from "react"
import { toast } from "sonner"
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconH1,
  IconH2,
  IconH3,
  IconList,
  IconListNumbers,
  IconLink,
  IconPhoto,
  IconCode,
  IconQuote,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconMinus,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import DOMPurify from "dompurify"

interface EditorProps {
  content: string
  onChange: (content: string) => void
}

export default function Editor({ content, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content
    }
  }, [content])

  const handleInput = () => {
    if (editorRef.current) {
      const cleanHtml = DOMPurify.sanitize(editorRef.current.innerHTML)
      onChange(cleanHtml)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const insertImage = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          const img = document.createElement("img")
          img.src = result.url
          img.alt = "Blog image"
          img.style.maxWidth = "100%"
          img.style.height = "auto"
          img.style.margin = "20px 0"
          img.style.borderRadius = "8px"
          img.style.display = "block"

          range.deleteContents()
          range.insertNode(img)

          const afterImg = document.createElement("p")
          afterImg.innerHTML = "<br>"
          range.collapse(false)
          range.insertNode(afterImg)

          selection.removeAllRanges()
          const newRange = document.createRange()
          newRange.setStart(afterImg, 0)
          newRange.collapse(true)
          selection.addRange(newRange)
        }
        handleInput()
        toast.success("Image uploaded successfully!")
      } else {
        toast.error("Failed to upload image")
      }
    } catch (error) {
      toast.error("Network error during image upload")
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size too large. Maximum 10MB allowed.")
        return
      }
      insertImage(file)
    }
  }

  const insertLink = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      setShowLinkDialog(true)
    } else {
      toast.error("Please select text first to create a link")
    }
  }

  const handleLinkSubmit = () => {
    if (linkUrl) {
      execCommand("createLink", linkUrl)
      setLinkUrl("")
      setShowLinkDialog(false)
    }
  }

  const insertDivider = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const hr = document.createElement("hr")
      hr.style.margin = "30px 0"
      hr.style.border = "none"
      hr.style.height = "1px"
      hr.style.backgroundColor = "#e5e7eb"

      range.deleteContents()
      range.insertNode(hr)

      const afterHr = document.createElement("p")
      afterHr.innerHTML = "<br>"
      range.collapse(false)
      range.insertNode(afterHr)
    }
    handleInput()
  }

  const insertCodeBlock = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const pre = document.createElement("pre")
      const code = document.createElement("code")
      code.innerHTML = "// Your code here"
      code.style.display = "block"
      code.style.padding = "16px"
      code.style.backgroundColor = "#1f2937"
      code.style.color = "#f9fafb"
      code.style.borderRadius = "8px"
      code.style.fontFamily = "monospace"
      code.style.fontSize = "14px"
      code.style.lineHeight = "1.5"
      code.style.margin = "20px 0"
      code.contentEditable = "true"

      pre.appendChild(code)
      range.deleteContents()
      range.insertNode(pre)

      const afterPre = document.createElement("p")
      afterPre.innerHTML = "<br>"
      range.collapse(false)
      range.insertNode(afterPre)
    }
    handleInput()
  }

  const insertBlockquote = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const blockquote = document.createElement("blockquote")
      blockquote.innerHTML = "Quote text here..."
      blockquote.style.borderLeft = "4px solid #3b82f6"
      blockquote.style.paddingLeft = "16px"
      blockquote.style.margin = "20px 0"
      blockquote.style.fontStyle = "italic"
      blockquote.style.color = "#6b7280"
      blockquote.contentEditable = "true"

      range.deleteContents()
      range.insertNode(blockquote)

      const afterQuote = document.createElement("p")
      afterQuote.innerHTML = "<br>"
      range.collapse(false)
      range.insertNode(afterQuote)
    }
    handleInput()
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white relative">
      <div className="border-b border-gray-200 p-3 bg-gray-50">
        <div className="flex flex-wrap items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("bold")}
            className="h-8 w-8 p-0"
            title="Bold"
          >
            <IconBold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("italic")}
            className="h-8 w-8 p-0"
            title="Italic"
          >
            <IconItalic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("underline")}
            className="h-8 w-8 p-0"
            title="Underline"
          >
            <IconUnderline className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("strikeThrough")}
            className="h-8 w-8 p-0"
            title="Strike Through"
          >
            <IconStrikethrough className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("formatBlock", "<h1>")}
            className="h-8 w-8 p-0"
            title="Heading 1"
          >
            <IconH1 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("formatBlock", "<h2>")}
            className="h-8 w-8 p-0"
            title="Heading 2"
          >
            <IconH2 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("formatBlock", "<h3>")}
            className="h-8 w-8 p-0"
            title="Heading 3"
          >
            <IconH3 className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyLeft")}
            className="h-8 w-8 p-0"
            title="Align Left"
          >
            <IconAlignLeft className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyCenter")}
            className="h-8 w-8 p-0"
            title="Align Center"
          >
            <IconAlignCenter className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyRight")}
            className="h-8 w-8 p-0"
            title="Align Right"
          >
            <IconAlignRight className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("insertUnorderedList")}
            className="h-8 w-8 p-0"
            title="Bullet List"
          >
            <IconList className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("insertOrderedList")}
            className="h-8 w-8 p-0"
            title="Numbered List"
          >
            <IconListNumbers className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={insertLink}
            className="h-8 w-8 p-0"
            title="Insert Link"
          >
            <IconLink className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleImageUpload}
            disabled={isUploading}
            className="h-8 w-8 p-0"
            title="Insert Image"
          >
            <IconPhoto className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={insertCodeBlock}
            className="h-8 w-8 p-0"
            title="Code Block"
          >
            <IconCode className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={insertBlockquote}
            className="h-8 w-8 p-0"
            title="Quote"
          >
            <IconQuote className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={insertDivider}
            className="h-8 w-8 p-0"
            title="Divider"
          >
            <IconMinus className="w-4 h-4" />
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[500px] w-full p-6 outline-none prose prose-lg max-w-none"
        style={{
          lineHeight: "1.7",
          fontSize: "18px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#374151",
        }}
        suppressContentEditableWarning
      />

      {isUploading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-600">Uploading image...</span>
          </div>
        </div>
      )}

      {showLinkDialog && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg border">
            <h3 className="text-sm font-medium mb-2">Insert Link</h3>
            <div className="flex space-x-2">
              <Input
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-64"
              />
              <Button onClick={handleLinkSubmit} size="sm">
                Insert
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowLinkDialog(false)
                  setLinkUrl("")
                }}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
