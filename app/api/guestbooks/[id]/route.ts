import { connectToDB } from '@/utils/db'
import Guestbook from '@/models/guestbook'
import { IGuestbook } from '@/guestbooks/interfaces';

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
export const PATCH = async (req: Request, { params }: { params: { id: string }}) => {
  const { title, content, updatedAt } = await req.json()

  try {
    await connectToDB()

    const guestbook = await Guestbook.findByIdAndUpdate({ _id:params.id }, {
      title,
      content,
      updatedAt: Date.now()
    })

    return new Response(JSON.stringify(guestbook), { status: 200 })

  } catch (err) {
    console.log(err)
  }
}

// delete
export const DELETE = async (req: Request, { params }: { params: { id: string }} ) => {
  try {
    await connectToDB()

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