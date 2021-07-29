const mongoose = require('../config/db');
const mongoosePaginate = require('mongoose-paginate-v2');
var idValidator = require('mongoose-id-validator');
const bcrypt = require('bcrypt');
const {
  USER_ROLE,DEFAULT_ROLE
} = require('../config/authConstant');
const { convertObjectToEnum } = require('../utils/common');
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    username:{ type:String },

    password:{ type:String },

    email:{ type:String },

    name:{ type:String },

    isDeleted:Boolean,

    isActive:Boolean,

    role:{
      type:Number,
      enum:convertObjectToEnum(USER_ROLE)
    },

    resetPasswordLink:{
      code:String,
      expireTime:Date
    },

    loginRetryLimit:{
      type:Number,
      default:0
    },

    loginReactiveTime:{ type:Date },

    addedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt' 
    } 
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  if (this.password){
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

schema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
schema.method('toJSON', function () {
  const {
    __v, _id, ...object 
  } = this.toObject();
  object.id = _id;
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const user = mongoose.model('user',schema,'user');
module.exports = user;