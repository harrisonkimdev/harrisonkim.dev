import React from 'react'

import AddComment from './AddComment'
import ReadComments from './ReadComments'

const ReplyBox = ({ blogId }: { blogId: string}) => {
    return (
        <div className='p-2 border border-stone-200 shadow-md rounded-lg bg-stone-100'>
            <AddComment blogId={blogId} />

            <ReadComments />
        </div>
    )
}

export default ReplyBox