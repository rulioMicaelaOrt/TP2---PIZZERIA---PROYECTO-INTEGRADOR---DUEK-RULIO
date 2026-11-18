
import express from 'express'
import ControladorUsuarios from '../controlador/usuarios.js'

class Router {
    #controlador = null

    constructor() {
        this.#controlador = new ControladorUsuarios()
    }

    start() {
        const router = express.Router()

        router.post('/registro', this.#controlador.registrarUsuario)
        router.post('/login', this.#controlador.login)

        return router
    }
}

export default Router
