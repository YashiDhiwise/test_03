let User = require('../model/user');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('../utils/dbService');

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user){
      user = user.map((obj) => obj._id);
      const userRoleFilter4444 = { 'userId': { '$in': user } };
      const userRole9603 = await deleteUserRole(userRoleFilter4444);
      return await User.deleteMany(filter);
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role){
      role = role.map((obj) => obj._id);
      const routeRoleFilter7139 = { 'roleId': { '$in': role } };
      const routeRole4959 = await deleteRouteRole(routeRoleFilter7139);
      const userRoleFilter3909 = { 'roleId': { '$in': role } };
      const userRole1350 = await deleteUserRole(userRoleFilter3909);
      return await Role.deleteMany(filter);
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectRoute = await ProjectRoute.find(filter, { _id:1 });
    if (projectRoute){
      projectRoute = projectRoute.map((obj) => obj._id);
      const routeRoleFilter9694 = { 'routeId': { '$in': projectRoute } };
      const routeRole6130 = await deleteRouteRole(routeRoleFilter9694);
      return await ProjectRoute.deleteMany(filter);
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user){
      user = user.map((obj) => obj._id);
      const userRoleFilter9426 = { 'userId': { '$in': user } };
      const userRole6464Cnt = await countUserRole(userRoleFilter9426);
      const userCnt =  await User.countDocuments(filter);
      let response = { user : userCnt  };
      response = {
        ...response,
        ...userRole6464Cnt,
      };
      return response;
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role){
      role = role.map((obj) => obj._id);
      const routeRoleFilter6724 = { 'roleId': { '$in': role } };
      const routeRole3303Cnt = await countRouteRole(routeRoleFilter6724);
      const userRoleFilter5831 = { 'roleId': { '$in': role } };
      const userRole0298Cnt = await countUserRole(userRoleFilter5831);
      const roleCnt =  await Role.countDocuments(filter);
      let response = { role : roleCnt  };
      response = {
        ...response,
        ...routeRole3303Cnt,
        ...userRole0298Cnt,
      };
      return response;
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectRoute = await ProjectRoute.find(filter, { _id:1 });
    if (projectRoute){
      projectRoute = projectRoute.map((obj) => obj._id);
      const routeRoleFilter4847 = { 'routeId': { '$in': projectRoute } };
      const routeRole1207Cnt = await countRouteRole(routeRoleFilter4847);
      const projectRouteCnt =  await ProjectRoute.countDocuments(filter);
      let response = { projectRoute : projectRouteCnt  };
      response = {
        ...response,
        ...routeRole1207Cnt,
      };
      return response;
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user){
      user = user.map((obj) => obj._id);
      const userRoleFilter4747 = { 'userId': { '$in': user } };
      const userRole6639 = await softDeleteUserRole(userRoleFilter4747);
      return await User.updateMany(filter, { isDeleted:true });
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role){
      role = role.map((obj) => obj._id);
      const routeRoleFilter2991 = { 'roleId': { '$in': role } };
      const routeRole3309 = await softDeleteRouteRole(routeRoleFilter2991);
      const userRoleFilter4853 = { 'roleId': { '$in': role } };
      const userRole0952 = await softDeleteUserRole(userRoleFilter4853);
      return await Role.updateMany(filter, { isDeleted:true });
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter) =>{
  try {
    let projectRoute = await ProjectRoute.find(filter, { _id:1 });
    if (projectRoute){
      projectRoute = projectRoute.map((obj) => obj._id);
      const routeRoleFilter4383 = { 'routeId': { '$in': projectRoute } };
      const routeRole4355 = await softDeleteRouteRole(routeRoleFilter4383);
      return await ProjectRoute.updateMany(filter, { isDeleted:true });
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.updateMany(filter, { isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter) =>{
  try {
    return await UserRole.updateMany(filter, { isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteUser,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countUser,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteUser,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
