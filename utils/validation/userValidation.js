/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */
const joi = require('joi');
const { USER_ROLE } = require('../../config/authConstant');
const { convertObjectToEnum } = require('../common');   
exports.schemaKeys = joi.object({
  username: joi.string(),
  password: joi.string(),
  email: joi.string(),
  name: joi.string(),
  role: joi.number().integer().valid(...convertObjectToEnum(USER_ROLE)),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date()
  }),
  isActive: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  username: joi.string(),
  password: joi.string(),
  email: joi.string(),
  name: joi.string(),
  role: joi.number().integer().valid(...convertObjectToEnum(USER_ROLE)),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date()
  }),
  isActive: joi.boolean()
}).unknown(true);
