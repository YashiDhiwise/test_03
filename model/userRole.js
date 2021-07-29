const mongoose = require('../config/db');
const mongoosePaginate = require('mongoose-paginate-v2');
var idValidator = require('mongoose-id-validator');
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

    userId:{
      type:Schema.Types.ObjectId,
      ref:'user',
      required:true
    },

    roleId:{
      type:Schema.Types.ObjectId,
      ref:'role'
    },

    isDeleted:Boolean,

    isActive:Boolean,

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
  next();
});
schema.method('toJSON', function () {
  const {
    __v, _id, ...object 
  } = this.toObject();
  object.id = _id;
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const userRole = mongoose.model('userRole',schema,'userRole');
module.exports = userRole;