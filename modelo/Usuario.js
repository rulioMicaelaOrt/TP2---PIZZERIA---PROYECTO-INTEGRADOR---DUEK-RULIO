import Joi from 'joi'

class Usuario {
    nombre = null
    edad = null
    mail = null
    password = null
    rol = 'usuario'

    constructor({ nombre, edad, mail, password }) {
        this.nombre = nombre
        this.edad = edad
        this.mail = mail
        this.password = password
        this.rol = 'usuario'
    }

    validar() {
        const schemaUsuario = Joi.object({
            nombre: Joi.string().min(3).max(30).required(),
            edad: Joi.number().min(18).max(100).required(),
            mail: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })

        const { error } = schemaUsuario.validate({
            nombre: this.nombre,
            edad: this.edad,
            mail: this.mail,
            password: this.password
        })

        if (error) throw new Error(error)
    }

    validarEdicion(usuario) {
        const schemaUsuario = Joi.object({
            nombre: Joi.string().min(3).max(30),
            edad: Joi.number().min(18).max(100),
            mail: Joi.string().email(),
            password: Joi.string().min(8),
            rol: Joi.string().valid('admin', 'usuario')
        }).min(1)

        const { error } = schemaUsuario.validate(usuario)
        if (error) throw new Error(error)
    }

    get() {
        return {
            nombre: this.nombre,
            edad: this.edad,
            mail: this.mail,
            password: this.password,
            rol: this.rol
        }
    }
}

export default Usuario