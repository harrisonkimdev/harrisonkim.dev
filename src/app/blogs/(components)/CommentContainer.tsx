import { IComment } from '@/interfaces'
import AddComment from './AddComment'
import Comments from './Comments'

type TCommentsProps = {
  blogId: string | undefined,
  comments: IComment[] | undefined,
  refreshPage: () => void
}

const CommentContainer = ({ blogId, comments, refreshPage } : TCommentsProps ) => {
  return (
    <div className='p-2 border border-stone-200 shadow-md rounded-lg bg-stone-100'>
      <AddComment blogId={blogId} fetchComments={() => refreshPage()} />
      <Comments
        blogId={blogId}
        comments={comments}
        refreshPage={() => refreshPage()}
      />
    </div>
  )
}

export default CommentContainer