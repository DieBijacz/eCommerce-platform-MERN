import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  // to create token jwt.sign takes:
  // user id that will be encrypted
  // special key that is hidded in .env
  // options like expiresIn (how long its gonna be valid)
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export default generateToken
