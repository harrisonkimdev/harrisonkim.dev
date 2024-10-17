"use client"

import { useState, useEffect } from 'react';
import { IComment } from "@/interfaces"
import AddComment from "./AddComment"
import Comments from "./Comments"

type TCommentsProps = {
  blogId: string | undefined,
  comments: IComment[] | undefined,
  refreshPage: () => void
}

const CommentContainer = ({ blogId, comments, refreshPage } : TCommentsProps ) => {
  const [showAddComment, setShowAddComment] = useState(false);

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
          <span className="font-mono font-normal text-lime-400">
            What other people had to say about this...
          </span>
          <Comments
            blogId={blogId}
            comments={comments}
            refreshPage={() => refreshPage()}
          />
        </div>

        <hr className="border border-dashed border-lime-400" />

        <>
          {!showAddComment ? (
            <div className="flex gap-3 justify-between items-center">
              <span className="font-mono font-normal text-lime-400">
                Do you want to say something?
              </span>
              <button
                onClick={() => setShowAddComment(true)}
                className="
                  px-3 py-2 rounded-lg
                  border border-dashed border-lime-400
                  whitespace-nowrap text-lime-400
                "
              >
                YESSS&nbsp;&nbsp;😎
              </button>
            </div>
          ) : (
            <AddComment
              blogId={blogId}
              fetchComments={() => refreshPage()}
              hideAddComment={() => setShowAddComment(false)}
            />
          )}
        </>
      </div>
    </div>
  )
}

export default CommentContainer