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
    <div className='p-2 shadow-md rounded-lg bg-zinc-950'>
      <Comments
        blogId={blogId}
        comments={comments}
        refreshPage={() => refreshPage()}
      />
      <AddComment blogId={blogId} fetchComments={() => refreshPage()} />
    </div>
  )
}

export default CommentContainer