import { expect } from 'chai'
import ServicioProductos from '../servicio/productos.js'


describe('*** TEST DEL SERVICIO GENERAR PDF ***', () => {
    it('Debería generar el documento PDF de inventario (Caso feliz)', async () => {
        const servicio = new ServicioProductos()
        const doc = await servicio.generarPDF()
        //console.log(doc)

        expect(doc).to.include.keys('page', 'version')
        expect(doc.version).to.eql(1.3)
        expect(doc.page).to.be.an('object')
        expect(doc.page.width).to.be.greaterThan(0)
        expect(doc.page.height).to.be.greaterThan(0)

        doc.end()
    })

    it('El documento generado no debería tener una versión PDF distinta a 1.3 (Caso no feliz)', async () => {
        const servicio = new ServicioProductos()
        const doc = await servicio.generarPDF()
        //console.log(doc)

        expect(doc.version).not.to.eql(1.0)

        doc.end()
    })
})
