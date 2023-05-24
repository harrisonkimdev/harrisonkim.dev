import { connectToDB } from '@/utils/db'
import Guestbook from '@/models/guestbook'

// show
export const GET = async (req: Request, { params } : { params: { id: string }; }) => {
  try {
    await connectToDB()

    const query = Guestbook.where({ _id: params.id })
    const guestbooks = await query.findOne()

    return new Response(JSON.stringify(guestbooks), {
      status: 200,
    })
  } catch (err) {
    // 
  }
}

// update
export const PATCH = async (req: Request ) => {
  const { _id, title, content, writer, password, viewCount, createdAt, updatedAt } = await req.json()

  try {
    const query = Guestbook.findById(_id, (err, doc) => {
      if (err) {
        console.error(err)
        return
      }

      if (!doc) {
        console.log("Document not found")
        return
      }

      console.log(doc)
      doc.viewCount = viewCount

      doc.save((err) => {
        if (err) {
          console.error(err)
          return
        }
        console.log("Document updated")
      })
    })

    return new Response('hey', { status: 200 })
  } catch (err) {
    // 
  }
}

// delete
export const DELETE = async (req: Request, { params }: { params: { id: string }} ) => {
  try {
    const result = await Guestbook.deleteOne({ _id: params.id })

    if (result.acknowledged === true) {
      return new Response('deleted', { status: 200 })
    } else {
      return new Response('not deleted', { status: 400 })
    }
  } catch (err) {
    // 
  }
}