import mongoose from "mongoose";

console.log('DB_URL:', process.env.DB_URL);

const connect =  async () =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('connected')
    } catch (error) {
        console.log('error connection')
    }
}

export default connect;