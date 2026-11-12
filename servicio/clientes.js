
import ClientesMongoDb from '../modelo/DAO/clientesMongoDB.js'
import Cliente from '../modelo/Cliente.js'


class Servicio {
    #modelo = null

    constructor() {
        this.#modelo = new ClientesMongoDb()
    }

    obtenerClientes = async ()=> { 
            const clientes = await this.#modelo.obtenerClientes()
            return clientes    
    }

    guardarCliente = async cliente => {
        const clienteModelo = new Cliente(cliente)           
        clienteModelo.validar()
        const clienteGuardado = await this.#modelo.guardarCliente(clienteModelo.get())
        return clienteGuardado
    }

    actualizarCliente = async (id, cliente) => {
    const clienteModelo = new Cliente(cliente)
    clienteModelo.validar()
    const clienteActualizado = await this.#modelo.actualizarCliente(id, clienteModelo.get())
    return clienteActualizado
}

    borrarCliente = async id => {
        const clienteEliminado = await this.#modelo.borrarCliente(id)
        return clienteEliminado
    }
}

export default Servicio