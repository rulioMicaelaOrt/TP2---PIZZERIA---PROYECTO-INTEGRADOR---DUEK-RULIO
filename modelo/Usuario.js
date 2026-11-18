
import Joi from 'joi'

class Usuario {
    nombre = null
    mail = null
    password = null
    rol = 'usuario'

    constructor({ nombre, mail, password }) {
        this.nombre = nombre
        this.mail = mail
        this.password = password
        this.rol = 'usuario'
    }

    validar() {
        const schemaUsuario = Joi.object({
            nombre: Joi.string().min(3).max(30).required(),
            mail: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })

        const { error } = schemaUsuario.validate({
            nombre: this.nombre,
            mail: this.mail,
            password: this.password
        })

        if (error) throw new Error(error)
    }

    get() {
        return {
            nombre: this.nombre,
            mail: this.mail,
            password: this.password,
            rol: this.rol
        }
    }
}

export default Usuario
