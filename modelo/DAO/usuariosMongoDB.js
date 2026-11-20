import conectarMongoDB from '../../config/mongodb.js'
import { ObjectId } from 'mongodb'

class UsuariosMongoDB {

    obtenerUsuarios = async () => {
        const db = await conectarMongoDB()
        return await db.collection('usuarios').find({}).toArray()
    }

    obtenerUsuario = async id => {
        const db = await conectarMongoDB()
        return await db.collection('usuarios').findOne({
            _id: new ObjectId(id)
        })
    }

    obtenerUsuarioPorMail = async mail => {
        const db = await conectarMongoDB()
        return await db.collection('usuarios').findOne({ mail })
    }

    guardarUsuario = async usuario => {
        const db = await conectarMongoDB()

        const resultado = await db.collection('usuarios').insertOne(usuario)

        return {
            ...usuario,
            _id: resultado.insertedId
        }
    }

    actualizarUsuario = async (id, usuario) => {
        const db = await conectarMongoDB()

        await db.collection('usuarios').updateOne(
            { _id: new ObjectId(id) },
            { $set: usuario }
        )

        return await db.collection('usuarios').findOne({
            _id: new ObjectId(id)
        })
    }

    borrarUsuario = async id => {
        const db = await conectarMongoDB()
        const filtro = { _id: new ObjectId(id) }
        const usuario = await db.collection('usuarios').findOne(filtro)
        if (!usuario) return null
        await db.collection('usuarios').deleteOne(filtro)
        return usuario
    }
}

export default UsuariosMongoDB