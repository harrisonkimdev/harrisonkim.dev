'use client'

import React, { useState } from 'react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const ReactQuillWrapper = (
  { content, setContent }:
  { content: string, setContent: React.Dispatch<React.SetStateAction<string>> }
) => {
  const [value, setValue] = useState('')
  return <ReactQuill theme='snow' value={content} onChange={setContent} />
}

export default ReactQuillWrapper