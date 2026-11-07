
import ClientesMongoDB from './modelo/DAO/clientesMongoDB.js'

const dao = new ClientesMongoDB()

const ejecutar = async () => {
    try {
        // OBTENER TODOS
        const clientes = await dao.obtenerClientes()
        console.log('Todos los clientes:', clientes)
        // GUARDAR
        const cliente = await dao.guardarCliente({
            nombre: 'Micaelaaaaaaaaaa',
            edad: 25,
            mail: 'micaaaaaaaa@gmail.com'
        })

        console.log('Cliente guardado:', cliente)

        

        // OBTENER UNO
        const clienteBuscado = await dao.obtenerCliente(cliente._id)
        console.log('Cliente buscado:', clienteBuscado)

        // ACTUALIZAR
        const clienteActualizado = await dao.actualizarCliente(
            cliente._id,
            { edad: 30 }
        )
        console.log('Cliente actualizado:', clienteActualizado)
        // OBTENER TODOS
        const clientess = await dao.obtenerClientes()
        console.log('Todos los clientes:', clientess)

        // BORRAR
        const clienteBorrado = await dao.borrarCliente(cliente._id)
        console.log('Cliente borrado:', clienteBorrado)

    } catch (error) {
        console.log('Error:', error.message)
    }
}

ejecutar()
