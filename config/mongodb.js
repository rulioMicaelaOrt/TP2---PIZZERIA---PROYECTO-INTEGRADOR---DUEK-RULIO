
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const URI = process.env.MONGO_URI
const BASE = process.env.MONGO_DB

const client = new MongoClient(URI)

const conectarMongoDB = async () => {
    await client.connect()
    return client.db(BASE)
}

export default conectarMongoDB