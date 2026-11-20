
import jwt from 'jsonwebtoken'

import 'dotenv/config'

const SECRET = process.env.JWT_SECRET

const generarToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' })
}

const verificarToken = (token) => {
    return jwt.verify(token, SECRET)
}

export { generarToken, verificarToken }
