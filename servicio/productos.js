
import ProductosMongoDb from '../modelo/DAO/productosMongoDB.js'
import Producto from '../modelo/Producto.js'


class Servicio {
    #modelo = null

    constructor() {
        this.#modelo = new ProductosMongoDb()
    }

    obtenerProductos = async () => {
        const productos = await this.#modelo.obtenerProductos()
        return productos
    }

    guardarProducto = async producto => {
        const productoModelo = new Producto(producto)           
        productoModelo.validar()
        const productoGuardado = await this.#modelo.guardarProducto(productoModelo.get())
        return productoGuardado
    }

    actualizarProducto = async (id, producto) => {
    const productoActualizado = new Producto(producto)
    productoActualizado.validar()
    const productoActualizadoActualizado = await this.#modelo.actualizarProducto(id, producto)
    return productoActualizadoActualizado
}

    borrarProducto = async id => {
        const productoEliminado = await this.#modelo.borrarProducto(id)
        return productoEliminado
    }
}

export default Servicio