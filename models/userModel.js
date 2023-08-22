import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },  //we are making obejct ani  as we know schema mean backbone ani hami lai k k required cha bhanako backbone bhitra
    phone:{
        type:String,
        required:true,
    },
    address: {
        type:{},
        required: true,
      },
    answer: {
        type: String,
        required: true,
      },
    role: {
      type: Number,
      default: 0,
    }
},{timestamps:true});//user jaba create huncha tesko timestamp aayou cha
export default mongoose.model('users',userSchema) 
