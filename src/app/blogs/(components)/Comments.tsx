"use client"

import { memo } from 'react'
import { IComment } from "@/interfaces/index"
import Comment from "@/app/blogs/(components)/Comment"

interface ICommentProps {
  blogId: string | undefined,
  comments: IComment[] | undefined,
  refreshPage: () => void
}

const Comments = memo(({ blogId, comments, refreshPage } : ICommentProps) => {
  return (
    <div className="space-y-3">
      {comments?.map((comment: IComment, index) => (
        <Comment
          key={index}
          blogId={blogId}
          refreshPage={refreshPage}
          comment={comment}
        />
      ))}
    </div>
  )
})
Comments.displayName = 'Comments'

export default Comments