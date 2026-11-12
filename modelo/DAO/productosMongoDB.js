
import conectarMongoDB from '../../config/mongodb.js'
import { ObjectId } from 'mongodb'

class ProductosMongoDB {
    constructor() {}

    obtenerProductos = async () => {
        const db = await conectarMongoDB()
        return await db.collection('productos').find({}).toArray()
    }

    guardarProducto = async producto => {
        const db = await conectarMongoDB()

        const resultado = await db.collection('productos').insertOne(producto)

        return {
            ...producto,
            _id: resultado.insertedId
        }
    }

    actualizarProducto = async (id, producto) => {
        const db = await conectarMongoDB()

        const resultado = await db.collection('productos').updateOne(
            { _id: new ObjectId(id) },
            { $set: producto }
        )
        if (resultado.matchedCount === 0) return null
        return await db.collection('productos').findOne({ _id: new ObjectId(id) })
    }

    borrarProducto = async id => {
        const db = await conectarMongoDB()
        const filtro = { _id: new ObjectId(id) }
        const producto = await db.collection('productos').findOne(filtro)
        if (!producto) return null
        await db.collection('productos').deleteOne(filtro)
        return producto
    }
}

export default ProductosMongoDB
