/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WCiZdwlXTXH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Button } from "./button"
import UploadLogo from '@renderer/assets/images/uploadLogo.png'
import { useTranslate } from "@renderer/hooks/useTranslate"

export default function fileUploader() {
  const [files, setFiles] = useState([])
  const [isZoomed, setIsZoomed] = useState(false)
  const [scale, setScale] = useState(1)
  const { t } = useTranslate()
  const handleDrop = (event) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files)
    const imageFiles = droppedFiles.filter((file) => file.type.startsWith("image/"))
    setFiles(imageFiles)
  }
  const handleFileImport = () => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.multiple = true
    fileInput.accept = "image/*"
    fileInput.onchange = (event) => {
      setFiles(Array.from(event.target.files))
    }
    fileInput.click()
  }
  const handleZoom = () => {
    setIsZoomed(!isZoomed)
    setScale(isZoomed ? 1 : 1.5)
  }
  return (
    <div className="flex flex-col  items-center justify-center ">
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className="w-full  max-w-md p-6 border-2 border-dashed border-primary border-blue-500 rounded-lg"
      >
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <img src={UploadLogo} alt="Upload" width={50} height={50} />
            <p className="text-muted-foreground">{t('buttons.drag')}</p>
            <div className="flex flex-row items-center  bg-primary   w-[201px] h-[18px] space-x-4">
              <hr className="w-20 h-px bg-gray-500" />
              <p className="text-muted-foreground uppercase text-gray-600">{t('buttons.or')}</p>
              <hr className="w-20 h-px bg-gray-500" />
            </div>
            
            <Button className="custom-button border border-blue-600 font-bold text-blue-600 hover:bg-blue-50" onClick={handleFileImport}>{t('buttons.browseFiles')}</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative w-full overflow-hidden bg-muted rounded-lg">
                <img
                  src="/placeholder.svg"
                  alt={file.name}
                  width={600}
                  height={400}
                  className={`w-full h-auto transition-transform duration-300 ${isZoomed ? `scale-[${scale}]` : ""}`}
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <div className="absolute top-2 right-2 flex items-center space-x-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleZoom}
                    className="text-primary-foreground hover:bg-primary/20"
                  >
                    <ZoomInIcon className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary/20">
                    <ScalingIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {files.some((file) => !file.type.startsWith("image/")) && (
        <div className="mt-4 text-red-500">Only image files are allowed. Please remove any non-image files.</div>
      )}
    </div>
  )
}

function ScalingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M14 15H9v-5" />
      <path d="M16 3h5v5" />
      <path d="M21 3 9 15" />
    </svg>
  )
}


function ZoomInIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="11" x2="11" y1="8" y2="14" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  )
}