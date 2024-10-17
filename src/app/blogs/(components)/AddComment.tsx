/**
 * AddComment component allows users to add comments to a blog post.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.blogId - The ID of the blog post to which the comment is being added
 * @param {Function} props.fetchComments - Function to fetch the updated list of comments after a new comment is added
 * 
 * @returns {JSX.Element} The rendered AddComment component
 * 
 * @example
 * <AddComment blogId="123" fetchComments={fetchCommentsFunction} />
 * 
 * @remarks
 * This component uses the `react-toastify` library to display notifications for different states of the comment submission process.
 * It also includes form validation to ensure all input fields are filled before submission.
 */

"use client"

import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import { useState } from "react"

interface IAddCommentProps {
  blogId?: string;
  fetchComments: () => void;
  hideAddComment: () => void;
}

const AddComment = ({ blogId, fetchComments, hideAddComment }: IAddCommentProps) => {
  const [formState, setFormState] = useState({
    writer: "",
    comment: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  }

  const notifyCommentAdded = () => toast.success("You just added a comment!", {
    position: "bottom-right"
  })
  const notifyCommentFailed = (err: any) => toast.error(err, {
    position: "bottom-right"
  })
  const notifyInvalidComment = () => toast.warn("Please fill all the input fields.", {
    position: "bottom-right"
  })
  
  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { writer, comment, password } = formState;

    if (!writer || !comment || !password) {
      notifyInvalidComment()
      return
    }

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId, writer, comment, password })
      })
  
      if (res.ok) {
        setFormState({ writer: '', comment: '', password: '' })
        fetchComments()
        // notifyCommentAdded()
      } else {
        const errorText = await res.text()
        // notifyCommentFailed(errorText)
      }
    } catch (err: any) {
      // notifyCommentFailed(err.message || "An error occurred")
    }
  }

  return (
    <>
      <ToastContainer />
    
      <form onSubmit={(e) => addComment(e)}>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3 flex flex-col">
            <label htmlFor="writer" className="text-lime-400">Writer</label>
            <input type="text" name="writer"
              value={formState.writer} onChange={handleChange}
              className="
                p-2 bg-black text-lime-400
                border-b border-dashed border-lime-400 outline-none
            "/>
          </div>
          <div className="col-span-2 flex flex-col">
            <label htmlFor="password" className="text-lime-400">Password</label>
            <input type="password" name="password"
              value={formState.password} onChange={handleChange}
              className="
                p-2 bg-black text-lime-400
                border-b border-dashed border-lime-400 outline-none
            "/>
          </div>
        </div>
        
        <div className="mt-5 flex flex-col gap-2">
          <label htmlFor="content" className="text-lime-400">Comment</label>
          <textarea name="content" value={formState.comment}
            onChange={handleChange}
            className="
              w-full h-28 p-2 rounded-md bg-black
              border border-dashed border-lime-400
              outline-none resize-none overflow-auto
              text-lime-400
            "
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={() => hideAddComment()} className="
            py-3 rounded-md
            border border-dashed border-lime-400
            text-lime-400
          "> Actually, nvm </button>
          <button type="submit" className="
            py-3 rounded-md
            border border-dashed border-lime-400
            text-lime-400
          "> Add </button>
        </div>
      </form>
    </>
  )
}

export default AddComment