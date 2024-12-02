

const mongoose = require ('mongoose')

const bcrypt = require('bcrypt')

const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
         fullname:{
           firstname:
           {
            type:String,
            required:true,
            minlength:[3,'first name must be 3 character']
           },
           lastname:{
            type:String,
            minlength:[3,'last name must be 3 character']
           }
         },
         email:{
            type:String,
            require:true,
            unique:true,
            minlength:[5, "Email must have 4 character long"]
         },
         password:{
            type :String,
            require :true,
            minlength :[8, 'Password has atleast 8 character'],
            select :false
         },

         socketId:{
            type:String,
         }


})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id:this._id
    },process.env.JWT_SECRET)

    return token;
}


userSchema.methods.comparepassword = async function (password) {
    return await bcrypt.compare(password,this.password); 
}


userSchema.statics.hashPassword = async function (password) {

    return await bcrypt.hash(password,10);
    
}



const userModel = mongoose.model('user',userSchema)


module.exports = userModel