
import { MongoClient } from 'mongodb'

const URI = 'mongodb://127.0.0.1:27017'
const BASE = 'pizzeria'

const client = new MongoClient(URI)

const conectarMongoDB = async () => {
    await client.connect()
    return client.db(BASE)
}

export default conectarMongoDB
