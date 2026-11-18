
import express from 'express'
import Controlador from '../controlador/productos.js'
import autenticacion from '../middleware/autenticacion.js'
import autorizacion from '../middleware/autorizacion.js'


class Router {
    #controlador = null

    constructor() {
        this.#controlador = new Controlador()
    }

    start() {
        const router = express.Router()
        router.get('/pdf', autenticacion, autorizacion('admin'),   this.#controlador.generarPDF)
        router.get('/', this.#controlador.obtenerProductos)
        router.post('/', autenticacion, autorizacion('admin'), this.#controlador.guardarProducto)
        router.put('/:id', autenticacion, autorizacion('admin'), this.#controlador.actualizarProducto)
        router.delete('/:id', autenticacion, autorizacion('admin'), this.#controlador.borrarProducto)
        


        return router
    }
}

export default Router
