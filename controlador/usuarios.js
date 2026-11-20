
import Usuarios from '../servicio/usuarios.js'

class ControladorUsuarios {
    #servicio = null

    constructor() {
        this.#servicio = new Usuarios()
    }

    obtenerUsuarios = async (req, res) => {
        try {
            const usuario = req.usuario
            const usuarios = await this.#servicio.obtenerUsuarios(usuario)
            res.json(usuarios)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    obtenerUsuarioPorId = async (req, res) => {
    try {
        const id = req.params.id
        const usuario = await this.#servicio.obtenerUsuarioPorId(id)
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }
        res.json(usuario)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
actualizarUsuario = async (req, res) => {
    try {
        const id = req.params.id
        const usuario = req.body
        const usuarioAutenticado = req.usuario
        const usuarioActualizado = await this.#servicio.actualizarUsuario(
            id,
            usuario,
            usuarioAutenticado
        )
        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }
        res.json(usuarioActualizado)
    } catch (error) {
        const status = error.message.includes('permisos') ? 403 : 500
        res.status(status).json({ error: error.message })
    }
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

    borrarUsuario = async (req, res) => {
    try {
        const id = req.params.id
        const usuarioEliminado = await this.#servicio.borrarUsuario(id)

        if (!usuarioEliminado) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        res.json(usuarioEliminado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
}

export default ControladorUsuarios
