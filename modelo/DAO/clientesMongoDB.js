
import conectarMongoDB from '../../config/mongodb.js'
import { ObjectId } from 'mongodb'

class ClientesMongoDB {
    constructor() {}

    obtenerClientes = async () => {
        const db = await conectarMongoDB()
        return await db.collection('clientes').find({}).toArray()
    }

    obtenerCliente = async id => {
        const db = await conectarMongoDB()
        return await db.collection('clientes').findOne({ _id: new ObjectId(id) })
    }

    guardarCliente = async cliente => {
        const db = await conectarMongoDB()

        const resultado = await db.collection('clientes').insertOne(cliente)

        return {
            ...cliente,
            _id: resultado.insertedId
        }
    }

    actualizarCliente = async (id, cliente) => {
        const db = await conectarMongoDB()

        const resultado = await db.collection('clientes').updateOne(
            { _id: new ObjectId(id) },
            { $set: cliente }
        )
        if (resultado.matchedCount === 0) return null
        return await db.collection('clientes').findOne({ _id: new ObjectId(id) })
    }

    borrarCliente = async id => {
        const db = await conectarMongoDB()
        const filtro = { _id: new ObjectId(id) }
        const cliente = await db.collection('clientes').findOne(filtro)
        if (!cliente) return null
        await db.collection('clientes').deleteOne(filtro)
        return cliente
    }
}

export default ClientesMongoDB
