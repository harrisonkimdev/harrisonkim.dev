import 'react-toastify/dist/ReactToastify.css'
import { IComment } from '@/interfaces'
import { timeSince } from '@/lib/functions'
import { ToastContainer, toast } from 'react-toastify'
import { useReducer, memo } from 'react'
import { FaRegTrashCan, FaCheck, FaXmark } from 'react-icons/fa6'

type TCommentProps = {
  blogId: string | undefined,
  refreshPage: () => void,
  comment: IComment
}

// 상태 타입
type CommentState = {
  showPasswordInput: boolean
  passwordInput: string
}

// 액션 타입
type CommentAction =
  | { type: 'SHOW_PASSWORD_INPUT' }
  | { type: 'HIDE_PASSWORD_INPUT' }
  | { type: 'SET_PASSWORD_INPUT', payload: string }
  | { type: 'CLEAR_PASSWORD_INPUT' }

// 리듀서 함수
const commentReducer = (state: CommentState, action: CommentAction): CommentState => {
  switch (action.type) {
    case 'SHOW_PASSWORD_INPUT':
      return { ...state, showPasswordInput: true }
    case 'HIDE_PASSWORD_INPUT':
      return { ...state, showPasswordInput: false }
    case 'SET_PASSWORD_INPUT':
      return { ...state, passwordInput: action.payload }
    case 'CLEAR_PASSWORD_INPUT':
      return { ...state, passwordInput: '' }
    default:
      return state
  }
}

// 알림 메시지 컴포넌트
const Notifications = {
  commentFailed: (err: any) => toast.error(err, {
    position: 'bottom-right'
  }),
  
  invalidComment: () => toast.warn('Please fill all the input fields.', {
    position: 'bottom-right'
  })
}

// 댓글 헤더 컴포넌트
const CommentHeader = memo(({ writer, createdAt }: { writer: string, createdAt: string }) => (
  <div className='flex items-center justify-between whitespace-nowrap'>
    <span className='text-lime-400'>{writer}</span>
    <span className='text-sm text-zinc-500'>
      {timeSince(new Date(createdAt).valueOf())} ago
    </span>
  </div>
))
CommentHeader.displayName = 'CommentHeader'

// 비밀번호 입력 폼 컴포넌트
const PasswordForm = memo(({
  passwordInput,
  onChangePassword,
  onSubmit,
  onCancel
}: {
  passwordInput: string,
  onChangePassword: (value: string) => void,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  onCancel: () => void
}) => (
  <form
    onSubmit={onSubmit}
    className='flex gap-4 justify-between items-center'
  >
    <input 
      id='password' 
      type='password' 
      value={passwordInput}
      onChange={(e) => onChangePassword(e.target.value)}
      className='
        w-full p-2 bg-black
        border-b border-dashed border-lime-400 outline-none
        text-lime-400
      '
    />

    <div className='flex gap-2 pt-2'>
      <FaXmark
        onClick={onCancel}
        className='text-lg text-lime-400 cursor-pointer'
      />

      <button type='submit'>
        <FaCheck
          className='text-lg text-lime-400 cursor-pointer'
        />
      </button>
    </div>
  </form>
))
PasswordForm.displayName = 'PasswordForm'

// 삭제 버튼 컴포넌트
const DeleteButton = memo(({ onClick }: { onClick: () => void }) => (
  <div onClick={() => {}} className='h-full flex justify-end items-center'>
    <FaRegTrashCan 
      onClick={onClick}
      className='text-lime-400 cursor-pointer'  
    />
  </div>
))
DeleteButton.displayName = 'DeleteButton'

const Comment = ({ blogId, refreshPage, comment } : TCommentProps) => {
  // 초기 상태
  const initialState: CommentState = {
    showPasswordInput: false,
    passwordInput: ''
  }

  const [state, dispatch] = useReducer(commentReducer, initialState)
  const { showPasswordInput, passwordInput } = state

  const handlePasswordChange = (value: string) => {
    dispatch({ type: 'SET_PASSWORD_INPUT', payload: value })
  }

  const showPasswordForm = () => {
    dispatch({ type: 'SHOW_PASSWORD_INPUT' })
  }

  const hidePasswordForm = () => {
    dispatch({ type: 'HIDE_PASSWORD_INPUT' })
  }

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (passwordInput.length === 0) {
      var inputTag = document.getElementById('passwordInputTag')
      if (inputTag) inputTag.focus()
      Notifications.invalidComment()
      return
    }

    if (comment.password !== passwordInput) {
      dispatch({ type: 'CLEAR_PASSWORD_INPUT' })
      Notifications.commentFailed('Password doesn\'t match. Please try again')
      return
    }

    try {
      await fetch(`/api/comments/${comment._id}/?blogId=${blogId}`, {
        method: 'DELETE',
      })

      refreshPage()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <ToastContainer />

      <div className='
        p-3 py-2 rounded-lg
        border border-dashed border-lime-400
      '>
        <CommentHeader writer={comment.writer} createdAt={comment.createdAt} />
        
        <p className='text-lime-400'>{comment.comment}</p>

        <div className='h-8 mb-1'>
          {showPasswordInput ? (
            <PasswordForm
              passwordInput={passwordInput}
              onChangePassword={handlePasswordChange}
              onSubmit={handleDelete}
              onCancel={hidePasswordForm}
            />
          ) : (
            <DeleteButton onClick={showPasswordForm} />
          )}
        </div>
      </div>
    </>
  )
}

export default memo(Comment)