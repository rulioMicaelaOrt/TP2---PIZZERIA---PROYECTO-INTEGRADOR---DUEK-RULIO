import express from 'express'
import Controlador from '../controlador/clientes.js'


class Router {
    #controlador = null

    constructor() {
        this.#controlador = new Controlador()
    }

    start() {
        const router = express.Router()

        router.get('/', this.#controlador.obtenerClientes)
        router.post('/', this.#controlador.guardarCliente )
        router.put('/:id', this.#controlador.actualizarCliente)
        router.delete('/:id', this.#controlador.borrarCliente)

        return router
    }
}

export default Router