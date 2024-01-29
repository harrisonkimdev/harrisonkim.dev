import React from 'react'

import AddComment from './AddComment'
import ReadComments from './ReadComments'
import { IComment } from '@/interfaces'

const CommentComponent = (
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
    <div className='p-2 border border-stone-200 shadow-md rounded-lg bg-stone-100'>
      <AddComment blogId={blogId} fetchComments={() => fetchComments()} />

      <ReadComments
        blogId={blogId}
        comments={comments}
        fetchComments={() => fetchComments()}
      />
    </div>
  )
}

export default CommentComponent