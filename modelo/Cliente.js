
import Joi from 'joi'


class Cliente {
    nombre = null
    edad = null
    mail = null

    constructor({nombre, edad, mail}) {    
        this.nombre = nombre
        this.edad = edad
        this.mail = mail
    }

    validar() {
        const schemaCliente = Joi.object({
            nombre: Joi.string().min(3).max(30).required(),
            edad: Joi.number().min(18).max(100).required(),
            mail: Joi.string().email().required()
        });

        const { error } = schemaCliente.validate({
            nombre: this.nombre,
            edad: this.edad,
            mail: this.mail
        });

        if(error) {
            throw new Error(error)
        }
    }

    get() {
        return {
            nombre: this.nombre,
            edad: this.edad,
            mail: this.mail
        }
    }
}

export default Cliente