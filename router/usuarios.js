
import express from 'express'
import ControladorUsuarios from '../controlador/usuarios.js'
import autenticacion from '../middleware/autenticacion.js'
import autorizacion from '../middleware/autorizacion.js'
class Router {
    #controlador = null

    constructor() {
        this.#controlador = new ControladorUsuarios()
    }

    start() {
    const router = express.Router()
    router.post('/registro', this.#controlador.registrarUsuario)
    router.post('/login', this.#controlador.login)
    router.get('/', autenticacion, this.#controlador.obtenerUsuarios)
    router.put('/:id', autenticacion, this.#controlador.actualizarUsuario)
    router.delete('/:id', autenticacion, autorizacion('admin'), this.#controlador.borrarUsuario)
    router.get('/:id', autenticacion, autorizacion('admin'), this.#controlador.obtenerUsuarioPorId)
    return router
}
}

export default Router
