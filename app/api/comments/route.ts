import { NextResponse } from "next/server"
import blog from "@/models/blog"

export async function POST(req: Request) {
    const data = await req.json()
    console.log(data)

    // TODO: validation checks

    const blogItem = await blog.findOneAndUpdate(
        { _id: data.blogId },
        { $push: {
            comments: { writer: data.writer, comment: data.comment, password: data.password }
        }},
        { new: true }
    )
        .then(updatedDocument => {
            if (updatedDocument) {
                console.log('Updated Blog:', updatedDocument);
            } else {
                console.log('Blog not found.');
            }
        })
        .catch(error => {
            console.error('Error updating mainDocument:', error)
        })
    
    return NextResponse.json({ message: "Your comment is added" }, { status: 200 })
}