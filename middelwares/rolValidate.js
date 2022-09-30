

const roleValidator= ( req, res, next ) => {

    if(! req.user) {
        return res.status(500).json({
            msg: 'se quiere verificar el role sin validar el token primero'
        })
    }

    const {role, name} = req.user;

    if(role !== 'Admin_Role') {
        return res.status(500).json({
            msg: `${name} no es administrador(a) - no puede hacer esto`
        })
    }

    next();
}


const haveRole = (...roles) => {

    return (req, res, next) => {

        if(! req.user) {
            return res.status(500).json({
                msg: 'se quiere verificar el role sin validar el token primero'
            })
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `el servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    roleValidator,
    haveRole
}