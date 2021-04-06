const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const USEREXIST = 11000

const signupUser = (req, res) => {
    res.render('register')
}

const loginUser = (req,res) => {
    res.render('login')
}

const createUser = async (req, res) => {

    try{
    const { email, password} = req.body
    const user = new User({ email, password })
    await user.save()
    res.redirect('/login')
} catch (error) {

    if (error.code === USEREXIST) {
        req.flash('errorUserExists', 'El usuario ya existe')
        res.redirect('/signup')
    }
    
    else {
        // req.flash('errorSignup', 'Se requiere llenar los campos de email y clave')
        
        res.render('register', {errors:error.errors})
        console.log('this is erros email: ', error.errors.email)
    }
    
} 

}

const getUser = async (req,res) => {
    const {email, password } = req.body
    const user = await User.findOne({email}) //encuentra la propiedad dentro del objeto que está dentro del arreglo
    console.log(user)
    // method 1 of verifying
    // const userPassword = user[0].password
    
    //   const correctPassword = bcrypt.compareSync(password, userPassword)

    if (user) {
        const correctPassword = await user.passwordMatch(password)
        
        if (correctPassword){
            console.log('user exists')
            req.session.userId= user._id
            req.session.userEmail = user.email
            req.session.correctPassword = correctPassword

            res.redirect('/') 
        }
        else {
            req.flash('errorMsg', 'Usuario o contraseña son incorrectos')
            res.redirect('/login')   
        }

    }else {
        req.flash('errorMsg', 'Usuario o contraseña son incorrectos')
        res.redirect('/login')
    }
}

const logoutUser = (req, res) => {
    req.session.userId= null
    res.redirect('/login')
}

//   const encryptPassword = (password) => {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
    
//     return hash
//   }


module.exports = {
    signupUser,
    loginUser,
    createUser,
    getUser,
    logoutUser,

}