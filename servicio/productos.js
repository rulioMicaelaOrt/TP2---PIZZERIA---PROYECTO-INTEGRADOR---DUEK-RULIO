
import ProductosMongoDb from '../modelo/DAO/productosMongoDB.js'
import Producto from '../modelo/Producto.js'


class Servicio {
    #modelo = null

    constructor() {
        this.#modelo = new ProductosMongoDb()
    }

    obtenerProductos = async id => {
        if(id) {   
            const producto = await this.#modelo.obtenerProducto(id)
            return producto
        }
        else {
            const productos = await this.#modelo.obtenerProductos()
            return productos
        }    
    }

    guardarProducto = async producto => {
        const productoModelo = new Producto(producto)           
        productoModelo.validar()
        const productoGuardado = await this.#modelo.guardarProducto(productoModelo.get())
        return productoGuardado
    }

    actualizarProducto = async (id, producto) => {
        const productoActualizado = await this.#modelo.actualizarProducto(id, producto)
        return productoActualizado
    }

    borrarProducto = async id => {
        const productoEliminado = await this.#modelo.borrarProducto(id)
        return productoEliminado
    }
}

export default Servicio