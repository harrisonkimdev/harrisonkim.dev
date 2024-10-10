import { IComment } from '@/interfaces'
import AddComment from './AddComment'
import ReadComments from './ReadComments'

type TCommentsProps = {
  blogId: string | undefined,
  comments: IComment[] | undefined,
  fetchComments: any
}

const Comments = ({ blogId, comments, fetchComments } : TCommentsProps ) => {
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

export default Comments