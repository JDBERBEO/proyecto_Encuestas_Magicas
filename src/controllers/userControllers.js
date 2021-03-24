const User = require('../models/userModel')
const bcrypt = require('bcrypt')


const signupUser = (req, res) => {
    res.render('register')
}

const loginUser = (req,res) => {
    res.render('login')
}

const createUser = async (req, res) => {
    
    // const {email, password} = req.body

    // if (password === '' || email === '') {
    //             req.flash('errorPassword', 'password o email son requerido')
    //             res.redirect('/signup')
    //         }
    
    // else if (error) {
    //     req.flash('errorSignup', 'El usuario ya existe')
    // res.redirect('/signup')
    // }
    // else {
        
    //     const user = new User({ email, password })
    //         await user.save()
    //         res.redirect('/login')
    // }

    try{
    const { email, password} = req.body
    
    const user = new User({ email, password })
    await user.save()
    res.redirect('/login')
} catch (error) {
    
    
    req.flash('errorSignup', 'El usuario ya existe')
    res.redirect('/signup')
    // res.send('<h1>Ups something went wrong, user name or password already exists</h1>') //buscar flash message, se hace el mensjae y un redirect al signup
    console.log(error)
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
            req.flash('errorMsg', 'User or password are incorrect')
            res.redirect('/login')   
        }

    }else {
        req.flash('errorMsg', 'User or password are incorrect')
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