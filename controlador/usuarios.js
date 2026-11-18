
import Usuarios from '../servicio/usuarios.js'

class ControladorUsuarios {
    #servicio = null

    constructor() {
        this.#servicio = new Usuarios()
    }

    registrarUsuario = async (req, res) => {
        try {
            const usuario = await this.#servicio.registrarUsuario(req.body)

            res.status(201).json(usuario)

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    login = async (req, res) => {
        try {
            const resultado = await this.#servicio.login(req.body)

            res.status(200).json(resultado)

        } catch (error) {
            res.status(401).json({ error: error.message })
        }
    }
}

export default ControladorUsuarios
