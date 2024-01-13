'use client'

import React, { useState } from 'react'

const AddComment = (
    {
        blogId,
        fetchComments
    } :
    {
        blogId: string | undefined,
        fetchComments: any
    }) => {
    const [writer, setWriter] = useState("")
    const [comment, setComment] = useState("")
    const [password, setPassword] = useState("")

    const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // TODO: validation checks

        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                blogId, writer, comment, password
            })
        })
        const data = await res.json()

        resetInputFields()
        fetchComments()
    }

    const resetInputFields = () => {
        setWriter('')
        setComment('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={(e) => addComment(e)}
                className='mb-8 p-4'
            >
                <div className='flex flex-col md:flex-row md:justify-between'>
                    <div className='flex flex-col'>
                        <label htmlFor="writer">Writer</label>
                        <input type="text" id="writer"
                            value={writer} onChange={(e) => setWriter(e.target.value)}
                            className='p-2 rounded-md'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Password</label>
                        <input type="password" id="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className='p-2 rounded-md'
                        />
                    </div>
                </div>
                
                <div className='mt-2'>
                    <label htmlFor="content">Comment</label>
                    <textarea id="content"
                        value={comment} onChange={(e) => setComment(e.target.value)}
                        className='w-full p-2 rounded-md'
                    />
                </div>

                <div className='mt-6 flex justify-center'>
                    <button type="submit" className='
                        w-full py-2 rounded-md border border-stone-300 bg-stone-200 hover:bg-stone-300
                    '>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddComment