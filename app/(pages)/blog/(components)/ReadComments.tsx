'use client'

import React from 'react'
import { IComment } from '@/interfaces/index'
import Comment from '@/(pages)/blog/(components)/Comment'

const ReadComments = (
  {
    blogId,
    comments,
    fetchComments
  } :
  {
    blogId: string | undefined,
    comments: IComment[] | undefined,
    fetchComments: any
  }
) => {
  return (
    <>
      { comments?.map((comment: IComment, index) => (
        <Comment key={index}
          blogId={blogId}
          fetchComments={() => fetchComments()}
          comment={comment}
        />
      )) }
    </>
  )
}

export default ReadComments