const User = require('../models/User');
const jwt =require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
    console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((error, user) => {
        console.log('reached signup endpint')
        if (error) {
            return res.status(400).json({
                message: "fijate q hubo un error capo"
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })
    })
}

 
exports.signin = (req, res) => {
    const {email, password} = req.body
    User.findOne({email}, (error, user) => {
        if(error||!user) {
            return res.status(400).json({
                message:"No se encuentra el usuario"
            })
        }
        if(!user.authenticate(password)) {
            return res.status(400).json({
                message: "la pass esta mal"
            })
        }
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
        // persiste el token como t en la cookie con fecha de vencimiento
        res.cookie('t', token, {expire: new Date() + 9999})
        // devuelve una respuesta con el usuario y el token al frontend
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, email, name, role}})
    })
}

exports.signout = (req,res) => {
    res.clearCookie('t')
    res.json({message: "Signout success"})
}

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err,user) => {
        if(err||!user) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user
        next()
    })
}



/* exports.isAdmin = (req, res , next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
        if(!user){
            return res.status(400).json({
                message: "Acceso denegado"
            })
        }
    next();
} */