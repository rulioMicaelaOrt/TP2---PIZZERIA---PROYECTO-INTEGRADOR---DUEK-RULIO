import Servicio from '../servicio/clientes.js'


class Controlador {
    #servicio = null

    constructor() {
        this.#servicio = new Servicio()
    }

    obtenerClientes = async (req,res) => {
        try {
            const clientes = await this.#servicio.obtenerClientes()
            res.json(clientes)
        }
        catch(error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    guardarCliente = async (req,res) => {
        try {
            const cliente = req.body
            const clienteGuardado = await this.#servicio.guardarCliente(cliente)
            res.json(clienteGuardado)    
        }
        catch(error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    actualizarCliente = async (req,res) => {
        try {
            const id  = req.params.id
            const cliente = req.body
            const clienteActualizado = await this.#servicio.actualizarCliente(id,cliente)
            res.json(clienteActualizado)
        }
        catch(error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    borrarCliente = async (req,res) => {
        try {
            const id = req.params.id
            const clienteEliminado = await this.#servicio.borrarCliente(id)
            res.json(clienteEliminado)
        }
        catch(error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }
}

export default Controlador

