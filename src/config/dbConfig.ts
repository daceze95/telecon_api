import mongoose from 'mongoose';

// const clientOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000, // Optional: Timeout after 5 seconds if unable to connect
//   }
// { serverApi: { version: "1"} };

export const dbConnection = async() => {
  try {
    if(!process.env.MONGO_URI) throw new Error("Connection string not found.")
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
     await mongoose.connect(process.env.MONGO_URI as string);
    // await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.log(err)
   }
}
