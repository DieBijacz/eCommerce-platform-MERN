import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

// IMPORT DATA
const importData = async () => {
  try {
    // first clear data in db so the only data in there is a just inserted
    // to clear all => call mongoose deleteMany() on all models
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // place all users in db
    const createdUsers = await User.insertMany(users)

    // To place all products as admin
    // get adminUser id
    const adminUser = createdUsers[0]._id
    // create sampleProducts with products and for each added user: adminUser
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    // place all products in db as admin
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    // process.exit(1) is exit code
    // https://nodejs.dev/learn/how-to-exit-from-a-nodejs-program
    process.exit(1)
  }
}

// DESTROY DATA
const destroyData = async () => {
  try {
    // to clear all => call mongoose deleteMany() on all models
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    // process.exit(1) is exit code
    // https://nodejs.dev/learn/how-to-exit-from-a-nodejs-program
    process.exit(1)
  }
}

// to get node backend/seeder -d
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
