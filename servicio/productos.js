
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

    // FORMATO DE LOS IMPORTES
    const formatoPrecio = new Intl.NumberFormat('es-AR')

    // TÍTULO
    doc.fontSize(20)
        .text('LA FORNERÍA', { align: 'center' })

    doc.moveDown()

    doc.fontSize(16)
        .text('REPORTE DE INVENTARIO', { align: 'center' })

    doc.moveDown()

    // FECHA
    doc.fontSize(10)
        .text(`Fecha de generación: ${new Date().toLocaleDateString('es-AR')}`)

    doc.moveDown(2)

    // POSICIONES Y ANCHOS DE LAS COLUMNAS
    const columnas = {
        producto: { x: 50, width: 220 },
        precio: { x: 285, width: 75 },
        stock: { x: 375, width: 55 },
        valor: { x: 440, width: 105 }
    }

    // ENCABEZADOS
    const yEncabezado = doc.y

    doc.fontSize(11)

    doc.text('PRODUCTO', columnas.producto.x, yEncabezado, {
        width: columnas.producto.width
    })

    doc.text('PRECIO', columnas.precio.x, yEncabezado, {
        width: columnas.precio.width,
        align: 'right'
    })

    doc.text('STOCK', columnas.stock.x, yEncabezado, {
        width: columnas.stock.width,
        align: 'right'
    })

    doc.text('VALOR TOTAL', columnas.valor.x, yEncabezado, {
        width: columnas.valor.width,
        align: 'right'
    })

    doc.moveDown(2)

    // LÍNEA SEPARADORA
    doc.moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke()

    doc.moveDown()

    // RECORRER LOS PRODUCTOS
    productos.forEach(producto => {

        const valorTotal = producto.precio * producto.stock

        // Guardamos la posición vertical de esta fila
        const yFila = doc.y

        doc.fontSize(10)

        doc.text(producto.nombre, columnas.producto.x, yFila, {
            width: columnas.producto.width
        })

        doc.text(`$${formatoPrecio.format(producto.precio)}`,
            columnas.precio.x, yFila, {
                width: columnas.precio.width,
                align: 'right'
            }
        )

        doc.text(producto.stock.toString(),
            columnas.stock.x, yFila, {
                width: columnas.stock.width,
                align: 'right'
            }
        )

        doc.text(`$${formatoPrecio.format(valorTotal)}`,
            columnas.valor.x, yFila, {
                width: columnas.valor.width,
                align: 'right'
            }
        )

        doc.moveDown(1.5)
    })

    // TOTALES DEL INVENTARIO
    const cantidadTotal = productos.reduce((total, producto) => {
        return total + producto.stock
    }, 0)

    const valorInventario = productos.reduce((total, producto) => {
        return total + (producto.precio * producto.stock)
    }, 0)

    doc.moveDown()

    doc.moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke()

    doc.moveDown()

    // TOTALES DEL INVENTARIO
doc.moveDown(2)
doc.moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke()
doc.moveDown()
doc.fontSize(11)
    .text(`Cantidad total de unidades: ${cantidadTotal}`, 50, doc.y, {
        width: 495,
        align: 'right'
    })

doc.moveDown()
doc.fontSize(13)
    .text(`VALOR TOTAL DEL INVENTARIO: $${formatoPrecio.format(valorInventario)}`, 50, doc.y, {
        width: 495,
        align: 'right',
        lineBreak: false
    })

    return doc
}

    guardarProducto = async producto => {
        const productoModelo = new Producto(producto)           
        productoModelo.validar()
        const productoGuardado = await this.#modelo.guardarProducto(productoModelo.get())
        return productoGuardado
    }

    actualizarProducto = async (id, producto) => {
    const productoModelo = new Producto(producto)
    productoModelo.validarParcial(producto)
    const productoActualizado = await this.#modelo.actualizarProducto(id, producto)
    return productoActualizado
}

    borrarProducto = async id => {
        const productoEliminado = await this.#modelo.borrarProducto(id)
        return productoEliminado
    }
}

export default Servicio