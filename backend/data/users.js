import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Second User',
    email: 'second@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Third User',
    email: 'third@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
