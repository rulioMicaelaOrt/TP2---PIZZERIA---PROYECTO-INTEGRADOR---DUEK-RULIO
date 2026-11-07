
import ProductosMongoDB from './modelo/DAO/productosMongoDB.js'

const dao = new ProductosMongoDB()

// 1. OBTENER TODOS
console.log('\n------------------------------ OBTENER PRODUCTOS ---')
const productos = await dao.obtenerProductos()
console.log(productos)

// 2. OBTENER UNO
console.log('\n----------------------------- OBTENER PRODUCTO ---')
const producto = await dao.obtenerProducto('6aef6ce79a1389a6c5f8e03f')
console.log(producto)

// 3. GUARDAR
console.log('\n--- GUARDAR PRODUCTO -----------------------------------------------')
const productoGuardado = await dao.guardarProducto({
    nombre: 'Pizza Test',
    precio: 20000,
    descripcion: 'Producto de prueba',
    stock: 5
})
console.log(productoGuardado)

// 1. OBTENER TODOS
console.log('\n------------------------------ OBTENER PRODUCTOS ---')
const productoss = await dao.obtenerProductos()
console.log(productoss)

// 4. ACTUALIZAR
console.log('\n--------------------- ACTUALIZAR PRODUCTO ----------------------------------------')
const productoActualizado = await dao.actualizarProducto(
    productoGuardado._id.toString(),
    { precio: 25000 }
)
console.log(productoActualizado)

// 1. OBTENER TODOS
console.log('\n------------------------------ OBTENER PRODUCTOS ---')
const productosss = await dao.obtenerProductos()
console.log(productosss)

// 5. BORRAR
console.log('\n---------------------- BORRAR PRODUCTO -----------------------------')
const productoEliminado = await dao.borrarProducto(
    productoGuardado._id.toString()
)
console.log(productoEliminado)
