'use client'

import React from 'react'
import { IComment } from '@/interfaces/index'
import Comment from '@/app/blogs/(components)/Comment'

interface ICommentProps {
  blogId: string | undefined,
  comments: IComment[] | undefined,
  refreshPage: () => void
}

const Comments = ({ blogId, comments, refreshPage } : ICommentProps) => {
  return (
    <>
      { comments?.map((comment: IComment, index) => (
        <Comment key={index}
          blogId={blogId}
          refreshPage={() => refreshPage()}
          comment={comment}
        />
      )) }
    </>
  )
}

export default Comments