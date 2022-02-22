import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    // to track who created target product: type: id ref: <user model>
    // that gives relationship between product and user
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    // reviews is an array with seperate schema above
    reviews: [reviewSchema],
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
)

// create User model with userSchema
const Product = mongoose.model('Product', productSchema)
export default Product
