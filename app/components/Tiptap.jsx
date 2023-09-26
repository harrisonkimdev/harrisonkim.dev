'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FaBold, FaItalic, FaStrikethrough, FaList } from 'react-icons/fa'

const Tiptap = ({ content, getHTML }) => {
  const editor = useEditor({
    extensions: [
      StarterKit
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      getHTML(html)
    },
    editorProps: {
      attributes: {
        class: 'h-72 overflow-y-auto p-2 rounded shadow bg-stone-100 focus:outline-none'
      }
    }
  })

  return (
    <>
      <div className='mb-1 flex gap-2'>

        {/* text */}
        <div className='flex gap-1'>
          {/* bold */}
          <button type='button' onClick={() => editor.chain().focus().toggleBold().run()}
            className='p-1 border rounded'
          >
            <FaBold />
          </button>

          {/* italic */}
          <button type='button' onClick={() => editor.chain().focus().toggleItalic().run()}
            className='p-1 border rounded'
          >
            <FaItalic />
          </button>

          {/* bold */}
          <button type='button' onClick={() => editor.chain().focus().toggleStrike().run()}
            className='p-1 border rounded'
          >
            <FaStrikethrough />
          </button>
        </div>

        {/*  */}
        <div>
          {/* italic */}
          <button type='button' onClick={() => editor.chain().focus().toggleBulletList().run()}
            className='p-1 border rounded'
          >
            <FaList />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap