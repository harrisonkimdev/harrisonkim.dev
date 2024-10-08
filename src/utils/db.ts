import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  if (isConnected) {
    console.log('mongoDB is already connected')
    return
  }

  try {
    await mongoose
      .set({ debug: true, strictQuery: false })
      .connect(`${process.env.MONGODB_URI}`)
      .then((mongoose) => mongoose)

    isConnected = true
    console.log('MongoDB is connected')
  } catch (err) {
    console.log(err)
  }
}