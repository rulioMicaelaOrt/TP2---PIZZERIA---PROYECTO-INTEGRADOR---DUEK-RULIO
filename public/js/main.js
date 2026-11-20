
const API = axios.create({
    baseURL: 'http://localhost:8080'
})

const resultado = document.getElementById('resultado')
const estadoSesion = document.getElementById('estadoSesion')


// TOKEN Y AUTENTICACIÓN

API.interceptors.request.use(config => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})


// MOSTRAR RESULTADOS

function mostrarResultado(status, datos) {
    resultado.textContent =
        `Estado HTTP: ${status}\n\n` +
        JSON.stringify(datos, null, 2)
}


// FUNCIÓN GENERAL PARA LAS PETICIONES

async function peticion(ruta, metodo = 'GET', datos = null) {
    try {
        const respuesta = await API({
            url: ruta,
            method: metodo,
            data: datos
        })

        mostrarResultado(respuesta.status, respuesta.data)

        return {
            ok: true,
            datos: respuesta.data
        }

    } catch (error) {

        if (error.response) {
            mostrarResultado(
                error.response.status,
                error.response.data
            )

            return {
                ok: false,
                datos: error.response.data
            }
        }

        mostrarResultado('Error de conexión', {
            error: error.message
        })

        return {
            ok: false,
            datos: null
        }
    }
}


// MOSTRAR USUARIO CONECTADO

function actualizarSesion() {
    const token = localStorage.getItem('token')

    if (!token) {
        estadoSesion.textContent = 'No hay ningún usuario conectado.'
        return
    }

    try {
        const partes = token.split('.')

        const payload = JSON.parse(
            atob(partes[1].replace(/-/g, '+').replace(/_/g, '/'))
        )

        estadoSesion.textContent =
            `¡Hola, ${payload.nombre}! Tu rol es: ${payload.rol}`

    } catch (error) {
        estadoSesion.textContent = 'El token no es válido.'
    }
}

actualizarSesion()


// INICIAR SESIÓN

document.getElementById('formLogin').addEventListener('submit', async event => {
    event.preventDefault()

    const datos = {
        mail: document.getElementById('loginMail').value,
        password: document.getElementById('loginPassword').value
    }

    const respuesta = await peticion('/usuarios/login', 'POST', datos)

    if (respuesta.ok && respuesta.datos.token) {
        localStorage.setItem('token', respuesta.datos.token)

        actualizarSesion()

        mostrarResultado(200, {
            mensaje: 'Sesión iniciada correctamente.'
        })
    }
})


// CERRAR SESIÓN

document.getElementById('btnCerrarSesion').addEventListener('click', () => {
    localStorage.removeItem('token')

    actualizarSesion()

    mostrarResultado(200, {
        mensaje: 'Sesión cerrada correctamente.'
    })
})


// REGISTRAR USUARIO

document.getElementById('formRegistro').addEventListener('submit', async event => {
    event.preventDefault()

    const datos = {
        nombre: document.getElementById('registroNombre').value,
        edad: Number(document.getElementById('registroEdad').value),
        mail: document.getElementById('registroMail').value,
        password: document.getElementById('registroPassword').value
    }

    const respuesta = await peticion('/usuarios/registro', 'POST', datos)

    if (respuesta.ok) {
        event.target.reset()
    }
})


// VER USUARIOS

document.getElementById('btnObtenerUsuarios').addEventListener('click', async () => {
    await peticion('/usuarios')
})


// VER USUARIO POR ID

document.getElementById('formBuscarUsuario').addEventListener('submit', async event => {
    event.preventDefault()

    const id = document.getElementById('buscarUsuarioId').value

    await peticion(`/usuarios/${id}`)
})


// EDITAR USUARIO POR ID

document.getElementById('formActualizarUsuario').addEventListener('submit', async event => {
    event.preventDefault()

    const id = document.getElementById('actualizarUsuarioId').value

    const datos = {}

    const nombre = document.getElementById('actualizarNombre').value
    const edad = document.getElementById('actualizarEdad').value
    const mail = document.getElementById('actualizarMail').value
    const password = document.getElementById('actualizarPassword').value
    const rol = document.getElementById('actualizarRol').value

    if (nombre !== '') datos.nombre = nombre
    if (edad !== '') datos.edad = Number(edad)
    if (mail !== '') datos.mail = mail
    if (password !== '') datos.password = password
    if (rol !== '') datos.rol = rol

    if (Object.keys(datos).length === 0) {
        mostrarResultado('-', {
            error: 'Ingresá al menos un campo para modificar.'
        })
        return
    }

    await peticion(`/usuarios/${id}`, 'PUT', datos)
})


// ELIMINAR USUARIO POR ID

document.getElementById('formEliminarUsuario').addEventListener('submit', async event => {
    event.preventDefault()

    const id = document.getElementById('eliminarUsuarioId').value

    await peticion(`/usuarios/${id}`, 'DELETE')
})


// VER PRODUCTOS

document.getElementById('btnObtenerProductos').addEventListener('click', async () => {
    await peticion('/productos')
})


// CREAR PRODUCTO

document.getElementById('formCrearProducto').addEventListener('submit', async event => {
    event.preventDefault()

    const datos = {
        nombre: document.getElementById('productoNombre').value,
        precio: Number(document.getElementById('productoPrecio').value),
        descripcion: document.getElementById('productoDescripcion').value,
        stock: Number(document.getElementById('productoStock').value)
    }

    const respuesta = await peticion('/productos', 'POST', datos)

    if (respuesta.ok) {
        event.target.reset()
    }
})


// EDITAR PRODUCTO POR ID

document.getElementById('formActualizarProducto').addEventListener('submit', async event => {
    event.preventDefault()

    const id = document.getElementById('actualizarProductoId').value

    const datos = {}

    const nombre = document.getElementById('actualizarProductoNombre').value
    const precio = document.getElementById('actualizarProductoPrecio').value
    const descripcion = document.getElementById('actualizarProductoDescripcion').value
    const stock = document.getElementById('actualizarProductoStock').value

    if (nombre !== '') datos.nombre = nombre
    if (precio !== '') datos.precio = Number(precio)
    if (descripcion !== '') datos.descripcion = descripcion
    if (stock !== '') datos.stock = Number(stock)

    if (Object.keys(datos).length === 0) {
        mostrarResultado('-', {
            error: 'Ingresá al menos un campo para modificar.'
        })
        return
    }

    await peticion(`/productos/${id}`, 'PUT', datos)
})


// ELIMINAR PRODUCTO POR ID

document.getElementById('formEliminarProducto').addEventListener('submit', async event => {
    event.preventDefault()

    const id = document.getElementById('eliminarProductoId').value

    await peticion(`/productos/${id}`, 'DELETE')
})


// GENERAR PDF

document.getElementById('btnGenerarPDF').addEventListener('click', async () => {
    try {
        const respuesta = await API.get('/productos/pdf', {
            responseType: 'blob'
        })

        const archivo = new Blob([respuesta.data], {
            type: 'application/pdf'
        })

        const url = URL.createObjectURL(archivo)

        const enlace = document.createElement('a')
        enlace.href = url
        enlace.download = 'productos.pdf'
        enlace.click()

        URL.revokeObjectURL(url)

        mostrarResultado(respuesta.status, {
            mensaje: 'PDF generado correctamente.'
        })

    } catch (error) {
        if (error.response) {
            mostrarResultado(error.response.status, {
                error: 'No se pudo generar el PDF.'
            })
        } else {
            mostrarResultado('Error de conexión', {
                error: error.message
            })
        }
    }
})
