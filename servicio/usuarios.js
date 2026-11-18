
import bcrypt from 'bcrypt'
import Usuario from '../modelo/Usuario.js'
import UsuariosMongoDB from '../modelo/DAO/usuariosMongoDB.js'
import { generarToken } from '../config/jwt.js'

class Usuarios {
    #modelo = null

    constructor() {
        this.#modelo = new UsuariosMongoDB()
    }

    registrarUsuario = async usuario => {
        const usuarioModelo = new Usuario(usuario)
        usuarioModelo.validar()

        const usuarioExistente = await this.#modelo.obtenerUsuarioPorMail(usuario.mail)

        if (usuarioExistente) {
            throw new Error('El usuario ya está registrado')
        }

        const passwordEncriptada = await bcrypt.hash(usuario.password, 10)

        const usuarioGuardado = await this.#modelo.guardarUsuario({
            ...usuarioModelo.get(),
            password: passwordEncriptada
        })

        const { password, ...usuarioSinPassword } = usuarioGuardado

        return usuarioSinPassword
    }

    login = async ({ mail, password }) => {
        const usuario = await this.#modelo.obtenerUsuarioPorMail(mail)

        if (!usuario) {
            throw new Error('Usuario o contraseña incorrectos')
        }

        const passwordValida = await bcrypt.compare(password, usuario.password)

        if (!passwordValida) {
            throw new Error('Usuario o contraseña incorrectos')
        }

        const payload = {
            id: usuario._id,
            nombre: usuario.nombre,
            mail: usuario.mail,
            rol: usuario.rol
        }

        const token = generarToken(payload)

        return { token }
    }
}

export default Usuarios
