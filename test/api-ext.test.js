import { expect } from "chai"
import supertest from "supertest"
import { generarToken } from '../config/jwt.js'

const request = supertest('http://localhost:8080')
const token = generarToken({
    id: '6737b1a2c3d4e5f6a7b8c9e0',
    nombre: 'Admin',
    mail: 'admin@gmail.com',
    rol: 'admin'
})


describe('*** TEST DEL SERVICIO APIRESTful (ext) ***', () => {
    describe('GET', () => {
        it('Debería retornar un status 200 (Caso feliz)', async () => {
            const response = await request.get('/usuarios').set('Authorization', `Bearer ${token}`)
            //console.log(response)

            expect(response.status).to.eql(200)
        })

        it('Debería retornar un status 401 si no se envía token (Caso no feliz)', async () => {
            const response = await request.get('/usuarios')
            //console.log(response)

            expect(response.status).to.eql(401)
        })
    })

    describe('POST', () => {
        it('Debería incorporar un producto (Caso feliz)', async () => {

            const producto = {
                nombre: 'Pizza Napolitana',
                precio: 12500,
                stock: 15,
                descripcion: 'Pizza con salsa de tomate y muzzarella'
            }
            //console.log(producto)

            const response = await request.post('/productos').set('Authorization', `Bearer ${token}`).send(producto)
            //console.log(response)

            expect(response.status).to.eql(200)

            const productoGuardado = response.body
            expect(productoGuardado).to.include.keys('nombre','precio','stock','descripcion','_id')

            expect(productoGuardado.nombre).to.eql(producto.nombre)
            expect(productoGuardado.precio).to.eql(producto.precio)
            expect(productoGuardado.stock).to.eql(producto.stock)
            expect(productoGuardado.descripcion).to.eql(producto.descripcion)
        })

        it('Debería retornar un status 500 si el producto es inválido (Caso no feliz)', async () => {

            const productoInvalido = {
                nombre: 'Pi',
                precio: -100,
                stock: 10,
                descripcion: 'Corta'
            }
            //console.log(productoInvalido)

            const response = await request.post('/productos').set('Authorization', `Bearer ${token}`).send(productoInvalido)
            //console.log(response)

            expect(response.status).to.eql(500)
        })
    })
})
