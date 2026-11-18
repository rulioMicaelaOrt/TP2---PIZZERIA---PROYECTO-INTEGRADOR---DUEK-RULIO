
import { verificarToken } from '../config/jwt.js'

const autenticacion = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            throw new Error('Token no proporcionado')
        }

        const token = authHeader.split(' ')[1]

        if (!token) {
            throw new Error('Formato de token inválido')
        }

        const payload = verificarToken(token)

        req.usuario = payload

        next()

    } catch (error) {
        return res.status(401).json({
            error: 'No autorizado',
            detalle: error.message
        })
    }
}

export default autenticacion
