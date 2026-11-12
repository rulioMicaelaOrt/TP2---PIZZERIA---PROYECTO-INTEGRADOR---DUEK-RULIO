
import jwt from 'jsonwebtoken'

const SECRET = 'clave_secreta_pizzeria'

const generarToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' })
}

const verificarToken = (token) => {
    return jwt.verify(token, SECRET)
}

export { generarToken, verificarToken }
