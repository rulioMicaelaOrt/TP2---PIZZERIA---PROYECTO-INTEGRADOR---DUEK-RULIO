
import ProductosMongoDb from '../modelo/DAO/productosMongoDB.js'
import Producto from '../modelo/Producto.js'
import PDFDocument from 'pdfkit'


class Servicio {
    #modelo = null

    constructor() {
        this.#modelo = new ProductosMongoDb()
    }

    obtenerProductos = async () => {
        const productos = await this.#modelo.obtenerProductos()
        return productos
    }
    generarPDF = async () => {
    const productos = await this.#modelo.obtenerProductos()
    const doc = new PDFDocument({
        size: 'A4',
        margin: 50
    })
    doc.fontSize(20)
    .text('LA FORNERÍA', { align: 'center' })

    doc.moveDown()

    doc.fontSize(16)
    .text('REPORTE DE INVENTARIO', { align: 'center' })

    doc.moveDown()

    doc.fontSize(10)
    .text(`Fecha de generación: ${new Date().toLocaleDateString('es-AR')}`)

    doc.moveDown(2)
    // ENCABEZADOS DE LA TABLA
    doc.fontSize(11)
    .text('PRODUCTO', 50, doc.y, { continued: true })
    .text('PRECIO', 230, doc.y, { continued: true })
    .text('STOCK', 340, doc.y, { continued: true })
    .text('VALOR TOTAL', 420, doc.y)

    doc.moveDown()

    doc.moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke()

doc.moveDown()

// RECORRER LOS PRODUCTOS
productos.forEach(producto => {
    const valorTotal = producto.precio * producto.stock
    doc.fontSize(10)
        .text(producto.nombre, 50, doc.y, { continued: true })
        .text(`$${producto.precio}`, 230, doc.y, { continued: true })
        .text(producto.stock.toString(), 340, doc.y, { continued: true })
        .text(`$${valorTotal}`, 420, doc.y)
    doc.moveDown()

})
// CALCULAR TOTALES DEL INVENTARIO

const cantidadTotal = productos.reduce((total, producto) => {
    return total + producto.stock
}, 0)

const valorInventario = productos.reduce((total, producto) => {
    return total + (producto.precio * producto.stock)
}, 0)
    doc.moveDown(2)
    doc.moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke()
    doc.moveDown()
    doc.fontSize(12)
    .text(`Cantidad total de unidades: ${cantidadTotal}`)
    doc.moveDown()
    doc.fontSize(14)
    .text(`VALOR TOTAL DEL INVENTARIO: $${valorInventario}`)
    return doc
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