

import Joi from 'joi'


class Producto {
    nombre = null
    precio = null
    stock = null
    descripcion = null


    constructor({nombre, precio, stock, descripcion}) {    
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
        this.descripcion = descripcion
    }

    validar() {
        if(this.nombre == '') throw new Error('El campo nombre es obligatorio')

        const schemaProducto = Joi.object({
            nombre: Joi.string().alphanum().min(3).max(30).required(),
            precio: Joi.number().min(0).max(1000000).required(),
            stock: Joi.number().integer().min(0).max(999).required(),
            descripcion: Joi.string().alphanum().min(5).max(60).required(),
        });

        const { error } = schemaProducto.validate({
            nombre: this.nombre,
            precio: this.precio,
            stock: this.stock,
            descripcion : this.descripcion,
        });

        if(error) {
            throw new Error(error)
        }
    }

    get() {
        return {
            nombre: this.nombre,
            precio: +this.precio,
            stock: parseInt(this.stock),
            descripcion: this.descripcion
        }
    }
}

export default Producto