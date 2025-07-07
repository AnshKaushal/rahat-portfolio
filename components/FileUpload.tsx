"use client"
import { useState } from "react"
import { IconUpload, IconX, IconLoader } from "@tabler/icons-react"
import { toast } from "sonner"

interface FileUploadProps {
  onUpload: (url: string) => void
  accept?: string
  maxSize?: number
  className?: string
}

export default function FileUpload({
  onUpload,
  accept = "image/*,video/*",
  maxSize = 10 * 1024 * 1024,
  className = "",
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleUpload = async (file: File) => {
    if (file.size > maxSize) {
      toast.error("File size too large. Maximum 10MB allowed.")
      return
    }

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
        onUpload(result.url)
        toast.success("File uploaded successfully!")
      } else {
        const error = await response.json()
        toast.error(error.error || "Upload failed")
      }
    } catch (error) {
      toast.error("Network error during upload")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0])
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-gray-400"
        } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-4">
          {isUploading ? (
            <>
              <IconLoader className="w-12 h-12 text-primary mx-auto animate-spin" />
              <p className="text-gray-600">Uploading...</p>
            </>
          ) : (
            <>
              <IconUpload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-gray-600">
                  <span className="font-medium text-primary cursor-pointer hover:underline">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Images or videos up to 10MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
