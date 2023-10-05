'use client'

import React, { useState, useMemo } from 'react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const ReactQuillWrapper = ({ content, setContent }) => {
  const [value, setValue] = useState('')
  
  const modules = useMemo(() => {

  })

  return (
    <>
      <ReactQuill modules={modules} theme='snow' value={content} onChange={setContent} />
    </>
  )
}

export default ReactQuillWrapper