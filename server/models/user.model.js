const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('./product.model');

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'First name is required'],
    }, 
    lastname: {
      type: String,
      required: [true, 'Last name is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    whishlist: {
      type: [String],
    },
    shoppingbag: {
      type: [String],
    }
  },
  { timestamps: true },
);

UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords must Match!!!');
  }
  next();
});

UserSchema.pre('save', async function (next) {
  console.log('IN PRE SAVE:', this.password);
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    console.log('HASHED:', hashedPassword);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log('ERROR IN SAVE', error);
  }
});

module.exports = mongoose.model('User', UserSchema);