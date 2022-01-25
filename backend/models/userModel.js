import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
)

// METHOD TO CHECK USER PASSWORD
// because matchPassword is called on specific user
// i can compare with bcrypt enteredPassword with encrypted password of that user this.password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// create User model with userSchema
const User = mongoose.model('User', userSchema)
export default User
