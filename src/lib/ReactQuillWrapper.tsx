'use client'

import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

type EditorProps = {
  content: string
  setContent: (content: string) => void
}

export default function ReactQuillWrapper({ content, setContent }: EditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<Quill | null>(null)
  const contentRef = useRef(content)
  const onChangeRef = useRef(setContent)
  const lastHtmlRef = useRef(content)

  useEffect(() => {
    contentRef.current = content
    onChangeRef.current = setContent
  }, [content, setContent])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const element = document.createElement('div')
    container.appendChild(element)
    const editor = new Quill(element, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
      },
    })
    editorRef.current = editor
    editor.clipboard.dangerouslyPasteHTML(contentRef.current, 'silent')
    lastHtmlRef.current = editor.root.innerHTML

    const handleChange = () => {
      const html = editor.root.innerHTML
      lastHtmlRef.current = html
      onChangeRef.current(html)
    }
    editor.on('text-change', handleChange)

    return () => {
      editor.off('text-change', handleChange)
      editor.disable()
      editorRef.current = null
      container.replaceChildren()
    }
  }, [])

  useEffect(() => {
    const editor = editorRef.current
    if (editor && content !== lastHtmlRef.current) {
      editor.clipboard.dangerouslyPasteHTML(content, 'silent')
      lastHtmlRef.current = editor.root.innerHTML
    }
  }, [content])

  return <div ref={containerRef} className="quill text-stone-800" />
}
