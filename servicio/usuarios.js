
import bcrypt from 'bcrypt'
import Usuario from '../modelo/Usuario.js'
import UsuariosMongoDB from '../modelo/DAO/usuariosMongoDB.js'
import { generarToken } from '../config/jwt.js'

class Usuarios {
    #modelo = null

    constructor() {
        this.#modelo = new UsuariosMongoDB()
    }
    obtenerUsuarioPorId = async id => {
    const usuarioEncontrado = await this.#modelo.obtenerUsuario(id)
    if (!usuarioEncontrado) return null
    const { password, ...usuarioSinPassword } = usuarioEncontrado
    return usuarioSinPassword
}

    obtenerUsuarios = async usuario => {
        if (usuario.rol === 'admin') {
            const usuarios = await this.#modelo.obtenerUsuarios()
            return usuarios.map(({ password, ...usuario }) => usuario)
        }
        const usuarioEncontrado = await this.#modelo.obtenerUsuario(usuario.id)
        if (!usuarioEncontrado) return null
        const { password, ...usuarioSinPassword } = usuarioEncontrado
        return usuarioSinPassword
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
actualizarUsuario = async (id, usuario, usuarioAutenticado) => {
    if (usuarioAutenticado.rol === 'usuario') {
        if (usuarioAutenticado.id !== id || usuario.rol !== undefined) {
            throw new Error('No tenés permisos para realizar esta operación')
        }
    }
    const usuarioExistente = await this.#modelo.obtenerUsuario(id)
    if (!usuarioExistente) return null
    const usuarioModelo = new Usuario(usuario)
    usuarioModelo.validarEdicion(usuario)
    const usuarioActualizado = { ...usuario }
    if (usuario.password !== undefined) {
        usuarioActualizado.password = await bcrypt.hash(usuario.password, 10)
    }
    const resultado = await this.#modelo.actualizarUsuario(id, usuarioActualizado)
    const { password, ...usuarioSinPassword } = resultado
    return usuarioSinPassword
}
borrarUsuario = async id => {
    const usuarioEliminado = await this.#modelo.borrarUsuario(id)
    return usuarioEliminado
}


}

export default Usuarios
