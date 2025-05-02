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
import { useReducer, memo } from "react"

interface IAddCommentProps {
  blogId?: string;
  fetchComments: () => void;
  hideAddComment: () => void;
}

// 상태 타입
type FormState = {
  writer: string;
  comment: string;
  password: string;
}

// 액션 타입
type FormAction =
  | { type: 'UPDATE_FIELD', field: string, value: string }
  | { type: 'RESET_FORM' }

// 리듀서 함수
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET_FORM':
      return { writer: '', comment: '', password: '' }
    default:
      return state
  }
}

// 알림 메시지 객체
const Notifications = {
  commentAdded: () => toast.success("You just added a comment!", {
    position: "bottom-right"
  }),
  commentFailed: (err: any) => toast.error(err, {
    position: "bottom-right"
  }),
  invalidComment: () => toast.warn("Please fill all the input fields.", {
    position: "bottom-right"
  })
}

// 입력 필드 컴포넌트
const InputField = memo(({ 
  label, 
  name, 
  type, 
  value, 
  onChange 
}: { 
  label: string; 
  name: string; 
  type: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-lime-400">{label}</label>
    <input 
      type={type} 
      name={name}
      value={value} 
      onChange={onChange}
      className="
        p-2 bg-black text-lime-400
        border-b border-dashed border-lime-400 outline-none
      "
    />
  </div>
))
InputField.displayName = 'InputField'

// 텍스트 영역 컴포넌트
const TextArea = memo(({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
}) => (
  <div className="mt-5 flex flex-col gap-2">
    <label htmlFor="content" className="text-lime-400">Comment</label>
    <textarea 
      name="content" 
      value={value}
      onChange={onChange}
      className="
        w-full h-28 p-2 rounded-md bg-black
        border border-dashed border-lime-400
        outline-none resize-none overflow-auto
        text-lime-400
      "
    />
  </div>
))
TextArea.displayName = 'TextArea'

// 버튼 그룹 컴포넌트
const ButtonGroup = memo(({ 
  onCancel, 
  isSubmitting 
}: { 
  onCancel: () => void; 
  isSubmitting?: boolean;
}) => (
  <div className="mt-6 grid grid-cols-2 gap-3">
    <button 
      type="button"
      onClick={onCancel} 
      className="
        py-3 rounded-md
        border border-dashed border-lime-400
        text-lime-400
      "
    > 
      Actually, nvm 
    </button>
    <button 
      type="submit" 
      disabled={isSubmitting}
      className="
        py-3 rounded-md
        border border-dashed border-lime-400
        text-lime-400
      "
    > 
      Add 
    </button>
  </div>
))
ButtonGroup.displayName = 'ButtonGroup'

const AddComment = ({ blogId, fetchComments, hideAddComment }: IAddCommentProps) => {
  // 초기 상태
  const initialState: FormState = {
    writer: "",
    comment: "",
    password: ""
  }

  const [state, dispatch] = useReducer(formReducer, initialState)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  }
  
  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { writer, comment, password } = state;

    if (!writer || !comment || !password) {
      Notifications.invalidComment()
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
        dispatch({ type: 'RESET_FORM' })
        fetchComments()
        // Notifications.commentAdded()
      } else {
        const errorText = await res.text()
        // Notifications.commentFailed(errorText)
      }
    } catch (err: any) {
      // Notifications.commentFailed(err.message || "An error occurred")
    }
  }

  return (
    <>
      <ToastContainer />
    
      <form onSubmit={addComment}>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3">
            <InputField 
              label="Writer" 
              name="writer" 
              type="text" 
              value={state.writer} 
              onChange={handleChange} 
            />
          </div>
          <div className="col-span-2">
            <InputField 
              label="Password" 
              name="password" 
              type="password" 
              value={state.password} 
              onChange={handleChange} 
            />
          </div>
        </div>
        
        <TextArea 
          value={state.comment} 
          onChange={handleChange} 
        />

        <ButtonGroup 
          onCancel={hideAddComment} 
        />
      </form>
    </>
  )
}

export default memo(AddComment)