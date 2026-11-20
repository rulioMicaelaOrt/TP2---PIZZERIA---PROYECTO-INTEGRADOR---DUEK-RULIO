
const autorizacion = (...rolesPermitidos) => {
    return (req, res, next) => {

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                error: 'No tenés permisos para realizar esta operación'
            })
        }

        next()
    }
}

export default autorizacion
