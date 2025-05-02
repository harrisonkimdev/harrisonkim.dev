"use client"

import { useReducer, useEffect, memo } from 'react';
import { IComment } from "@/interfaces"
import AddComment from "./AddComment"
import Comments from "./Comments"

type TCommentsProps = {
  blogId: string | undefined,
  comments: IComment[] | undefined,
  refreshPage: () => void
}

// 상태 타입
type CommentContainerState = {
  showAddComment: boolean
}

// 액션 타입
type CommentContainerAction =
  | { type: 'SHOW_ADD_COMMENT' }
  | { type: 'HIDE_ADD_COMMENT' }

// 리듀서 함수
const commentContainerReducer = (
  state: CommentContainerState, 
  action: CommentContainerAction
): CommentContainerState => {
  switch (action.type) {
    case 'SHOW_ADD_COMMENT':
      return { ...state, showAddComment: true }
    case 'HIDE_ADD_COMMENT':
      return { ...state, showAddComment: false }
    default:
      return state
  }
}

// 코멘트 헤더 컴포넌트
const CommentHeader = memo(() => (
  <span className="font-mono font-normal text-lime-400">
    What other people had to say about this...
  </span>
))
CommentHeader.displayName = 'CommentHeader'

// 코멘트 구분선 컴포넌트
const CommentDivider = memo(() => (
  <hr className="border border-dashed border-lime-400" />
))
CommentDivider.displayName = 'CommentDivider'

// 코멘트 추가 프롬프트 컴포넌트
const AddCommentPrompt = memo(({ onClick }: { onClick: () => void }) => (
  <div className="flex gap-3 justify-between items-center">
    <span className="font-mono font-normal text-lime-400">
      Do you want to say something?
    </span>
    <button
      onClick={onClick}
      className="
        px-3 py-2 rounded-lg
        border border-dashed border-lime-400
        whitespace-nowrap text-lime-400
      "
    >
      YESSS&nbsp;&nbsp;😎
    </button>
  </div>
))
AddCommentPrompt.displayName = 'AddCommentPrompt'

const CommentContainer = ({ blogId, comments, refreshPage } : TCommentsProps ) => {
  // 초기 상태
  const initialState: CommentContainerState = {
    showAddComment: false
  }

  const [state, dispatch] = useReducer(commentContainerReducer, initialState)
  const { showAddComment } = state

  // 코멘트 추가 폼 토글 핸들러
  const handleShowAddComment = () => {
    dispatch({ type: 'SHOW_ADD_COMMENT' })
  }

  const handleHideAddComment = () => {
    dispatch({ type: 'HIDE_ADD_COMMENT' })
  }

  useEffect(() => {
    if (showAddComment) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [showAddComment]);

  return (
    <div className="flex flex-col items-center">
      <div className="
        max-w-md mt-6 md:mt-10 p-5 space-y-6 rounded-xl
        border border-dashed border-lime-400 
      ">
        <div>
          <CommentHeader />
          <Comments
            blogId={blogId}
            comments={comments}
            refreshPage={refreshPage}
          />
        </div>

        <CommentDivider />

        <>
          {!showAddComment ? (
            <AddCommentPrompt onClick={handleShowAddComment} />
          ) : (
            <AddComment
              blogId={blogId}
              fetchComments={refreshPage}
              hideAddComment={handleHideAddComment}
            />
          )}
        </>
      </div>
    </div>
  )
}

export default memo(CommentContainer)